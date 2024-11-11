import UserProduct from "./UserProduct.js";

class UserProducts {
  #store;

  /** @type Product[] */
  #cartList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#cartList = [];
  }

  buyProduct(input, store, file) {
    this.#formatInput(input);
    store.sellProducts(this.#cartList, file);
  }

  getCartList() {
    return this.#cartList.map((item) => item.getProduct());
  }

  #formatInput(input) {
    // TODO: 입력 유효성 검사
    this.#cartList = input.split(",").map((item) => new UserProduct(this.#formatItem(item)));
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, quantity] = content.split("-");
    return { name, quantity };
  }
}

export default UserProducts;
