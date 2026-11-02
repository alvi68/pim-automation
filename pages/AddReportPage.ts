import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class AddReportPage extends BasePage {
    private readonly reportNameInput: Locator;
    private readonly displayFieldGroupSelect: Locator;
    private readonly displayFieldSelect: Locator;
    private readonly addDisplayFieldButton: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.reportNameInput = page.getByRole('textbox', { name: 'Type here' });
        this.displayFieldGroupSelect = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Select Display Field Group', { exact: true }) })
            .locator('.oxd-select-text');
        this.displayFieldSelect = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Select Display Field', { exact: true }) })
            .locator('.oxd-select-text');

        this.addDisplayFieldButton = page
            .locator('.oxd-form-row')
            .filter({ has: page.getByRole('heading', { name: 'Display Fields' }) })
            .locator('button:has(i.bi-plus)');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/web/index.php/pim/definePredefinedReport');
    }


    private option(name: string): Locator {
        return this.page.getByRole('option', { name, exact: true });
    }

    async fillReportName(name: string): Promise<void> {
        await this.reportNameInput.fill(name);
    }

    async addDisplayField(group: string, field: string): Promise<void> {
        await this.displayFieldGroupSelect.click();
        await this.option(group).click();
        await this.displayFieldSelect.click();
        await this.option(field).click();
        await this.addDisplayFieldButton.click();
    }

    async save(): Promise<void> {
        await this.saveButton.click();
    }

    async createReport(name: string, group: string, field: string): Promise<void> {
        await this.fillReportName(name);
        await this.addDisplayField(group, field);
        await this.save();
    }

    reportTitle(reportName: string): Locator {
        return this.page.getByRole('heading', {
            name: reportName,
            exact: true
        });
    }
}