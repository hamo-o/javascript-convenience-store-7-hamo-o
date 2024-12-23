import { MissionUtils } from "@woowacourse/mission-utils";

class Promotion {
  #name;

  #buy;

  #get;

  #startDate;

  #endDate;

  constructor(name, buy, get, startDate, endDate) {
    this.#name = name;
    this.#buy = Number(buy);
    this.#get = Number(get);
    this.#startDate = new Date(startDate);
    this.#endDate = new Date(endDate);
  }

  getName() {
    return this.#name;
  }

  #isInPromotionDate() {
    const today = MissionUtils.DateTimes.now();
    return today >= this.#startDate && today <= this.#endDate;
  }

  #getExtraFreeQuantity(lastCount) {
    if (lastCount === this.#buy) return this.#get;
    return 0;
  }

  #getMaxFreeQuantity(costCount, freeCount, extraCount) {
    return { costCount, freeCount, extraCount };
  }

  #calcMaxFreeQuantity(quantity) {
    const set = this.#buy + this.#get;
    const setCount = Math.floor(quantity / set);
    const cost = setCount * this.#buy;
    const free = setCount * this.#get;
    const last = quantity % set;
    return this.#getMaxFreeQuantity(cost, free, this.#getExtraFreeQuantity(last));
  }

  calcMaxFreeQuantity(quantity) {
    if (!this.#isInPromotionDate()) return null;

    if (quantity === 1) {
      if (this.#buy === 1) return this.#getMaxFreeQuantity(1, 1, 0);
      if (this.#buy === 2) return null;
    }

    return this.#calcMaxFreeQuantity(quantity);
  }
}

export default Promotion;
