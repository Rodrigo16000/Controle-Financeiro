let transacoes = JSON.parse(localStorage.getItem('minhas_transacoes')) || [];
const form = document.getElementById('form-transacao');
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const novaTransacao = {
        id: Math.random(), 
        nome: document.getElementById('desc').value,
        valor: parseFloat(document.getElementById('valor').value),
        tipo: document.getElementById('tipo').value
    };

    transacoes.push(novaTransacao);
    salvarESincronizar();
    form.reset(); 
});

function atualizarSaldo() {
    const totalEntradas = transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((acc, t) => acc + t.valor, 0);

    const totalSaidas = transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((acc, t) => acc + t.valor, 0);

    const saldoFinal = totalEntradas - totalSaidas;

    document.getElementById('saldo-valor').innerText = `R$ ${saldoFinal.toFixed(2)}`;
    document.getElementById('entradas-valor').innerText = `R$ ${totalEntradas.toFixed(2)}`;
    document.getElementById('saidas-valor').innerText = `R$ ${totalSaidas.toFixed(2)}`;
    
    document.getElementById('saldo-valor').style.color = saldoFinal < 0 ? "#e74c3c" : "#2ecc71";
}

function salvarESincronizar() {
    localStorage.setItem('minhas_transacoes', JSON.stringify(transacoes));
    atualizarSaldo();
}

atualizarSaldo();

function renderizarHistorico() {
    const lista = document.getElementById('historico-lista');
    
    
    lista.innerHTML = '';

    if (transacoes.length === 0) {
        lista.innerHTML = '<p class="empty-msg">Nenhuma transação cadastrada.</p>';
        return;
    }

    transacoes.forEach((transacao) => {
        const div = document.createElement('div');
        div.classList.add('historico-item');
        
        
        const sinal = transacao.tipo === 'entrada' ? '+' : '-';
        const classeValor = transacao.tipo === 'entrada' ? 'entrada' : 'saida';

        div.innerHTML = `
            <span>${transacao.nome}</span>
            <span class="${classeValor}">${sinal} R$ ${transacao.valor.toFixed(2)}</span>
        `;
        
        lista.appendChild(div);
    });
}
function salvarESincronizar() {
    localStorage.setItem('minhas_transacoes', JSON.stringify(transacoes));
    atualizarSaldo();
    renderizarHistorico(); 
}
renderizarHistorico();


const btnZerar = document.getElementById('btn-zerar');


btnZerar.addEventListener('click', () => {
    
    const confirmar = confirm("Tem certeza que deseja apagar todas as transações? Isso não pode ser desfeito.");

    if (confirmar) {
        
        transacoes = [];

        
        localStorage.removeItem('minhas_transacoes');

        
        atualizarSaldo();

        
        renderizarHistorico(); 
        
        alert("Conta zerada com sucesso!");
    }
});

function atualizarSaldo() {
    const totalEntradas = transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((acc, t) => acc + t.valor, 0);

    const totalSaidas = transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((acc, t) => acc + t.valor, 0);

    const saldoFinal = totalEntradas - totalSaidas;

    document.getElementById('saldo-valor').innerText = `R$ ${saldoFinal.toFixed(2)}`;
    document.getElementById('entradas-valor').innerText = `R$ ${totalEntradas.toFixed(2)}`;
    document.getElementById('saidas-valor').innerText = `R$ ${totalSaidas.toFixed(2)}`;
}