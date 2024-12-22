import { MissionUtils } from "@woowacourse/mission-utils";

class Promotion {
  #name;

  #buy;

  #get;

  #startDate;

  #endDate;

  constructor(name, buy, get, startDate, endDate) {
    this.#name = name;
    this.#buy = buy;
    this.#get = get;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  getName() {
    return this.#name;
  }

  #isInPromotionDate() {
    const today = MissionUtils.DateTimes.now();
    return today >= this.#startDate && today <= this.#endDate;
  }

  #canGetPromotion(quantity) {
    return quantity < this.#buy;
  }

  #getExtraFreeQuantity(lastCount) {
    if (lastCount === this.#buy) return this.#get;
    return 0;
  }

  #getMaxFreeQuantity(costCount, freeCount, extraCount) {
    return { costCount, freeCount, extraCount };
  }

  calcMaxFreeQuantity(quantity) {
    if (!this.#isInPromotionDate() || !this.#canGetPromotion(quantity)) {
      return this.#getMaxFreeQuantity(quantity, 0, 0);
    }
    const set = this.#buy + this.#get;
    const setCount = Math.floor(quantity / set);
    const free = setCount * this.#get;
    const last = quantity % set;
    return this.#getMaxFreeQuantity(quantity - free, free, this.#getExtraFreeQuantity(last));
  }
}

export default Promotion;
