import { test } from '@playwright/test';
import { InventoryPage } from '../Pages/InventoryPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { invalidCheckoutScenarios } from './data/checkout.data';

test.describe('Checkout Feature', () => {
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto(process.env.HOME_URL!);
  });

  test('Checkout single item', async () => {
    await inventoryPage.addSingleItem();
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('Omar', 'Test', '12345');
    await inventoryPage.verifyProductInCart("Sauce Labs Backpack");
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutSuccess('Thank you for your order!');
  });

  test('Checkout multiple items', async () => {
    await inventoryPage.addMultipleItems();
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('Omar', 'Test', '12345');
    await inventoryPage.verifyProductInCart("Sauce Labs Backpack");
    await inventoryPage.verifyProductInCart("Sauce Labs Bike Light");
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutSuccess('Thank you for your order!');
  });

  for (const scenario of invalidCheckoutScenarios) {
    test(`Checkout with ${scenario.description}`, async () => {
      await inventoryPage.addSingleItem();
      await inventoryPage.openCart();
      await checkoutPage.startCheckout();
      await checkoutPage.fillCheckoutInfo(scenario.firstName, scenario.lastName, scenario.postalCode);
      await checkoutPage.verifyCheckoutError(scenario.error);
    });
  }
});
    