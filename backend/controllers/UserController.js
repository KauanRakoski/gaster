const User = require("../models/UserModel");
const UserService = require("../services/UserService");
const PasswordToken = require("../models/PassTokensModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

class UserController {
    async create(req, res){
        var {email, password, phone_number} = req.body;
        console.log("hel")
        var user = await User.findByEmail(email);

        if (user != undefined){
            return res.status(403).json({success: false, description: "Um usuário com este email já existe!"})
        }

        const validation = UserService.validate(email, password);

        if (validation.success){
            var created = await User.create(email, password, phone_number);
            
            if (created){
                return res.status(200).json({success: true});
            }
        } else {
            return res.status(400).json(validation);
        }
    }

    async getInfo(req, res){
        var user_id = req.userId;

        try {
            var userdata = await User.getData(user_id);
            var success = userdata != undefined ? true : false;
            res.status(200).json({success, userdata});
        } catch(err){
            console.log(err);
            res.status(500).json({success: false, description: "Erro ao buscar dados de usuário!"});
        }
    }

    async login(req, res){
        var { email, password } = req.body;

        var user = await User.findByEmail(email);

        if (user != undefined){
            var passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch){
                var token = await jwt.sign({id: user.id}, process.env.JWT_SECRET);

                res.status(200).json({success: true, description: token});
            } else {
                res.status(401).json({success: false, description: "Senha incorreta"});
            }

        } else {
            res.status(404).json({success: false, description: "Não existe um usuário com esse email"})
        }
    }

    async recover (req, res){
        var { email } = req.body;

        try{
            var created = await PasswordToken.create(email);

            if (created.success){
                var success = UserService.sendMail(email, created.token);
                if(success)
                    return res.status(200).json({success: true})
                
                return res.status(500).json({success: false})
            } else {
                return res.status(400).json({success: false, description: created.description});
            }
        } catch (err){
            console.log(err);
            res.status(500).json({success: false, description: "Impossibilitado de criar token"});
        }
    }

    async changePassword (req, res){
        var { token, password } = req.body;

        const validation = await PasswordToken.validate(token);
        if (validation.success){
            await User.updatePassword(validation.user_id, password);
            await PasswordToken.markUsed(token);
            res.status(200).json({success: true});
        } else {
            res.status(400).json({success: false, description: validation.description});
        }
    }

    validate(req, res){
        // Se acessou rota, passou pelo middleware de autenticação, logo é usuário válido
        res.status(200).json({success: true});
    }
}

module.exports = new UserController();