import Controller from "./controller/Controller.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async run() {
    await this.#controller.showList();
    await this.#controller.buy();
    await this.#controller.membershipDiscount();
    this.#controller.printReceipt();
  }
}

export default App;
