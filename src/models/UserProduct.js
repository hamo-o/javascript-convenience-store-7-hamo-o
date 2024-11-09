import Product from "./Product";

class UserProduct extends Product {
  constructor({ name, quantity }) {
    super({
      name, quantity, price: 0, promotion: "",
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
