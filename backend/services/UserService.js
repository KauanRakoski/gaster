const validator = require("validator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "astralab@zohomail.com",
      pass: process.env.MAIL_PASS,
    },
  });
  

class UserService {

    // Retorna erros para serem exibidos no frontend
    validate(email, password){
        var status = {success: true, emailError: '', passwordError: ''};

        if (!validator.isEmail(email)){
            status.success = false;
            status.emailError = "Isira um email válido";
        }

        if (email == undefined || email == ''){
            status.success = false;
            status.emailError = "Email não pode ser vazio";
        }

        if (password == '' || password == ' '){
            status.success = false;
            status.passwordError = "Insira uma senha válida";
        }

        return status;
    }

    // Envia email para recuperação de senha
    async sendMail(email, token){
        transporter.sendMail({
            from: 'Astralab <astralab@zohomail.com>',
            to: `${email}`,
            subject: 'Gaster: solicitação de recuperação de senha',
            text: `Foi solicitada a recuperação de senha. Se deseja prosseguir por favor acesse o link 
            gaster.vercel.app/recover/${token} que expira em 1 hora.`,
            html: `Foi solicitada a recuperação de senha. Se deseja prosseguir por favor acesse o link 
            gaster.vercel.app/recover/${token} que expira em 1 hora.`
        }, (err) => {
            if (err)
                return false;
            else
                return true;
        })
    }
}

module.exports = new UserService();