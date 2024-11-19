# PATENTIA

Este projeto tem como objetivo automatizar o processo de consulta de patentes no INPI (Instituto Nacional da Propriedade Industrial) e exibir os resultados por meio de uma interface web. O sistema utiliza Python para realizar a raspagem dos dados, armazenando-os em um banco de dados, e o frontend é desenvolvido em React para exibição dos dados. O projeto é composto por três partes principais:

## 📸 Imagem do projeto
![screencapture-localhost-5174-2024-11-15-21_55_59](https://github.com/user-attachments/assets/a906147f-a978-4801-88ac-8d7c6dcbb3b1)



## 💻	 Funcionalidades
- **Raspagem de Dados de Patentes**: Realiza a raspagem de dados de patentes diretamente do site do **INPI** (Instituto Nacional de Propriedade Industrial).
- **Armazenamento em Banco de Dados**: Armazena as informações extraídas das patentes em um banco de dados (MySQL).
- **Exibição na Interface Web**: Exibe os dados de patentes na interface web, permitindo ao usuário **consultar os registros de patentes** de forma interativa e dinâmica.
- **Download de Excel**: Permite ao usuário **baixar os dados** em formato de **planilha Excel** para análise offline.

## 🛠️ Tecnologias Utilizadas
- **Backend**:
  - **Python**: Para realizar a raspagem de dados do INPI.
  - **Bibliotecas para Raspagem de Dados**:
    - **Selenium**: Para interagir com páginas dinâmicas (se necessário) e realizar a raspagem de dados de forma mais robusta.
    - **Requests**: Para realizar requisições HTTP ao site do INPI.
  - **Banco de Dados**:
    - **MySQL**: Para armazenar as informações extraídas das patentes.
  - **Node.js**: Usado para expor a API que comunica o backend com o frontend, permitindo que os dados sejam acessados pela interface web.

    
- **Frontend**:
  - **React.js**: Interface web interativa.
  - **Tailwind CSS**: Estilização responsiva e moderna.
  - **Axios**: equisições HTTP para o backend.
  - **Material-UI (MUI)**: Componentes de UI prontos para facilitar o desenvolvimento.

## 📋 Pré-Requisitos

- Node.js
- Python
- Banco de dados (MySQL)

## 🚀  Rodando localmente

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto para sua máquina local:

```bash
git clone git@github.com:iJeferson/patentia.git
```

### 2. Instalar as Dependências

O projeto está dividido em duas partes: o backend e o frontend. Siga as etapas abaixo para instalar as dependências e rodar o projeto.

Na raiz do seu projeto, onde estão as pastas frontend e backend, execute o comando abaixo para instalar as dependências principais:

```bash
npm install
```

Entre na pasta frontend e instale as dependências do React:

```bash
cd frontend
npm install
```
Entre na pasta backend e instale as dependências do Node.js:

```bash
cd ../backend
npm install
```
Ainda na pasta backend instale as dependências do Python: 

```bash
pip install -r requirements.txt
```

###  3. Configurar o Banco de Dados

Antes de rodar as migrations, verifique as configurações do banco de dados no arquivo de configuração do backend. Certifique-se de que as credenciais do banco de dados (nome de usuário, senha, nome do banco) estão corretas para o ambiente local.
Agora, execute a migration para criar as tabelas necessárias no banco de dados. Navegue até a pasta src dentro do diretório backend e execute o comando da migration:
```bash
cd src
npx sequelize-cli db:migrate
```

###  4. Rodar o Projeto

Agora que as dependências estão instaladas e o banco de dados está configurado, basta rodar o projeto.Na raiz do projeto, execute o comando:

```bash
npm run dev
```
### 5. Acessar a Aplicação

Agora você pode acessar a aplicação localmente no seu navegador:

- Frontend (React): Acesse http://localhost:5173 para visualizar a interface web.

### 6. Testar Funcionalidades
Após iniciar o frontend e backend, você pode testar as funcionalidades do sistema, como:

- Raspagem de dados: Verifique se a raspagem de patentes do INPI está funcionando corretamente.

- Consulta de patentes: Acesse os dados extraídos via a interface web no frontend.

- Download de Excel: Teste o download dos dados no formato de planilha.

## 🚀 Exemplo de Uso

1. Após rodar o projeto, acesse a interface web no endereço [http://localhost:5173](http://localhost:5173).
2. Insira os termos de pesquisa para consultar as patentes.
3. O sistema irá exibir os dados extraídos do INPI, permitindo visualizar e interagir com as informações.
4. Para fazer o download das patentes em formato Excel, clique no botão "Baixar Excel".

## 📜 Histórico de Alterações

### [1.0.0] - 2024-11-13
- Implementação da raspagem de dados de patentes.
- Conexão com banco de dados MySQL.
- Exibição de patentes na interface web.
- Funcionalidade de download de Excel.

## 🤝 Autores

- [Jeferson Oliveira](https://github.com/iJeferson)
- [Hercules Oliveira](https://github.com/GodHercules)
- [Ielber Pellegrini](https://github.com/ielberPellegrini)
- [Mateus Fernandes](https://github.com/mateusfernandesvn)

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


