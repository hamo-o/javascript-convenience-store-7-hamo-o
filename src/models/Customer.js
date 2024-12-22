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

  #calcPromotionDiscount() {
    this.#totalPromotionDiscount = this.#getList.reduce(
      (acc, { quantity, price }) => acc + quantity * price,
      0,
    );
    return this.#totalPromotionDiscount;
  }

  #calcTotalPriceBeforeMembership() {
    const buyPrice = this.#buyList.reduce(
      (acc, { quantity, price }) => acc + quantity * price,
      0,
    );
    this.#totalPriceBefore = buyPrice + this.#calcPromotionDiscount();
    return this.#totalPriceBefore;
  }

  getBeforeMembershipDiscount() {
    this.#calcTotalPriceBeforeMembership();
    return this.#totalPriceBefore - this.#totalPromotionDiscount;
  }

  calcTotalPriceAfterMembership(membershipDiscount) {
    this.#totalMembershipDiscount = membershipDiscount;
    const totalDiscount = this.#totalPromotionDiscount + this.#totalMembershipDiscount;
    this.#totalPriceAfter = this.#totalPriceBefore - totalDiscount;
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
