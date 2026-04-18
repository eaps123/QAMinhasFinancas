import { expect, Page, Locator } from '@playwright/test';

export const UI = {
    BUTTONS: {
        NEXT: 'Próximo',
        PREVIOUS: 'Anterior',
        CLOSE: 'Close',
        CANCEL: 'Cancelar',
        CONFIRM: 'Confirmar',
        EDIT: 'Editar',
        DELETE: 'Deletar',
        SAVE: 'Salvar',
        ADD_CATEGORY: 'Adicionar Categoria',
        ADD_LEAD: 'Adicionar Pessoa',
        ADD_TRANSACTION: 'Adicionar Transação'
    },
    MESSAGES: {
        PUT_LEAD_SUCCESS: 'Pessoa atualizada com sucesso!',
        POST_LEAD_SUCCESS: 'Pessoa salva com sucesso!',
    },
    LABELS: {
        DATA_TABLE: 'Tabela de dados'
    },
    PAGINATION: {
        REGEX: /Mostrando (\d+) - (\d+) de (\d+)/
    }
} as const;

export class Toast {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async containText(message: string): Promise<void> {
        const toast = this.page.getByRole('status');
        await expect(toast).toContainText(message);
        await expect(toast).not.toBeVisible({ timeout: 5000 });
    }
}

export class Popup {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async haveText(message: string): Promise<void> {
        const element: Locator = this.page.locator('.swal2-html-container');
        await expect(element).toHaveText(message);
    }
}

export class Paginations {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async getPaginationText(): Promise<string> {
        const counter = this.page.locator('.text-gray-600');
        const text = await counter.textContent();
        if (!text) {
            throw new Error('Texto de paginação não encontrado');
        }
        return text;
    }
    async clickNextPage(): Promise<void> {
        await this.page.getByRole('button', { name: UI.BUTTONS.NEXT }).click();
    }
    
    async isNextDisabled(): Promise<boolean> {
        return await this.page.getByRole('button', { name: UI.BUTTONS.NEXT }).isDisabled();
    }
    
    async clickPreviousPage(): Promise<void> {
        await this.page.getByRole('button', { name: UI.BUTTONS.PREVIOUS }).click();
    }
    
    async isPreviousDisabled(): Promise<boolean> {
        return await this.page.getByRole('button', { name: UI.BUTTONS.PREVIOUS }).isDisabled();
    }
    async validatePaginationNext(pageSize: number): Promise<void> {
        const counter = this.page.locator('.text-gray-600');
        const nextButton = this.page.getByRole('button', { name: 'Próximo' });

        let previousStart = 0;

        while (true) {
            const text = await this.getPaginationText();
            const match = text.match(UI.PAGINATION.REGEX);
            if (!match) {
                throw new Error(`Formato inválido: ${text}`);
            }
            const start = Number(match[1]);
            const end = Number(match[2]);
            const total = Number(match[3]);
            if (previousStart !== 0) {
                expect(start).toBe(previousStart + pageSize);
            }
            expect(end).toBeLessThanOrEqual(total);
            expect(start).toBeLessThanOrEqual(end);
            previousStart = start;
            if (await nextButton.isDisabled()) {
                break;
            }
            await nextButton.click();
            await expect(counter).toHaveText(
                new RegExp(`Mostrando ${previousStart + pageSize} -`)
            );
        }
    }
    async validatePaginationPrevious(pageSize: number): Promise<void> {
        const counter = this.page.locator('.text-gray-600');
        const prevButton = this.page.getByRole('button', { name: 'Anterior' });
        let previousStart: number | null = null;
        while (true) {
            const text = await this.getPaginationText();
            const match = text.match(UI.PAGINATION.REGEX);
            if (!match) {
                throw new Error(`Formato inválido: ${text}`);
            }
            const start = Number(match[1]);
            const end = Number(match[2]);
            const total = Number(match[3]);
            if (previousStart !== null) {
                expect(start).toBe(previousStart - pageSize);
            }
            expect(end).toBeLessThanOrEqual(total);
            expect(start).toBeLessThanOrEqual(end);
            previousStart = start;
            if (await prevButton.isDisabled()) {
                break;
            }
            const previousText = text;
            await Promise.all([
                prevButton.click(),
                expect(counter).not.toHaveText(previousText),
            ]);
        }
    }
}

export class Modal {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openModal(name: string): Promise<void> {
        await this.page.getByRole('button', {name}).click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', {name})
        ).toBeVisible();
    }

    async openModalFirst(name: string): Promise<void> {
        await this.page.getByRole('button', {name}).first().click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', {name})
        ).toBeVisible();
    }

    async outsideModal(): Promise<void> {
        const dialog = this.page.getByRole('dialog');
        await this.page.mouse.click(0, 0);
        await expect(dialog).not.toBeVisible();
        await expect(
            this.page.getByLabel(UI.LABELS.DATA_TABLE)
        ).toBeVisible();
    }

    async buttonModal(name: string): Promise<void> {
        await this.page.getByRole('button', {name}).click();
        await expect(
            this.page.getByLabel(UI.LABELS.DATA_TABLE)
        ).toBeVisible();
    }

    async selectOptions(value: string, locator: string ): Promise<void> {
        const select = this.page.locator(locator);
        await select.selectOption(value);
        await expect(select).toHaveValue(value);
    }
}

export class Visit{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async Transactions(): Promise<void> {
        await this.page.goto('/transacoes');
    }
    async Leads(): Promise<void> {
        await this.page.goto('/pessoas');
    }
    async Category(): Promise<void> {
        await this.page.goto('/categorias');
    }
    async Reports(): Promise<void> {
        await this.page.goto('/totais');
    }
}

export class Form{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submitCategoryForm(name: string): Promise<void> {
        const dialog = this.page.getByRole('dialog');
        await this.page.getByPlaceholder('Digite a descrição').fill(name);
    }

    async submitLeadForm(name: string, data: string): Promise<void> {
        await this.page.getByPlaceholder('Digite o nome').fill(name);
        await this.page.locator('input[name="dataNascimento"]').fill(data);
    }

    async submitTransactionsForm(name: string, data: string): Promise<void> {
        await this.page.getByPlaceholder('Digite o nome').fill(name);
        await this.page.locator('input[name="dataNascimento"]').fill(data);
    }
}

export class Find{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async findLeadByName(): Promise<void> {
        await expect(
            this.page.locator(':has-text("Automation")'
            )).toBeVisible();
    }
}

export class HaveText{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async alertHaveText(target: string): Promise<void> {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
    async errorHaveText(target: string): Promise<void> {
        await expect(
            this.page.getByText(target)
        ).toBeVisible();
    }
}

export class Click{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async ByName(name: string, buttonLabel: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(name, 'i') });
        await row.getByRole('button', { name: buttonLabel }).click();
    }
}