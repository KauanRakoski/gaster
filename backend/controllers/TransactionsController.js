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