import {Router} from "express";
import {check} from "express-validator";
import {validarCampos} from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js'

import { addCompanies } from './companiesAdd.controller.js';


const router = Router();


router.post(
    "/addCompany/",
    [   
        validarJWT,
        validarCampos
    ],
    addCompanies
);



export default router;