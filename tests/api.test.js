'use strict'

const supertest = require("supertest")
const { describe, after, before, it, afterEach, beforeEach} = require('mocha')
const assert = require('assert')
 const {closeDatabase, clearDataBase, stopDatabase, connectDatabase} = require('./config')
 const User = require('../models/user')
 const Book = require('../models/book')
const { all } = require("../routes/users")

describe("Api suite test", async () => {
    let app
    before((done) => {
        app = require('../app')
        app.once('listening', done)
    })

    // beforeEach(async () => {
    //     closeDatabase()
    //     connectDatabase()
    // })

    after(async () => {
        app.close()
        await closeDatabase()
    })
    //  beforeEach(async () => {
    //     await closeDatabase()
    //  })

    // afterEach(async () => {
    //     try {
    //         await clearDataBase()
    //     } catch (error) {
    //         console.log(error)
    //     }        
    // })

    describe('Testing view route', async () => {
         //todo ver se o arquivo recebido foi o certo
        it('should request /form route and receive the form.ejs', async () => {
            const response = await supertest(app)
            .get('/form')
            .expect(200)
        })

        it('should request /getallbooks route and receive the getallbooks.ejs', async () => {
            const response = await supertest(app)
            .get('/getallbooks')
            .expect(200)
            //console.log(response)
        })

        it('should request /recovery route and receive the recovery.ejs', async () => {
            const response = await supertest(app)
            .get('/recovery')
            .expect(200)
            //console.log(response)
        })

        it('should request /autenticate route and receive the autenticate.ejs', async () => {
            const response = await supertest(app)
            .get('/autenticate')
            .expect(200)
            //console.log(response)
        })

        it('should request unexisting route and receive the 404', async () => {
            const response = await supertest(app)
            .get('/nonExisting')
            .expect(404)
            //console.log(response)
        })
    })

    describe('Test admin route', function() {
        this.timeout(10000)
        it('should not allow a not logged  user to request to', async () => {
            const response = await supertest(app)
            .get('/admin/allusers')
            .expect(302)

            //302 means it was redirected
        })

        it('should allow the user pedrosarkis to access the route', async () => {
            const agent = supertest.agent(app)
         
            const user = {username: 'pedrosarkis', email: 'pedrosarkisverani@gmail.com', oauth: 'hakunamatata'}
            await User.create(user)
    
         
             const loginResponse = await agent
                .post('/users/login')
                .set('withCredentials', true)
                .send({username: 'pedrosarkis', password: 'hakunamatata'})
                .expect(200)
          
            
            await agent
                .get('/admin/allusers')
                .set('Cookie', loginResponse.headers['set-cookie'][0])
                .expect(200)
        })

        it('should not allow the user different than pedrosarkis to access the route', async () => {
            const agent = supertest.agent(app)
         
            const user = {username: 'pedroverani', email: 'pedrosarkisverani@gmail.com', oauth: 'hakunamatata'}
            await User.create(user)
    
         
             const loginResponse = await agent
                .post('/users/login')
                .set('withCredentials', true)
                .send({username: 'pedroverani', password: 'hakunamatata'})
                .expect(200)
          
            
            await agent
                .get('/admin/allusers')
                .set('Cookie', loginResponse.headers['set-cookie'][0])
                .expect(302)
        })
    })

    describe('Testing users route', () => {
        it('should create a new user when valid payload', async () => {
            const payload = {username: 'pedroverani', email: 'pedrosarkisverani@gmail.com', password: 'hakunamatata'}
            const agent = supertest.agent(app)

            await agent
                .post('/users/create')
                .send(payload)
                .expect(201)
        })

        it('should not create a new user when invalid payload - missing username', async () => {
            const payload = {email: 'pedrosarkisverani@gmail.com', password: 'hakunamatata'}
            const agent = supertest.agent(app)

            await agent
                .post('/users/create')
                .send(payload)
                .expect(400)
        })

        it('should not create a new user when invalid payload - missing password', async () => {
            const payload = {username: 'pedrosarkis', email: 'pedrosarkisverani@gmail.com'}
            const agent = supertest.agent(app)

            await agent
                .post('/users/create')
                .send(payload)
                .expect(400)
        })

        it('should not create a new user when invalid payload - missing email', async () => {
            const payload = {username: 'pedrosarkis', password: 'ssffdd66'}
            const agent = supertest.agent(app)

            await agent
                .post('/users/create')
                .send(payload)
                .expect(400)
        })

        it('should not create a new user when invalid password -shorter than 6', async () => {
            const payload = {email: 'pedrosarkisverani@gmail.com', username: 'pedrosarkis', password: '12345'}
            const agent = supertest.agent(app)

            await agent
                .post('/users/create')
                .send(payload)
                .expect(400)
        })
    })

    describe('testing book route', () => {
        before(async () => {
            const books = require('./mocks/books.json')
            await Book.insertMany(books)
        })
        it('/books/allbooks should return allbooks', async () => {
            const allBooks = await supertest(app)
                .get('/books')
                .expect(200)

            const [book] = JSON.parse(allBooks.text)
            delete book._id
            delete book.__v
            delete book.createdAt

                assert.deepStrictEqual({
                    "title": "Book 1",
                    "pages": 150,
                    "synopsis": "A gripping tale of adventure and mystery.",
                    "review": "An exhilarating read from start to finish.",
                    "image": "https://s2-g1.glbimg.com/R9MLvKO92PP_78wMTCvDKozTh8A=/0x0:1518x916/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/7/L/AhD3O2Rguo4YQNpBTkEQ/grifi.jpg",
                    "oauth": "oauth1",
                    "user": "pedrosarkis"
                }, book)
        })

        it('post /books/ should create a book', async () => {
             await supertest(app)
                .post('/books/')
                .send( {
                    "title": "Book 1",
                    "pages": 150,
                    "synopsis": "A gripping tale of adventure and mystery.",
                    "review": "An exhilarating read from start to finish.",
                    "image": "https://s2-g1.glbimg.com/R9MLvKO92PP_78wMTCvDKozTh8A=/0x0:1518x916/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/7/L/AhD3O2Rguo4YQNpBTkEQ/grifi.jpg",
                    "oauth": "oauth1",
                    "user": "pedrosarkis"
                })
                .expect(200)
        })

        it('get users/:username/books should return all books from the given user', async () => {
            await supertest(app)
               .get('/users/pedrosarkis/books')
               .expect(200)
       })
    })

    describe('testing book route', () => {
        before(async () => {
            const books = require('./mocks/books.json')
            await Book.insertMany(books)
        })
        it('/books/allbooks should return allbooks', async () => {
            const allBooks = await supertest(app)
                .get('/books')
                .expect(200)

            const [book] = JSON.parse(allBooks.text)
            delete book._id
            delete book.__v
            delete book.createdAt

                assert.deepStrictEqual({
                    "title": "Book 1",
                    "pages": 150,
                    "synopsis": "A gripping tale of adventure and mystery.",
                    "review": "An exhilarating read from start to finish.",
                    "image": "https://s2-g1.glbimg.com/R9MLvKO92PP_78wMTCvDKozTh8A=/0x0:1518x916/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/7/L/AhD3O2Rguo4YQNpBTkEQ/grifi.jpg",
                    "oauth": "oauth1",
                    "user": "pedrosarkis"
                }, book)
        })

        it('post /books/ should create a book', async () => {
             await supertest(app)
                .post('/books/')
                .send( {
                    "title": "Book 1",
                    "pages": 150,
                    "synopsis": "A gripping tale of adventure and mystery.",
                    "review": "An exhilarating read from start to finish.",
                    "image": "https://s2-g1.glbimg.com/R9MLvKO92PP_78wMTCvDKozTh8A=/0x0:1518x916/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/7/L/AhD3O2Rguo4YQNpBTkEQ/grifi.jpg",
                    "oauth": "oauth1",
                    "user": "pedrosarkis"
                })
                .expect(200)
        })

        it('get users/:username/books should return all books from the given user', async () => {
            await supertest(app)
               .get('/users/pedrosarkis/books')
               .expect(200)
       })
    })
})