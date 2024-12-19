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
}

export default Customer;
