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

  setStoreProducts({ header, body }) {
    // TODO: split 유틸로 빼기
    this.#productHeader = header.split(",");
    this.#products = body.map((item) => new StoreProduct(this.#createProduct(item)));
  }

  getStoreProducts() {
    return this.#products.map((product) => product.getProduct());
  }

  sellProducts(users) {
    users.forEach((user) => {
      this.#sellProduct(user);
    });
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
    storeProducts.forEach((store) => {
      const count = user.isRemain();
      if (count) {
        const last = store.sell(count);
        user.buy(last);
      }
    });
  }
}

export default StoreProducts;
