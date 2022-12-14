'use strict'
const { returnSuccess } = require('../../util/responseWrapper')

module.exports.handle = async (event, context, callback) => {
    console.log("Event received: ", event)
    console.log("Context received: ", context)

    const { path, query } = event

    const contratos = await findContractByStatus(path.cpfCnpj, query.status)
    return returnSuccess({ contratos }, context, callback)
}

// MOCK
const mockBase = [
    {
        id: "abc123",
        status: "PENDENTE_CONFIRMACAO",
        linkDocumento: "http://qlqrcoisa",
        cliente: {
            nome: "Fulano",
            cpfCnpj: "77772101000105",
            endereco: "string",
            celular: "string"
        },
        processo: {
            titulo: "string"
        },
        pagamentos: [{
            id: "string",
            status: "PENDENTE",
            valorTotal: "string",
            valorParcela: "string",
            quantidadeParcelas: 0,
            diaVencimento: 0,
            dataDoCombinado: "2022-12-14"
        }]
    },
    {
        id: "def456",
        status: "ABERTO",
        linkDocumento: "http://qlqrcoisa",
        cliente: {
            nome: "Cicrano",
            cpfCnpj: "95048722043",
            endereco: "string",
            celular: "string"
        },
        processo: {
            titulo: "string"
        },
        pagamentos: [{
            id: "string",
            status: "PENDENTE",
            valorTotal: "string",
            valorParcela: "string",
            quantidadeParcelas: 0,
            diaVencimento: 0,
            dataDoCombinado: "2022-12-14"
        }]
    },
    {
        id: "ghi789",
        status: "ATRASADO",
        linkDocumento: "http://qlqrcoisa",
        cliente: {
            nome: "Cicrano",
            cpfCnpj: "95048722043",
            endereco: "string",
            celular: "string"
        },
        processo: {
            titulo: "string"
        },
        pagamentos: [{
            id: "string",
            status: "PENDENTE",
            valorTotal: "string",
            valorParcela: "string",
            quantidadeParcelas: 0,
            diaVencimento: 0,
            dataDoCombinado: "2022-12-14"
        }]
    }
]

async function findContractByStatus(cpfCnpj, status) {
    const contractsByCpfCnpj = mockBase.filter((contract) => { return contract.cliente.cpfCnpj == cpfCnpj })
    if (status) {
        return contractsByCpfCnpj.filter((contract) => { return contract.status == status })
    }
    return contractsByCpfCnpj
}
