import errorMessage from "../constants/errorMessage.js";
import ValidationError from "../error/ValidationError.js";

class MembershipDiscount {
  #DISCOUNT_RATE = 0.3;

  #MAX_DISCOUNT = 8000;

  #buyPrice;

  constructor(buyPrice) {
    this.#buyPrice = buyPrice;
  }

  async #askMembership(membershipCallback) {
    const response = await membershipCallback();
    if (this.#validateResponse(response) === "Y") return true;
    return false;
  }

  #discount() {
    const discountPrice = this.#buyPrice * this.#DISCOUNT_RATE;
    return Math.min(Math.floor(discountPrice / 1000) * 1000, this.#MAX_DISCOUNT);
  }

  async discount(membershipCallback) {
    const isMembership = await this.#askMembership(membershipCallback);
    if (isMembership) return this.#discount();
    return 0;
  }

  #validateResponse(response) {
    if (!/[YN]/.test(response)) throw new ValidationError(errorMessage.INVALID_INPUT);
    return response;
  }
}
export default MembershipDiscount;
