import { MissionUtils } from "@woowacourse/mission-utils";

const InputView = {
  async readItem() {
    const input = await InputView.consoleInput("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n");
    return input;
  },

  async readDefaultProduct(name, quantity) {
    const input = await InputView.consoleInput(`현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
    return input;
  },

  async readExtraProduct(name, quantity) {
    const input = await InputView.consoleInput(`현재 ${name}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
    return input;
  },

  async consoleInput(message) {
    const input = await MissionUtils.Console.readLineAsync(message);
    return input;
  },

  async fileInput(file) {
    const data = await file.readFile(InputView.formatInput);
    return data;
  },

  formatInput(input) {
    return input.trim();
  },
};

export default InputView;
