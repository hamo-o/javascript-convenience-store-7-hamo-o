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
}
export default ConvenienceStore;
