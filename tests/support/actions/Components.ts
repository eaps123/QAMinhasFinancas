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
        OPEN: 'Abrir',
        ADD_CATEGORY: 'Adicionar Categoria',
        ADD_LEAD: 'Adicionar Pessoa',
        ADD_TRANSACTION: 'Adicionar Transação'
    },
    VALUE: {
        DESPESA: 'despesa',
        RECEITA: 'receita',
        AMBAS: 'ambas',
    },
    MESSAGES: {
        PUT_LEAD_SUCCESS: 'Pessoa atualizada com sucesso!',
        POST_LEAD_SUCCESS: 'Pessoa salva com sucesso!',
        POST_CATEGORY_SUCCESS: 'Categoria salva com sucesso!',
        POST_TRANSACTION_SUCCESS: 'Transação salva com sucesso!',
        POST_TRANSACTION_FAILED: 'Erro ao salvar transação. Tente novamente.',
        PUT_LEAD_FAILED: 'Erro ao salvar pessoa. Tente novamente.',
        NAME_REQUIRED: 'Nome é obrigatório',
        DESCRIPTION_REQUIRED: 'Descrição é obrigatória',
        INVALID_DATE: 'Invalid input: expected date, received Date',
        INVALID_VALUE: 'Invalid input: expected number, received NaN',
        INVALID_STRING: 'Invalid input: expected string, received undefined',
        NEGATIVE_VALUE: 'Valor deve ser positivo',
        DESCRIBE_REQUIRED: 'Descrição é obrigatória',
        KID_NO_TRANSACTION: 'Menores de 18 anos não podem registrar receitas',
        KID_ALERT: 'Menores só podem registrar despesas.',
    },
    LABELS: {
        DATA_TABLE: 'Tabela de dados',
        LEAD_LIST: 'Lista de pessoas',
        CATEGOY_LIST: 'Lista de categorias',
        DESPESA: 'Despesa',
        RECEITA: 'Receita',
        AMBAS: 'Ambas',
    },
    SELECT:{
        DESPESA: '12 Despesa',
        RECEITA: '12 Receita',
        AMBAS: '1 Receita e despesa',
        MENOR: '1- Automation KID',
        COMPLETO: '1- Automation Completo',
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
        await expect(
            this.page.locator('[role="status"]')
        ).toContainText(message, { timeout: 5000 });
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

    async itemExistsInTable(name: string): Promise<boolean> {
        const nextButton = this.page.getByRole('button', { name: UI.BUTTONS.NEXT });
        await expect(this.page.locator('tbody tr').first()).toBeVisible();
        while (true) {
            const row = this.page.locator('tbody tr').filter({
                has: this.page.locator('td:first-child', {
                    hasText: new RegExp(`^${name}$`)
                })
            }).first();
            if (await row.isVisible().catch(() => false)) {
                return true;
            }
            if (await nextButton.isDisabled()) {
                return false;
            }
            await nextButton.click();
            await expect(this.page.locator('tbody tr').first()).toBeVisible();
        }
    }
}

export class Modal {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    locatorTipo(): Locator {
        return this.page.locator('#tipo');
    }

    async openModal(name: string): Promise<void> {
        await expect(
            this.page.getByLabel(UI.LABELS.DATA_TABLE)
        ).toBeVisible();
        await this.page.getByRole('button', { name }).click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name })
        ).toBeVisible();
    }

    async openModalFirst(name: string): Promise<void> {
        await this.page.getByRole('button', { name }).first().click();
        const modal = this.page.getByRole('dialog');
        await expect(
            modal.getByRole('heading', { name })
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
        await this.page.getByRole('button', { name }).click();
        await expect(
            this.page.getByLabel(UI.LABELS.DATA_TABLE)
        ).toBeVisible({timeout: 5000});
    }
    async buttonModalErro(name: string): Promise<void> {
        await this.page.getByRole('button', { name }).click();
    }

    async selectFinalidade(value: string): Promise<void> {
        const select = this.page.locator('#finalidade');
        await select.selectOption(value);
        await expect(select).toHaveValue(value);
    }

    async labelModalLead(): Promise<void> {
        await this.page.getByRole('button', { name: 'Abrir' }).first().click();
        await this.page
            .getByRole('listbox', { name: 'Lista de pessoas' })
            .waitFor({ state: 'visible' });
        await this.page
            .locator('[aria-controls="pessoa-select-options"]')
            .click();
        const label = this.page.getByLabel(UI.LABELS.LEAD_LIST);
        await label.getByRole('option').first().click();
    }

    async labelModalLeadName(name: string): Promise<void> {
        await this.page.getByRole('button', { name: 'Abrir' }).first().click();
        await this.page
            .getByRole('listbox', { name: 'Lista de pessoas' })
            .waitFor({ state: 'visible' });
        await this.page
            .locator('[aria-controls="pessoa-select-options"]')
            .click();
        const label = this.page.getByLabel(UI.LABELS.LEAD_LIST);
        await label.getByRole('option',{name: name}).first().click();
    }

    async labelModalCategory(name: string): Promise<void> {
        await this.page.getByRole('button', { name: 'Abrir' }).last().click();
        await this.page
            .getByRole('listbox', { name: 'Lista de categorias' })
            .waitFor({ state: 'visible' });
        await this.page
            .locator('[aria-controls="categoria-select-options"]')
            .click();
        const label = this.page.getByLabel(UI.LABELS.CATEGOY_LIST);
        await label.getByRole('option',{name: name}).first().click();
    }

    async selectTipo(value: string): Promise<void> {
        await this.locatorTipo().selectOption(value);
    }

    async getTipoOptions(): Promise<string[]> {
        const options = await this.locatorTipo()
            .locator('option')
            .allTextContents();
        return options.map(opt => opt.trim());
    }

    async getSelectedTipo(): Promise<string> {
        return await this.locatorTipo().inputValue();
    }

}

export class Visit {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async Transactions(): Promise<void> {
        await this.page.goto('/transacoes', { waitUntil: 'networkidle'});
    }
    async Leads(): Promise<void> {
        await this.page.goto('/pessoas', { waitUntil: 'networkidle'});
    }
    async Category(): Promise<void> {
        await this.page.goto('/categorias', { waitUntil: 'networkidle'});
    }
    async Reports(): Promise<void> {
        await this.page.goto('/totais', { waitUntil: 'networkidle'});
    }
}

export class Form {
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

    async submitTransactionsForm(name: string, data: string, numeric: number): Promise<void> {
        await this.page.getByPlaceholder('Digite a descrição').fill(name);
        await this.page.getByLabel('Valor').fill(numeric.toString());
        await this.page.locator('input[name="data"]').fill(data);
    }
}

export class Find {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async findLeadByName(): Promise<void> {
        await expect(
            this.page.locator(':has-text("1- Automation")').first()
        ).toBeVisible();
    }
    locatorFinalidade(): Locator {
        return this.page.locator('#finalidade');
    }
    locatorTipo(): Locator {
        return this.page.locator('tipo');
    }
}

export class HaveText {
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
    async errorHaveTextLead(target: string): Promise<void> {
        await expect(
            this.page.getByText(target).first()
        ).toBeVisible();
    }
    async errorHaveTextCategory(target: string): Promise<void> {
        await expect(
            this.page.getByText(target).last()
        ).toBeVisible();
    }
}

export class Click {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async ByName(name: string, buttonLabel: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(name, 'i') });
        await row.getByRole('button', { name: buttonLabel }).click();
    }
}