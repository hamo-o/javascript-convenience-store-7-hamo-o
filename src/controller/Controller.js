import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import File from "../utils/File.js";

import ConvenienceStore from "../models/ConvenienceStore.js";
import Customer from "../models/Customer.js";
import MembershipDiscount from "../models/MembershipDiscount.js";

class Controller {
  #productsFile;

  #promotionsFile;

  #convenienceStore;

  #customer;

  constructor() {
    this.#productsFile = new File("products.md");
    this.#promotionsFile = new File("promotions.md");
  }

  async #prepare() {
    const products = await InputView.fileInput(this.#productsFile);
    const promotions = await InputView.fileInput(this.#promotionsFile);
    this.#customer = new Customer();
    this.#convenienceStore = new ConvenienceStore(
      products.body,
      promotions.body,
      this.#customer,
    );
  }

  async showList() {
    await this.#prepare();
    OutputView.printWelcome();
    OutputView.printProducts(this.#convenienceStore.getStockList());
  }

  async #buyDefaultProduct(name, quantity) {
    try {
      const data = await InputView.readDefaultProduct(name, quantity);
      OutputView.printNewLine();
      return data;
    } catch (error) {
      OutputView.consolePrint(error.message);
      await this.#buyDefaultProduct(name, quantity);
    }
  }

  async #getExtraProduct(name, quantity) {
    try {
      const data = await InputView.readExtraProduct(name, quantity);
      OutputView.printNewLine();
      return data;
    } catch (error) {
      OutputView.consolePrint(error.message);
      await this.#getExtraProduct(name, quantity);
    }
  }

  async buy() {
    try {
      const itemData = await InputView.readItem();
      OutputView.printNewLine();
      await this.#convenienceStore.buyProducts(itemData, this.#buyDefaultProduct, this.#getExtraProduct);
    } catch (error) {
      OutputView.consolePrint(error.message);
      await this.buy();
    }
  }

  async #getMembership() {
    try {
      const data = await InputView.readMembership();
      OutputView.printNewLine();
      return data;
    } catch (error) {
      OutputView.consolePrint(error.message);
      await this.#getMembership();
    }
  }

  async membershipDiscount() {
    const beforeMembership = this.#customer.getBeforeMembershipDiscount();
    const membership = new MembershipDiscount(beforeMembership);
    const membershipDiscount = await membership.discount(this.#getMembership);
    this.#customer.calcTotalPriceAfterMembership(membershipDiscount);
  }

  printReceipt() {
    OutputView.printReceipt(this.#customer.getCusomterInfos());
  }

  async update() {
    await InputView.fileInput(
      this.#productsFile,
      this.#convenienceStore.getNewContent(),
    );
  }

  async restart() {
    const data = await InputView.readRepeat();
    OutputView.printNewLine();
    if (data === "Y") return true;
    return false;
  }
}

export default Controller;
