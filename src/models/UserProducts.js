import UserProduct from "./UserProduct.js";

class UserProducts {
  /** @type Product[] */
  #buyList;

  #cartList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#buyList = [];
    this.#cartList = [];
  }

  buyProduct(input, storeProducts) {
    this.#formatInput(input);
    storeProducts.sellProducts(this.#buyList);
  }

  getCartList() {
    return this.#buyList.map((item) => item.getProduct());
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
