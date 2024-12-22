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

  printReceipt({ buyList, getList, ...rest }) {
    OutputView.consolePrint("==============W 편의점================");
    OutputView.consolePrint("상품명		수량 	금액");
    OutputView.printBuyList(buyList);
    OutputView.consolePrint("=============증	정===============");
    OutputView.printGetList(getList);
    OutputView.consolePrint("====================================");
    OutputView.printTotal(rest);
  },

  printBuyList(buyList) {
    buyList.forEach(({ name, price, quantity }) => {
      OutputView.consolePrint(`${name}	${quantity} 	${price}`);
    });
  },

  printGetList(getList) {
    getList.forEach(({ name, quantity }) => {
      OutputView.consolePrint(`${name}	${quantity}`);
    });
  },

  printTotal(info) {
    OutputView.consolePrint(`총구매액	${info.totalQuantity}	${info.totalPriceBefore}`);
    OutputView.consolePrint(`행사할인		${info.totalPromotionDiscount}`);
    OutputView.consolePrint(`멤버십할인		${info.totalMembershipDiscount}`);
    OutputView.consolePrint(`내실돈			${info.totalPriceAfter}`);
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
