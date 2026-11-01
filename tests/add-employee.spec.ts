import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { Messages } from '../data/messages.data';
import { generateEmployeeData , generateLoginDetails } from '../utils/test-data';
import path from 'path';


test.describe('Add Employee', () => {
  let addEmployeePage: AddEmployeePage;

  test.beforeEach(async ({ page }) => {
    addEmployeePage = new AddEmployeePage(page);
    
    await addEmployeePage.goto();
  });

  test('creates a new employee successfully', async () => {
    const employee = generateEmployeeData();

    await addEmployeePage.createEmployee(employee);

    await expect(addEmployeePage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();
  });

  test('creates a new employee with username, password, and profile image', async () => {
  const employee = generateEmployeeData();
  const login = generateLoginDetails();

  await addEmployeePage.fillEmployeeDetails(employee);
  await addEmployeePage.enableLoginDetails(login.username, login.password);
  await addEmployeePage.uploadProfileImage(path.resolve(__dirname, '../test-assets/profile.png'));

  await addEmployeePage.save();

  await expect(addEmployeePage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();
  });
});