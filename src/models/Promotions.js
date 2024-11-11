import Promotion from "./Promotion.js";

class Promotions {
  #promotions;

  #promotionHeader;

  constructor() {
    this.#promotions = [];
    this.#promotionHeader = [];
  }

  setPromotions({ header, body }) {
    this.#promotionHeader = header.split(",");
    this.#promotions = body.map((item) => new Promotion(this.#createPromotion(item)));
  }

  findPromotionByName(name) {
    return this.#promotions.find((promotion) => promotion.isEqaulPromotion(name));
  }

  #createPromotion(item) {
    // TODO: split 유틸로 빼기
    // TODO: product, promotion 입력 동일하게 처리 따로 빼기
    const itemArray = item.split(",").map((str) => str.trim());
    return this.#promotionHeader.reduce((obj, key, idx) => ({ ...obj, [key]: itemArray[idx] }), {});
  }
}

export default Promotions;
