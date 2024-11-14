import { MissionUtils } from "@woowacourse/mission-utils";

class OutputView {
  #console;

  constructor() {
    this.#console = MissionUtils.Console;
  }

  printHello() {
    this.#console.print("안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n");
  }

  printProducts(products) {
    products.forEach((product) => {
      this.#console.print(`- ${product.name} ${product.price} ${product.quantity} ${product.promotion}`);
    });
    this.printNewline();
  }

  printReceipt(defaultProducts, promotionProducts, priceInfo) {
    this.#console.print("==============W 편의점================");
    this.#printProducts(defaultProducts);
    this.#console.print("=============증  정===============");
    this.#printPromotionProducts(promotionProducts);
    this.#console.print("====================================");
    this.#printPriceInfo(priceInfo);
  }

  #printProducts(products) {
    this.#console.print("상품명        수량         금액");
    products.forEach((product) => {
      this.#console.print(`${product.name}        ${product.quantity}            ${product.price}`);
    });
  }

  #printPromotionProducts(products) {
    products.forEach((product) => {
      this.#console.print(`${product.name}        ${product.quantity}`);
    });
  }

  #printPriceInfo({
    totalPrice, promotionDiscount, membershipDiscount, finalPrice, finalCount,
  }) {
    this.#console.print(`총구매액      ${finalCount}            ${totalPrice}`);
    this.#console.print(`행사할인                   -${promotionDiscount}`);
    this.#console.print(`멤버십할인                 -${membershipDiscount}`);
    this.#console.print(`내실돈                     ${finalPrice}`);
  }

  printNewline() {
    this.#console.print("");
  }

  printError(message) {
    this.#console.print(message);
  }
}

export default OutputView;
