import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    toast(message: string): Locator {
        return this.page.getByText(message, { exact: true });
    }


}