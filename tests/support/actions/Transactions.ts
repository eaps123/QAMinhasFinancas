import { expect, Page, Locator } from '@playwright/test';

export class Transactions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async visit(): Promise<void> {
        await this.page.goto('/transacoes');
    }
    async alertHaveText(target: string): Promise<void> {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
    async errorHaveText(target: string): Promise<void> {
        await expect(
            this.page.getByText(target)
        ).toBeVisible();
    }
    async findLeadByName(): Promise<void> {
        await expect(
            this.page.locator(':has-text("Automation")'
            )).toBeVisible();
    }
}