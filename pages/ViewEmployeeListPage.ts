import { Page, Locator } from '@playwright/test';

export class ViewEmployeeListPage {
    private readonly page: Page;
    private readonly employeeIdInput: Locator;
    private readonly searchButton: Locator;
    private readonly addButton: Locator;
    private readonly employeeNameInput: Locator;
    private readonly deleteIconButton: Locator;
    private readonly editIconButton: Locator;
    private readonly confirmDeleteButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.employeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Employee Id', { exact: true }) })
            .getByRole('textbox');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.employeeNameInput = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Employee Name', { exact: true }) })
            .getByPlaceholder('Type for hints...');
        this.deleteIconButton = page.locator('button:has(i.bi-trash)');
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.editIconButton = page.locator('button:has(i.bi-pencil-fill)');

    }

    async goto(): Promise<void> {
        await this.page.goto('/web/index.php/pim/viewEmployeeList');
    }

    async clickAdd(): Promise<void> {
        await this.addButton.click();
    }

    async searchByEmployeeId(employeeId: string): Promise<void> {
        await this.employeeIdInput.fill(employeeId);
        await this.searchButton.click();
    }

    employeeRow(employeeId: string): Locator {
        return this.page
            .getByRole('row')
            .filter({ has: this.page.getByRole('cell', { name: employeeId, exact: true }) });
    }

    async searchByEmployeeName(name: string): Promise<void> {
        await this.employeeNameInput.fill(name);
        await this.searchButton.click();
    }

    async deleteEmployee(employeeId: string): Promise<void> {
        await this.employeeRow(employeeId).locator(this.deleteIconButton).click();
        await this.confirmDeleteButton.click();
    }


    async editEmployee(employeeId: string) {
        await this.employeeRow(employeeId).locator(this.editIconButton).click();


    }
}