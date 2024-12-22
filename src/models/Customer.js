class Customer {
  #buyList;

  #getList;

  #totalPriceBefore;

  #totalPromotionDiscount;

  #totalMembershipDiscount;

  #totalPriceAfter;

  #totalQuantity;

  constructor() {
    this.#buyList = new Map();
    this.#getList = new Map();
    this.#totalQuantity = 0;
    this.#totalPriceBefore = 0;
    this.#totalPromotionDiscount = 0;
    this.#totalMembershipDiscount = 0;
    this.#totalPriceAfter = 0;
  }

  addBuyList({ name, price, quantity }) {
    if (this.#buyList.has(name)) {
      this.#buyList.get(name).quantity += quantity;
      this.#buyList.get(name).price += quantity * price;
      return;
    }
    this.#buyList.set(name, { name, price: price * quantity, quantity });
  }

  addGetList({ name, price, quantity }) {
    if (this.#getList.has(name)) {
      this.#getList.get(name).quantity += quantity;
      this.#getList.get(name).price += quantity * price;
      return;
    }
    this.#getList.set(name, { name, price: price * quantity, quantity });
  }

  #calcPromotionDiscount() {
    return Array.from(this.#getList).reduce(
      (acc, [name, { price }]) => acc + price,
      0,
    );
  }

  #calcTotalPriceBeforeMembership() {
    return Array.from(this.#buyList).reduce(
      (
        [totalCount, totalPrice],
        [_, { quantity, price }],
      ) => [totalCount + quantity, totalPrice + price],
      [0, 0],
    );
  }

  getBeforeMembershipDiscount() {
    [this.#totalQuantity, this.#totalPriceBefore] = this.#calcTotalPriceBeforeMembership();
    this.#totalPromotionDiscount = this.#calcPromotionDiscount();
    return this.#totalPriceBefore - this.#totalPromotionDiscount;
  }

  calcTotalPriceAfterMembership(membershipDiscount) {
    this.#totalMembershipDiscount = membershipDiscount;
    const totalDiscount = this.#totalPromotionDiscount + this.#totalMembershipDiscount;
    this.#totalPriceAfter = this.#totalPriceBefore - totalDiscount;
  }

  #formatList(list) {
    return Array.from(list)
      .map(
        ([_, { name, price, quantity }]) => ({ name, price: this.#formatPrice(price), quantity }),
      );
  }

  getCusomterInfos() {
    return {
      buyList: this.#formatList(this.#buyList),
      getList: this.#formatList(this.#getList),
      totalQuantity: this.#totalQuantity,
      totalPriceBefore: this.#formatPrice(this.#totalPriceBefore),
      totalPromotionDiscount: `-${this.#formatPrice(this.#totalPromotionDiscount)}`,
      totalMembershipDiscount: `-${this.#formatPrice(this.#totalMembershipDiscount)}`,
      totalPriceAfter: this.#formatPrice(this.#totalPriceAfter),
    };
  }

  #formatPrice(price) {
    return price.toLocaleString();
  }
}

export default Customer;
