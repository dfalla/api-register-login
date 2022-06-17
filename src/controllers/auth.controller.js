import {User} from '../models/User.js';
import {generateRefreshToken, generateToken} from '../utils/tokenManager.js';


export const register = async (req, res) => {
    try{
        const { nombre, apellido, username, password } = req.body;

        let user = await User.findOne({username});

        if(user) throw {code: 11000};

        const newUser = new User({ nombre:nombre, apellido:apellido, username: username, password: password });
    
        await newUser.save();

        const {token, expiresIn} = generateToken(newUser.id);

        generateRefreshToken(newUser.id, res);

        return res.status(201).json({msg: "Usuario registrado correcatamente"});

    }catch(error){
        if(error.code === 11000) return res.status(400).json({error : "Ya existe este usuario"});
        return res.status(500).json({error: 'Error de servidor'});
    }
};

export const login = async (req, res)=>{
    
    try {
        const {username, password} = req.body;
        
        let user = await User.findOne({username});
        
        if(!user){
            return res.status(403).json({error: "Credenciales incorrectas"});
        } 
        
        const respuestaPassword = await user.comparePassword(password);
      
        if(!respuestaPassword){
            return res.status(403).json({error: "Credenciales incorrectas"});
        }

        const {token, expiresIn} = generateToken(user.id);

        generateRefreshToken(user.id, res);

        const nombreApellido = `${user.nombre} ${user.apellido}`;

        return res.json({ nombreApellido }); 

    }catch(error){
        return res.status(500).json({error: "Error del servidor"});
    }
};