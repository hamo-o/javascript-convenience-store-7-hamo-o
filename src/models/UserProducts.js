import Product from "./Product";

class UserProducts {
  #store;

  /** @type Product[] */
  #cartList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#cartList = [];
  }

  buyProduct(input, store) {
    return this.#formatInput(input);
  }

  #formatInput(input) {
    // TODO: 입력 유효성 검사
    const items = input.split(",").map((item) => {
      const product = new Product(this.#formatItem(item));
      return product.getProduct();
    });
    return items;
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, quantity] = content.split("-");
    return { name, quantity, price: 0 };
  }
}

export default UserProducts;
