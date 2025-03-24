const UserController = require("../controllers/UserController");
const TransactionsController = require("../controllers/TransactionsController");
const CategoryController = require("../controllers/CategoryController");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Auth = async (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token)
        return res.status(401).json({success: false, description: "Login necessário"});

    try {
        var cleanToken = token.split(' ')[1];
        var decoded = await jwt.verify(cleanToken, process.env.JWT_SECRET);

        req.userId = decoded.id;
        next();
    } catch (err){
        return res.status(401).json({success: false, description: "Token inválido ou expirado"});
    }
}

// User handling
router.get('/user', Auth, UserController.getInfo); // retrieves personal user data
router.post('/user', UserController.create);
router.post('/login', UserController.login);
router.post('/validate', UserController.validate);
router.post('/recover', UserController.recover);
router.put('/user', UserController.changePassword);

// Transactions handling
router.get('/transaction', Auth, TransactionsController.getTransactions);
router.post('/transaction', Auth, TransactionsController.create);
router.delete('/transaction/:id', Auth, TransactionsController.delete);

// Category handling
router.get('/category', Auth, CategoryController.getAll);
router.get('/rawcategory', Auth, CategoryController.getRaw);
router.post('/category', Auth, CategoryController.create);
router.delete("/category/:id", Auth, CategoryController.delete);

module.exports = router;