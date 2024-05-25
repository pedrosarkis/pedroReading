'use strict'

const { describe, it, beforeEach, before, after, afterEach} = require('mocha')
const dbTest = require('./config')
const userUseCase = require('../useCases/CreateUser/createUserUseCase')
const userRepository = require('../repositories/UserRepository')
const createUserUseCase = new userUseCase(new userRepository)
const assert = require('assert')
const { expectTest } = require('./helper')

describe('Create user use case', () => {

    
    before(async () => {
        await dbTest.connectDatabase()
       
    })

    after(async () => {
        await dbTest.closeDatabase()
    })

    it('should create a new user', async () => {
        const user = {
            username: 'pedro verani',
            oauth: 'ssffdd66',
            email: 'pedroveranipenha@gmail.com',
        }

        const response = await createUserUseCase.execute(user)
        delete user.oauth
        
        assert.deepStrictEqual(expectTest(response.toObject()), user)
    })

    it('should not allow to save user without username', async () => {
        const user = {
            oauth: 'ssffdd66',
            email: 'pedroveranipenha@gmail.com',
        }

        const response = await createUserUseCase.execute(user)
    
        assert(response._message, 'User validation failed')
    })
})