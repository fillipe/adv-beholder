'use strict'
const { returnSuccess } = require('../../util/responseWrapper')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)

    const { path } = event
    const mensagem = `Contrato ${path.idContrato} cancelado`

    const result = { mensagem }
    return returnSuccess(result, context, callback)
}
