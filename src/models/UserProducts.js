import UserProduct from "./UserProduct.js";

class UserProducts {
  /** @type Product[] */
  #buyList;

  #cartList;

  #REGEXP = /\[|\]/g;

  constructor() {
    this.#buyList = [];
  }

  buyProduct(input, storeProducts) {
    this.#formatInput(input);
    this.#cartList = storeProducts.sellProducts(this.#buyList);
    return this.#cartList;
  }

  calcFreeItems() {
    const freeItems = [];
    this.#cartList.forEach((item) => {
      const { name, quantity, promotion } = item;
      const count = this.#calcFreeItem(promotion, quantity);
      if (count) freeItems.push({ name, count });
    });
    return freeItems;
  }

  #calcFreeItem(promotion, quantity) {
    if (!promotion || typeof promotion !== "object") return 0;
    return promotion.countFreeItems(quantity);
  }

  #formatInput(input) {
    // TODO: 입력 유효성 검사
    this.#buyList = input.split(",").map((item) => new UserProduct(this.#formatItem(item)));
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, buyCount] = content.split("-");
    return { name, buyCount };
  }
}

export default UserProducts;
