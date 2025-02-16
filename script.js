// Preços unitários baseados no arquivo fornecido
const precos = {
    "KIT-A": {
        "2 Anos": 42.20,
        "3 Anos": 96.00,
        "4 Anos": 99.80,
        "5 Anos": 107.50,
        "1º Ano": 124.30,
        "2º Ano": 127.60,
        "3º Ano": 151.20,
        "4º Ano": 171.30,
        "5º Ano": 184.80,
        "6º Ano": 264.00,
        "7º Ano": 267.50,
        "8º Ano": 295.60,
        "9º Ano": 337.90,
    },
    "KIT-B": {
        "4 Anos": 21.60,
        "5 Anos": 38.80,
        "1º Ano": 56.10,
        "2º Ano": 56.10,
        "3º Ano": 60.40,
        "4º Ano": 64.80,
        "5º Ano": 64.80,
        "6º Ano": 30.20,
        "7º Ano": 30.20,
        "8º Ano": 30.20,
        "9º Ano": 30.20,
    },
    "KIT-C": {
        "2 Anos": 12.10,
        "3 Anos": 26.80,
        "4 Anos": 30.70,
        "5 Anos": 34.50,
        "1º Ano": 67.20,
        "2º Ano": 67.20,
        "3º Ano": 73.90,
        "4º Ano": 77.20,
        "5º Ano": 84.00,
        "6º Ano": 38.70,
        "7º Ano": 61.60,
        "8º Ano": 67.70,
        "9º Ano": 54.50,
    },
    "ATIV. DE DESENHO": {
        "2 Anos": 36.40,
        "3 Anos": 36.40,
    },
};

let valorFinal = 0;

function adicionarItem() {
    const disciplina = document.getElementById("disciplina").value;
    const serie = document.getElementById("serie").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!disciplina || !serie || isNaN(quantidade) || quantidade <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const precoUnitario = precos[disciplina]?.[serie];
    if (!precoUnitario) {
        alert("Combinação de Disciplina e Série inválida.");
        return;
    }

    const valorTotal = quantidade * precoUnitario;
    valorFinal += valorTotal;

    const tabela = document.querySelector("#resumoPedido tbody");
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${disciplina}</td>
        <td>${serie}</td>
        <td>${quantidade}</td>
        <td>${precoUnitario.toFixed(2)}</td>
        <td>${valorTotal.toFixed(2)}</td>
    `;

    tabela.appendChild(linha);

    document.getElementById("valorFinal").textContent = valorFinal.toFixed(2);

    // Limpar campos
    document.getElementById("disciplina").value = "";
    document.getElementById("serie").value = "";
    document.getElementById("quantidade").value = "";
}

function enviarParaWhatsApp() {
    const tabela = document.querySelector("#resumoPedido tbody");
    if (tabela.rows.length === 0) {
        alert("Adicione itens ao pedido antes de enviar.");
        return;
    }

    const nomeCliente = document.getElementById("nomeCliente").value || "Cliente";
    const telefoneCliente = document.getElementById("telefoneCliente").value || "Não informado";

    let mensagem = `PEDIDO DE LIVROS\n\nNome do Cliente: ${nomeCliente}\nTelefone: ${telefoneCliente}\n\nItens do Pedido:\n`;

    const linhas = tabela.rows;
    for (let i = 0; i < linhas.length; i++) {
        const disciplina = linhas[i].cells[0].innerText;
        const serie = linhas[i].cells[1].innerText;
        const quantidade = linhas[i].cells[2].innerText;
        const valorUnitario = linhas[i].cells[3].innerText;
        const valorTotal = linhas[i].cells[4].innerText;

        mensagem += `${disciplina} - ${serie} - Qtd: ${quantidade} - Valor Unitário: R$${valorUnitario} - Valor Total: R$${valorTotal}\n`;
    }

    const valorFinal = document.getElementById("valorFinal").innerText;
    mensagem += `\nValor Final do Pedido: R$${valorFinal}`;

    console.log("Mensagem gerada:", mensagem); // Depuração

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroTelefone = "5599988168402"; // Substitua pelo seu número

    const linkWhatsApp = `https://wa.me/5599988168402?text=Olá,%20segue%20meu%20pedido%20de%20livros`;
    console.log("Link do WhatsApp:", linkWhatsApp); // Depuração

    window.open(linkWhatsApp, "_blank");
}