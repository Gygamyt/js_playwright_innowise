const {expect} = require("@playwright/test");
exports.inventoryPage = class SwagInventory {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.allProductsOnPageLocator = page.locator("//div[contains(@class, 'inventory_item_name')]")
        this.allProductsOnPageXPath = "//div[contains(@class, 'inventory_item_name')]"
        // this.productNameXPath = `//div[text()='${productName}']`
        this.addToCartXPath = "//button[text()='Add to cart']"
        this.removeButtonLocator = page.locator("//button[text()='Remove']")
    }

    async getAllProductsElements() {
        return await this.page.$$(this.allProductsOnPageXPath)
    }

    async clickAllAddToCartButtonElements() {
        let booleanForReturn = true
        let addButtons = await this.page.$$(this.addToCartXPath)
        for (let element in addButtons) {
            await addButtons[element].click()
            if (!await this.removeButtonLocator.nth(element).isVisible()) {
                return booleanForReturn = false
            }
        }
        return booleanForReturn;
    }

    async clickRemoveButton() {
        await this.removeButtonLocator.click()
    }

    async isRemoveButtonAppeared() {
        return await this.removeButtonLocator.isVisible()
    }
}