import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

export function getRandomTransactionValue(): number {
    return Number((Math.random() * 1000 + 1).toFixed(2));
}

test('deve cadastrar uma transação', async ({ visit, modal, toast, form, find }) => {
    const description = faker.name.fullName();
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const select = find.locatorTipo();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    const tipos = await select.locator('tipo').allTextContents();
    const normalizedTipos = tipos.map(tipos => tipos.trim());
    expect(normalizedTipos).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await form.submitTransactionsForm(description, dataAtual, valor);
    await modal.labelModalLead();
    await modal.labelModalCategory();
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await visit.Transactions();
    await toast.containText(UI.MESSAGES.PUT_LEAD_SUCCESS);
});

test('deve cancelar o cadastro de uma transação', async ({ visit, modal }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await visit.Transactions();
    await modal.openModal('Adicionar Pessoa');
    await modal.buttonModal('Cancelar');
});

test('deve fechar o cadastro de uma transação', async ({ visit, modal }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
        await visit.Transactions();
        await modal.openModal('Adicionar Pessoa');
        await modal.buttonModal('Close');
});

test('deve clickar fora do modal do cadastro de uma transação e fechar', async ({ visit, modal }) => {
    await visit.Transactions();
    await modal.openModal('Adicionar Pessoa');
    await modal.outsideModal();
});

test('deve validar paginação Proximo', async ({ visit, paginations }) => {
    await visit.Transactions();
    await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ visit, paginations }) => {
    await visit.Transactions();
    await paginations.validatePaginationNext(8);
    await paginations.validatePaginationPrevious(8);
});