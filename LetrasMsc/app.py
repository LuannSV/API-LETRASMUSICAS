from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Dados de exemplo para usuários
users = [
    {"id": 1, "name": "João Silva", "email": "joao@email.com"},
    {"id": 2, "name": "Maria Santos", "email": "maria@email.com"},
    {"id": 3, "name": "Pedro Costa", "email": "pedro@email.com"},
]

def buscar_letra(banda, musica):
    endpoint = f"https://api.lyrics.ovh/v1/{banda}/{musica}"
    try:
        response = requests.get(endpoint)
        if response.status_code == 200:
            return response.json().get('lyrics', '')
        return ""
    except:
        return ""

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({'error': 'User not found'}), 404

@app.route('/lyrics', methods=['GET'])
def get_lyrics():
    banda = request.args.get('banda')
    musica = request.args.get('musica')
    
    if not banda or not musica:
        return jsonify({'error': 'Banda e música são obrigatórios'}), 400
    
    letra = buscar_letra(banda, musica)
    if letra:
        return jsonify({
            'banda': banda,
            'musica': musica,
            'letra': letra
        })
    else:
        return jsonify({'error': 'Letra não encontrada'}), 404

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'API funcionando'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)