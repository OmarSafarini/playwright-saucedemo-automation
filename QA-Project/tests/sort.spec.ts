import { test } from '@playwright/test';
import { SortPage } from '../Pages/SortPage';

test.describe('Sort Feature', () => {
  let sortPage: SortPage;

  test.beforeEach(async ({ page }) => {
    sortPage = new SortPage(page);
    await page.goto(process.env.Home_URL!);
  });

  test('Sort products from A to Z', async () => {
    await sortPage.sortByNameAZ();
    await sortPage.verifyAZSorting();
  });

  test('Sort products by price high to low', async () => {
    await sortPage.sortByPriceHighToLow();
    await sortPage.verifyPriceHighToLowSorting();
  });

});