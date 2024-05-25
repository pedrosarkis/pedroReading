const userDTO = require('../../dtos/userDTO')
module.exports = class createUserController {
    constructor(createUseCase){
        this.createUseCase = createUseCase
    }

    async handle(req, res) {
        const {password, email, username} = req.body
        const {error} = userDTO.validate({password, email, username})
        if(error) {
            return res.status(400).json({message: 'Houve um erro ao criar o usuário', error: error.details[0].message})
        }
        try {
            await this.createUseCase.execute({oauth: password, email, username})
            return res.status(201).json({message: 'Usuario criado com sucesso'})
        } catch (error) {
            return res.status(400).json({message: "Erro ao criar usuario", error})
        }
    }
}

