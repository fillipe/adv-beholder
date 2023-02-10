'use strict'
const getUuid = require('uuid-by-string')
const { returnSuccess, returnError } = require('../../util/responseWrapper')
const AWS = require('aws-sdk')
const { InsertContractError } = require('../../errors/businessErrors')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)
    const { body } = event

    try {
      const documentId = getUuid(body.cliente.cpfCnpj + body.processo.titulo)
      await insert(documentId, body)

      // @TODO: subir arquivo S3
  
      const result = {
          idContrato: documentId,
          linkDocumento: "http://qlqrcoisa.com"
      }
      return returnSuccess(result, context, callback)
    } catch (err) {
      console.error("Erro ao inserir: ", err)
      return returnError(err, context, callback)
    }
}

async function insert(documentId, body) { 
  try {
    const params = {
      TableName: process.env.CONTRACT_TABLE,
      Item: {
        PK: `CLIENTE#${body.cliente.cpfCnpj}`,
        SK: `CONTRATO#${documentId}`,
        PAGAMENTO: body.pagamento,
        STATUS: 'PENDENTE_CONFIRMACAO'
      }
    }
    const docClient = new AWS.DynamoDB.DocumentClient()
    console.info('Inserindo contrato: ', params)
    const result = await docClient.put(params).promise()
    console.info('Contrato inserido: ', result)
    return result  
  } catch (err) {
    console.error('Erro ao inserir o contrato: ', err)
    throw new InsertContractError()
  }
}
