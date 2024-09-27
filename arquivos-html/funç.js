document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const validade = document.getElementById('validade').value;

    if (nome === '' || quantidade === '' || validade === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const tableBody = document.querySelector('#estoqueTable tbody');
    const newRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = nome;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantidade;

    const validityCell = document.createElement('td');
    validityCell.textContent = validade;

    newRow.appendChild(nameCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(validityCell);

    tableBody.appendChild(newRow);

    const today = new Date();
    const itemValidityDate = new Date(validade);
    const diffTime = itemValidityDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
        alert(`Atenção: O item "${nome}" está próximo da validade. Restam ${diffDays} dias.`);
    }

    if (quantidade <= 10) {
        alert(`Atenção: O estoque do item "${nome}" está baixo. Restam apenas ${quantidade} unidades.`);
    }

    document.getElementById('addItemForm').reset();
});
