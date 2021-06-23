import { AttendantModel, UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

class AttendantController{
    //Listar todos os atendentes
    async list(req, res){
        AttendantModel.find().then(attendants => {
            return res.json({
                error: false,
                attendants
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação"
            });
        });
    };

    //GET /attendants/:attendant_id - Para listar um atendente
    async listOne(req, res){
        AttendantModel.findById(req.params.attendant_id).then(attendant => {
            return res.json ({
                error: false,
                attendant,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };
    
    //POST /attendants - Adicionar um atendente
    async create(req, res) {

        //Verificar se o atendente já está cadastrado no sistema
        const userExist = await UserModel.find({cpf: req.body.cpf});
        if(userExist) {
            return res.status(400).json ({
                error: false,
                message: "CPF já consta no cadastro."
            });
        };

        req.body.password = bcrypt.hashSync(req.body.password, 7);


        AttendantModel.create(req.body).then(attendant => {
            return res.json ({
                error: false,
                attendant
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível adicionar atendente!"
            });
        });
    };

    //PUT /attendants/:attendant_id - Alterar um atendente
    async update(req, res) {

        //Verificar se o CPF do atendente já está cadastrado no sistema 
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


        AttendantModel.findByIdAndUpdate({_id: req.params.attendant_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "Dados do atendente atualizados com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível alterar os dados do atendente!"
            });
        });
    };

    //DELETE /attendants/:attendant_id - Excluir um atendente
    async delete(req, res) {
        AttendantModel.findByIdAndDelete({_id: req.params.attendant_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "O atendente foi deletado com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível deletar o atendente solicitado!"
            });
        });
    };
};

export default new AttendantController();