import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginData } from '../data/login.data';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('valid credentials redirect user to dashboard', async ({ page }) => {
        await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    test('invalid password shows error and keeps user on login page', async ({ page }) => {

        await loginPage.login(process.env.ADMIN_USERNAME!,
            LoginData.INVALID_PASSWORD);

        await expect(loginPage.errorMessage).toHaveText(
            LoginData.INVALID_CREDENTIALS
        );
    });


});