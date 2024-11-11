import UserProduct from "./UserProduct.js";

class UserProducts {
  /** @type Product[] */
  #buyList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#buyList = [];
  }

  buyProduct(input, storeProducts) {
    this.#formatInput(input);
    return storeProducts.sellProducts(this.#buyList);
  }

  #formatInput(input) {
    // TODO: 입력 유효성 검사
    this.#buyList = input.split(",").map((item) => new UserProduct(this.#formatItem(item)));
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, quantity] = content.split("-");
    return { name, quantity };
  }
}

export default UserProducts;
