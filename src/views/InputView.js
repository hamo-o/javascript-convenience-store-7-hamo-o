import { MissionUtils } from "@woowacourse/mission-utils";
import File from "../utils/File.js";

class InputView {
  #console;

  constructor() {
    this.#console = MissionUtils.Console;
  }

  // TODO: 파일 객체 생성을 어떻게 관리할 것인가
  async readProducts() {
    const file = new File("products.md");
    const data = await file.readFile(this.#formatInput);
    return data;
  }

  async readItem() {
    const input = await this.#console.readLineAsync("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])");
    return this.#formatInput(input);
  }

  // TODO: this를 쓰지 않는 메서드
  #formatInput(input) {
    return input.trim();
  }
}

export default InputView;
