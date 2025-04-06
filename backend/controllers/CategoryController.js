const Category = require("../models/CategoryModel");

class CategoryController {
    async create (req, res) {
        var { name, color } = req.body;
        var user_id = req.userId;
        var valid = {success: true, incompletes: []};

        if (name == undefined || name == ' '){
            valid.success = false;
        }
        if (color == undefined || color == ' '){
            valid.success = false;
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
        var time_period = Number.parseInt(req.params.time_period);

        try {
            var categories = await Category.findAll(user_id, time_period);
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