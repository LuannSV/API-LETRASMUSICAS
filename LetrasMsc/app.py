import requests 
import streamlit as st
import json
import os
from datetime import datetime

# Configuração da página
st.set_page_config(
    page_title="🎵 Letras de Música",
    page_icon="🎵",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS customizado para melhorar a aparência
st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        margin-bottom: 2rem;
        color: white;
    }
    
    .search-container {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 15px;
        border: 1px solid #e9ecef;
        margin-bottom: 2rem;
    }
    
    .lyrics-container {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        border: 1px solid #e9ecef;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        max-height: 600px;
        overflow-y: auto;
    }
    
    .history-item {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        border-left: 4px solid #667eea;
    }
    
    .stButton > button {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .metric-card {
        background: white;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #e9ecef;
        text-align: center;
    }
</style>
""", unsafe_allow_html=True)

def buscar_letra(banda, musica):
    """Busca a letra da música usando a API lyrics.ovh"""
    try:
        endpoint = f"https://api.lyrics.ovh/v1/{banda}/{musica}"
        response = requests.get(endpoint, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            return data.get('lyrics', '').strip()
        else:
            return ""
    except requests.exceptions.RequestException as e:
        st.error(f"Erro na conexão: {str(e)}")
        return ""
    except Exception as e:
        st.error(f"Erro inesperado: {str(e)}")
        return ""

def salvar_historico(banda, musica, sucesso):
    """Salva o histórico de pesquisas em um arquivo JSON"""
    historico_file = "historico_pesquisas.json"
    
    # Carrega histórico existente ou cria novo
    if os.path.exists(historico_file):
        with open(historico_file, 'r', encoding='utf-8') as f:
            historico = json.load(f)
    else:
        historico = []
    
    # Adiciona nova pesquisa
    nova_pesquisa = {
        "banda": banda,
        "musica": musica,
        "data_hora": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "sucesso": sucesso
    }
    
    historico.insert(0, nova_pesquisa)  # Adiciona no início
    
    # Mantém apenas as últimas 50 pesquisas
    historico = historico[:50]
    
    # Salva no arquivo
    with open(historico_file, 'w', encoding='utf-8') as f:
        json.dump(historico, f, ensure_ascii=False, indent=2)

def carregar_historico():
    """Carrega o histórico de pesquisas"""
    historico_file = "historico_pesquisas.json"
    if os.path.exists(historico_file):
        with open(historico_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_favoritos(banda, musica, letra):
    """Salva música nos favoritos"""
    favoritos_file = "favoritos.json"
    
    if os.path.exists(favoritos_file):
        with open(favoritos_file, 'r', encoding='utf-8') as f:
            favoritos = json.load(f)
    else:
        favoritos = []
    
    # Verifica se já existe nos favoritos
    for fav in favoritos:
        if fav['banda'].lower() == banda.lower() and fav['musica'].lower() == musica.lower():
            return False  # Já existe
    
    # Adiciona aos favoritos
    novo_favorito = {
        "banda": banda,
        "musica": musica,
        "letra": letra,
        "data_adicao": datetime.now().strftime("%d/%m/%Y %H:%M")
    }
    
    favoritos.append(novo_favorito)
    
    with open(favoritos_file, 'w', encoding='utf-8') as f:
        json.dump(favoritos, f, ensure_ascii=False, indent=2)
    
    return True

def carregar_favoritos():
    """Carrega os favoritos"""
    favoritos_file = "favoritos.json"
    if os.path.exists(favoritos_file):
        with open(favoritos_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

# Header principal
st.markdown("""
<div class="main-header">
    <h1>🎵 Buscador de Letras de Música</h1>
    <p>Encontre as letras das suas músicas favoritas!</p>
</div>
""", unsafe_allow_html=True)

# Sidebar com funcionalidades extras
with st.sidebar:
    st.header("📊 Estatísticas")
    historico = carregar_historico()
    favoritos = carregar_favoritos()
    
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Pesquisas", len(historico))
    with col2:
        st.metric("Favoritos", len(favoritos))
    
    st.header("📚 Histórico Recente")
    if historico:
        for item in historico[:5]:  # Mostra apenas os 5 mais recentes
            status_icon = "✅" if item['sucesso'] else "❌"
            st.markdown(f"""
            <div class="history-item">
                <strong>{status_icon} {item['banda']}</strong><br>
                <em>{item['musica']}</em><br>
                <small>{item['data_hora']}</small>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button(f"🔄 Repetir", key=f"repeat_{item['banda']}_{item['musica']}"):
                st.session_state.banda_input = item['banda']
                st.session_state.musica_input = item['musica']
                st.rerun()
    else:
        st.info("Nenhuma pesquisa realizada ainda")
    
    st.header("⭐ Favoritos")
    if favoritos:
        for fav in favoritos[:3]:  # Mostra apenas os 3 primeiros
            st.markdown(f"**{fav['banda']}** - *{fav['musica']}*")
            if st.button(f"🎵 Ver", key=f"fav_{fav['banda']}_{fav['musica']}"):
                st.session_state.letra_favorita = fav['letra']
                st.session_state.show_favorita = True
                st.rerun()
    else:
        st.info("Nenhum favorito adicionado")

# Container principal de busca
st.markdown('<div class="search-container">', unsafe_allow_html=True)

col1, col2, col3 = st.columns([2, 2, 1])

with col1:
    banda = st.text_input(
        "🎸 Nome da Banda/Artista", 
        value=st.session_state.get('banda_input', ''),
        placeholder="Ex: Queen, Beatles, AC/DC...",
        key="banda"
    )

with col2:
    musica = st.text_input(
        "🎵 Nome da Música", 
        value=st.session_state.get('musica_input', ''),
        placeholder="Ex: Bohemian Rhapsody, Hey Jude...",
        key="musica"
    )

with col3:
    st.markdown("<br>", unsafe_allow_html=True)  # Espaçamento
    pesquisar = st.button("🔍 Pesquisar", type="primary", use_container_width=True)

st.markdown('</div>', unsafe_allow_html=True)

# Limpar inputs após uso
if 'banda_input' in st.session_state:
    del st.session_state.banda_input
if 'musica_input' in st.session_state:
    del st.session_state.musica_input

# Exibir letra favorita se solicitado
if st.session_state.get('show_favorita', False):
    st.markdown('<div class="lyrics-container">', unsafe_allow_html=True)
    st.subheader("⭐ Música Favorita")
    st.markdown(st.session_state.letra_favorita.replace('\n', '<br>'), unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    if st.button("❌ Fechar"):
        st.session_state.show_favorita = False
        del st.session_state.letra_favorita
        st.rerun()

# Processamento da pesquisa
if pesquisar and banda.strip() and musica.strip():
    with st.spinner("🔍 Buscando letra..."):
        letra = buscar_letra(banda.strip(), musica.strip())
        
        # Salva no histórico
        salvar_historico(banda.strip(), musica.strip(), bool(letra))
        
        if letra:
            st.success("✅ Letra encontrada com sucesso!")
            
            # Container para a letra
            st.markdown('<div class="lyrics-container">', unsafe_allow_html=True)
            
            col1, col2 = st.columns([3, 1])
            with col1:
                st.subheader(f"🎵 {musica} - {banda}")
            with col2:
                if st.button("⭐ Adicionar aos Favoritos"):
                    if salvar_favoritos(banda.strip(), musica.strip(), letra):
                        st.success("Adicionado aos favoritos!")
                    else:
                        st.warning("Já está nos favoritos!")
            
            # Exibe a letra formatada
            letra_formatada = letra.replace('\n', '<br>')
            st.markdown(f"""
            <div style="font-size: 16px; line-height: 1.6; color: #333;">
                {letra_formatada}
            </div>
            """, unsafe_allow_html=True)
            
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Opções adicionais
            col1, col2, col3 = st.columns(3)
            with col1:
                st.download_button(
                    "📄 Baixar Letra",
                    letra,
                    file_name=f"{banda}_{musica}_letra.txt",
                    mime="text/plain"
                )
            with col2:
                if st.button("🔗 Compartilhar"):
                    st.info("Link copiado: Funcionalidade em desenvolvimento")
            with col3:
                if st.button("🔄 Nova Pesquisa"):
                    st.rerun()
        else:
            st.error("❌ Letra não encontrada. Verifique se o nome da banda e música estão corretos.")
            st.info("💡 Dicas: Tente variações do nome, verifique a grafia ou tente em inglês.")

elif pesquisar:
    st.warning("⚠️ Por favor, preencha o nome da banda e da música.")

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <p>🎵 Desenvolvido com ❤️ usando Streamlit | Dados fornecidos pela API lyrics.ovh</p>
</div>
""", unsafe_allow_html=True)