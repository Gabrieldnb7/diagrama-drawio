import { DataTypes } from "sequelize";
import { connection } from "../db.js";

export const CartItem = connection.define("cartItems", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

CartItem.sync({ force: false }).then();