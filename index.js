// código para acessar
const codigo = "mel";

document.getElementById("checkcodigo").addEventListener("click", () => {
    const inputcodigo = document.getElementById("codigo").value;

    if (inputcodigo === codigo) {
        // Se a senha estiver correta, mostra o formulário e oculta a autenticação
        document.getElementById("auth").style.display = "none";
        document.getElementById("form").style.display = "block";
    } else {
        // Mostra mensagem de erro
        const authMessage = document.getElementById("authMessage");
        authMessage.style.display = "block";
        setTimeout(() => authMessage.style.display = "none", 3000); // Oculta a mensagem após 3 segundos
    }
});

// formulário
document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const modelo = document.getElementById('modelo').value;
    const designacao = document.getElementById('designacao').value;
    const sensor = document.getElementById('sensor').value;
    const pressao = document.getElementById('pressao').value;
    const corpo = document.getElementById('corpo').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;
    const valvula = document.getElementById('valvula').value;

    let frase = `${tipo}, ${modelo}, ${corpo}, ${pressao}, ${designacao}, ${sensor}, ${entrada}`;
    if (valvula !== "base" && valvula) {
        frase += `, ${valvula}`;
    }
    frase += `, ${saida}`;

    console.log("Frase enviada para o servidor:", frase);

    const resultado = document.getElementById('resultado');
    try {
        // Buscando o arquivo JSON diretamente do GitHub
        const response = await fetch('https://raw.githubusercontent.com/MelissaAepio/Teste/main/dados.json');
        const data = await response.json();
        console.log("Resposta do servidor:", data);

        // Procurar pelo código na lista de dados
        const itemEncontrado = data.find(item => item.frase === frase);

        if (itemEncontrado) {
            resultado.innerText = `Código: ${itemEncontrado.codigo}`;
        } else {
            resultado.innerText = 'Código não encontrado.';
        }
        resultado.classList.add('visible');

        // Exibir a frase concatenada
        const fraseEl = document.getElementById('frase');
        fraseEl.innerText = `Opções Selecionadas: ${frase}`;
        fraseEl.style.display = 'block';

    } catch (error) {
        resultado.innerText = 'Erro ao buscar os dados.';
        resultado.classList.add('visible');
        console.error("Erro:", error);
    }
});
