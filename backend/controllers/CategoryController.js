const Category = require("../models/CategoryModel");

class CategoryController {
    async create (req, res) {
        var { name, color } = req.body;
        var user_id = req.userId;
        var valid = {success: true, incompletes: []};

        if (email == undefined || email == ' '){
            valid.success = false;
            valid.incompletes.push("email");
        }
        if (color == undefined || email == ' '){
            valid.success = false;
            valid.incompletes.push("cor");
        }

        if (!valid.success)
            return res.send(400).json(valid);
        
        try {
            await Category.create(name, color, user_id);
            res.status(201).json({success: true});
        } catch(err){
            console.log(err);
            res.status(500).json({success: false});
        }
    }

    async getAll(req, res){
        var user_id = req.userId;

        try {
            var categories = await Category.findAll(user_id);
            res.status(200).json({success: true, categories});
        } catch (err){
            console.log(err);
            res.status(500);
        }
    }

    async getRaw (req, res){
        var user_id = req.userId;

        try {
            var categories = await Category.findRaw(user_id);
            res.status(200).json({success: true, categories});
        } catch (err){
            console.log(err);
            res.status(500);
        }
    }

    async delete(req, res){
        var id = Number.parseInt(req.params.id);
        
        try {
            await Category.delete(id);
            res.status(200).json({success: true});
        } catch(err){
            console.log(err);
            res.status(500).json({success: false});
        }
    }
}

module.exports = new CategoryController();