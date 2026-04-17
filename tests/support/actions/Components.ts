import { expect, Page, Locator } from '@playwright/test';

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
        await this.page.getByRole('button', { name: 'Próximo' }).click();
    }
    async isNextDisabled(): Promise<boolean> {
        return await this.page.getByRole('button', { name: 'Próximo' }).isDisabled();
    }
    async validatePaginationNext(pageSize: number): Promise<void> {
        const counter = this.page.locator('.text-gray-600');
        const nextButton = this.page.getByRole('button', { name: 'Próximo' });

        let previousStart = 0;

        while (true) {
            const text = await this.getPaginationText();
            const match = text.match(/Mostrando (\d+) - (\d+) de (\d+)/);
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
    async clickPreviousPage(): Promise<void> {
        await this.page.getByRole('button', { name: 'Anterior' }).click();
    }
    async isPreviousDisabled(): Promise<boolean> {
        return await this.page.getByRole('button', { name: 'Anterior' }).isDisabled();
    }
    async validatePaginationPrevious(pageSize: number): Promise<void> {
        const counter = this.page.locator('.text-gray-600');
        const prevButton = this.page.getByRole('button', { name: 'Anterior' });
        let previousStart: number | null = null;
        while (true) {
            const text = await this.getPaginationText();
            const match = text.match(/Mostrando (\d+) - (\d+) de (\d+)/);
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