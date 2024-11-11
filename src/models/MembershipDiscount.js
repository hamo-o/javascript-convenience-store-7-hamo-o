class MembershipDiscount {
  #MAX_DISCOUNT = 8000;

  #DISCOUNT_RATE = 0.3;

  #FLOOR_STANDARD = 1000;

  getDiscountPrice(originPrice) {
    const discount = originPrice * this.#DISCOUNT_RATE;
    if (discount <= this.#MAX_DISCOUNT) {
      return this.#floorToThousand(discount);
    }
    return this.#MAX_DISCOUNT;
  }

  #floorToThousand(number) {
    return Math.floor(number / this.#FLOOR_STANDARD) * this.#FLOOR_STANDARD;
  }
}

export default MembershipDiscount;
