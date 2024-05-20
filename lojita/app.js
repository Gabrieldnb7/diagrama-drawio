const express = require('express');
const app = express();
const path = require('path');

// Defina o diretório onde estão suas páginas HTML
const publicDirectoryPath = path.join(__dirname, './public');

// Defina a pasta pública para servir arquivos estáticos
app.use(express.static(publicDirectoryPath));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'catalogo.html'));
});

// Rota para outra página HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'login.html'));
});

// Rota para outra página HTML
app.get('/register', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'register.html'));
});

app.get('/produto/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'produto.html'));
});

// Inicie o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
