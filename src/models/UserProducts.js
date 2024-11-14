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
    this.#formatInput(input, storeProducts);
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

  #formatInput(input, storeProducts) {
    // TODO: 입력 유효성 검사
    this.#buyList = input.split(",").map((item) => {
      if (!/^\[[a-zA-Z가-힣]+-\d+\]$/.test(item)) throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.\n");
      const formattedItem = this.#formatItem(item);
      if (!storeProducts.findProductByName(formattedItem.name)) throw new Error("[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.\n");
      return new UserProduct(formattedItem);
    });
  }

  #formatItem(item) {
    const content = item.replaceAll(this.#REGEXP, "");
    const [name, buyCount] = content.split("-");
    return { name, buyCount };
  }
}

export default UserProducts;
