const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/fornecedor', async (req, res) => {
  const { nome } = req.body;
  await db.query('INSERT INTO fornecedores (nome) VALUES ($1)', [nome]);
  res.send({ status: 'ok' });
});

router.post('/recebimento', async (req, res) => {
  const { fornecedor_id, valor, data, descricao } = req.body;
  await db.query(
    'INSERT INTO recebimentos (fornecedor_id, valor, data, descricao) VALUES ($1, $2, $3, $4)',
    [fornecedor_id, valor, data, descricao]
  );
  res.send({ status: 'ok' });
});

router.get('/recebimentos', async (_, res) => {
  const result = await db.query(`
    SELECT r.id, f.nome AS fornecedor, r.valor, r.data, r.descricao
    FROM recebimentos r
    JOIN fornecedores f ON f.id = r.fornecedor_id
  `);
  res.json(result.rows);
});

module.exports = router;
