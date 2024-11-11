class UserProduct {
  #name;

  #buyCount;

  constructor({ name, buyCount }) {
    this.#name = name;
    this.#buyCount = buyCount;
  }

  isRemain() {
    return +this.#buyCount;
  }

  buy(last) {
    this.#buyCount = last;
  }

  getName() {
    return this.#name;
  }
}

export default UserProduct;
