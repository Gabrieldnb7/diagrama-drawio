import { Cart, CartItem } from "../models/index.js";

export const findOne = async (req, res) => {
    const cartId = req.params.id;

    const cart = await Cart.findOne({
        where: { id: cartId },
        include: [{
            model: CartItem,
            as: 'items',
        }]
    })

    if(!cart) return res.status(404).json({ msg: "Carrinho não encontrado!" });
    if(cart.userId !== req.userId) return res.status(403).json({ msg: "Acesso negado!" });

    res.status(200).json({ cart });
};