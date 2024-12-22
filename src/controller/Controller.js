import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import File from "../utils/File.js";

import ConvenienceStore from "../models/ConvenienceStore.js";

class Controller {
  #productsFile;

  #promotionsFile;

  #convenienceStore;

  constructor() {
    this.#productsFile = new File("products.md");
    this.#promotionsFile = new File("promotions.md");
  }

  async #prepare() {
    const products = await InputView.fileInput(this.#productsFile);
    const promotions = await InputView.fileInput(this.#promotionsFile);
    this.#convenienceStore = new ConvenienceStore(
      products.body,
      promotions.body,
    );
  }

  async showList() {
    await this.#prepare();
    OutputView.printWelcome();
    OutputView.printProducts(this.#convenienceStore.getStockList());
  }

  async buy() {
    const itemData = await InputView.readItem();
    this.#convenienceStore.buyProducts(itemData);
  }
}

export default Controller;
