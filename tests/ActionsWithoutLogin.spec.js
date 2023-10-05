import {test, expect} from '@playwright/test';
import {swagLabsLoginPage} from "../page-objects/SwagLabsLoginPage";

const baseUrl = "https://www.saucedemo.com/"

test(`open "/inventory" page without login`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    await page.goto(baseUrl + "/inventory")
    expect(await loginPage.isLoginErrorElementVisible()).toBe(true)
})

test(`open "/cart" page without login`, async ({page}) => {
    const loginPage = new swagLabsLoginPage(page)
    await page.goto(baseUrl + "/cart")
    expect(await loginPage.isLoginErrorElementVisible()).toBe(true)
})