# 🎵 LetrasMsc - Aplicação de Busca de Letras de Música

Uma aplicação moderna em Next.js para buscar e gerenciar letras de músicas, com funcionalidades avançadas de favoritos e histórico.

## ✨ Funcionalidades

### 🔍 **Busca de Letras**
- Busca em tempo real usando a API lyrics.ovh
- Interface intuitiva com campos para artista e música
- Tratamento de erros amigável
- Feedback visual durante carregamento

### ❤️ **Sistema de Favoritos**
- Adicione letras aos favoritos com um clique
- Página dedicada para visualizar favoritos
- Remoção individual ou em lote
- Persistência no localStorage

### 📚 **Histórico de Buscas**
- Histórico automático das últimas 10 buscas
- Acesso rápido a pesquisas anteriores
- Timestamps formatados de forma amigável
- Opção para limpar histórico

### 🎨 **Design Moderno**
- Interface responsiva com gradientes modernos
- Efeitos glass morphism
- Animações suaves
- Dark theme otimizado

### 📋 **Funcionalidades Extras**
- Copiar letras para clipboard
- Navegação entre páginas
- Estados de loading e erro
- Dicas para melhores resultados

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lyrics.ovh API** - Fonte de letras
- **localStorage** - Persistência local

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página inicial
│   ├── lyrics/page.tsx       # Busca de letras
│   ├── favorites/page.tsx    # Favoritos
│   ├── users/page.tsx        # Usuários (demo)
│   └── api/users/route.ts    # API mock
├── components/
│   ├── Header.tsx            # Cabeçalho
│   └── Layout.tsx            # Layout base
├── lib/
│   ├── api.ts                # Utilities de API
│   └── lyrics-service.ts     # Serviço de letras
└── globals.css               # Estilos globais
```

## 🚀 Como Usar

### 1. **Buscar Letras**
1. Acesse `/lyrics`
2. Digite o nome do artista
3. Digite o nome da música
4. Clique em "Buscar Letra"

### 2. **Gerenciar Favoritos**
1. Na página de resultados, clique em "🤍 Favoritar"
2. Acesse `/favorites` para ver todas
3. Clique em uma música para visualizar
4. Use "🗑️" para remover

### 3. **Histórico**
1. O histórico é salvo automaticamente
2. Clique em "📚 Histórico" na busca
3. Selecione uma busca anterior

## 📱 Páginas Disponíveis

- **`/`** - Página inicial com apresentação
- **`/lyrics`** - Busca de letras com funcionalidades completas
- **`/favorites`** - Visualização e gerenciamento de favoritos
- **`/users`** - Página de usuários (demonstração)

## 🎯 API Integrada

### Lyrics.ovh API
- **Endpoint**: `https://api.lyrics.ovh/v1/{artist}/{song}`
- **Formato**: JSON com campo `lyrics`
- **Tratamento**: Validação de erros e sanitização

### API Local
- **`/api/users`** - Dados mock de usuários
- Demonstra integração com APIs internas

## 🔧 Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🎨 Customização

### Cores
As cores são definidas em `globals.css`:
```css
:root {
  --primary: #8b5cf6;    /* Roxo principal */
  --secondary: #3b82f6;  /* Azul secundário */
  --accent: #06b6d4;     /* Ciano accent */
}
```

### Funcionalidades
O serviço de letras (`lyrics-service.ts`) pode ser estendido com:
- Múltiplas APIs de letras
- Cache de resultados
- Sincronização com backend
- Exportação de favoritos

## 🚀 Deploy

O projeto está otimizado para deploy em:
- **Vercel** (recomendado)
- **Netlify**
- **Qualquer provedor Next.js**

## 📄 Licença

Projeto desenvolvido para fins educacionais e demonstração.

---

**Desenvolvido com ❤️ para amantes da música!**