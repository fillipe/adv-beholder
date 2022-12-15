'use strict'

class SignupNotAuthorizedError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.status = 401
        this.code = 'SIGNUP_NOT_AUTHORIZED'
        this.title = 'Erro ao criar usuário'
        this.detail = 'Não autorizado a criar usuário. Código incorreto.'
    }

}

class LoginNotAuthorizedError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.status = 401
        this.code = 'LOGIN_NOT_AUTHORIZED'
        this.title = 'Erro no login'
        this.detail = 'Login não autorizado.'
    }

}

module.exports = { SignupNotAuthorizedError, LoginNotAuthorizedError }