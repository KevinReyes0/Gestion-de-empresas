import User from '../users/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async(req, res) => {
    const {email, password, username} = req.body;

    try {

        const user = await User.findOne({
            $or: [{email}, {username}]
        }) 

        if(!user){
            return res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            });
        }

        if(!user.state){
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Inicion de sesion exitoso',
            userDetails: {
                username: user.email,
                token: token
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
}

const createUserAdmin = async ( name, surname, username, email, password, role ) => {
    try {

    if (role === "ADMIN_ROLE") {
        const existAdmin = await User.findOne({ role: "ADMIN_ROLE" });
        if (existAdmin) {
            console.log("--------------------------- Error -------------------------------")
            console.log("A user with admin role already exists. Another cannot be created.");
            console.log("-----------------------------------------------------------------")
            return null;
        };
    };

    const encryptedPassword = await hash(password);

    const newUser = new User({ 
        name, 
        surname, 
        username, 
        email, 
        password: encryptedPassword, 
        role });

        await newUser.save();
        console.log("User created successfully:", newUser);
        return newUser;
        
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

createUserAdmin("Kevin", "Reyes", "kreyes","kreyes@gmail.com", "12345678", "ADMIN_ROLE");

