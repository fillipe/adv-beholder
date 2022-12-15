'use strict'
var AWS = require("aws-sdk")
const cognito = new AWS.CognitoIdentityServiceProvider()
const { returnSuccess, returnError } = require('../../util/responseWrapper')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)

    const { body } = event
    const email = body.email
    const password = body.password

    // Mudar validação por código, paliativo para evitar criação de usuários descontrolada
    if (body.code != 'KLAPAUCIUS') {
        const err = { status: 401, code: 'SIGNUP_NOT_AUTHORIZED', title: 'Erro ao criar usuário', detail: 'Não autorizado a criar usuário. Código incorreto.'}
        return returnError(err, context, callback)
    }

    const params = {
        UserPoolId: process.env.userPoolId,
        Username: email,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'email_verified', Value: 'true' }
        ],
        MessageAction: 'SUPPRESS'
    }
    const response = await cognito.adminCreateUser(params).promise()

    if (response.User) {
        const paramsForSetPass = {
            Password: password,
            UserPoolId: process.env.userPoolId,
            Username: email,
            Permanent: true
        }
        await cognito.adminSetUserPassword(paramsForSetPass).promise()
    }

    const result = { mensagem: "Usuário registrado com sucesso." }
    return returnSuccess(result, context, callback)
}
