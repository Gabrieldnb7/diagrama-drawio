import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    if(!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if(!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if(!phoneNumber) {
        return res.status(422).json({ msg: "O número de telefone é obrigatório!" });
    }

    if(!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }

    const userRegistered = await User.findOne({ where: { email }})
    if(userRegistered) {
        return res.status(422).json({ msg: "Utilize outro e-mail!" });
    }

    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: passwordHash
    });

    const cart = await Cart.create({
        userId: user.id
    });

    try {
        await user.save();
        await cart.save();

        res.status(201).json({ msg: "Usúario criado com sucesso!" });
    } catch(err) {
        res.status(500).json({ msg: err });
    }
}

export const login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    
      if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    const user = await User.findOne({where: { email }});
    if(!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida." });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user.id
            }, 
            secret
        );

        if(rememberMe) {
            const cookieAge = 1 * 24 * 60 * 60 * 1000 // 1 dia em millisegundos
            return res.status(200).cookie('access_token', token, { maxAge: cookieAge }).json({ msg: "Autenticação realizada com sucesso!" });
        }

        return res.status(200).cookie('access_token', token).json({ msg: "Sessão autenticada com sucesso!" });
    } catch(error) {
        res.status(500).json({ msg: ""+error });
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(206).json({ msg: 'Usuário deslogado, cookie removido!' }).redirect("/");
}