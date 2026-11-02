import { Page, Locator } from '@playwright/test';
import { EmployeeData } from '../types/employee';
import { BasePage } from './BasePage';


export class AddEmployeePage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly createLoginSwitch: Locator;
  private readonly saveButton: Locator;
  private readonly profileImageInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .getByRole('textbox');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.createLoginSwitch = page.locator('.oxd-switch-input');
    this.usernameInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Username', { exact: true }) })
      .getByRole('textbox');

    this.passwordInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Password', { exact: true }) })
      .locator('input[type="password"]');

    this.confirmPasswordInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Confirm Password', { exact: true }) })
      .locator('input[type="password"]');
    this.profileImageInput = page.locator('input[type="file"]');


  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/pim/addEmployee');
  }


  async fillEmployeeDetails(employee: EmployeeData): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.employeeIdInput.fill(employee.employeeId);
  }

  async createEmployee(employee: EmployeeData): Promise<void> {
    await this.fillEmployeeDetails(employee);
    await this.save();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async uploadProfileImage(filePath: string): Promise<void> {
    await this.profileImageInput.setInputFiles(filePath);
  }

  async enableLoginDetails(username: string, password: string): Promise<void> {
    await this.createLoginSwitch.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);

  }

}