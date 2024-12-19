import Promotion from "./Promotion.js";

class PromotionDiscount {
  #promotionList;

  constructor(promotionList) {
    this.#promotionList = this.#formatPromotionList(promotionList);
  }

  #formatPromotionList(promotionList) {
    const promotions = new Map();
    promotionList.forEach((promotion) => {
      const [name, buy, get, startDate, endDate] = promotion.split(",");
      promotions.set(name, new Promotion(name, buy, get, startDate, endDate));
    });
    return promotions;
  }

  findPromotionByName(name) {
    return this.#promotionList.get(name);
  }
}

export default PromotionDiscount;
