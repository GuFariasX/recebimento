function mostrarTela(telaId) {
  document.querySelectorAll('.tela').forEach(tela => {
    tela.classList.add('hidden');
  });
  document.getElementById(telaId).classList.remove('hidden');
}

async function cadastrarFornecedor() {
  const razaoSocial = document.getElementById('razaoSocial').value.trim();
  const nomeFantasia = document.getElementById('nomeFantasia').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const email = document.getElementById('email').value.trim();
  const representante = document.getElementById('representante').value.trim();

  if (!razaoSocial || !cnpj) {
    alert('Razão Social e CNPJ são obrigatórios.');
    return;
  }

  const fornecedor = {
    razaoSocial,
    nomeFantasia,
    cnpj,
    telefone,
    endereco,
    email,
    representante
  };

  try {
    const res = await fetch('http://localhost:3000/api/fornecedor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fornecedor)
    });

    if (!res.ok) {
      const erro = await res.json();
      alert(`Erro ao cadastrar: ${erro.message || 'Erro desconhecido'}`);
      return;
    }

    alert('Fornecedor cadastrado com sucesso!');
  } catch (err) {
    alert('Erro de conexão com servidor.');
    console.error(err);
  }
}

async function registrarRecebimento() {
  const fornecedor_id = document.getElementById('idFornecedor').value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;

  await fetch('http://localhost:3000/api/recebimento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fornecedor_id, valor, data, descricao })
  });

  alert('Recebimento registrado!');
}

async function listarRecebimentos() {
  const res = await fetch('http://localhost:3000/api/recebimentos');
  const dados = await res.json();
  const tabela = document.getElementById('tabelaRecebimentos');
  tabela.innerHTML = '';
  dados.forEach(r => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${r.data}</td>
      <td>${r.fornecedor}</td>
      <td>R$${r.valor}</td>
      <td>${r.descricao}</td>
    `;
    tabela.appendChild(linha);
  });
}
