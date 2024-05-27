'use strict'

const swagger = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Book club api',
        description: 'Book club api',
    },
    host: 'localhost:3000',
    schemes:['http']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/*.js']

swagger(outputFile, endpointsFiles, doc)