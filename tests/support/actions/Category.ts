import { expect, Page, Locator } from '@playwright/test';

export class Category {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async visit(): Promise<void> {
        await this.page.goto('/categorias');
    }
    async selectFinalidade(value: string): Promise<void> {
        const select = this.page.locator('#finalidade');
        await select.selectOption(value);
        await expect(select).toHaveValue(value);
    }
    async openCategoryModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Adicionar Categoria/ }).click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name: 'Adicionar Categoria' })
        ).toBeVisible();
    }
    async submitCategoryForm(name: string): Promise<void> {
        const dialog = this.page.getByRole('dialog');
        await this.page.getByPlaceholder('Digite a descrição').fill(name);
        await this.page.getByRole('button', { name: /Salvar/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async closeCategoryModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Close/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async outsideCategoryModal(): Promise<void> {
        const dialog = this.page.getByRole('dialog');
        await this.page.mouse.click(0, 0);
        await expect(dialog).not.toBeVisible();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }

    async cancelCategoryForm(): Promise<void> {
        await this.page.getByRole('button', { name: /Cancelar/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
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