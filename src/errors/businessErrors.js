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


class InsertContractError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.status = 400
        this.code = 'PERSIST_CONTRACT_ERROR'
        this.title = 'Erro ao persistir dados de contrato'
        this.detail = 'Algum erro ocorreu ao persistir os dados de contrato'
    }

}


class QueryContractError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.status = 400
        this.code = 'QUERY_CONTRACT_ERROR'
        this.title = 'Erro ao consultar dados de contrato'
        this.detail = 'Algum erro ocorreu durante a consulta dos dados de contrato'
    }

}

class UpdateContractError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.status = 400
        this.code = 'UPDATE_CONTRACT_ERROR'
        this.title = 'Erro ao atualizar dados de contrato'
        this.detail = 'Algum erro ocorreu durante a atualização dos dados de contrato'
    }

}

module.exports = { SignupNotAuthorizedError, LoginNotAuthorizedError, InsertContractError, QueryContractError, UpdateContractError }