import sys
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import mysql.connector

# Recebe o valor de pesquisa como argumento
if len(sys.argv) < 2:
    print(json.dumps({"error": "Valor de pesquisa não fornecido"}))
    sys.exit(1)

search_value = sys.argv[1]

# Configurações do Chrome em modo headless
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

# Inicializa o driver do Chrome
driver = webdriver.Chrome(options=chrome_options)
driver.implicitly_wait(10)

# Conexão com o banco de dados MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="inpi_db"
)
cursor = db.cursor()

# Acessa o site e navega até a página de pesquisa
driver.get("https://busca.inpi.gov.br/pePI")
WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH, '//input[@title="Clique aqui para entrar na Pesquisa"]'))).click()
WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH, '//area[@href="/pePI/jsp/patentes/PatenteSearchBasico.jsp"]'))).click()

# Define a pesquisa e seleciona a quantidade de itens por página
search_box = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.NAME, 'ExpressaoPesquisa')))
search_box.send_keys(search_value)
Select(driver.find_element(By.NAME, 'RegisterPerPage')).select_by_value('100')
search_box.submit()

# Coleta os dados de cada página e insere no banco de dados
while True:
    tbody = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, 'tituloContext')))
    for row in tbody.find_elements(By.TAG_NAME, 'tr'):
        cells = row.find_elements(By.TAG_NAME, 'td')
        if cells:
            pedido = cells[0].text
            deposito = cells[1].text
            titulo = cells[2].text
            ipc = cells[3].text
            link = cells[0].find_element(By.TAG_NAME, 'a').get_attribute('href')
            
            # Insere os dados na tabela
            insert_query = """
            INSERT INTO busca_inpi (pedido, deposito, titulo, ipc, link, pesquisa_realizada, createdAt, updatedAt)
            VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
            """
            cursor.execute(insert_query, (pedido, deposito, titulo, ipc, link, search_value))
            db.commit()

    try:
        # Navega para a próxima página
        next_button = WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH, '//a[contains(text(), "Próxima")]')))
        next_button.click()
    except:
        # Sai do loop ao chegar na última página
        break

# Finaliza com a mensagem de sucesso
print(json.dumps({"message": "Pesquisa concluída"}))

# Fecha o driver e a conexão com o banco de dados
driver.quit()
cursor.close()
db.close()
