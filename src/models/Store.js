class Store {
  #defaultCartList;

  #promotionCartList;

  #membership;

  #totalPrice;

  #promotionDiscount;

  #membershipDiscount;

  #finalPrice;

  constructor(membership) {
    this.#defaultCartList = [];
    this.#promotionCartList = [];
    this.#membership = membership;

    this.#totalPrice = 0;
    this.#promotionDiscount = 0;
    this.#membershipDiscount = 0;
    this.#finalPrice = 0;
  }

  addToDefaultCartList(item) {
    this.#defaultCartList.push(item);
  }

  addToPromotionCartList(item) {
    this.#promotionCartList.push(item);
  }

  calcTotalPrice() {
    this.#finalPrice = this.#sumCartList(this.#defaultCartList);
    this.#promotionDiscount = this.#sumCartList(this.#promotionCartList);

    this.#totalPrice = this.#finalPrice + this.#promotionDiscount;
    return this.#totalPrice;
  }

  #sumCartList(list) {
    return list.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }

  #sumCartCount(list) {
    return list.reduce((acc, item) => acc + item.quantity, 0);
  }

  #calcFinalCount() {
    return this.#sumCartCount(this.#defaultCartList) + this.#sumCartCount(this.#promotionCartList);
  }

  checkMembership() {
    this.calcTotalPrice();
    this.#membershipDiscount = this.#membership.getDiscountPrice(this.#totalPrice);
    return this.#membershipDiscount;
  }

  membershipDiscount() {
    this.#finalPrice -= this.#membershipDiscount;
    return this.#membershipDiscount;
  }

  getDefaultCartList() {
    return this.#defaultCartList.map((item) => ({
      ...item, price: item.price.toLocaleString(),
    }));
  }

  getPromotionCartList() {
    return this.#promotionCartList.map((item) => ({
      ...item, price: item.price.toLocaleString(),
    }));
  }

  getPriceInfo() {
    return {
      totalPrice: this.#totalPrice.toLocaleString(),
      promotionDiscount: this.#promotionDiscount.toLocaleString(),
      membershipDiscount: this.#membershipDiscount.toLocaleString(),
      finalCount: this.#calcFinalCount(),
      finalPrice: this.#finalPrice.toLocaleString(),
    };
  }
}

export default Store;
