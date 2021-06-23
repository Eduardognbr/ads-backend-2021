import { PatientModel, UserModel } from "../models/User.js";

class PatientController{
    //Listar todos os pacientes
    async list(req, res){
        PatientModel.find().then(patients => {
            return res.json({
                error: false,
                patients,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };

    //Listar um paciente - /patient/:patient_id
    async listOne(req, res){
        PatientModel.findById(req.params.patient_id).then(patient => {
            return res.json ({
                error: false,
                patient,
            });
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível executar a solicitação!"
            });
        });
    };

    //POST /patients - Criar um paciente
    async create(req, res) {        

        //Verificar se o paciente já está cadastrado no sistema
        const userExist = await UserModel.find({cpf: req.body.cpf});
        if(userExist) {
            return res.status(400).json ({
                error: false,
                message: "CPF já consta no cadastro."
            });
        };

        PatientModel.create(req.body).then(patient => {
            return res.json ({
                error: false,
                patient
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível adicionar paciente!"
            });
        });
    };

    //PUT /patients/:patient_id - Alterar um paciente
    async update(req, res) {

        //Verificar se o CPF do paciente já está cadastrado 
        if(req.body.cpf) {
            const userExist = await UserModel.find({cpf: req.body.cpf});
            if(userExist) {
                return res.status(400).json ({
                    error: false,
                    message: "CPF já consta no cadastro."
                });
            };
        };


        PatientModel.findByIdAndUpdate({_id: req.params.patient_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "Dados do paciente atualizados com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível alterar os dados do paciente!"
            });
        });
    };

    //DELETE /patients/:patient_id - Excluir um paciente
    async delete(req, res) {
        PatientModel.findByIdAndDelete({_id: req.params.patient_id}, req.body).then(() => {
            return res.json ({
                error: false,
                message: "O paciente foi deletado com sucesso."
            });
        }).catch(err => {
            return res.status(400).json ({
                error: true,
                message: "Não foi possível deletar o paciente solicitado!"
            });
        });
    };
};

export default new PatientController();