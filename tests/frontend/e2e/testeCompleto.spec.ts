import { test, expect } from '../../support';
import { UI } from '../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

export function getRandomTransactionValue(): number {
    return Number((Math.random() * 1000 + 1).toFixed(2));
}

test('E2E - pessoa + transações + relatório + exclusão', async ({ paginations, visit, modal, toast, form, find, click }) => {

    let dataAtual: string;
    let valor: number;

    await test.step('Criar pessoa', async () => {
        const leadData = faker.date
            .birthdate({ mode: 'age', min: 18, max: 20 })
            .toISOString()
            .split('T')[0];
        await visit.Leads();
        await modal.openModal(UI.BUTTONS.ADD_LEAD);
        await form.submitLeadForm(UI.SELECT.COMPLETO, leadData);
        await modal.buttonModal(UI.BUTTONS.SAVE);
        await toast.containText(UI.MESSAGES.POST_LEAD_SUCCESS);
    });

    await test.step('Criar transação de receita', async () => {
        await visit.Transactions();
        await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
        const Data = new Date();
        dataAtual = Data.toISOString().split('T')[0];
        valor = getRandomTransactionValue();
        await form.submitTransactionsForm('1- Automation Receita Completo', dataAtual, valor);
        await modal.selectTipo(UI.VALUE.RECEITA);
        const options = await modal.getTipoOptions();
        expect(options).toEqual(
            expect.arrayContaining([
                UI.LABELS.DESPESA,
                UI.LABELS.RECEITA,
            ])
        );
        await modal.labelModalLeadName(UI.SELECT.COMPLETO);
        await modal.labelModalCategory(UI.SELECT.RECEITA);
        await modal.buttonModal(UI.BUTTONS.SAVE);
        await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
    });

    await test.step('Criar transação de despesa', async () => {
        await visit.Transactions();
        await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
        await form.submitTransactionsForm('1- Automation Despesa Completo', dataAtual, valor);
        await modal.selectTipo(UI.VALUE.DESPESA);
        const options = await modal.getTipoOptions();
        expect(options).toEqual(
            expect.arrayContaining([
                UI.LABELS.DESPESA,
                UI.LABELS.RECEITA,
            ])
        );
        await modal.labelModalLeadName(UI.SELECT.COMPLETO);
        await modal.labelModalCategory(UI.SELECT.DESPESA);
        await modal.buttonModal(UI.BUTTONS.SAVE);
        await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
    });

    await test.step('Validar pessoa no relatório', async () => {
        await visit.Reports();
        await expect(
            paginations.itemExistsInTable(UI.SELECT.COMPLETO)
        ).resolves.toBe(true);
    });

    await test.step('Excluir pessoa', async () => {
        await visit.Leads();
        await click.ByName(UI.SELECT.COMPLETO, UI.BUTTONS.DELETE);
        await modal.buttonModal(UI.BUTTONS.CONFIRM);
    });

    await test.step('Validar se a pessoa foi excluida', async () => {
        await visit.Leads();
        const exists = await paginations.itemExistsInTable(UI.SELECT.COMPLETO);
        expect(exists);
    });

    await test.step('Validar exclusão no relatório', async () => {
        await visit.Reports();
        const exists = await paginations.itemExistsInTable(UI.SELECT.COMPLETO);
        expect(exists);
    });
});