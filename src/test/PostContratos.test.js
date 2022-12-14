'use strict';

const mochaPlugin = require('serverless-mocha-plugin')
const assert = mochaPlugin.chai.assert
const handler = require('../functions/PostContratos/handler')

const context = { awsRequestId: 'test' }
const event = {
    "body": {
        "cliente": {
          "nome": "string",
          "cpfCnpj": "string",
          "endereco": "string",
          "celular": "string"
        },
        "processo": {
          "titulo": "string"
        },
        "pagamento": {
          "id": "string",
          "valorTotal": "string",
          "valorParcela": "string",
          "quantidadeParcelas": 0,
          "diaVencimento": 0,
          "dataDoCombinado": "2022-12-13"
        }
    }
}

describe('Teste Post Contratos', () => {
    it('Teste 1 - Cria contrato Sucesso', async () => {
        const resultTest1 = {
            "requestId": "test",
            "data": {
              "idContrato": "9d382b7f-b7cb-5d7f-ab71-d1604ab77a35",
              "linkDocumento": "http://qlqrcoisa.com"
            }
        }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest1)
        })
    })

})
