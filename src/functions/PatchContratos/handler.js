'use strict'
const { returnSuccess, returnError } = require('../../util/responseWrapper')
const AWS = require('aws-sdk')
const { QueryContractError, UpdateContractError } = require('../../errors/businessErrors')

module.exports.handle = async (event, context, callback) => {
    try {
        console.log("Event received: ", event)
        console.log("Context received: ", context)
        const { body } = event
        let contract = await getContract(body)

        if (body.confirma) {
            contract.STATUS = 'ABERTO'
            // @TODO: gerar parcelas
            await update(contract)
        } else {
            contract.STATUS = 'CANCELADO'
            await update(contract)
            // @TODO: remover arquivo do S3
        }
    
        const mensagem = body.confirma ? "Contrato aceito" : "Contrato não aceito"
    
        const result = { mensagem }
        return returnSuccess(result, context, callback)
    } catch (err) {
        return returnError(err, context, callback)
    }
}

async function getContract(body) {
    try {
        const params = {
            TableName: process.env.CONTRACT_TABLE,
            KeyConditionExpression: 'PK = :hashkey and SK = :rangekey',
            ExpressionAttributeValues: {
                ':hashkey': `CLIENTE#${body.cpfCnpj}`,
                ':rangekey': `CONTRATO#${body.idContrato}`
            }
        }
        const docClient = new AWS.DynamoDB.DocumentClient()
        console.info('Consultando contrato: ', params)
        const result = await docClient.query(params).promise()
        console.info('Resultado da Query: ', result)
        return result.Items[0]  
    } catch (err) {
        console.error('Erro ao consultar contrato: ', err)
        throw new QueryContractError()
    }
}

async function update(contract) { 
    try {
      const params = {
        TableName: process.env.CONTRACT_TABLE,
        Item: contract
      }
      const docClient = new AWS.DynamoDB.DocumentClient()
      console.info('Atualizando contrato: ', params)
      const result = await docClient.put(params).promise()
      console.info('Contrato atualizado: ', result)
      return result  
    } catch (err) {
      console.error('Erro ao atualizar o contrato: ', err)
      throw new UpdateContractError()
    }
  }