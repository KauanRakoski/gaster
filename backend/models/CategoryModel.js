const database = require("../database/database");

class Category {
    async create(name, color, user_id){
        try {
            await database.insert({name, color, user_id}).into("categories");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
    
    async findAll(user_id){
        var data = await database('transactions as t')
        .join('categories as c', 't.category_id', 'c.id')
        .where('t.user_id', user_id)
        .andWhere('t.type', '=', 0)
        .select(
            'c.id as category_id',
            'c.name as category_name',
            'c.color',
            database.raw('SUM(t.amount) as total_amount')
        )
        .groupBy('c.id', 'c.name', 'c.color');
        
        return data;
    }

    async findRaw (user_id){
        var data = await database.select("*").where({user_id}).from("categories");

        return data;
    }

    async delete(id){
        try {
            await database.delete().where({id: id}).from("categories");
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new Category();