import { DataTypes } from "sequelize";
import { connection } from "../db.js";

export const User = connection.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phoneNumber: {
        type: DataTypes.STRING({ length: 11 }),
        allowNull:false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

await User.sync({ force: false }).then();