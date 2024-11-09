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
      this.#console.print(`- ${product.name} ${product.price}원 ${product.quantity}개 ${product.promotion}`);
    });
    this.printNewline();
  }

  printNewline() {
    this.#console.print("");
  }
}

export default OutputView;
