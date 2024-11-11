class Store {
  #promotion;

  #membership;

  #totalPrice;

  #promotionDiscount;

  #membershipDiscount;

  constructor(membership) {
    this.#membership = membership;

    this.#totalPrice = 0;
    this.#promotionDiscount = 0;
    this.#membershipDiscount = 0;
  }

  setTotalPrice(price) {
    this.#totalPrice = price;
  }

  membershipDiscount() {
    this.#membershipDiscount = this.#membership.getDiscountPrice(this.#totalPrice);
    this.#totalPrice -= this.#membershipDiscount;
    return this.#membershipDiscount;
  }
}

export default Store;
