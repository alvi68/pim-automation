import { Page, Locator } from '@playwright/test';

export class ViewEmployeeListPage {
  private readonly page: Page;
  private readonly employeeIdInput: Locator;
  private readonly searchButton: Locator;
  private readonly addButton: Locator;
  private readonly employeeNameInput: Locator;


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
}