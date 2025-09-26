# LetrasMsc - Sistema de Busca de Letras de Música

Um sistema moderno para buscar letras de música com interface web responsiva e API REST.

## 🚀 Funcionalidades

- **Interface Moderna**: Design responsivo com gradientes e efeitos visuais
- **Busca de Letras**: Integração com API externa para buscar letras de música
- **Lista de Usuários**: Visualização de usuários cadastrados
- **API REST**: Backend Flask com endpoints para usuários e letras
- **Tratamento de Erros**: Interface amigável para erros de conexão

## 🛠️ Tecnologias

### Frontend
- **Next.js 15** com App Router
- **TypeScript** para tipagem
- **Tailwind CSS** para estilização
- **React 19** com hooks

### Backend
- **Flask** para API REST
- **Flask-CORS** para CORS
- **Requests** para integração com API externa
- **Poetry** para gerenciamento de dependências

## 📦 Instalação e Execução

### Backend (API)

```bash
cd LetrasMsc

# Instalar dependências
export PATH="/home/ubuntu/.local/bin:$PATH"
poetry install --no-root

# Executar API
poetry run python app.py
```

A API estará disponível em `http://localhost:3001`

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 🔗 Endpoints da API

- `GET /health` - Status da API
- `GET /users` - Lista de usuários
- `GET /users/{id}` - Usuário específico
- `GET /lyrics?banda={banda}&musica={musica}` - Buscar letra de música

## 🎨 Design

O sistema possui um design moderno com:
- Gradientes roxo/azul/índigo
- Efeitos de backdrop blur
- Animações suaves
- Interface responsiva
- Tratamento visual de erros
- Cards com hover effects

## 🧪 Testando a API

Execute o script de teste:

```bash
cd LetrasMsc
python3 test_api.py
```

## 📱 Páginas

1. **Home** (`/`) - Página inicial com navegação
2. **Usuários** (`/users`) - Lista de usuários com tratamento de erro
3. **Letras** (`/lyrics`) - Busca de letras de música

## 🔧 Configuração

A URL da API é configurada via variável de ambiente `NEXT_PUBLIC_API_BASE_URL` ou padrão `http://localhost:3001`.

## 🐛 Solução de Problemas

### Backend não conecta
- Verifique se o Poetry está instalado
- Execute `poetry install --no-root`
- Verifique se a porta 3001 está livre

### Frontend não carrega dados
- Verifique se o backend está rodando
- Confirme a URL da API no arquivo `src/lib/api.ts`
- Verifique o console do navegador para erros

## 📄 Estrutura do Projeto

```
/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # Páginas e layouts
│   │   └── lib/             # Utilitários e API
│   └── package.json
├── LetrasMsc/               # Backend Flask
│   ├── app.py              # Aplicação principal
│   ├── pyproject.toml      # Dependências Python
│   └── test_api.py         # Script de teste
└── README.md
```

## 🎵 Como Usar

1. Execute o backend Flask
2. Execute o frontend Next.js
3. Acesse `http://localhost:3000`
4. Navegue pelas páginas usando os botões
5. Na página de letras, digite banda e música para buscar

## ✨ Melhorias Implementadas

- ✅ Interface moderna e responsiva
- ✅ Tratamento de erros amigável
- ✅ API REST funcional
- ✅ Integração com API externa de letras
- ✅ Design consistente em todas as páginas
- ✅ Loading states e feedback visual
- ✅ Navegação intuitiva