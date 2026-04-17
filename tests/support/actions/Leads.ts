import { expect, Page, Locator } from '@playwright/test';

export class Leads {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async visit(): Promise<void> {
        await this.page.goto('/pessoas');
    }
    async openLeadDeleteModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Deletar/ }).first().click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name: 'Deletar Pessoa' })
        ).toBeVisible();
    }
    async openLeadEditModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Editar/ }).first().click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name: 'Editar Pessoa' })
        ).toBeVisible();
    }
    async openLeadModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Adicionar Pessoa/ }).click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name: 'Adicionar Pessoa' })
        ).toBeVisible();
    }
    async closeLeadModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Close/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async outsideLeadModal(): Promise<void> {
        const dialog = this.page.getByRole('dialog');
        await this.page.mouse.click(0, 0);
        await expect(dialog).not.toBeVisible();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async deleteLeadModal(): Promise<void> {
        await this.page.getByRole('button', { name: /Confirmar/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async submitLeadForm(name: string, data: string): Promise<void> {
        await this.page.getByPlaceholder('Digite o nome').fill(name);
        await this.page.locator('input[name="dataNascimento"]').fill(data);
        await this.page.getByRole('button', { name: /Salvar/ }).click();
    }
    async cancelLeadForm(name: string, data: string): Promise<void> {
        await this.page.getByPlaceholder('Digite o nome').fill(name);
        await this.page.locator('input[name="dataNascimento"]').fill(data);
        await this.page.getByRole('button', { name: /Cancelar/ }).click();
        await expect(
            this.page.getByLabel('Tabela de dados')
        ).toBeVisible();
    }
    async cancelDeleteLead(): Promise<void> {
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
    async clickEditByName(name: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(name, 'i') });
        await row.getByRole('button', { name: /Editar/ }).click();
    }
    async clickDeleteByName(name: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(name, 'i') });
        await row.getByRole('button', { name: /Deletar/ }).click();
    }
}