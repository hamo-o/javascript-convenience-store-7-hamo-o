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

  async #buyDefaultProduct(name, quantity) {
    const data = await InputView.readDefaultProduct(name, quantity);
    return data;
  }

  async #getExtraProduct(name, quantity) {
    const data = await InputView.readExtraProduct(name, quantity);
    return data;
  }

  async buy() {
    const itemData = await InputView.readItem();
    OutputView.printNewLine();
    await this.#convenienceStore
      .buyProducts(itemData, this.#buyDefaultProduct, this.#getExtraProduct);
  }
}

export default Controller;
