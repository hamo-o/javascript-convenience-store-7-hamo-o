import Product from "./Product.js";

class UserProduct extends Product {
  constructor({ name, quantity }) {
    super({
      name, price: 0, quantity, promotion: "",
    });
  }

  isRemain() {
    return this.quantity;
  }

  buy(last) {
    this.quantity = last;
  }
}

export default UserProduct;
