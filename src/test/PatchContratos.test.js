'use strict';

const mochaPlugin = require('serverless-mocha-plugin')
const assert = mochaPlugin.chai.assert
const handler = require('../functions/PatchContratos/handler')

const context = { awsRequestId: 'test' }

describe('Teste Patch Contratos', () => {
    
    it('Teste 1 - Aceite contrato OK', async () => {
        const event = { "body": { "confirma": true } }
        const resultTest = {
            "requestId": "test",
            "data": {
              "mensagem": "Contrato aceito"
            }
        }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest)
        })
    })
    
    it('Teste 2 - Aceite contrato NOK', async () => {
        const event = { "body": { "confirma": false } }
        const resultTest = {
            "requestId": "test",
            "data": {
              "mensagem": "Contrato não aceito"
            }
        }
        await handler.handle(event, context, (error, result) => {
            assert.deepEqual(result, resultTest)
        })
    })

})
