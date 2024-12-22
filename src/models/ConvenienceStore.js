import Product from "./Product.js";
import PromotionDiscount from "./PromotionDiscount.js";
import Customer from "./Customer.js";

class ConvenienceStore {
  #stockList;

  #promotionDiscount;

  #customer;

  constructor(products, promotions) {
    this.#promotionDiscount = new PromotionDiscount(promotions);
    this.#stockList = this.#formatStockList(products);
    this.#customer = new Customer();
  }

  #formatStockList(products) {
    return products.map((stock) => {
      const [name, price, quantity, promotion] = stock.split(",");
      const formatedPromotion = this.#promotionDiscount.findPromotionByName(promotion);
      return new Product(name, Number(price), Number(quantity), formatedPromotion);
    });
  }

  getStockList() {
    return this.#stockList.map((product) => product.getFormattedProduct());
  }

  #formatBuyList(buyList) {
    return buyList.split(",").map((buy) => {
      const ITEM_LAST_CHAR = buy.length - 1;
      if (buy[0] !== "[" || buy[ITEM_LAST_CHAR] !== "]") throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.");
      const [name, quantity] = buy.slice(1, ITEM_LAST_CHAR).split("-");
      return { name, quantity: Number(quantity) };
    });
  }

  #buyProduct({ name, quantity }) {
    const filteredProducts = this.#stockList.filter((product) => product.isEqual(name));
    return filteredProducts.reduce(
      (lastBuyCount, cur) => {
        if (lastBuyCount === 0) return 0;
        return lastBuyCount - cur.sell(lastBuyCount, this.#customer);
      },
      quantity,
    );
  }

  buyProducts(buyList) {
    const formattedBuyList = this.#formatBuyList(buyList);
    formattedBuyList.forEach((product) => {
      // TODO: 순회 줄이기. 배열 대신 다른 자료구조 변경
      const finalBuyCount = this.#buyProduct(product);
      if (finalBuyCount) throw new Error("[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.");
    });
  }

  getCustomerInfos() {
    return this.#customer.getCusomterInfos();
  }
}
export default ConvenienceStore;
