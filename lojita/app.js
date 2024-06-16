import Express from "express";
import { connection } from "./db.js";

import path from "path";
import { fileURLToPath } from "url";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { cartRouter } from "./routes/cart.js";

import 'dotenv/config';

const app = Express();


// Conectando ao banco de dados
connection.authenticate()
    .then(() => console.log("Database has been connected successfully."))
    .catch((err) => console.log("Unable to connect to database: ", err))

// Caminho para o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

app.use(Express.static(publicDir)); // Pasta para arquivos estáticos
app.use(Express.json()); // Configurando Express para ler JSON

// Rotas de paginação
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDir, 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(publicDir, 'register.html'));
});
app.get('/produto/:id', (req, res) => {
    res.sendFile(path.join(publicDir, 'produto.html'));
});
app.get('/catalogo', (req, res) => {
    res.sendFile(path.join(publicDir, 'catalogo.html'));
});
app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(publicDir, 'carrinho.html'));
});
app.get('/masculino', (req, res) => {
    res.sendFile(path.join(publicDir, 'masculino.html'));
});
app.get('/feminino', (req, res) => {
    res.sendFile(path.join(publicDir, 'feminino.html'));
});

// Rotas da API
app.use("/auth", authRouter);
app.use("/user/", userRouter);
app.use("/cart/", cartRouter);

// Iniciando o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
