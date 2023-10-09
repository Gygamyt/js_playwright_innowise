import {test, expect} from '@playwright/test';
import * as util from "util";

const {swagLabsLoginPage} = require("../page-objects/SwagLabsLoginPage");
const {inventoryPage} = require("../page-objects/SwagInventory")
const baseUrl = "https://www.saucedemo.com/"

test.beforeEach(async ({page}) => {
    await page.goto(baseUrl)
})

const logins = ["standard_user", "locked_out_user"]
for (const login of logins) {
    test(`swagger login, testing with ${login}`, async ({page}) => {
        const loginPage = new swagLabsLoginPage(page)
        await loginPage.inputLogin(login)
        await loginPage.inputPassword("secret_sauce")
        await loginPage.clickLoginButton()
        switch (login) {
            case "standard_user":
                expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
                break
            case "locked_out_user":
                expect(await loginPage.isLoginErrorElementVisible()).toBe(true)
                break
        }

    });
}

test(`swagger, check is all products are presented with unbanned user`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    const inventory = new inventoryPage(page)
    await loginPage.fullLogin("standard_user", "secret_sauce")
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    let products = await inventory.getAllProductsElements()
    for (let product of products) {
        expect(await product.isVisible()).toBe(true)
    }
})

test(`adding to cart`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    const inventory = new inventoryPage(page)
    await loginPage.fullLogin("standard_user", "secret_sauce")
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    let utilBoolean = await inventory.clickAllAddToCartButtonElements() //pochemu pri vizove vnytri expecta daet NE TO
    expect(await utilBoolean).toBe(true)
})
