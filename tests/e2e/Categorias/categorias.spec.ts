import { test, expect } from '../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve validar todas as finalidades existentes', async ({ category, page }) => {
    await category.visit();
    await category.openCategoryModal();
    const select = page.locator('#finalidade');
    const opcoes = [
        { value: 'despesa', label: 'Despesa' },
        { value: 'receita', label: 'Receita' },
        { value: 'ambas', label: 'Ambas' },
    ];
    for (const opcao of opcoes) {
        await select.selectOption(opcao.value);
        await expect(select).toHaveValue(opcao.value);
        await expect(select.locator('option:checked')).toHaveText(opcao.label);
    }
});

test('deve Cadastrar uma categoria de despesa', async ({ category, toast }) => {
    const categoryName = faker.name.jobDescriptor();
    await category.visit();
    await category.openCategoryModal();
    await category.selectFinalidade('despesa');
    await category.submitCategoryForm('Automation ' + categoryName);
    const messageCreated = 'Categoria salva com sucesso!';
    await toast.containText(messageCreated);
});

test('deve Cadastrar uma categoria de receita', async ({ category, toast }) => {
    const categoryName = faker.name.jobDescriptor();
    await category.visit();
    await category.openCategoryModal();
    await category.selectFinalidade('receita');
    await category.submitCategoryForm(categoryName);
    const messageCreated = 'Categoria salva com sucesso!';
    await toast.containText(messageCreated);
});

test('deve Cadastrar uma categoria de ambas finalidades', async ({ category, toast }) => {
    const categoryName = faker.name.jobDescriptor();
    await category.visit();
    await category.openCategoryModal();
    await category.selectFinalidade('ambas');
    await category.submitCategoryForm('Automation ' + categoryName);
    const messageCreated = 'Categoria salva com sucesso!';
    await toast.containText(messageCreated);
});

test('deve cancelar o cadastro de categorias', async ({ category }) => {
    await category.visit();
    await category.openCategoryModal();
    await category.cancelCategoryForm();
});

test('deve fechar o cadastro de categorias', async ({ category }) => {
    await category.visit();
    await category.openCategoryModal();
    await category.closeCategoryModal();
});

test('deve clickar fora do modal de cadastro de categorias e fechar', async ({ category }) => {
    await category.visit();
    await category.openCategoryModal();
    await category.outsideCategoryModal();
});

test('não deve cadastrar quando o nome da categoria não é preenchido', async ({ category }) => {
    const categoryName = faker.name.jobDescriptor();
    await category.visit();
    await category.openCategoryModal();
    await category.selectFinalidade('despesa');
    await category.submitCategoryForm('');
    await category.errorHaveText('Descrição é obrigatória');
});

test('deve validar paginação Proximo', async ({ category, paginations }) => {
    await category.visit();
    await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ category, paginations }) => {
    await category.visit();
    await paginations.validatePaginationNext(8);
    await paginations.validatePaginationPrevious(8);
});