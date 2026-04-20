import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

export function getRandomTransactionValue(): number {
    return Number((Math.random() * 1000 + 1).toFixed(2));
}

test('deve cadastrar uma transação do tipo receita e categoria receita', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Receita', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.RECEITA);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cadastrar uma transação do tipo despesa e categoria despesa', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Despesa', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.DESPESA);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cadastrar uma transação do tipo despesa e categoria AMBAS', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Despesa', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cadastrar uma transação do tipo receita e categoria AMBAS', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Despesa', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cadastrar uma transação do tipo receita com data futura', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate()+ faker.datatype.number({ min: 1, max: 30 }));
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Receita', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cadastrar uma transação do tipo despesa com data futura', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate()+ faker.datatype.number({ min: 1, max: 30 }));
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Despesa', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_SUCCESS);
});

test('deve cancelar o cadastro de uma transação', async ({ visit, modal }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    await modal.buttonModal(UI.BUTTONS.CANCEL);
});

test('deve fechar o cadastro de uma transação', async ({ visit, modal }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    await modal.buttonModal(UI.BUTTONS.CLOSE);
});

test('deve clickar fora do modal do cadastro de uma transação e fechar', async ({ visit, modal }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    await modal.outsideModal();
});

test('não deve cadastrar uma transação do tipo receita com a categoria de despesa', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Receita', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.DESPESA);
    await modal.buttonModalErro(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_FAILED);
});

test('não deve cadastrar uma transação do tipo despesa com a categoria de receita', async ({ visit, modal, toast, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Receita', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.RECEITA);
    await modal.buttonModalErro(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_TRANSACTION_FAILED);
});

test('não deve cadastrar uma transação do tipo receita com a categoria de receita para um menor de idade', async ({ visit, modal, toast, form, haveText }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation Receita', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLeadName(UI.SELECT.MENOR);
    await modal.labelModalCategory(UI.SELECT.RECEITA);
    await modal.buttonModalErro(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.KID_ALERT);
    await toast.containText(UI.MESSAGES.KID_NO_TRANSACTION);
});

test('não deve cadastrar uma transação do tipo despesa com valor negativo', async ({ visit, modal, haveText, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const description = faker.company.name();
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = -100.00;
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation '+description, dataAtual, valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.DESPESA);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.NEGATIVE_VALUE);
});

test('não deve cadastrar uma transação do tipo receita com valor negativo', async ({ visit, modal, haveText, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const description = faker.company.name();
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = -100.00;
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation '+description, dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.RECEITA);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.NEGATIVE_VALUE);
});

test('não deve cadastrar uma transação quando a descrição não é preenchida', async ({ visit, modal, haveText, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const description = faker.company.name();
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('', dataAtual, valor);
    await modal.selectTipo(UI.VALUE.RECEITA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.DESCRIBE_REQUIRED);
});

test('não deve cadastrar uma transação quando a data não é preenchida', async ({ visit, modal, haveText, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    const description = faker.company.name();
    const Data = new Date();
    Data.setDate(Data.getDate());
    const dataAtual = Data.toISOString().split('T')[0];
    const valor = getRandomTransactionValue();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
    ];
    await form.submitTransactionsForm('1- Automation '+description, '', valor);
    await modal.selectTipo(UI.VALUE.DESPESA);
    const options = await modal.getTipoOptions();
    expect(options).toEqual(
        expect.arrayContaining(expectedOptions)
    );
    await modal.labelModalLead();
    await modal.labelModalCategory(UI.SELECT.AMBAS);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
});

test('não deve cadastrar uma transação quando nenhum campo é preenchido', async ({ visit, modal, haveText, form }) => {
    await visit.Transactions();
    await modal.openModal(UI.BUTTONS.ADD_TRANSACTION);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.DESCRIBE_REQUIRED);
    await haveText.errorHaveText(UI.MESSAGES.INVALID_VALUE);
    await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
    await haveText.errorHaveTextLead(UI.MESSAGES.INVALID_STRING);
    await haveText.errorHaveTextCategory(UI.MESSAGES.INVALID_STRING);
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