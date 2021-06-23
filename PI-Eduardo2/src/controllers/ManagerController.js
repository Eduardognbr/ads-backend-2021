import { ManagerModel, UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

class ManagerController{

    //GET /managers - Para listar todos os gerentes
    async list(req, res){
        ManagerModel.find().then(managers => {
            return res.json({
                error: false,
                managers
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação"
            });
        });
    };

    //GET /managers/:manager_id - Para listar um gerente
    async listOne(req, res){
        ManagerModel.findById(req.params.manager_id).then(manager => {
            return res.json ({
                error: false,
                manager,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };

    //POST /managers - Adicionar um gerente
    async create(req, res) {

        //Verificar se o gerente já está cadastrado no sistema
        const userExist = await UserModel.find({cpf: req.body.cpf});
        if(userExist) {
            return res.status(400).json ({
                error: false,
                message: "CPF já consta no cadastro."
            });
        };

        req.body.password = bcrypt.hashSync(req.body.password, 7);


        ManagerModel.create(req.body).then(manager => {
            return res.json ({
                error: false,
                manager
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível adicionar gerente!"
            });
        });
    };

    //PUT /managers/:manager_id - Alterar um gerente
    async update(req, res) {

        //Verificar se o CPF do gerente já está cadastrado no sistema 
        if(req.body.cpf) {
            const userExist = await UserModel.find({cpf: req.body.cpf});
            if(userExist) {
                return res.status(400).json ({
                    error: false,
                    message: "CPF já consta no cadastro."
                });
            };
        };

        //Cadastrar nova senha
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 7);
        };


        ManagerModel.findByIdAndUpdate({_id: req.params.manager_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "Dados do gerente atualizados com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível alterar os dados do gerente!"
            });
        });
    };

    //DELETE /managers/:manager_id - Excluir um gerente
    async delete(req, res) {
        ManagerModel.findByIdAndDelete({_id: req.params.manager_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "O gerente foi deletado com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível deletar o gerente solicitado!"
            });
        });
    };
};

export default new ManagerController();