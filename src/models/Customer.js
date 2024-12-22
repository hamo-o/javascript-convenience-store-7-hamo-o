class Customer {
  #buyList;

  #getList;

  #totalPriceBefore;

  #totalPromotionDiscount;

  #totalMembershipDiscount;

  #totalPriceAfter;

  constructor() {
    this.#buyList = [];
    this.#getList = [];
    this.#totalPriceBefore = 0;
    this.#totalPromotionDiscount = 0;
    this.#totalMembershipDiscount = 0;
    this.#totalPriceAfter = 0;
  }

  addBuyList(product) {
    this.#buyList.push(product);
  }

  addGetList(product) {
    this.#getList.push(product);
  }

  getCusomterInfos() {
    return {
      buyList: this.#buyList,
      getList: this.#getList,
      totalPriceBefore: this.#totalPriceBefore,
      totalPromotionDiscount: this.#totalPromotionDiscount,
      totalMembershipDiscount: this.#totalMembershipDiscount,
      totalPriceAfter: this.#totalPriceAfter,
    };
  }
}

export default Customer;
