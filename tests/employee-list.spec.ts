import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { ViewEmployeeListPage } from '../pages/ViewEmployeeListPage';
import { Messages } from '../data/messages.data';
import { generateEmployeeData } from '../utils/test-data';
import { EmployeeData } from '../types/employee';

test.describe('Employee -Search-Delete', () => {
  let employee: EmployeeData;
  let viewEmployeeListPage: ViewEmployeeListPage;

  test.beforeEach(async ({ page }) => {
    employee = generateEmployeeData();
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();
    await addEmployeePage.createEmployee(employee);
    await expect(addEmployeePage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();

    viewEmployeeListPage = new ViewEmployeeListPage(page);
    await viewEmployeeListPage.goto();
  });

  test('search by Employee Id finds the created employee', async () => {
    await viewEmployeeListPage.searchByEmployeeId(employee.employeeId);

    const row = viewEmployeeListPage.employeeRow(employee.employeeId);
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(employee.firstName);
    await expect(row).toContainText(employee.lastName);
  });

  test('search by Employee Name finds the created employee', async () => {
    await viewEmployeeListPage.searchByEmployeeName(`${employee.firstName} ${employee.lastName}`);

    const row = viewEmployeeListPage.employeeRow(employee.employeeId);
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(employee.firstName);
  });

test('deleted employee can no longer be found', async () => {
  await viewEmployeeListPage.searchByEmployeeId(employee.employeeId);
  await expect(viewEmployeeListPage.employeeRow(employee.employeeId)).toHaveCount(1);

  await viewEmployeeListPage.deleteEmployee(employee.employeeId);
  await expect(viewEmployeeListPage.employeeRow(employee.employeeId)).toHaveCount(0);

});
  
});