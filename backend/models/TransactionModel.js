const database = require("../database/database");

class Transaction {
    async create(user_id, category_id, description, amount, type, date){
        var typeInt;

        if (type == 'gasto')
            typeInt = 0;
        if (type == 'entrada')
            typeInt = 1;

        try {
            await database.insert({user_id, category_id, type: typeInt, description, amount, date}).into("transactions");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    async findAll(user_id){
        try {
            var transactions = await database.select("transactions.*", "categories.name as category_name")
            .join("categories", "transactions.category_id", "=", "categories.id")
            .where("transactions.user_id", "=", user_id).orderBy("date", "desc")
            .from("transactions")
    
            return transactions;
        } catch(err){
            return [];
        }
    }

    async findById(id){
        try {
            var result = await database.select("*").where({id: id}).from("transactions");
            var response = undefined;

            if (result.length > 0)
                response = result[0];

            return response;
            
        } catch (err){
            console.log(err);
            return [];
        }
    }

    async update(id, category_id, description, amount, type, date){
        var typeInt;

        if (type == 'gasto')
            typeInt = 0;
        if (type == 'entrada')
            typeInt = 1;

        try {
            await database.update({category_id, description, amount, type: typeInt, date}).where({id: id}).from("transactions");
            return true;
        }catch(err){
            return false;
        }
    }

    async delete(id){
        try {
            await database.delete().where({id: id}).from("transactions");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new Transaction();