const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota para buscar o código
app.post('/buscar-codigo', (req, res) => {
    const { frase } = req.body;

    // Log da frase recebida
    console.log("Frase recebida no servidor:", frase);

    // Carregar o arquivo JSON
    fs.readFile('./dados.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo de dados:", err); // Log do erro
            res.status(500).json({ error: 'Erro ao ler o arquivo de dados.' });
            return;
        }

        const jsonData = JSON.parse(data);
        console.log("Dados carregados do arquivo:", jsonData); // Log dos dados carregados

        const itemEncontrado = jsonData.find((item) => item.frase === frase);

        if (itemEncontrado) {
            console.log("Código encontrado:", itemEncontrado.codigo); // Log do código encontrado
            res.json({ codigo: itemEncontrado.codigo });
        } else {
            console.log("Código não encontrado para a frase:", frase); // Log quando não encontra o código
            res.status(404).json({ error: 'Código não encontrado.' });
        }
    });
});

// Servir o HTML no navegador
app.use(express.static('.'));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

