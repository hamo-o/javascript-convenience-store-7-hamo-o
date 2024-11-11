import StoreProduct from "./StoreProduct.js";

class StoreProducts {
  #products;

  #productHeader;

  #stock;

  constructor(stock) {
    this.#products = {};
    this.#productHeader = [];
    this.#stock = stock;
  }

  setStoreProducts(products, promotions) {
    const { header, body } = products;
    // TODO: split 유틸로 빼기
    this.#productHeader = header.split(",");
    body.forEach((item) => {
      const newProduct = this.#createProduct(item);
      this.setStoreProduct(newProduct, promotions);
    });
  }

  setStoreProduct(newProduct, promotions) {
    const { name, quantity, promotion } = newProduct;
    const isPromotion = promotion !== "null";

    if (!this.#findProductByName(name)) this.#initProduct(newProduct, promotions);

    if (isPromotion) this.#products[name].promotion = new StoreProduct(newProduct, promotions);
    else this.#products[name].default.add(quantity);
  }

  getStoreProducts() {
    const products = [];
    Object.values(this.#products).forEach((product) => {
      if (product.promotion) products.push(product.promotion.getFormattedProduct());
      products.push(product.default.getFormattedProduct());
    });
    return products;
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
    const storeProducts = this.#findProductByName(name);
    storeProducts.promotion.sell(count);

    this.#editProductStock();
  }

  #getStoreProducts() {
    const products = [];
    Object.values(this.#products).forEach((product) => {
      if (product.promotion) products.push(product.promotion.getProduct());
      products.push(product.default.getProduct());
    });
    return products;
  }

  #initProduct(newProduct, promotions) {
    this.#products[newProduct.name] = {
      promotion: null,
      default: new StoreProduct({ ...newProduct, quantity: 0, promotion: "null" }, promotions),
    };
  }

  #editProductStock() {
    const header = this.#productHeader.join(",");
    const content = this.#getStoreProducts().map(({
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
    return this.#products[name];
  }

  #sellProduct(user) {
    const products = this.#findProductByName(user.getName());
    const selledProducts = [];
    if (user.isRemain() && products.promotion) {
      selledProducts.push(this.#processSell(products.promotion, user));
    }
    if (user.isRemain()) selledProducts.push(this.#processSell(products.default, user));
    return selledProducts;
  }

  #processSell(storeProduct, user) {
    const count = user.isRemain();
    const selledProduct = storeProduct.sell(count);
    const remainCount = count - selledProduct.quantity;
    user.buy(remainCount);
    return selledProduct;
  }
}

export default StoreProducts;
