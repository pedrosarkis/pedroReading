'use strict'

const { describe, it, before, after, afterEach } = require('mocha')
const dbTest = require('./config')
const UserModel = require('../models/user')
const userUseCase = require('../useCases/CreateUser/createUserUseCase')
const userRepository = require('../repositories/UserRepository')
const createUserUseCase = new userUseCase(new userRepository(UserModel))
const assert = require('assert')
const { expectTest } = require('./helper')

describe.only('Create user use case', () => {
    before(async () => {
        await dbTest.connectDatabase()
       
    })

    after(async () => {
        await dbTest.closeDatabase()
    })

    afterEach(async () => {
        await dbTest.clearDataBase()
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