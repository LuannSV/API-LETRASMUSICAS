# Frontend - Letras de Músicas

Frontend estático simples (HTML/CSS/JS) que consome a API pública `lyrics.ovh` para buscar letras por artista e música.

## Estrutura

- `index.html`: marcação e layout da página
- `styles.css`: estilos e responsividade
- `main.js`: lógica de busca e renderização

## Como executar

Como é estático, você pode abrir o `index.html` diretamente no navegador. Para um melhor funcionamento (e evitar limitações de CORS em alguns navegadores), rode com um servidor HTTP simples:

- Python 3:

```bash
python3 -m http.server 8080 --directory .
```

Acesse: `http://localhost:8080`

## Observações

- A API utilizada é `https://api.lyrics.ovh/v1/{artista}/{musica}` e pode eventualmente ficar fora do ar ou limitar requisições.
- Se você preferir integrar com o backend em Streamlit existente em `LetrasMsc/app.py`, podemos expor um endpoint HTTP no Python (FastAPI/Flask) e apontar o frontend para ele.