import { Page, Locator } from '@playwright/test';

export class ConfirmDialog {
    private readonly confirmDeleteButton: Locator;
    private readonly cancelButton: Locator;
    constructor(page: Page) {
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }
    async confirmDelete(): Promise<void> {
        await this.confirmDeleteButton.click();
    }
    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }
}