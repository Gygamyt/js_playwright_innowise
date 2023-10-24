import {test, expect} from '@playwright/test';

const {swagLabsLoginPage} = require("../page-objects/SwagLabsLoginPage");
const {inventoryPage} = require("../page-objects/SwagInventory")
const baseUrl = "https://www.saucedemo.com/"
const defaultUser = "standard_user"
const pass = "secret_sauce" //from DB maybe
const bannedUser = "locked_out_user"

test.beforeEach(async ({page}) => {
    await page.goto(baseUrl)
})

// const logins = ["standard_user", "locked_out_user"]
// for (const login of logins) {
//     test(`swagger login, testing with ${login}`, async ({page}) => {
//         const loginPage = new swagLabsLoginPage(page)
//         await loginPage.inputLogin(login)
//         await loginPage.inputPassword("secret_sauce")
//         await loginPage.clickLoginButton()
//         switch (login) {
//             case "standard_user":
//                 expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
//                 break
//             case "locked_out_user":
//                 expect(await loginPage.isLoginErrorElementVisible()).toBe(true)
//                 break
//         }
//
//     });
// }

test(`login with default user`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    await loginPage.inputLogin(defaultUser)
    await loginPage.inputPassword(pass)
    await loginPage.clickLoginButton()
    await expect(page.url()).toBe(baseUrl + "inventory.html")
})

test(`login with banned user`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    await loginPage.inputLogin(bannedUser)
    await loginPage.inputPassword(pass)
    await loginPage.clickLoginButton()
    expect(await loginPage.isLoginErrorElementVisible()).toBe(true)
})

test(`swagger, check is all products are presented with unbanned user`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    const inventory = new inventoryPage(page)
    await loginPage.fullLogin(defaultUser, pass)
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    let products = await inventory.getAllProductsElements()
    for (let product of products) {
        expect(await product.isVisible()).toBe(true)
    }
})

test(`adding to cart`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    const inventory = new inventoryPage(page)
    await loginPage.fullLogin(defaultUser, pass)
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    let utilBoolean = await inventory.clickAllAddToCartButtonElements() //pochemu pri vizove vnytri expecta daet NE TO
    expect(await inventory.clickAllAddToCartButtonElements()).toBe(true) // now works but why
})
