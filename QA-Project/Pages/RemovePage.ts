import { expect, Locator, Page } from "@playwright/test";

export class RemovePage {

  readonly page: Page;
  readonly removeBackpackButton: Locator;
  readonly removeBikeLightButton: Locator;
  readonly cartItems: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeBackpackButton = page.locator( '[data-test="remove-sauce-labs-backpack"]');
    this.removeBikeLightButton = page.locator( '[data-test="remove-sauce-labs-bike-light"]');
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator( '[data-test="shopping-cart-badge"]');
  }

  async removeBackpackItem() {
    await this.removeBackpackButton.click();
  }

  async removeBikeLightItem() {
    await this.removeBikeLightButton.click();
  }

  async verifyCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async verifyCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async verifyProductStillExists(productName: string) {
    const item = this.page.locator('.inventory_item_name',{hasText: productName});
    await expect(item).toBeVisible();
  }
}