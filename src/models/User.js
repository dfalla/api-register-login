import mongoose from "mongoose";
import bcryptjs from "bcryptjs";


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
    },
    username: {
        type: String,
        required: [true, 'El username es requerido'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre("save", async function(next){
    const user = this;

    if(!user.isModified("password")) return next();

    try{
        const salt = await bcryptjs.genSalt(12);
        user.password = await bcryptjs.hash(user.password, salt);
        next();

    }catch(error){
        console.log(error);
        throw new Error('Error al hashear la contraseña');
    }
});

userSchema.methods.comparePassword = async function(frontendPassword){
    return await bcryptjs.compare(frontendPassword, this.password); 
}

export const User = mongoose.model('User', userSchema);
 
