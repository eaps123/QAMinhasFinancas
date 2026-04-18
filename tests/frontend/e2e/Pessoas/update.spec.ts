import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve alterar o nome e a data do cadastro da pessoa', async ({ leads, toast }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 81, max: 81 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm(leadName + ' Alterado', leadData);
    const message = 'Pessoa atualizada com sucesso!';
    await toast.containText(message);
});

test('deve cancelar a alteração da pessoa', async ({ leads }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.cancelLeadForm(leadName, leadData);
});

test('deve fechar o modal de alteração da pessoa', async ({ leads }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.closeLeadModal();
});

test('deve clickar fora do modal de alteração de pessoa e fechar', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.outsideLeadModal();
});

test('não deve alterar o cadastro quando o nome é vazio', async ({ leads }) => {
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm('', leadData);
    await leads.errorHaveText('Nome é obrigatório');
});

test('não deve alterar o cadastro quando a data é vazio', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm('Everton Alves', '');
    await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro quando os campos são vazios', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm('', '');
    await leads.errorHaveText('Nome é obrigatório');
    await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro com data inválida', async ({ leads }) => {
    const leadName = faker.name.fullName();
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 150, max: 223 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm(leadName, leadData);
    await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro com nome inválido', async ({ leads }) => {
    const leadName = faker.random.numeric(10);
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.submitLeadForm(leadName + '@#$%!¨&*()_-=+{`}?', leadData);
    await leads.errorHaveText('Nome é obrigatório');
});