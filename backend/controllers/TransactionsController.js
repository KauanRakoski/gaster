const database = require("../database/database");
const { transaction } = require("../database/database");
const Transaction = require("../models/TransactionModel");
const Category = require("../models/CategoryModel")
const logger = require("../services/LoggerService")

class TransactionsController {
    async create(req, res){
        var { category_id, description, amount, type, date } = req.body;
        var user_id = req.userId;
        
        let category = await Category.findByIdAndUser(category_id, user_id);

        if (category == {} || category == null || category.length <= 0){
            res.status(404).json({success: false});
            return;
        }
            
        try {
            await Transaction.create(user_id, category_id, description, amount, type, date);
            res.status(201).json({success: true});
        } catch(err){
            logger.error("Error creating transaction", err)
            res.status(500).json({success: false});
        }
    }

    async getTransactions (req, res){
        var user_id = req.userId;

        try {
            var transactions = await Transaction.findAll(user_id);
            res.json({success: true, transactions});
        } catch(err){
            logger.error("Error getting transactions", err)
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
            logger.error("Error getting transaction", err)
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
            logger.error("Error updating transaction", err)
            return res.status(500).json({success: false, description: "Internal server error"});
        }
    }

    async delete(req, res){
        var { id } = req.params;

        try {
            await Transaction.delete(id);
            res.status(200).json({success: true});
        } catch (err) {
            logger.error("Error deleting transaction", err)
            res.status(500).json({success: false});
        }
    }

  async getMonthlyBalance (req, res) {
    var userId = req.userId;

    const TYPE_INCOME = 1; 
    const TYPE_EXPENSE = 0;

    try {
        
    const report = await database('transactions')
      .select(
        database.raw("TO_CHAR(date, 'YYYY-MM') as mes"),
            database.raw(
          "SUM(CASE WHEN type = ? THEN amount ELSE 0 END) as total_entradas", 
          [TYPE_INCOME]
        ),

        database.raw(
          "SUM(CASE WHEN type = ? THEN amount ELSE 0 END) as total_saidas", 
          [TYPE_EXPENSE]
        )
      )
      .where('user_id', userId)
      .andWhereRaw("date >= CURRENT_DATE - INTERVAL '6 months'")
      .groupByRaw("TO_CHAR(date, 'YYYY-MM')")
      .orderBy('mes', 'asc');

      res.status(200).json({success: true, data: report});
    } catch (err){
        logger.error("Error getting monthly balance", err)
        res.status(500).json({success: false, data: []})
    }
    
};
}

module.exports = new TransactionsController();