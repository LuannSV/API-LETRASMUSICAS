const form = document.getElementById('search-form');
const inputBanda = document.getElementById('banda');
const inputMusica = document.getElementById('musica');
const statusBox = document.getElementById('status');
const resultadoCard = document.getElementById('resultado');
const resultadoTitulo = document.getElementById('resultado-titulo');
const letraBox = document.getElementById('letra');

function setStatus(message, type = '') {
  statusBox.textContent = message || '';
  statusBox.className = `status${type ? ' ' + type : ''}`;
}

async function buscarLetra(banda, musica) {
  const endpoint = `https://api.lyrics.ovh/v1/${encodeURIComponent(banda)}/${encodeURIComponent(musica)}`;
  const response = await fetch(endpoint);
  if (!response.ok) return '';
  const data = await response.json();
  return data.lyrics || '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const banda = inputBanda.value.trim();
  const musica = inputMusica.value.trim();

  if (!banda || !musica) {
    setStatus('Preencha banda e música.', 'error');
    return;
  }

  setStatus('Buscando letra...');
  resultadoCard.classList.add('hidden');

  try {
    const letra = await buscarLetra(banda, musica);
    if (letra) {
      setStatus('Letra encontrada!', 'success');
      resultadoTitulo.textContent = `${banda} - ${musica}`;
      letraBox.textContent = letra;
      resultadoCard.classList.remove('hidden');
    } else {
      setStatus('Letra não encontrada.', 'error');
    }
  } catch (err) {
    console.error(err);
    setStatus('Ocorreu um erro ao buscar a letra.', 'error');
  }
});

