import { test } from '@playwright/test'
import { InventoryPage } from '../Pages/InventoryPage';
import { RemovePage } from '../Pages/RemovePage';

test.describe('Remove From Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let removePage: RemovePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    removePage = new RemovePage(page);
    await page.goto(process.env.Home_URL!);
  });

  test('Remove single item from cart', async () => {
    await inventoryPage.addSingleItem();
    await inventoryPage.openCart();
    await removePage.removeBackpackItem();
    await removePage.verifyCartIsEmpty();
  });

  test('Remove multiple items from cart', async () => {
    await inventoryPage.addMultipleItems();
    await inventoryPage.openCart();
    await removePage.removeBackpackItem();
    await removePage.verifyProductStillExists('Sauce Labs Bike Light');
    await removePage.verifyCartCount('1');
    await removePage.removeBikeLightItem();
    await removePage.verifyCartIsEmpty();
  });

});