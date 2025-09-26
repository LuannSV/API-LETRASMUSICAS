# 📖 Exemplo Prático de Uso - LetrasMsc

Este documento mostra exemplos práticos de como usar todas as funcionalidades da aplicação.

## 🎯 Cenário 1: Primeira Busca

### Passo a Passo:

1. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

2. **Vá para busca de letras**
   - Clique em "Buscar Letras Agora" na página inicial
   - Ou acesse diretamente `/lyrics`

3. **Faça sua primeira busca**
   ```
   Artista: Taylor Swift
   Música: Anti-Hero
   ```
   
4. **Resultado esperado:**
   - ✅ Letra da música exibida
   - ✅ Botão "🤍 Favoritar" disponível
   - ✅ Botão "📋 Copiar" funcionando
   - ✅ Busca salva no histórico automaticamente

## 🎯 Cenário 2: Usando Favoritos

### Passo a Passo:

1. **Favorite algumas músicas:**
   ```
   1ª busca: Ed Sheeran - Shape of You
   2ª busca: Adele - Hello
   3ª busca: The Weeknd - Blinding Lights
   ```

2. **Acesse a página de favoritos:**
   ```
   http://localhost:3000/favorites
   ```

3. **Funcionalidades disponíveis:**
   - ✅ Lista de todos os favoritos
   - ✅ Clique para visualizar letra completa
   - ✅ Remoção individual de favoritos
   - ✅ Botão "Limpar Todos"

## 🎯 Cenário 3: Usando o Histórico

### Passo a Passo:

1. **Faça várias buscas diferentes:**
   ```
   Coldplay - Yellow
   Queen - Bohemian Rhapsody
   Beatles - Hey Jude
   Michael Jackson - Billie Jean
   ```

2. **Na página de busca, clique em "📚 Histórico"**

3. **Funcionalidades do histórico:**
   - ✅ Últimas 10 buscas mostradas
   - ✅ Timestamps amigáveis ("2 min atrás", "1h atrás")
   - ✅ Clique para repetir busca
   - ✅ Botão para limpar histórico

## 🎯 Cenário 4: Tratamento de Erros

### Testes de erro para validar:

1. **Música inexistente:**
   ```
   Artista: XYZ123
   Música: MusicaQueNaoExiste
   ```
   **Resultado:** Mensagem "Letra não encontrada para esta música"

2. **Campos vazios:**
   ```
   Artista: (vazio)
   Música: (vazio)
   ```
   **Resultado:** Botão desabilitado + validação

3. **Problemas de rede:**
   - Desconecte da internet
   - Tente fazer uma busca
   **Resultado:** Mensagem de erro de conectividade

## 🎯 Cenário 5: Funcionalidades Avançadas

### Copiar Letra:
1. Busque qualquer música
2. Clique em "📋 Copiar"
3. Cole em qualquer editor de texto
**Resultado:** Letra completa copiada

### Navegação:
1. Use o header para navegar entre páginas
2. Note o indicador visual da página ativa
3. Logo clicável sempre volta para home

### Responsividade:
1. Teste em diferentes tamanhos de tela
2. Menu mobile no header
3. Layout adaptativo em todas as páginas

## 🎵 Exemplos de Músicas para Testar

### ✅ Músicas que funcionam bem:
```
Taylor Swift - Anti-Hero
Ed Sheeran - Shape of You
Adele - Hello
The Weeknd - Blinding Lights
Dua Lipa - Levitating
Harry Styles - As It Was
Billie Eilish - bad guy
Post Malone - Circles
```

### ⚠️ Dicas para melhores resultados:
- Use nomes completos dos artistas
- Evite caracteres especiais desnecessários
- Teste variações do nome se não encontrar
- Letras em inglês têm maior taxa de sucesso

## 🔧 Para Desenvolvedores

### Testando a API:
```javascript
// Console do navegador
fetch('https://api.lyrics.ovh/v1/Taylor Swift/Anti-Hero')
  .then(r => r.json())
  .then(d => console.log(d));
```

### Inspecionando localStorage:
```javascript
// Ver histórico
JSON.parse(localStorage.getItem('lyrics_history'))

// Ver favoritos
JSON.parse(localStorage.getItem('lyrics_favorites'))
```

### Estados da aplicação:
1. **Loading** - Durante busca
2. **Success** - Letra encontrada
3. **Error** - Erro na busca
4. **Empty** - Estado inicial

## 📱 Testando em Dispositivos

### Mobile:
- Menu hambúrguer no header
- Botões otimizados para touch
- Texto legível em telas pequenas

### Tablet:
- Layout em grid responsivo
- Favoritos em duas colunas
- Navegação touch-friendly

### Desktop:
- Layout completo
- Hover effects funcionais
- Navegação com teclado

---

**💡 Dica:** Experimente todas as funcionalidades para ter a experiência completa da aplicação!