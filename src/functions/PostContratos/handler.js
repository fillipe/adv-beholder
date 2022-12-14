'use strict'
const getUuid = require('uuid-by-string')
const { returnSuccess } = require('../../util/responseWrapper')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)
    const { body } = event

    const result = {
        idContrato: getUuid(body.cliente.cpfCnpj + body.processo.titulo),
        linkDocumento: "http://qlqrcoisa.com"
    }
    return returnSuccess(result, context, callback)
}
