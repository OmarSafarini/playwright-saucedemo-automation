import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly shoppingCartButton: Locator;
  readonly backToProducts : Locator;
  readonly checkoutButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]')
    this.firstName = page.locator('[data-test="firstName"]')
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backToProducts = page.locator('[data-test="back-to-products"]');
    this.successMessage = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }
  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName: string,lastName: string,postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }


  async verifyCheckoutSuccess(title : string) {
    await expect(this.successMessage).toHaveText(title);
  }

  async verifyCheckoutError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
}