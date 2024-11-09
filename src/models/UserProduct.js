import Product from "./Product";

class UserProduct extends Product {
  #name;

  #quantity;

  constructor({ name, quantity }) {
    super({
      name, quantity, price: 0, promotion: "",
    });
  }

  buyProduct(last) {
    this.#quantity = last;
  }
}

export default UserProduct;
