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
}

export default Promotion;
