import { test, expect } from '@playwright/test';
import { AddReportPage } from '../pages/AddReportPage';
import { Messages } from '../data/messages.data';
import { ReportData } from '../data/report.data';
import { generateReportName } from '../utils/test-data';
import { ViewReportsPage } from '../pages/ViewReportsPage';

test.describe('Reports', () => {
    let addReportPage: AddReportPage;
    let viewReportsPage: ViewReportsPage;

    let reportName: string;

    test.beforeEach(async ({ page }) => {
        addReportPage = new AddReportPage(page);
        viewReportsPage = new ViewReportsPage(page);
        reportName = generateReportName();

        await viewReportsPage.goto();
        await viewReportsPage.clickAdd();
    });

    test('created report shows the success message', async ({ page }) => {
        await addReportPage.createReport(
            reportName,
            ReportData.DISPLAY_FIELD_GROUP,
            ReportData.DISPLAY_FIELD
        );

        await expect(addReportPage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();
        await expect(
            addReportPage.reportTitle(reportName)
        ).toBeVisible();
        await expect(addReportPage.reportTitle(reportName)).toHaveText(reportName)
    });

    test('search for a created report successfully', async ({ page }) => {
        await addReportPage.createReport(
            reportName,
            ReportData.DISPLAY_FIELD_GROUP,
            ReportData.DISPLAY_FIELD
        );
        await expect(addReportPage.toast(Messages.SAVED_SUCCESSFULLY)).toBeVisible();
        await expect(addReportPage.reportTitle(reportName)).toBeVisible();
        await expect(addReportPage.reportTitle(reportName)).toHaveText(reportName);



        await viewReportsPage.goto();
        await viewReportsPage.searchByReportName(reportName);
        await expect(viewReportsPage.resultCards).toHaveCount(1);
        await expect(viewReportsPage.reportRow(reportName)).toHaveCount(1);
    });


 test('Delete created report successfully', async ({ page }) => {
        await addReportPage.createReport(
            reportName,
            ReportData.DISPLAY_FIELD_GROUP,
            ReportData.DISPLAY_FIELD
        );
        await expect(addReportPage.reportTitle(reportName)).toBeVisible();
        await expect(addReportPage.reportTitle(reportName)).toHaveText(reportName);



        await viewReportsPage.goto();
        await viewReportsPage.searchByReportName(reportName);
        await expect(viewReportsPage.resultCards).toHaveCount(1);
        await expect(viewReportsPage.reportRow(reportName)).toHaveCount(1);



        await viewReportsPage.deleteReport(reportName);
        await expect(viewReportsPage.toast(Messages.DELETED_SUCCESSFULLY)).toBeVisible();

    

        await expect(viewReportsPage.resultCards).not.toBeVisible();
        await expect(viewReportsPage.reportRow(reportName)).toHaveCount(0);
    });




    

});