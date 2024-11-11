class Store {
  #userCart;

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

  setTotalPrice(cartList) {
    this.#totalPrice = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return this.#totalPrice;
  }

  membershipDiscount() {
    this.#membershipDiscount = this.#membership.getDiscountPrice(this.#totalPrice);
    this.#totalPrice -= this.#membershipDiscount;
    return this.#membershipDiscount;
  }
}

export default Store;
