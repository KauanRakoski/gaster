const database = require("../database/database");
const User = require("../models/UserModel");

const uuid = require("uuid");

class PasswordToken {
    async create(email){
        var user = await User.findByEmail(email);

        if (user == undefined){
            return {success: false, description: "Não existe usuário com email fornecido"};
        }

        var user_id = user.id;
        var token = uuid.v4();
        var expires_at = new Date(Date.now() + 60 * 60 * 1000);

        try {
            await database.insert({user_id, token: token, expires_at}).into("passtokens");
            return {success: true, token};
        } catch (err){
            console.log(err);
            return {success: false, description: "Erro ao criar token"};
        }
    }

    async validate (token){
       
        var result = await database
        .select("*")
        .from("passtokens")
        .where("token", `${token}`)
        .andWhere("used", 0)
        .andWhere("expires_at", ">", new Date());

        if (result.length > 0){
            return {success: true, user_id: result[0].user_id};
        } else {
            return {success: false, description: "Invalid token"};
        }
    }

    async markUsed(token){
        await database.update({used: 1}).where({token: token}).from("passtokens");
    }
}

module.exports = new PasswordToken();