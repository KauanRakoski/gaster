const database = require("../database/database");
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");

class User {
    async create(email, password, phone){
        // Phone é opcional e uma string, logo corrigimos quando não for fornecido
        if (phone == undefined)
            phone = '';

        try {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);

            await database.insert({email, password: hash, phone_number: phone}).into("users");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    async findByEmail(email){
        try {
            var userRes = await database.select().where({email: email}).from("users");

            if (userRes.length > 0)
                return userRes[0];
            else
                return undefined;
        } catch (err){
            console.log(err);
            return undefined;
        }
    }

    async getData(user_id){
        try {
            var user = await database.select("email", "phone_number").where({id: user_id}).from("users");

            if (user.length > 0)
                return user[0];
            else
                return undefined;
        } catch (err){
            console.log(err);
            return undefined;
        }
    }

    async updatePassword (id, newPassword){
        try {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(newPassword, salt);
            
            await database.update({password: hash}).where({id: id}).from("users");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new User();