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

  async readPromotions() {
    const file = new File("promotions.md");
    const data = await file.readFile(this.#formatInput);
    return data;
  }

  async readItem() {
    const input = await this.#console.readLineAsync("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n");
    return this.#formatInput(input);
  }

  async readFreeProduct(name, count) {
    const input = await this.#console.readLineAsync(`\n현재 ${name}은(는) ${count}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
    return this.#formatInput(input);
  }

  async readMembershipDiscount() {
    const input = await this.#console.readLineAsync("\n멤버십 할인을 받으시겠습니까? (Y/N)\n");
    return this.#formatInput(input);
  }

  async readRestart() {
    const input = await this.#console.readLineAsync("\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n");
    return this.#formatInput(input);
  }

  // TODO: this를 쓰지 않는 메서드
  #formatInput(input) {
    return input.trim();
  }
}

export default InputView;
