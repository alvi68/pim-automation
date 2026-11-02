import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { ViewEmployeeListPage } from '../pages/ViewEmployeeListPage';
import { EmployeePersonalDetailsPage } from '../pages/EmployeePersonalDetailsPage';
import { Messages } from '../data/messages.data';
import { generateEmployeeData } from '../utils/test-data';

test.describe('Employee workflow', () => {
    test('created employee can  edited and the changes persist', async ({ page }) => {
        const employee = generateEmployeeData();
        const updatedFirstName = `${employee.firstName}_Edit`;
        const updatedLastName = `${employee.lastName}_Edit`;

        const addEmployeePage = new AddEmployeePage(page);
        const listPage = new ViewEmployeeListPage(page);
        const detailsPage = new EmployeePersonalDetailsPage(page);


        await addEmployeePage.goto();
        await addEmployeePage.createEmployee(employee);
        await expect(addEmployeePage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();


        await listPage.goto();
        await listPage.searchByEmployeeId(employee.employeeId);
        await expect(listPage.employeeRow(employee.employeeId)).toHaveCount(1);


        await listPage.editEmployee(employee.employeeId);
        await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
        await expect(detailsPage.firstNameInput).toHaveValue(employee.firstName);
        await expect(detailsPage.lastNameInput).toHaveValue(employee.lastName);


        await detailsPage.editName(updatedFirstName, updatedLastName);
        await detailsPage.save();
        await expect(detailsPage.toast(Messages.UPDATED_SUCCESSFULLY)).toBeVisible();


        await page.reload();
        await expect(detailsPage.firstNameInput).toHaveValue(updatedFirstName);
        await expect(detailsPage.lastNameInput).toHaveValue(updatedLastName);
    });
});