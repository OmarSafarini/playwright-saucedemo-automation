import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly backpackButton: Locator;
  readonly bikeLightButton: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  constructor(page: Page) {
    this.page = page;
    this.backpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addSingleItem() {
    await this.backpackButton.click();
  }

  async addMultipleItems() {
    await this.backpackButton.click();
    await this.bikeLightButton.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async verifyProductInCart(productName: string) {
    const item = this.page.locator('.inventory_item_name', {hasText: productName});
    await expect(item).toBeVisible();
  }

  async verifyCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }
}