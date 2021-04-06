const moment = require('moment');
const conn = require('../infraestrutura/connection');

class Atendimentos{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const valid_data = moment(data).isSameOrAfter(dataCriacao);
        const valid_cliente = atendimento.cliente.length >= 3;
        const validacoes = [
            {
                nome: 'data',
                valido: valid_data,
                mensagem: 'Data deve ser maior ou igual à data atual!'
            },
            {
                nome: 'cliente',
                valido: valid_cliente,
                mensagem: 'O nome do cliente deve possuir no mínimo três letras!'
            }
        ]
        
        const erros = validacoes.filter((campo) => {return !campo.valido});
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        } else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?';

            conn.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                } else{
                    res.status(201).json(atendimentoDatado);
                }
            });
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';
        conn.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json(resultados);
            }
        });
    }

    listaId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        conn.query(sql, (erro, resultados) => {
            const resultadoId = resultados[0];
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json(resultadoId);
            }
        });
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';
        conn.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json({...valores, id});
            }
        });
    }

    exclui(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';
        conn.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimentos;