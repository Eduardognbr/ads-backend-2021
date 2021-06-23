//const { Router } = require("express");
import { Router } from "express";

import app from "./app.js";
import PatientController from "./controllers/PatientController.js";
import ManagerController from "./controllers/ManagerController.js";
import AttendantController from "./controllers/AttendantController.js";
import DoctorController from "./controllers/DoctorController.js";

const routes = new Router();
const routesV1 = new Router();
const routesV2 = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

//Paciente - Alterações: ADMIN, Gerentes, Atendentes e Médicos
//GET /patients - Para listar todos os pacientes
routes.get('/patients', PatientController.list);
//GET /patients/:patient_id - Para listar um paciente
routes.get('/patients/:patient_id', PatientController.listOne);
//POST /patients - Criar um paciente
routes.post('/patients', PatientController.create);
//PUT /patients/:patient_id - Alterar um paciente
routes.put('/patients/:patient_id', PatientController.update);
//DELETE /patients/:patient_id - Excluir um paciente
routes.get('/patients/:patient_id', PatientController.delete);


//Gerente - Alterações: ADMIN
//GET /managers - Para listar todos os gerentes
routes.get('/managers', ManagerController.list);
//GET /managers/:manager_id - Para listar um gerente
routes.get('/managers/:manager_id', ManagerController.listOne);
//POST /managers - Adicionar um gerente
routes.post('/managers', ManagerController.create);
//PUT /managers/:manager_id - Alterar um gerente
routes.put('/managers/:manager_id', ManagerController.update);
//DELETE /managers/:manager_id - Excluir um gerente
routes.get('/managers/:manager_id', ManagerController.delete);


//Atendente - Alterações: ADMIN e Gerentes
//GET /attendants - Para listar todos os atendentes
routes.get('attendants', AttendantController.list);
//GET /attendants/:attendant_id - Para listar um atendente
routes.get('/attendants/:attendant_id', AttendantController.listOne);
//POST /attendants - Adicionar um atendente
routes.post('/attendants', AttendantController.create);
//PUT /attendants/:attendant_id - Alterar um atendente
routes.put('/attendants/:attendant_id', AttendantController.update);
//DELETE /attendants/:attendant_id - Excluir um atendente
routes.get('/attendants/:attendant_id', AttendantController.delete);

//Médico - Alterações: ADMIN e Gerentes
//GET /doctors - Para listar todos os médicos
routes.get('/doctors', DoctorController.list);
//GET /doctors/:doctor_id - Para listar um médico
routes.get('/doctors/:doctor_id', DoctorController.listOne);
//POST /doctors - Adicionar um médico
routes.post('/doctors', DoctorController.create);
//PUT /doctors/:doctor_id - Alterar um médico
routes.put('/doctors/:doctor_id', DoctorController.update);
//DELETE /doctors/:doctor_id - Excluir um médico
routes.get('/doctors/:doctor_id', DoctorController.delete);



//ADMIN????????????????????????????????????????????????????????????????????????????????????

routes.use("/v1", routesV1);
routes.use("/v2", routesV2);
routes.use("/", routesV2); 

// 404 - Page/Resource Not Found
routes.use((req, res, next) => {
    return res.status(404).json({
        error: true,
        message: `Resource '${req.url}' Not Found!`
    });
});

// 500 - Internal Server Error
routes.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        errror: true,
        message: "Internal Server Error"
    });
});

process.on('uncaughtException', function(err) {
    // Handle the error safely
    console.log(err)
});

//module.exports = routes;
export default routes;