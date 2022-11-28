'use strict';

const mochaPlugin = require('serverless-mocha-plugin')
const assert = mochaPlugin.chai.assert
const handler = require('../functions/GetTeste/handler')

const context = { awsRequestId: 'test' }
const event = {}


describe('GET TESTE', () => {
    it('TESTE 1', async () => {
        const result = await handler.handle(event, context)
        assert.deepEqual(result, "TESTE FUNCIONANDO FILL!")
    })

})
