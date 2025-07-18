import csv
import json
import os
import re

def clean_filename(name):
    """Remove caracteres inválidos para nomes de arquivo"""
    return re.sub(r'[\\/*?:"<>|()]', "", name).replace(" ", "_")

def safe_int(value, default=0):
    """Converte para int com tratamento de erros"""
    try:
        return int(value.strip()) if value else default
    except ValueError:
        return default

def parse_habilities(hab_text, monster_name):
    """Extrai habilidades substituindo %nome% pelo nome real"""
    if not hab_text:
        return []
    
    habilidades = []
    for line in hab_text.split('\n'):
        line = line.strip()
        if line:
            if ":" in line:
                titulo, texto = line.split(":", 1)
                habilidades.append({
                    "titulo": titulo.strip(),
                    "texto": texto.strip().replace("%nome%", monster_name)
                })
            else:
                habilidades.append({
                    "titulo": line,
                    "texto": ""
                })
    return habilidades

def csv_to_individual_json(csv_file_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            if not row.get('Nome', '').strip():
                continue
                
            monster_name = row['Nome'].strip()
            # CORREÇÃO DEFINITIVA DOS CAMPOS:
            arma = row.get('Arma', '').strip()  # Coluna Arma → campo arma
            dano = row.get('Dano', 'd6').strip()  # Coluna Dano → campo dano
            nome_original = row.get('Nome Original', '').strip()
            
            # Usar Nome Original exatamente como está no CSV para o campo imagem
            imagem = nome_original if nome_original else monster_name
            
            monster = {
                "nome": monster_name,
                "nivel": safe_int(row.get('Nível')),
                "pa": safe_int(row.get('PA')),
                "defesa": safe_int(row.get('DEF')),
                "vida": safe_int(row.get('Vida')),
                "resistencia": row.get('Resist.', '').strip(),
                "imunidade": row.get('Imun.', '').strip(),
                "vulnerabilidade": row.get('Vuln.', '').strip(),
                "tamanho": safe_int(row.get('Tamanho'), 1),
                "arma": arma,    # ← Coluna Arma do CSV
                "dano": dano,    # ← Coluna Dano do CSV
                "tier": safe_int(row.get('Tier'), 1),
                "texto": row.get('Texto', '').strip(),
                "imagem": imagem,  # Mantém exatamente como está no CSV
                "habilidades": parse_habilities(row.get('Hab.', ''), monster_name)
            }
            
            filename = f"{clean_filename(monster_name)}.json"
            with open(os.path.join(output_folder, filename), 'w', encoding='utf-8') as json_file:
                json.dump(monster, json_file, ensure_ascii=False, indent=2, sort_keys=False)
            
            print(f"✓ {filename} criado | Arma: '{arma}' | Dano: '{dano}' | Imagem: '{imagem}'")

# Execução
csv_to_individual_json(
    'monstros.csv', 
    'monster_data'
)