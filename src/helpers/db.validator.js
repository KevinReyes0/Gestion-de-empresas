import User from '../users/user.model.js';


export const existeEmail = async(email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`The email ${ email } already exists in the database`)
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