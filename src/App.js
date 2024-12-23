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
    await this.#controller.update();
    const flag = await this.#controller.restart();
    if (flag) this.run();
  }
}

export default App;
