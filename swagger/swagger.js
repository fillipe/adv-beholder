const swaggerUi = require('aws-serverless-swagger-ui')
const swaggerHandler = swaggerUi.setup('./swagger/swagger.yml')

exports.handle = async (event, context, callback) => {
    console.log('Event received', event)
    console.log('Context', context)

    try {
        return (await swaggerHandler)(event, context, callback)
    } catch (err) {
        console.log(err)
    }
}