import { MissionUtils } from "@woowacourse/mission-utils";

const InputView = {
  async readItem() {
    const input = await InputView.consoleInput("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])");
    // ...
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
