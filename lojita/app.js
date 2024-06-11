const express = require('express');
const app = express();
const path = require('path');

// Defina o diretório onde estão suas páginas HTML
const publicDirectoryPath = path.join(__dirname, '/public');

// Defina a pasta pública para servir arquivos estáticos
app.use(express.static(publicDirectoryPath));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Rota para outra página HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'login.html'));
});

// Rota para outra página HTML
app.get('/register', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'register.html'));
});

app.get('/produto/:id', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'produto.html'));
});

app.get('/catalogo', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'catalogo.html'))
})

app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'carrinho.html'))
})
app.get('/masculino', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'masculino.html'))
})
app.get('/feminino', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'feminino.html'))
})

// Inicie o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
