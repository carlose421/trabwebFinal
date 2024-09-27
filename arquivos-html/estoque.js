
let estoque = [];

const form = document.getElementById('addItemForm');
const nomeInput = document.getElementById('nome');
const quantidadeInput = document.getElementById('quantidade');
const validadeInput = document.getElementById('validade');
const tabelaEstoque = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];

function renderEstoque() {
    tabelaEstoque.innerHTML = ''; 

    estoque.forEach((item, index) => {
        const row = tabelaEstoque.insertRow();

        const nomeCell = row.insertCell(0);
        nomeCell.textContent = item.nome;

        const quantidadeCell = row.insertCell(1);
        quantidadeCell.textContent = item.quantidade;

        const validadeCell = row.insertCell(2);
        validadeCell.textContent = item.validade;

        const actionCell = row.insertCell(3);
        actionCell.innerHTML = `
            <button onclick="editarItem(${index})">Editar</button>
            <button onclick="deletarItem(${index})">Excluir</button>
        `;
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoItem = {
        nome: nomeInput.value,
        quantidade: quantidadeInput.value,
        validade: validadeInput.value
    };

    estoque.push(novoItem);
    
    form.reset();
    
    renderEstoque();
});

function deletarItem(index) {
    estoque.splice(index, 1); 
    renderEstoque(); 
}

function editarItem(index) {
    const item = estoque[index];

    nomeInput.value = item.nome;
    quantidadeInput.value = item.quantidade;
    validadeInput.value = item.validade;

    form.onsubmit = function(event) {
        event.preventDefault();

        item.nome = nomeInput.value;
        item.quantidade = quantidadeInput.value;
        item.validade = validadeInput.value;

        form.reset();
        form.onsubmit = adicionarItem;

        renderEstoque();
    };
}

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
