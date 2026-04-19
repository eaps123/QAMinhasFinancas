import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
import { UI } from '../../../support/actions/Components';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve validar todas as finalidades existentes', async ({ visit, modal, find }) => {
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    const select = find.locatorFinalidade();
    const expectedOptions = [
        UI.LABELS.DESPESA,
        UI.LABELS.RECEITA,
        UI.LABELS.AMBAS,
    ];
    const options = await select.locator('option').allTextContents();
    const normalizedOptions = options.map(option => option.trim());
    expect(normalizedOptions).toEqual(
        expect.arrayContaining(expectedOptions)
    );
});

test('deve Cadastrar uma categoria de despesa', async ({ visit, modal, toast, form }) => {
    const categoryName = faker.name.jobDescriptor();
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.selectFinalidade(UI.VALUE.DESPESA);
    await form.submitCategoryForm('Automation ' + categoryName);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_CATEGORY_SUCCESS);
});

test('deve Cadastrar uma categoria de receita', async ({ visit, modal, toast, form }) => {
    const categoryName = faker.name.jobDescriptor();
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.selectFinalidade(UI.VALUE.RECEITA);
    await form.submitCategoryForm(categoryName);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_CATEGORY_SUCCESS);
});

test('deve Cadastrar uma categoria de ambas finalidades', async ({ visit, modal, toast, form }) => {
    const categoryName = faker.name.jobDescriptor();
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.selectFinalidade(UI.VALUE.AMBAS);
    await form.submitCategoryForm('Automation ' + categoryName);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await toast.containText(UI.MESSAGES.POST_CATEGORY_SUCCESS);
});

test('deve cancelar o cadastro de categorias', async ({ visit, modal }) => {
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.buttonModal(UI.BUTTONS.CANCEL);
});

test('deve fechar o cadastro de categorias', async ({ visit, modal }) => {
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.buttonModal(UI.BUTTONS.CLOSE);
});

test('deve clickar fora do modal de cadastro de categorias e fechar', async ({ visit, modal }) => {
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.outsideModal();
});

test('não deve cadastrar quando o nome da categoria não é preenchido', async ({ visit, modal, form, haveText }) => {
    const categoryName = faker.name.jobDescriptor();
    await visit.Category();
    await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
    await modal.selectFinalidade(UI.VALUE.DESPESA);
    await form.submitCategoryForm('');
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.DESCRIPTION_REQUIRED);
});

test('deve validar paginação Proximo', async ({ visit, paginations }) => {
    await visit.Category();
    await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ visit, paginations }) => {
    await visit.Category();
    await paginations.validatePaginationNext(8);
    await paginations.validatePaginationPrevious(8);
});