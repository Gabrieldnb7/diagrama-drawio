import { DataTypes } from "sequelize";
import { connection } from "../db.js";

export const Cart = connection.define("carts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Cart.sync({ force: false }).then();