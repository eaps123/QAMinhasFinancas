import { test, expect } from '../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve cadastrar uma pessoa', async ({ leads, toast }) => {
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

test('deve cancelar o cadastro de pessoa', async ({ leads }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.cancelLeadForm(leadName, leadData);
});

test('deve fechar o cadastro de pessoa', async ({ leads }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.closeLeadModal();
});

test('deve clickar fora do modal de cadastro de pessoa e fechar', async ({ leads }) => {
  await leads.visit();
  await leads.openLeadModal();
  await leads.outsideLeadModal();
});

test('não deve cadastrar quando o nome não é preenchido', async ({ leads }) => {
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm('', leadData);

  await leads.errorHaveText('Nome é obrigatório');
});

test('não deve cadastrar quando a data não é preenchido', async ({ leads }) => {
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm('Everton Alves', '');

  await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ leads }) => {
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm('', '');

  await leads.errorHaveText('Nome é obrigatório');
  await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve cadastrar com data inválida', async ({ leads }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 150, max: 223 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm(leadName, leadData);

  await leads.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve cadastrar com nome inválido', async ({ leads }) => {
  const leadName = faker.random.numeric(10);
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm(leadName + '@#$%!¨&*()_-=+{`}?', leadData);

  await leads.errorHaveText('Nome é obrigatório');
});