const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Pasta uploads
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

// Receber comprovativo
app.post('/enviar-comprovativo', upload.single('comprovativo'), (req, res) => {
    const { nome, telefone, pacote } = req.body;
    const arquivo = req.file.filename;

    // Salvar pedido
    let pedidos = [];
    if(fs.existsSync('pedidos.json')){
        pedidos = JSON.parse(fs.readFileSync('pedidos.json'));
    }
    pedidos.push({ nome, telefone, pacote, arquivo, status: 'pendente' });
    fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2));

    res.send('Comprovativo recebido! Aguarde confirmação.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
