import { User, Cart } from "../models/index.js";

export const findOne = async (req, res) => {
    const id = req.userId;

    if(req.userId !== id) return res.status(403).json({ msg: "Acesso negado!" });
    
    const user = await User.findOne({ 
        where: { id },
        attributes: { exclude: ['password'] },
        include: [{
            model: Cart,
            as: "cart",
        }]
    });
    
    if(!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    res.status(200).json({ user });
}