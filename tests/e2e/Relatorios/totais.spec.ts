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