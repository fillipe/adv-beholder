'use strict'
const { returnSuccess } = require('../../util/responseWrapper')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)
    const { body } = event

    const mensagem = body.confirma ? "Contrato aceito" : "Contrato não aceito"

    const result = { mensagem }
    return returnSuccess(result, context, callback)
}
