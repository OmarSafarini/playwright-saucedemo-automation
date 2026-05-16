import { expect, Locator, Page } from "@playwright/test";

export class SortPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryPrices: Locator;
  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item_name');
    this.inventoryPrices = page.locator('.inventory_item_price');
  }

  async sortByNameAZ() {
    await this.sortDropdown.selectOption('az');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  async verifyAZSorting() {
    const items = await this.inventoryItems.allTextContents();
    const sortedItems = [...items].sort();
    expect(items).toEqual(sortedItems);
  }

  async verifyPriceHighToLowSorting() {
    const pricesText =await this.inventoryPrices.allTextContents();
    const prices = pricesText.map(price =>Number(price.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }
}