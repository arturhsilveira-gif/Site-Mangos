// LISTA DE MANGÁS
const mangas = [
    { nome: "One Piece", preco: 29.90, autor: "Eiichiro Oda" },
    { nome: "Naruto", preco: 24.90, autor: "Masashi Kishimoto" },
    { nome: "Demon Slayer", preco: 34.90, autor: "Koyoharu Gotouge" },
    { nome: "Attack on Titan", preco: 32.90, autor: "Hajime Isayama" }
];

let carrinho = 0;

// MOSTRAR TODOS OS MANGÁS
function mostrarMangas(listaParaExibir = mangas) {
    const lista = document.getElementById('listaMangas');
    if (!lista) return; // Evita erro se o elemento não existir na página atual
    
    lista.innerHTML = '';

    if (listaParaExibir.length === 0) {
        lista.innerHTML = '<p style="color: #e6b17e;">Nenhum mangá encontrado.</p>';
        return;
    }

    listaParaExibir.forEach((manga, index) => {
        lista.innerHTML += `
            <div class="card">
                <h3>${manga.nome}</h3>
                <p>${manga.autor}</p>
                <p><strong>R$ ${manga.preco.toFixed(2)}</strong></p>
                <button onclick="comprar('${manga.nome}')">Comprar</button>
            </div>
        `;
    });
}

// BUSCAR MANGÁS
function pesquisa() {
    const campoPesquisa = document.getElementById('campoPesquisa');
    if (!campoPesquisa) return;

    const termo = campoPesquisa.value.toLowerCase();
    
    const resultados = mangas.filter(m => 
        m.nome.toLowerCase().includes(termo) || 
        m.autor.toLowerCase().includes(termo)
    );

    mostrarMangas(resultados);
}

// COMPRAR
function comprar(nomeManga) {
    carrinho++;
    
    const contador = document.getElementById('carrinhoContador');
    if (contador) {
        contador.textContent = carrinho;
    }

    alert(`${nomeManga} adicionado ao carrinho!`);
}

// CONFIGURAR EVENTOS QUANDO A PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', () => {
    // Exibe a lista inicial
    mostrarMangas();

    // Evento no ícone do carrinho
    const btnCart = document.querySelector('.btn-cart');
    if (btnCart) {
        btnCart.onclick = function(e) {
            e.preventDefault();
            if (carrinho === 0) {
                alert('Carrinho vazio!');
            } else {
                alert(`Você tem ${carrinho} item(ns) no carrinho.`);
            }
        };
    }

    // Evento de buscar ao pressionar "Enter"
    const campoPesquisa = document.getElementById('campoPesquisa');
    if (campoPesquisa) {
        campoPesquisa.onkeypress = function(e) {
            if (e.key === 'Enter') pesquisa();
        };
    }
});