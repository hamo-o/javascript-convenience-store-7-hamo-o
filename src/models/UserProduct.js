import Product from "./Product";

class UserProduct extends Product {
  constructor({ name, quantity }) {
    super({
      name, quantity, price: 0, promotion: "",
    });
  }
}

export default UserProduct;
