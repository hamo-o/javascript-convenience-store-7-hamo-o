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

  #buyDefaultProduct(name, quantity) {
    OutputView.consolePrint(`현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`);
  }

  #getExtraProduct(name, quantity) {
    OutputView.consolePrint(`현재 ${name}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`);
  }

  async buy() {
    const itemData = await InputView.readItem();
    this.#convenienceStore.buyProducts(itemData, this.#buyDefaultProduct, this.#getExtraProduct);
  }
}

export default Controller;
