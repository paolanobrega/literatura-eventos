const header = document.querySelector('header');
const btnMenu = document.getElementById('btnMenu');
btnMenu?.addEventListener('click', () => {
  header.classList.toggle('open');
  const expanded = header.classList.contains('open');
  btnMenu.setAttribute('aria-expanded', String(expanded));
});

const eventos = [
  { titulo:'Clube do Livro — Clara dos Anjos', data:'2025-09-05', cidade:'Rio de Janeiro/RJ', tipo:'Clube do Livro', preco:'Gratuito' },
  { titulo:'Feira Literária do Nordeste', data:'2025-10-12', cidade:'Recife/PE', tipo:'Feira/Mostra', preco:'A partir de R$ 20' },
  { titulo:'Lançamento: Poemas do Amanhã', data:'2025-09-28', cidade:'Curitiba/PR', tipo:'Lançamento', preco:'Gratuito' },
  { titulo:'Bate-papo com Autores Independentes', data:'2025-11-03', cidade:'Online', tipo:'Palestra/Bate-papo', preco:'R$ 15' },
  { titulo:'Bienal do Livro — São Paulo', data:'2025-09-10', cidade:'São Paulo/SP', tipo:'Feira/Mostra', preco:'A partir de R$ 30' },
  { titulo:'Rodas de Leitura — Literatura Negra', data:'2025-09-22', cidade:'Salvador/BA', tipo:'Clube do Livro', preco:'Gratuito' },
];

const formatData = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
};

const lista = document.getElementById('lista-eventos');
const byDate = (a,b) => new Date(a.data) - new Date(b.data);

eventos.sort(byDate).forEach(e => {
  const card = document.createElement('article');
  card.className = 'event-card';
  card.innerHTML = `
    <div class="event-top">
      <span class="date-badge" aria-label="Data do evento">${formatData(e.data)}</span>
      <span class="event-meta">${e.tipo} • ${e.cidade}</span>
    </div>
    <h3>${e.titulo}</h3>
    <div class="event-meta">💸 ${e.preco}</div>
    <div>
      <a class="btn secondary" href="#contato">Quero participar</a>
    </div>`;
  lista.appendChild(card);
});

const form = document.getElementById('formContato');
const msg = document.getElementById('msgForm');
form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if(!form.checkValidity()){
    msg.classList.remove('sr-only');
    msg.style.color = 'var(--danger)';
    msg.textContent = 'Verifique os campos obrigatórios.';
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  console.log('Envio (exemplo):', data);
  form.reset();
  msg.classList.remove('sr-only');
  msg.style.color = 'var(--accent)';
  msg.textContent = 'Recebemos seu evento! Retornamos por e-mail.';
});

document.getElementById('ano').textContent = new Date().getFullYear();
