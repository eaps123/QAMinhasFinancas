import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve cadastrar uma transação', async ({ visit, modal, toast, form }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];

    await visit.Transactions();
    await modal.openModal('Adicionar Pessoa');
    await form.submitLeadForm(leadName, leadData);
    await modal.buttonModal('Salvar');
    const message = 'Pessoa salva com sucesso!';
    await toast.containText(message);
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