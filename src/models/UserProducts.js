import UserProduct from "./UserProduct.js";

class UserProducts {
  #store;

  /** @type Product[] */
  #cartList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#cartList = [];
  }

  buyProduct(input, store) {
    return this.#formatInput(input).map((item) => item.getProduct());
  }

  #formatInput(input) {
    // TODO: 입력 유효성 검사
    const items = input.split(",").map((item) => new UserProduct(this.#formatItem(item)));
    return items;
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, quantity] = content.split("-");
    return { name, quantity };
  }
}

export default UserProducts;
