const customExpress = require('./config/customExpress');
const conn = require('./infraestrutura/connection');
const Tabelas = require('./infraestrutura/tabelas');
const app = customExpress();

conn.connect( (erro) => {
    if(erro){
        console.log(erro);
    } else {
        console.log('Conectado com sucesso');
        Tabelas.init(conn);
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    }
})