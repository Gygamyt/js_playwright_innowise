exports.swagLabsLoginPage = class swagLabsLoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.usernameInputField = page.getByPlaceholder("Username");
        this.passwordInputField = page.getByPlaceholder("Password");
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorLoginElement = page.locator("//div[contains(@class, 'error')]")
    }

    async inputLogin(login) {
        await this.usernameInputField.click()
        await this.usernameInputField.fill(login)
        return this
    }

    async isLoginErrorElementVisible() {
        let isVisible = await this.errorLoginElement.isVisible()
        return isVisible === true;
    }

    async inputPassword(password) {
        await this.passwordInputField.click()
        await this.passwordInputField.fill(password)
        return this
    }

    async clickLoginButton() {
        await this.loginButton.click()
        return this
    }

    async fullLogin(login, password) {
        await this.inputLogin(login)
        await this.inputPassword(password)
        await this.clickLoginButton()
        return this
    }
}
