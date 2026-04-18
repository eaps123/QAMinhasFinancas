import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve cadastrar uma transação', async ({ leads, toast }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];

    await leads.visit();
    await leads.openLeadModal();
    await leads.submitLeadForm(leadName, leadData);
    const message = 'Pessoa salva com sucesso!';
    await toast.containText(message);
});

test('deve cancelar o cadastro de uma transação', async ({ leads }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadModal();
    await leads.cancelLeadForm(leadName, leadData);
});

test('deve fechar o cadastro de uma transação', async ({ leads }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadModal();
    await leads.closeLeadModal();
});

test('deve clickar fora do modal do cadastro de uma transação e fechar', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadModal();
    await leads.outsideLeadModal();
});

test('deve validar paginação Proximo', async ({ transactions, paginations }) => {
    await transactions.visit();
    await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ transactions, paginations }) => {
    await transactions.visit();
    await paginations.validatePaginationNext(8);
    await paginations.validatePaginationPrevious(8);
});