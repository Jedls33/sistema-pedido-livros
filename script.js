function enviarParaWhatsApp() {
    // Verificar se há itens no pedido
    const tabela = document.querySelector("#resumoPedido tbody");
    if (tabela.rows.length === 0) {
        alert("Adicione itens ao pedido antes de enviar.");
        return;
    }

    // Nome do cliente
    const nomeCliente = document.getElementById("nomeCliente").value || "Cliente";

    // Número de telefone do cliente
    const telefoneCliente = document.getElementById("telefoneCliente").value || "Não informado";

    // Montar a mensagem
    let mensagem = `PEDIDO DE LIVROS\n\nNome do Cliente: ${nomeCliente}\nTelefone: ${telefoneCliente}\n\nItens do Pedido:\n`;

    // Adicionar cada item da tabela à mensagem
    const linhas = tabela.rows;
    for (let i = 0; i < linhas.length; i++) {
        const disciplina = linhas[i].cells[0].innerText;
        const serie = linhas[i].cells[1].innerText;
        const quantidade = linhas[i].cells[2].innerText;
        const valorUnitario = linhas[i].cells[3].innerText;
        const valorTotal = linhas[i].cells[4].innerText;

        mensagem += `${disciplina} - ${serie} - Qtd: ${quantidade} - Valor Unitário: R$${valorUnitario} - Valor Total: R$${valorTotal}\n`;
    }

    // Adicionar o valor final do pedido
    const valorFinal = document.getElementById("valorFinal").innerText;
    mensagem += `\nValor Final do Pedido: R$${valorFinal}`;

    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Número de telefone (substitua pelo seu número)
    const numeroTelefone = "5599988168402"; // Exemplo: +55 85 99999-9999

    // Criar o link do WhatsApp
    const linkWhatsApp = `https://wa.me/5599988168402?text=Olá,%20segue%20meu%20pedido%20de%20livros}`;

    // Abrir o link no navegador
    window.open(linkWhatsApp, "_blank");
}