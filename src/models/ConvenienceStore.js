import Product from "./Product.js";
import PromotionDiscount from "./PromotionDiscount.js";
import ValidationError from "../error/ValidationError.js";
import errorMessage from "../constants/errorMessage.js";

class ConvenienceStore {
  #stockList;

  #promotionDiscount;

  #customer;

  constructor(products, promotions, customer) {
    this.#promotionDiscount = new PromotionDiscount(promotions);
    this.#stockList = new Map();
    this.#formatStockList(products);
    this.#customer = customer;
  }

  #initProduct(name, price, quantity, promotion) {
    const stock = new Map();
    if (promotion) {
      stock.set("promotion", new Product(name, Number(price), Number(quantity), promotion));
      stock.set("default", new Product(name, Number(price), 0, undefined));
    } else stock.set("default", new Product(name, Number(price), Number(quantity), promotion));
    this.#stockList.set(name, stock);
  }

  #formatStockList(products) {
    products.forEach((stock) => {
      const [name, price, quantity, promotion] = stock.split(",");
      const formatedPromotion = this.#promotionDiscount.findPromotionByName(promotion);

      if (!this.#stockList.has(name)) this.#initProduct(name, price, quantity, formatedPromotion);
      else this.#stockList.get(name).get("default").setQuantity(Number(quantity));
    });
  }

  getStockList() {
    return Array.from(this.#stockList)
      .map(([name, stock]) => Array.from(stock)
        .map(([tag, product]) => product.getFormattedProduct()))
      .flat();
  }

  #formatBuyList(buyList) {
    return buyList.split(",").map((buy) => {
      const ITEM_LAST_CHAR = buy.length - 1;
      if (buy[0] !== "[" || buy[ITEM_LAST_CHAR] !== "]") throw new ValidationError(errorMessage.INVALID_FORMAT);
      const [name, quantity] = buy.slice(1, ITEM_LAST_CHAR).split("-");
      return { name, quantity: Number(quantity) };
    });
  }

  #isValidStock(stock, quantity) {
    return Array.from(stock)
      .reduce((acc, [tag, product]) => acc + product.getQuantity(), 0) >= quantity;
  }

  #buyProduct({ name, quantity }) {
    const stock = this.#stockList.get(name);
    if (!stock) throw new ValidationError(errorMessage.ABSENT_PRODUCT);
    if (!this.#isValidStock(stock, quantity)) throw new ValidationError(errorMessage.INVALID_QUANTITY);
    if (stock.has("promotion")) {
      const { lastCount, extraCount } = stock.get("promotion").sellPromotion(quantity, this.#customer);
      return { lastCount, extraCount };
    }
    stock.get("default").sellDefault(quantity, this.#customer);
  }

  async #askExtra(extraCallback, name, extraCount) {
    const response = await extraCallback(name, extraCount);
    if (this.#validateResponse(response) === "Y") {
      this.#stockList.get(name).get("promotion").sellExtra(extraCount, this.#customer);
    }
  }

  async #askDefault(defaultProductCallback, name, lastCount) {
    const response = await defaultProductCallback(name, lastCount);
    if (this.#validateResponse(response) === "Y") {
      this.#stockList.get(name).get("default").sellDefault(lastCount, this.#customer);
    }
  }

  async buyProducts(buyList, defaultProductCallback, extraCallback) {
    const formattedBuyList = this.#formatBuyList(buyList);
    for (const product of formattedBuyList) {
      const result = this.#buyProduct(product);
      if (result?.extraCount) await this.#askExtra(extraCallback, product.name, result.extraCount);
      else if (result?.lastCount) await this.#askDefault(defaultProductCallback, product.name, result.lastCount);
    }
  }

  getCustomerInfos() {
    return this.#customer.getCusomterInfos();
  }

  async restart(repeatCallback) {
    const response = await repeatCallback();
    if (this.#validateResponse(response) === "Y") return true;
    return false;
  }

  #validateResponse(response) {
    if (!/[YN]/.test(response)) throw new ValidationError(errorMessage.INVALID_INPUT);
    return response;
  }

  getNewContent() {
    return Array.from(this.#stockList).map(([name, stock]) => Array.from(stock)
      .map(([tag, product]) => product.getContent()))
      .flat().join("\n");
  }
}
export default ConvenienceStore;
