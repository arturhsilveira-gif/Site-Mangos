// BUSCAR
function buscar() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const lista = document.getElementById('listaMangas');
    lista.innerHTML = '';
    
    const resultados = mangas.filter(m => 
        m.nome.toLowerCase().includes(termo) || 
        m.autor.toLowerCase().includes(termo)
    ); // LISTA DE MANGÁS
const mangas = [
    { nome: "One Piece", preco: 29.90, autor: "Eiichiro Oda" },
    { nome: "Naruto", preco: 24.90, autor: "Masashi Kishimoto" },
    { nome: "Demon Slayer", preco: 34.90, autor: "Koyoharu Gotouge" },
    { nome: "Attack on Titan", preco: 32.90, autor: "Hajime Isayama" }
];

let carrinho = 0;

// MOSTRAR MANGÁS
function mostrarMangas() {
    const lista = document.getElementById('listaMangas');
    lista.innerHTML = '';
    
    mangas.forEach((manga, index) => {
        lista.innerHTML += `
            <div class="card">
                <h3>${manga.nome}</h3>
                <p>${manga.autor}</p>
                <p><strong>R$ ${manga.preco.toFixed(2)}</strong></p>
                <button onclick="comprar(${index})">Comprar</button>
            </div>
        `;
    });
}

// COMPRAR
function comprar(index) {
    carrinho++;
    document.getElementById('carrinhoContador').textContent = carrinho;
    alert(`${mangas[index].nome} adicionado!`);

};
    
    if (resultados.length === 0) {
        lista.innerHTML = '<p style="color: #e6b17e;">Nenhum mangá encontrado.</p>';
        return;
    }
    
    resultados.forEach(m => {
        lista.innerHTML += `
            <div class="card">
                <h3>${m.nome}</h3>
                <p>${m.autor}</p>
                <p><strong>R$ ${m.preco.toFixed(2)}</strong></p>
                <button onclick="alert('${m.nome} adicionado!')">Comprar</button>
            </div>
        `;
    });
}

// VER CARRINHO (quando clicar no ícone)
document.querySelector('.btn-cart').onclick = function(e) {
    e.preventDefault();
    if (carrinho === 0) {
        alert('Carrinho vazio!');
    } else {
        alert(`Você tem ${carrinho} itens no carrinho.`);
    }
};

// BUSCAR COM ENTER
document.getElementById('busca').onkeypress = function(e) {
    if (e.key === 'Enter') buscar();
};

// INICIAR
mostrarMangas();

