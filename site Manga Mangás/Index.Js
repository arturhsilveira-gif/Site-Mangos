
const CATALOGO = {
    'Kaiju N°8': {
        nome: "Kaiju N°8 Vol: 8",
        preco: 29.90,
        autor: "Naoya Matsumoto",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.29.04.png"
    },
    'Dan Da Dan': {
        nome: "Dan Da Dan Vol: 21",
        preco: 29.90,
        autor: "Yukinobu Tatsu",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.29.02.png"
    },
    'Blue Lock': {
        nome: "Blue Lock Vol: 36",
        preco: 29.90,
        autor: "Muneyuki Kaneshiro",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.29.01.png"
    },
    'Wind Breaker': {
        nome: "Wind Breaker Vol: 23",
        preco: 29.90,
        autor: "Satoru Nii",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.28.54.png"
    },
    'Gachiakuta': {
        nome: "Gachiakuta Vol: 16",
        preco: 29.90,
        autor: "Kei Urana",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.28.53(1).png"
    },
    'Diarios de uma apotecária': {
        nome: "Diarios de uma apotecária Vol: 16",
        preco: 29.90,
        autor: "Natsu Hyūga",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.28.53.png"
    },
    'Chainsaw Man': {
        nome: "Chainsaw Man Vol: 23",
        preco: 29.90,
        autor: "Tatsuki Fujimoto",
        img: "IMG/WhatsApp Image 2026-08-21 at 11.28.52.png"
    }
};


function lerCarrinho() {
    try {
        const dados = localStorage.getItem('meuCarrinhoManga');
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        return [];
    }
}

function salvarCarrinho(carrinho) {
    try {
        localStorage.setItem('meuCarrinhoManga', JSON.stringify(carrinho));
    } catch (e) {
        alert("Não foi possível salvar o carrinho. Verifique se o navegador permite localStorage nesta página (isso costuma falhar se o site for aberto direto como arquivo, em vez de por um servidor local).");
        console.error("Erro ao salvar carrinho:", e);
    }
}


function comprar(nomeBuscado) {
    if (!nomeBuscado) {
        alert("Erro: O botão não enviou o nome do produto.");
        return;
    }

   
    const chave = Object.keys(CATALOGO).find(
        k => k.toLowerCase().trim() === nomeBuscado.toLowerCase().trim()
    );

    if (!chave) {
        alert(`Erro: O produto "${nomeBuscado}" não existe no CATALOGO do index.js.`);
        return;
    }

    const itemInfo = CATALOGO[chave];
    let carrinho = lerCarrinho();
    const index = carrinho.findIndex(item => item.chave === chave);

    if (index !== -1) {
        carrinho[index].quantidade = (parseInt(carrinho[index].quantidade) || 0) + 1;
    } else {
        carrinho.push({
            chave: chave,
            nome: itemInfo.nome,
            preco: itemInfo.preco,
            autor: itemInfo.autor,
            img: itemInfo.img,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
    alert(`${itemInfo.nome} foi adicionado ao carrinho!`);
}

function removerItem(chave) {
    let carrinho = lerCarrinho();
    carrinho = carrinho.filter(item => item.chave !== chave);
    salvarCarrinho(carrinho);
    renderizarCarrinho();
}

function alterarQtd(chave, qtd) {
    let carrinho = lerCarrinho();
    const novaQtd = parseInt(qtd);

    if (isNaN(novaQtd) || novaQtd <= 0) {
        removerItem(chave);
        return;
    }

    const item = carrinho.find(i => i.chave === chave);
    if (item) {
        item.quantidade = novaQtd;
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

window.comprar = comprar;
window.removerItem = removerItem;
window.alterarQtd = alterarQtd;

// ==========================================
// 4. RENDERIZAÇÃO DA LISTA DE PRODUTOS (index.html / novidades.html)
// ==========================================
function renderizarProdutos(containerId, chaves) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (chaves.length === 0) {
        container.innerHTML = '<h2 style="color: white; padding: 20px;">Nenhum mangá encontrado.</h2>';
        return;
    }

    container.innerHTML = chaves.map(chave => {
        const item = CATALOGO[chave];
        return `
            <div class="mangas">
                <div class="manga_img">
                    <img src="${item.img}" alt="${item.nome}">
                </div>
                <div class="manga_info">
                    <h2>${item.nome}</h2>
                    <h2><b>Preço: R$ ${item.preco.toFixed(2).replace('.', ',')}</b></h2>
                    <p>Autor: ${item.autor}</p>
                    <button class="btn-add" onclick="comprar('${chave}')">Adicionar ao carrinho</button>
                </div>
            </div>
        `;
    }).join('');
}

function pesquisa() {
    const campo = document.getElementById('campoPesquisa');
    if (!campo) return;

    const termo = campo.value.toLowerCase().trim();
    const chaves = Object.keys(CATALOGO).filter(chave => {
        const item = CATALOGO[chave];
        return item.nome.toLowerCase().includes(termo) || item.autor.toLowerCase().includes(termo);
    });

    renderizarProdutos('listaTodos', chaves);
}
window.pesquisa = pesquisa;

// ==========================================
// 5. RENDERIZAÇÃO DO CARRINHO (carrinho.html)
// ==========================================
function renderizarCarrinho() {
    const listaContainer = document.getElementById('lista-carrinho');
    const totalContainer = document.querySelector('.total_info');

    if (!listaContainer || !totalContainer) return;

    const carrinho = lerCarrinho();

    if (carrinho.length === 0) {
        listaContainer.innerHTML = '<h2 style="color: white; padding: 20px;">Seu carrinho está vazio!</h2>';
        totalContainer.innerHTML = `
            <h1>Total: R$ 0,00</h1>
            <h2><b>Quantidade de Itens: 0</b></h2>
        `;
        return;
    }

    listaContainer.innerHTML = '';
    let subtotal = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        const qtd = parseInt(item.quantidade) || 1;
        const preco = parseFloat(item.preco) || 0;
        
        subtotal += preco * qtd;
        totalItens += qtd;

        listaContainer.innerHTML += `
            <div class="mangas_carrinho" style="width: 100%;">
                <div class="manga_img">
                    <img src="${item.img}" alt="${item.nome}">
                </div>
                <div class="manga_info">
                    <h2>${item.nome}</h2>
                    <h2><b>Preço: R$ ${preco.toFixed(2)}</b></h2>
                    <p>Autor: ${item.autor}</p>
                    <div class="acoes">
                        <input type="number" value="${qtd}" min="1" onchange="alterarQtd('${item.chave}', this.value)">
                        <button class="btn-remove" onclick="removerItem('${item.chave}')">Remover</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalContainer.innerHTML = `
        <h1>Total: R$ ${subtotal.toFixed(2)}</h1>
        <h2><b>Quantidade de Itens: ${totalItens}</b></h2>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();

    // Página "Todos os mangás" (todos.html)
    if (document.getElementById('listaTodos')) {
        renderizarProdutos('listaTodos', Object.keys(CATALOGO));
    }

    // Página de novidades (novidades.html)
    if (document.getElementById('listaNovidades')) {
        renderizarProdutos('listaNovidades', Object.keys(CATALOGO));
    }
});