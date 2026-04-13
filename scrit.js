// MENU MOBILE
const menuBtn = document.getElementById("mobile-menu");
const menu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
});

// COTAÇÕES (USD, EUR, BTC)
async function carregarCotacoes() {
    try {
        let res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
        let data = await res.json();
        let conteudo = `
            <span>Dólar: R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}</span>
            <span>Euro: R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}</span>
            <span>Bitcoin: R$ ${parseFloat(data.BTCBRL.bid).toFixed(0)}</span>
        `;
        document.getElementById("cotacao-ticker").innerHTML = conteudo;
    } catch (erro) { console.error("Erro cotações:", erro); }
}

// CLIMA (Maringá)
async function carregarClima() {
    try {
        let res = await fetch("https://wttr.in/Maringa?format=j1");
        let data = await res.json();
        document.getElementById("cidade").innerText = "Maringá - PR";
        document.getElementById("temperatura").innerText = data.current_condition[0].temp_C + "°C";
        document.getElementById("condicao").innerText = data.current_condition[0].weatherDesc[0].value;
    } catch (erro) { console.error("Erro clima:", erro); }
}

// PAINEL ADMIN
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'A') { // Atalho Shift + A
        document.getElementById('admin-panel').style.display = 'block';
    }
});

function loginAdmin() {
    const pass = document.getElementById('admin-pass').value;
    if(pass === "1234") { // Senha padrão
        document.getElementById('admin-tools').style.display = 'block';
    } else { alert("Senha incorreta"); }
}

function fecharAdmin() {
    document.getElementById('admin-panel').style.display = 'none';
}

// INICIALIZAÇÃO
carregarCotacoes();
carregarClima();
setInterval(carregarCotacoes, 60000);



