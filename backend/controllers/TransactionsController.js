const { transaction } = require("../database/database");
const Transaction = require("../models/TransactionModel");

class TransactionsController {
    async create(req, res){
        var { category_id, description, amount, type, date } = req.body;
        var user_id = req.userId;
    
        try {
            await Transaction.create(user_id, category_id, description, amount, type, date);
            res.status(201).json({success: true});
        } catch(err){
            res.status(500).json({success: false});
        }
    }

    async getTransactions (req, res){
        var user_id = req.userId;

        try {
            var transactions = await Transaction.findAll(user_id);
            res.json({success: true, transactions});
        } catch(err){
            console.log(err);
            res.status(500).json({success: false, transactions: []})
        }
    }

    async getTransaction (req, res){
        var id = req.params.id;

        try {
            var t = await Transaction.findById(id);
            
            if (t)
                return res.status(200).json({success: true, transaction: t});
            else
                return res.status(404).json({success: false, transaction: t});
        } catch(err){
            console.log(err);
            return res.status(500).json({success: false});
        }
    }

    async update(req, res){
        var { id } = req.params;
        var { category_id, description, amount, type, date } = req.body;

        try {
            var ok = await Transaction.update(id, category_id, description, amount, type, date);

            if (ok)
                return res.status(200).json({success: true, description: 'Updated Successfuly'});
            
            return res.status(500).json({success: false, description: "Internal server error"});
        } catch(err){
            return res.status(500).json({success: false, description: "Internal server error"});
        }
    }

    async delete(req, res){
        var { id } = req.params;

        try {
            await Transaction.delete(id);
            res.status(200).json({success: true});
        } catch (err) {
            console.log(err);
            res.status(500).json({success: false});
        }
    }

}

module.exports = new TransactionsController();