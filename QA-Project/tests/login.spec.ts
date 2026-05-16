import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { invalidScenarios } from './data/login.data';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid Login', async () => {
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await loginPage.verifyValidLogin();
  });

  for (const scenario of invalidScenarios) {
    test(`Invalid Login - ${scenario.description}`, async () => {
      await loginPage.login(scenario.username, scenario.password);
      await loginPage.verifyErrorMessage();
    });
  }
}); 