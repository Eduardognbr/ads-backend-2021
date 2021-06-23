import mongoose from 'mongoose';

//Usuário Geral
const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },

    birthdate: {
        type: Date, //YYYY-MM-DD - Sem horário.
        required: true
    },
    
    adress: [{
        adress: String,
        required: [true, "Preencha o endereço."],
    
        city: String,
        required: [true, "Insira a cidade."],
    
        cep: String,
        required: [true, "Preencha o CEP."]
      }],
    
    contact: [{
        phone: String,
        required: [true, "Insira telefone para contato."],
    
        whatsApp: String,
        required: [true, "Insira telefone para contato via WhatsApp."]
      }]
}, {
        timestamps: true, discriminatorKey: '_role'         
});

export const UserModel = mongoose.model('Usuário', UserSchema);

//Modelo para Pacientes
export const PatientModel = UserModel.discriminator('Paciente', mongoose.createSchema({}));

//Modelo Cargo - ADMIN
export const AdminModel = UserModel.discriminator('Administrador');

//Modelo Cargo - Gerente
export const ManagerModel = UserModel.discriminator('Gerente', mongoose.createSchema({}));

//Modelo Cargo - Atendente (recepcionistas, secretárias(os))
export const AttendantModel = UserModel.discriminator('Atendente', mongoose.createSchema({}));

//Modelo Cargo - Médicos
export const DoctorModel = UserModel.discriminator('Médico(a)', mongoose.createSchema({
    crm: {
        type: String,
        required: [true, "Insira o CRM"]
    },
}))

