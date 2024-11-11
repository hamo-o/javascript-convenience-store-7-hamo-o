import StoreProduct from "./StoreProduct.js";

class StoreProducts {
  #products;

  #productHeader;

  #stock;

  constructor(stock) {
    this.#products = [];
    this.#productHeader = [];
    this.#stock = stock;
  }

  setStoreProducts(products, promotions) {
    const { header, body } = products;
    // TODO: split 유틸로 빼기
    this.#productHeader = header.split(",");
    this.#products = body.map(
      (item) => new StoreProduct(this.#createProduct(item), promotions),
    );
  }

  getStoreProducts() {
    return this.#products.map((product) => product.getFormattedProduct());
  }

  sellProducts(users) {
    const cartList = [];
    users.forEach((user) => {
      const products = this.#sellProduct(user);
      cartList.push(...products);
    });
    this.#editProductStock();
    return cartList;
  }

  sellFreeProduct({ name, count }) {
    // TODO: 프로모션 재고와 일반 재고를 분리하고, 프로모션 재고를 이름 + 프로모션 이름으로 찾아서 처리
    const storeProducts = this.#findProductByName(name);
    storeProducts[0].sell(count);

    this.#editProductStock();
  }

  #editProductStock() {
    const header = this.#productHeader.join(",");
    const content = this.#products.map(({
      name, price, quantity, promotion,
    }) => `${name},${price},${quantity},${promotion}`).join("\n");

    this.#stock.writeFile(`${header}\n${content}\n`);
  }

  #createProduct(item) {
    // TODO: split 유틸로 빼기
    const itemArray = item.split(",");
    return this.#productHeader.reduce((obj, key, idx) => ({ ...obj, [key]: itemArray[idx] }), {});
  }

  #findProductByName(name) {
    return this.#products.filter((product) => product.isEqualProduct(name));
  }

  #sellProduct(user) {
    const storeProducts = this.#findProductByName(user.getProduct().name);
    const selledProducts = [];
    storeProducts.forEach((store) => {
      const count = user.isRemain();
      if (count) selledProducts.push(this.#processSell(count, store, user));
    });
    return selledProducts;
  }

  #processSell(count, store, user) {
    const selledProduct = store.sell(count);
    const remainCount = count - selledProduct.quantity;
    user.buy(remainCount);
    return selledProduct;
  }
}

export default StoreProducts;
