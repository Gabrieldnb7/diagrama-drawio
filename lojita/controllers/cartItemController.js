import { Cart, CartItem } from "../models/index.js";

export const create = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    const userId = req.userId;

    const cart = await Cart.findOne({where: { userId }});
    if(cart.id !== cartId) return res.status(403).json({ msg: "Acesso negado." });

    let item = await CartItem.findOne({
        where: { cartId, productId },
    });
    if(item) return res.status(409).json({ msg: "Item já existe no carrinho." });

    item = await CartItem.create({
            cartId,
            productId,
            quantity
        });

    res.status(201).json({ item });
}

export const update = async (req, res) => {
    const { cartId, quantity } = req.body;
    const itemId = req.params.id;
    const userId = req.userId;

    const cart = await Cart.findOne({where: { userId }});
    if(cart.id !== cartId) return res.status(403).json({ msg: "Acesso negado." });

    let item = await CartItem.findOne({
        where: { id: itemId },
    });
    if(!item) return res.status(404).json({ msg: "Item não encontrado." });

    item.quantity = quantity;
    item.save();
    return res.status(202).json({ item });
}

export const remove = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.userId;

    const item = await CartItem.findOne({
        where: { id: itemId },
        include: [Cart],
    });

    if(!item) return res.status(404).json({ msg: "O item não foi encontrado." });
    if(item.cart.userId !== userId) return res.status(403).json({ msg: "Acesso negado." });

    CartItem.destroy({ where: { id: itemId } });
    return res.status(204).send()
}