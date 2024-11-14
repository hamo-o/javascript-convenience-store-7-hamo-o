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

  checkMembership() {
    this.calcTotalPrice();
    this.#membershipDiscount = this.#membership.getDiscountPrice(this.#totalPrice);
    return this.#membershipDiscount;
  }

  membershipDiscount() {
    this.#finalPrice -= this.#membershipDiscount;
    return this.#membershipDiscount;
  }

  getCartList() {
    return this.#cartList.map((item) => ({
      ...item, price: item.price.toLocaleString(),
    }));
  }

  getPriceInfo() {
    return {
      totalPrice: this.#totalPrice.toLocaleString(),
      promotionDiscount: this.#promotionDiscount.toLocaleString(),
      membershipDiscount: this.#membershipDiscount.toLocaleString(),
      finalPrice: this.#finalPrice.toLocaleString(),
    };
  }
}

export default Store;
