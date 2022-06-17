import mongoose from "mongoose";
try {
    await mongoose.connect(`mongodb+srv://new-twitch-user:new-twitch-user@cluster0.vqx4q.mongodb.net/usuarios`);
    console.log("Conexión a la base de datos exitosa");
} catch (error) {
    console.log('Error al conectarse a MongoDB 😥');
}









