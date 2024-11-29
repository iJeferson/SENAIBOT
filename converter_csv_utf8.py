# import chardet

# def detect_encoding(file_path):
#     try:
#         with open(file_path, 'rb') as f:  # Abrir o arquivo em modo binário
#             raw_data = f.read(10000)  # Ler os primeiros 10000 bytes
#             result = chardet.detect(raw_data)  # Detectar a codificação
#             encoding = result['encoding']
#             print(f"A codificação detectada do arquivo é: {encoding}")
#     except Exception as e:
#         print(f"Erro ao tentar detectar a codificação: {e}")

# # Caminho do arquivo CSV
# file_path = r'C:\Users\ielbe\Desktop\patentia\wipo_dados_utf8.csv'  # Substitua pelo caminho real do arquivo
# detect_encoding(file_path)

# ##################################################################################################################################

import chardet

def detect_encoding(file_path):
    """Detecta a codificação do arquivo."""
    try:
        with open(file_path, 'rb') as f:
            raw_data = f.read(10000)  # Lê uma amostra para detectar a codificação
            result = chardet.detect(raw_data)
            return result['encoding']
    except Exception as e:
        print(f"Erro ao tentar detectar a codificação: {e}")
        return None

def convert_to_utf8(input_file_path, output_file_path):
    """Converte um arquivo para UTF-8, tratando caracteres problemáticos."""
    try:
        # Detectar a codificação do arquivo original
        encoding = detect_encoding(input_file_path)
        
        if encoding:
            print(f"Codificação detectada: {encoding}")
            
            with open(input_file_path, 'r', encoding=encoding, errors='replace') as infile, \
                 open(output_file_path, 'w', encoding='utf-8') as outfile:
                # Lê e escreve linha por linha
                for line in infile:
                    outfile.write(line)
            
            print(f"Arquivo convertido para UTF-8 e salvo em: {output_file_path}")
        else:
            print("Falha ao detectar a codificação do arquivo.")
    
    except Exception as e:
        print(f"Erro durante a conversão: {e}")

# Caminhos de entrada e saída
input_file_path = r'C:\Users\ielbe\Desktop\patentia\wipo_dados.csv'  # Caminho para o arquivo original
output_file_path = r'C:\Users\ielbe\Desktop\patentia\wipo_dados_utf8.csv'  # Caminho para o arquivo convertido

convert_to_utf8(input_file_path, output_file_path)
