import { test } from '@playwright/test';
import { InventoryPage } from '../Pages/InventoryPage';

test.describe('Add To Cart Feature', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await page.goto(process.env.HOME_URL!);
  });

  test('Add single item to cart', async () => {
    await inventoryPage.addSingleItem();
    await inventoryPage.openCart();
    await inventoryPage.verifyProductInCart("Sauce Labs Backpack");
    await inventoryPage.verifyCartCount('1');
  });

  test('Add multiple items to cart', async () => {
    await inventoryPage.addMultipleItems();
    await inventoryPage.openCart();
    await inventoryPage.verifyProductInCart("Sauce Labs Backpack");
    await inventoryPage.verifyProductInCart("Sauce Labs Bike Light");
    await inventoryPage.verifyCartCount('2');
  });

});
