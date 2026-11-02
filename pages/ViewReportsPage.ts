import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ConfirmDialog } from '../components/ConfirmDialog';


export class ViewReportsPage extends BasePage {
    private readonly reportNameInput: Locator;
    private readonly searchButton: Locator;
    private readonly addButton: Locator;
    private readonly tableRows: Locator;
    private readonly deleteIconButton: Locator;
    readonly resultCards: Locator;
    private readonly confirmDialog: ConfirmDialog;


    constructor(page: Page) {
        super(page);
        this.reportNameInput = page.getByPlaceholder('Type for hints...');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.tableRows = page.getByRole('row');
        this.deleteIconButton = page.locator('button:has(i.bi-trash)');
        this.resultCards = page.locator('.oxd-table-card');


        this.confirmDialog = new ConfirmDialog(page);

    }

    async goto(): Promise<void> {
        await this.page.goto('/web/index.php/pim/viewDefinedPredefinedReports');
    }

    async clickAdd(): Promise<void> {
        await this.addButton.click();
    }

    async searchByReportName(name: string): Promise<void> {
        await this.reportNameInput.fill(name);
        await this.page.getByRole('option', { name, exact: true }).click();
        await this.searchButton.click();
    }

    reportRow(name: string): Locator {
        return this.tableRows.filter({
            has: this.page.getByRole('cell', { name, exact: true }),
        });
    }

    async deleteReport(name: string): Promise<void> {
        await this.reportRow(name).locator(this.deleteIconButton).click();
        await this.confirmDialog.confirmDelete();
    }


}