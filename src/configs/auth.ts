export const authConfig = {
    jwt:{
        secret: process.env.AUTH_SECRET || "default", // caso não exista cairá no default
        expiresIn: "1d", //validade de um token
    }
}