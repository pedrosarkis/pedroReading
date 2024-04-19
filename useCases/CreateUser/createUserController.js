module.exports = class createUserController {
    constructor(createUseCase){
        this.createUseCase = createUseCase
    }

    async handle(req, res) {
        const {password, email, username} = req.body
        try {
            await this.createUseCase.execute({oauth: password, email, username})
            return res.status(201).json({message: 'Usuario criado com sucesso'})
        } catch (error) {
            return res.status(400).json({message: "Erro ao criar usuario", error})
        }
    }
}

