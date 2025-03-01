import User from '../users/user.model.js';
import Company from '../companies/companies.model.js';

export const existeEmail = async(email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`The email ${ email } already exists in the database`)
    }
}

export const existeCompany = async(nameCompany = '') =>{
    const existCompany = await Company.findOne({ nameCompany });

    if(existCompany){
        throw new Error(`The company ${ nameCompany } already exists in the database`)
    }
}


export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`The id ${id} does not exist`);
    }
}

export const existeCompanyById = async (id = '') => {
    const existeCompany = await Company.findById(id);

    if(!existeCompany){
        throw new Error(`The id ${id} does not exist`);
    }
}