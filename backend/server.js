const express = require('express');
const cors = require('cors');
const app = express();
const recebimentosRouter = require('./rotas/recebimentos');

app.use(cors());
app.use(express.json());

app.use('/api', recebimentosRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
