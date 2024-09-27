// Array para armazenar os itens do estoque
let estoque = [];

// Referências aos elementos DOM
const form = document.getElementById('addItemForm');
const nomeInput = document.getElementById('nome');
const quantidadeInput = document.getElementById('quantidade');
const validadeInput = document.getElementById('validade');
const tabelaEstoque = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];

// Função para renderizar a tabela de estoque
function renderEstoque() {
    tabelaEstoque.innerHTML = ''; // Limpa o conteúdo da tabela

    estoque.forEach((item, index) => {
        const row = tabelaEstoque.insertRow();

        // Insere células com os dados do item
        const nomeCell = row.insertCell(0);
        nomeCell.textContent = item.nome;

        const quantidadeCell = row.insertCell(1);
        quantidadeCell.textContent = item.quantidade;

        const validadeCell = row.insertCell(2);
        validadeCell.textContent = item.validade;

        // Adiciona botões de ação
        const actionCell = row.insertCell(3);
        actionCell.innerHTML = `
            <button onclick="editarItem(${index})">Editar</button>
            <button onclick="deletarItem(${index})">Excluir</button>
        `;
    });
}

// Função para adicionar um novo item
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoItem = {
        nome: nomeInput.value,
        quantidade: quantidadeInput.value,
        validade: validadeInput.value
    };

    // Adiciona o novo item ao array
    estoque.push(novoItem);
    
    // Limpa o formulário
    form.reset();

    // Re-renderiza a tabela
    renderEstoque();
});

// Função para deletar um item
function deletarItem(index) {
    estoque.splice(index, 1); // Remove o item pelo índice
    renderEstoque(); // Re-renderiza a tabela
}

// Função para editar um item
function editarItem(index) {
    const item = estoque[index];

    // Preenche o formulário com os dados do item
    nomeInput.value = item.nome;
    quantidadeInput.value = item.quantidade;
    validadeInput.value = item.validade;

    // Atualiza o item no array após a edição
    form.onsubmit = function(event) {
        event.preventDefault();

        // Atualiza o item no array
        item.nome = nomeInput.value;
        item.quantidade = quantidadeInput.value;
        item.validade = validadeInput.value;

        // Reseta o formulário e as ações do submit
        form.reset();
        form.onsubmit = adicionarItem;

        // Re-renderiza a tabela
        renderEstoque();
    };
}

// Função para adicionar novos itens após edição
function adicionarItem(event) {
    event.preventDefault();
    const novoItem = {
        nome: nomeInput.value,
        quantidade: quantidadeInput.value,
        validade: validadeInput.value
    };

    estoque.push(novoItem);
    form.reset();
    renderEstoque();
}