import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
  printProducts() {
    OutputView.consolePrint("- 콜라 1,000원 10개 탄산2+1");
    // ...
  },
  consolePrint(message) {
    MissionUtils.Console.print(message);
  },
};

export default OutputView;
