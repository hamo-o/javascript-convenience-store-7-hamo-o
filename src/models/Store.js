class Store {
  #cartList;

  #promotion;

  #membership;

  #totalPrice;

  #promotionDiscount;

  #membershipDiscount;

  #finalPrice;

  constructor(membership) {
    this.#membership = membership;

    this.#totalPrice = 0;
    this.#promotionDiscount = 0;
    this.#membershipDiscount = 0;
    this.#finalPrice = 0;
  }

  setCartList(cartList) {
    this.#cartList = cartList;
  }

  calcTotalPrice() {
    this.#totalPrice = this.#cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.#finalPrice = this.#totalPrice;
    return this.#totalPrice;
  }

  membershipDiscount() {
    this.#membershipDiscount = this.#membership.getDiscountPrice(this.#totalPrice);
    this.#finalPrice -= this.#membershipDiscount;
    return this.#membershipDiscount;
  }

  getPriceInfo() {
    return {
      totalPrice: this.#totalPrice,
      promotionDiscount: this.#promotionDiscount,
      membershipDiscount: this.#membershipDiscount,
      finalPrice: this.#finalPrice,
    };
  }
}

export default Store;
