import { body } from 'express-validator';
import { validarCampos } from './validar-campos.js';

export const loginValidator = [
    body('email').optional().isEmail().withMessage("Enter a valid email adress"),
    body('username').optional().isEmail().isString().withMessage("Entert a valid usernamea"),
    body('password', "Password must be at least 6 characters").isLength({min: 8}),
    validarCampos,
]