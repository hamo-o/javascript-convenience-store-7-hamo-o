# javascript-convenience-store-precourse

# 기능 목록
### 사용자 - 구매 내역

- [x]  구매할 상품명, 수량 을 저장
- [ ]  총구매액은 상품별 가격과 수량을 곱하여 계산
- [ ]  프로모션 및 멤버십 할인 정책을 반영하여 최종 결제 금액을 산출

### **편의점 - 재고 관리**

- [x]  편의점 재고의 상품명, 수량, 금액, 프로모션 정보를 저장한다.
- [x]  보유 재고 정보를 제공한다.
- [ ]  각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.
- [x]  고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.
- [x]  재고를 차감함으로써 시스템은 최신 재고 상태를 유지하며, 다음 고객이 구매할 때 정확한 재고 정보를 제공한다.

### 프로모션
- [x]  오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용한다.

### **프로모션 할인**
- [ ]  프로모션은 N개 구매 시 1개 무료 증정(Buy N Get 1 Free)의 형태로 진행된다.
- [ ]  1+1 또는 2+1 프로모션이 각각 지정된 상품에 적용되며, 동일 상품에 여러 프로모션이 적용되지 않는다.
- [ ]  프로모션 혜택은 프로모션 재고 내에서만 적용할 수 있다.
- [ ]  프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감하며, 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다.

### **멤버십 할인**

- [ ]  멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
- [ ]  프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- [ ]  멤버십 할인의 최대 한도는 8,000원이다.

### **영수증 출력**

- [ ]  구매 상품 내역: 구매한 상품명, 수량, 가격
- [ ]  증정 상품 내역: 프로모션에 따라 무료로 제공된 증정 상품의 목록
- [ ]  금액 정보
    - [ ]  총구매액: 구매한 상품의 총 수량과 총 금액
    - [ ]  행사할인: 프로모션에 의해 할인된 금액
    - [ ]  멤버십할인: 멤버십에 의해 추가로 할인된 금액
    - [ ]  내실돈: 최종 결제 금액
- [ ]  영수증의 구성 요소를 보기 좋게 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게 한다.

### **입력**

- [x]  구현에 필요한 상품 목록과 행사 목록을 파일 입출력을 통해 불러온다.
    - [x]  `public/products.md`과 `public/promotions.md` 파일을 이용한다.
    - [x]  두 파일 모두 내용의 형식을 유지한다면 값은 수정할 수 있다.
- [ ]  구매할 상품과 수량을 입력 받는다.
    - [x]  상품명, 수량은 하이픈(-)으로, 개별 상품은 대괄호([])로 묶어 쉼표(,)로 구분한다.
    - [ ]  사용자가 잘못된 값을 입력할 경우
        - [ ]  구매할 상품과 수량 형식이 올바르지 않은 경우: `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`
        - [ ]  존재하지 않는 상품을 입력한 경우: `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`
        - [ ]  구매 수량이 재고 수량을 초과한 경우: `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
        - [ ]  해당 지점부터 다시 입력을 받는다.
- [ ]  프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력받는다.
    - [ ]  사용자가 잘못된 값을 입력할 경우
        - [ ]  `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.` 출력
        - [ ]  해당 지점부터 다시 입력을 받는다.
    - [ ]  Y: 증정 받을 수 있는 상품을 추가한다.
    - [ ]  N: 증정 받을 수 있는 상품을 추가하지 않는다.
- [ ]  프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력받는다.
    - [ ]  사용자가 잘못된 값을 입력할 경우
        - [ ]  `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.` 출력
        - [ ]  해당 지점부터 다시 입력을 받는다.
    - [ ]  Y: 일부 수량에 대해 정가로 결제한다.
    - [ ]  N: 정가로 결제해야하는 수량만큼 제외한 후 결제를 진행한다.
- [ ]  멤버십 할인 적용 여부를 입력 받는다.
    - [ ]  사용자가 잘못된 값을 입력할 경우
        - [ ]  `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.` 출력
        - [ ]  해당 지점부터 다시 입력을 받는다.
    - [ ]  Y: 멤버십 할인을 적용한다.
    - [ ]  N: 멤버십 할인을 적용하지 않는다.
- [ ]  추가 구매 여부를 입력 받는다.
    - [ ]  사용자가 잘못된 값을 입력할 경우
        - [ ]  `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.` 출력
        - [ ]  해당 지점부터 다시 입력을 받는다.
    - [ ]  Y: 재고가 업데이트된 상품 목록을 확인 후 추가로 구매를 진행한다.
    - [ ]  N: 구매를 종료한다.

### **출력**

- [x]  환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다.
    
    ```bash
    안녕하세요. W편의점입니다.
    현재 보유하고 있는 상품입니다.
    
    - ${상품명} ${가격}원 ${재고}개 ${프로모션 이름}
    ```
    
    - [x]  만약 재고가 0개라면 `재고 없음`을 출력한다.
    - [x]  만약 프로모션 이름이 없다면 빈 문자열을 출력한다.
- [ ]  프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우, 혜택에 대한 안내 메시지를 출력한다.
    
    ```bash
    현재 ${상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
    ```
    
- [ ]  프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부에 대한 안내 메시지를 출력한다.
    
    ```bash
    현재 ${상품명} ${수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
    ```
    
- [ ]  멤버십 할인 적용 여부를 확인하기 위해 안내 문구를 출력한다.
    
    ```bash
    멤버십 할인을 받으시겠습니까? (Y/N)
    ```
    
- [ ]  구매 상품 내역, 증정 상품 내역, 금액 정보를 출력한다.
    - [ ]  구매 상품 내역 출력
    - [ ]  증정 상품 내역 출력
    - [ ]  금액 정보 출력
    
    ```
    ==============W 편의점================
    상품명		수량	금액
    콜라		3 	3,000
    에너지바 		5 	10,000
    =============증	정===============
    콜라		1
    ====================================
    총구매액		8	13,000
    행사할인			-1,000
    멤버십할인			-3,000
    내실돈			 9,000
    
    ```
    
- [ ]  추가 구매 여부를 확인하기 위해 안내 문구를 출력한다.
    
    ```bash
    감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
    ```
    
- [ ]  사용자가 잘못된 값을 입력했을 때, "[ERROR]"로 시작하는 오류 메시지와 함께 상황에 맞는 안내를 출력한다.
    - [ ]  구매할 상품과 수량 형식이 올바르지 않은 경우: `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`
    - [ ]  존재하지 않는 상품을 입력한 경우: `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`
    - [ ]  구매 수량이 재고 수량을 초과한 경우: `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
    - [ ]  기타 잘못된 입력의 경우: `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`