import { DoctorModel, UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

class DoctorController{

    //GET /doctors - Para listar todos os médicos
    async list(req, res){
        DoctorModel.find().then(doctors => {
            return res.json({
                error: false,
                doctors,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };

    //GET /doctors/:doctor_id - Para listar um médico
    async listOne(req, res){
        DoctorModel.findById(req.params.doctor_id).then(doctor => {
            return res.json ({
                error: false,
                doctor,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };

    //POST /doctors - Adicionar um médico
    async create(req, res) {

        //Verificar se o médico já está cadastrado no sistema
        const userExist = await UserModel.find({cpf: req.body.cpf});
        if(userExist) {
            return res.status(400).json ({
                error: false,
                message: "CPF já consta no cadastro."
            });
        };

        req.body.password = bcrypt.hashSync(req.body.password, 7);


        DoctorModel.create(req.body).then(doctor => {
            return res.json ({
                error: false,
                doctor
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível adicionar médico!"
            });
        });
    };

    //PUT /mds/:md_id - Alterar um médico
    async update(req, res) {

        //Verificar se o CPF do médico já está cadastrado no sistema 
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


        DoctorModel.findByIdAndUpdate({_id: req.params.doctor_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "Dados do médico atualizados com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível alterar os dados do médico!"
            });
        });
    };

    //DELETE /mds/:md_id - Excluir um médico
    async delete(req, res) {
        DoctorModel.findByIdAndDelete({_id: req.params.doctor_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "O médico foi deletado com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível deletar o médico solicitado!"
            });
        });
    };
};

export default new DoctorController();