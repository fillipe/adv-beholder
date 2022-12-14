'use strict';

const mochaPlugin = require('serverless-mocha-plugin')
const assert = mochaPlugin.chai.assert
const handler = require('../functions/GetContratos/handler')

const context = {
    awsRequestId: 'test'
}

describe('Teste Get Contratos', () => {

    it('Teste 1 - Get contrato por cnpj e status PENDENTE_CONFIRMACAO encontrado', async () => {
        const event = { "path": { "cpfCnpj": "77772101000105" }, "query": { "status": "PENDENTE_CONFIRMACAO" } }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest1())
        })
    })

    it('Teste 2 - Get contrato por cpf e status ABERTO encontrado', async () => {
        const event = { "path": { "cpfCnpj": "95048722043" }, "query": { "status": "ABERTO" } }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest2())
        })
    })

    it('Teste 3 - Get contratos apenas por cpf encontrados', async () => {
        const event = { "path": { "cpfCnpj": "95048722043" }, "query": { } }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest3())
        })
    })

    it('Teste 4 - Get contratos não encontrados', async () => {
        const event = { "path": { "cpfCnpj": "3333333333" }, "query": { } }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest4())
        })
    })

})

function resultTest1() {
    return {
        "requestId": "test",
        "data": {
            "contratos": [{
                "id": "abc123",
                "status": "PENDENTE_CONFIRMACAO",
                "linkDocumento": "http://qlqrcoisa",
                "cliente": {
                    "nome": "Fulano",
                    "cpfCnpj": "77772101000105",
                    "endereco": "string",
                    "celular": "string"
                },
                "processo": {
                    "titulo": "string"
                },
                "pagamentos": [{
                    "id": "string",
                    "status": "PENDENTE",
                    "valorTotal": "string",
                    "valorParcela": "string",
                    "quantidadeParcelas": 0,
                    "diaVencimento": 0,
                    "dataDoCombinado": "2022-12-14"
                }]
            }]
        }
    }
}

function resultTest2() {
    return {
        "requestId": "test",
        "data": {
            "contratos": [{
                "id": "def456",
                "status": "ABERTO",
                "linkDocumento": "http://qlqrcoisa",
                "cliente": {
                    "nome": "Cicrano",
                    "cpfCnpj": "95048722043",
                    "endereco": "string",
                    "celular": "string"
                },
                "processo": {
                    "titulo": "string"
                },
                "pagamentos": [{
                    "id": "string",
                    "status": "PENDENTE",
                    "valorTotal": "string",
                    "valorParcela": "string",
                    "quantidadeParcelas": 0,
                    "diaVencimento": 0,
                    "dataDoCombinado": "2022-12-14"
                }]
            }]
        }
    }
}

function resultTest3() {
    return {
        "requestId": "test",
        "data": {
            "contratos": [{
                "id": "def456",
                "status": "ABERTO",
                "linkDocumento": "http://qlqrcoisa",
                "cliente": {
                    "nome": "Cicrano",
                    "cpfCnpj": "95048722043",
                    "endereco": "string",
                    "celular": "string"
                },
                "processo": {
                    "titulo": "string"
                },
                "pagamentos": [{
                    "id": "string",
                    "status": "PENDENTE",
                    "valorTotal": "string",
                    "valorParcela": "string",
                    "quantidadeParcelas": 0,
                    "diaVencimento": 0,
                    "dataDoCombinado": "2022-12-14"
                }]
            },
            {
                "id": "ghi789",
                "status": "ATRASADO",
                "linkDocumento": "http://qlqrcoisa",
                "cliente": {
                    "nome": "Cicrano",
                    "cpfCnpj": "95048722043",
                    "endereco": "string",
                    "celular": "string"
                },
                "processo": {
                    "titulo": "string"
                },
                "pagamentos": [{
                    "id": "string",
                    "status": "PENDENTE",
                    "valorTotal": "string",
                    "valorParcela": "string",
                    "quantidadeParcelas": 0,
                    "diaVencimento": 0,
                    "dataDoCombinado": "2022-12-14"
                }]
            }]
        }
    }
}

function resultTest4() {
    return {
        "requestId": "test",
        "data": {
            "contratos": []
        }
    }
}