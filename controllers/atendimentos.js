const atendimentos = require('../models/atendimentos');

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        atendimentos.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimentos.listaId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const content = req.body;
        atendimentos.adiciona(content, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        atendimentos.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimentos.exclui(id, res);
    });
}