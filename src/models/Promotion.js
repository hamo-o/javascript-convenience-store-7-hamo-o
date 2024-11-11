import { MissionUtils } from "@woowacourse/mission-utils";

class Promotion {
  #name;

  #buy;

  #get;

  #startDate;

  #endDate;

  constructor({
    name, buy, get, startDate, endDate,
  }) {
    this.#name = name;
    this.#buy = buy;
    this.#get = get;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  // TODO: 입력 검증

  isInDateRange() {
    const today = MissionUtils.DateTimes.now();
    const afterStartDate = new Date(this.#startDate) <= today;
    const beforeEndDate = new Date(this.#endDate) >= today;

    return afterStartDate && beforeEndDate;
  }

  getPromotion() {
    return {
      name: this.#name,
      buy: this.#buy,
      get: this.#get,
      startDate: this.#startDate,
      endDate: this.#endDate,
    };
  }
}

export default Promotion;
