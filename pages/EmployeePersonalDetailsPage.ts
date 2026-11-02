import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class EmployeePersonalDetailsPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton = page
            .locator('form')
            .filter({ has: this.firstNameInput })
            .getByRole('button', { name: 'Save' });
    }

    async editName(firstName: string, lastName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
    }

    async save(): Promise<void> {
        await this.saveButton.click();
    }
}