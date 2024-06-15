import { User } from "./User.js";
import { Cart } from "./Cart.js";
import { CartItem } from "./CartItem.js";

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem, { as: "items" });
CartItem.belongsTo(Cart);

export { User, Cart, CartItem };