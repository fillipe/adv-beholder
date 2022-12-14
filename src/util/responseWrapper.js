'use strict'

module.exports.returnSuccess = (responseObj, context, callback, event) => {
    let result
    if (responseObj.Items) {
        const prev = getPrev(event)
        const next = getNext(event)
        result = {
            meta: { page: { perPage: responseObj.Count } },
            links: {
                prev: event.requestPath + '?offset=' + prev.offset + '&limit=' + prev.limit,
                next: event.requestPath + '?offset=' + next.offset + '&limit=' + next.limit
            },
            requestId: context.awsRequestId,
            data: responseObj.Items
        }
    } else {
        result = { requestId: context.awsRequestId, data: responseObj }
    }
    callback(null, result)
}

module.exports.returnError = (err, context, callback) => {
    const result = {
        requestId: context.awsRequestId,
        errors: [{
            status: err.status,
            code: err.code,
            title: err.title,
            detail: err.detail
        }]
    }

    callback(JSON.stringify(result))
}

module.exports.returnErrors = (responseErrors, context, callback) => {
    result = { requestId: context.awsRequestId, errors: responseErrors }
    callback(JSON.stringify(result))
}


function getPrev(event) {
    const offset = parseInt(event.query.offset)
    
    const prevLimit = parseInt(event.query.limit)
    const prev = { limit: prevLimit ? prevLimit : 30 }
    prev.offset = (offset - prev.limit) > 0 ? (offset - prev.limit) : 0

    return prev
}

function getNext(event) {
    let offset = parseInt(event.query.offset)
    offset = offset ? offset : 0

    const nextLimit = parseInt(event.query.limit)
    const next = { limit: nextLimit ? nextLimit : 30 }
    next.offset = offset + next.limit

    return next
}