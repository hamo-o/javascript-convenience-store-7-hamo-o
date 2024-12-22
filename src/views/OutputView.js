import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
  printWelcome() {
    OutputView.consolePrint("안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.");
    OutputView.printNewLine();
  },

  printProducts(products) {
    products.forEach(({
      name, price, quantity, promotion,
    }) => {
      OutputView.consolePrint(`- ${name} ${price} ${quantity} ${promotion}`);
    });
    OutputView.printNewLine();
  },

  printNewLine() {
    OutputView.consolePrint("");
  },

  consolePrint(message) {
    MissionUtils.Console.print(message);
  },
};

export default OutputView;
