'use strict';

const mochaPlugin = require('serverless-mocha-plugin')
const assert = mochaPlugin.chai.assert
const handler = require('../functions/DeleteContratos/handler')

const context = { awsRequestId: 'test' }

describe('Teste Delete Contratos', () => {
    
    it('Teste 1 - Delete contrato OK', async () => {
        const event = { "path": { "idContrato": "abc123"} }
        const resultTest1 = {
            "requestId": "test",
            "data": {
              "mensagem": "Contrato abc123 cancelado"
            }
        }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest1)
        })
    })

})
