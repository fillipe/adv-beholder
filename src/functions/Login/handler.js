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

    const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: process.env.userPoolId,
        ClientId: process.env.userPoolClientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }

    try {
        const response = await cognito.adminInitiateAuth(params).promise()
    
        const result = { token: response.AuthenticationResult.IdToken }
        return returnSuccess(result, context, callback)
    } catch (err) {
        const error = { status: 401, code: 'LOGIN_NOT_AUTHORIZED', title: 'Erro no login', detail: 'Login não autorizado.'}
        return returnError(error, context, callback)
    }
}
