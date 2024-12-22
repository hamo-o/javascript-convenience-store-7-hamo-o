import Controller from "./controller/Controller.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async run() {
    await this.#controller.showList();
    await this.#controller.buy();
  }
}

export default App;
