function switchTab(tab) {
  document.querySelectorAll('.api-tab').forEach((t, i) => {
    t.classList.toggle('active', ['cep', 'cnpj', 'feriados'][i] === tab);
  });
  document.querySelectorAll('.api-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + tab).classList.add('active');
}

function setLoading(el) {
  el.innerHTML = '<p class="loading">Buscando...</p>';
}

function setError(el, msg) {
  el.innerHTML = `<p class="api-error">❌ ${msg}</p>`;
}

function renderGrid(el, items) {
  const html = items.map(([label, value]) =>
    `<div>
      <div class="result-label">${label}</div>
      <div class="result-value">${value || '—'}</div>
    </div>`
  ).join('');
  el.innerHTML = `<div class="result-grid">${html}</div>`;
}

async function buscarCEP() {
  const cep = document.getElementById('input-cep').value.replace(/\D/g, '');
  const res = document.getElementById('result-cep');
  if (cep.length !== 8) { setError(res, 'CEP deve ter 8 dígitos.'); return; }
  setLoading(res);
  try {
    const r = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    if (!r.ok) throw new Error('CEP não encontrado.');
    const d = await r.json();
    renderGrid(res, [
      ['CEP', d.cep],
      ['Logradouro', d.street],
      ['Bairro', d.neighborhood],
      ['Cidade', d.city],
      ['Estado', d.state],
    ]);
  } catch (e) { setError(res, e.message); }
}

async function buscarCNPJ() {
  const cnpj = document.getElementById('input-cnpj').value.replace(/\D/g, '');
  const res = document.getElementById('result-cnpj');
  if (cnpj.length !== 14) { setError(res, 'CNPJ deve ter 14 dígitos.'); return; }
  setLoading(res);
  try {
    const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!r.ok) throw new Error('CNPJ não encontrado.');
    const d = await r.json();
    renderGrid(res, [
      ['Razão Social', d.razao_social],
      ['Nome Fantasia', d.nome_fantasia],
      ['Situação', d.descricao_situacao_cadastral],
      ['Município', d.municipio],
      ['UF', d.uf],
    ]);
  } catch (e) { setError(res, e.message); }
}

async function buscarFeriados() {
  const ano = document.getElementById('input-feriados').value.trim();
  const res = document.getElementById('result-feriados');
  if (!ano || ano.length !== 4) { setError(res, 'Digite um ano válido.'); return; }
  setLoading(res);
  try {
    const r = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    if (!r.ok) throw new Error('Ano não encontrado.');
    const lista = await r.json();
    const html = lista.map(f =>
      `<div>
        <div class="result-label">${f.date}</div>
        <div class="result-value">${f.name}</div>
      </div>`
    ).join('');
    res.innerHTML = `<div class="result-grid">${html}</div>`;
  } catch (e) { setError(res, e.message); }
}

document.getElementById('input-cep').addEventListener('keydown', e => e.key === 'Enter' && buscarCEP());
document.getElementById('input-cnpj').addEventListener('keydown', e => e.key === 'Enter' && buscarCNPJ());
document.getElementById('input-feriados').addEventListener('keydown', e => e.key === 'Enter' && buscarFeriados());
