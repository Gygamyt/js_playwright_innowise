exports.inventoryPage = class SwagInventory {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.allProductsOnPageLocator = page.locator("//div[contains(@class, 'inventory_item_name')]")
        this.allProductsOnPageXPath = "//div[contains(@class, 'inventory_item_name')]"
        // this.productNameXPath = `//div[text()='${productName}']`
        this.addToCartLocator = page.locator("//button[text()='Add to cart']").first()
        this.removeButtonLocator = page.locator("//button[text()='Remove']")
    }

    async getAllProductsElements() {
        return await this.page.$$(this.allProductsOnPageXPath)
    }

    async addFirstProductToCart() {
        await this.addToCartLocator.click()
    }

    async isRemoveButtonAppeared() {
        return await this.removeButtonLocator.isVisible()
    }
}