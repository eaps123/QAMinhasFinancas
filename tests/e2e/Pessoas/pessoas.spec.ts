import { test, expect } from '../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve Cadastrar, Alterar e excluir uma pessoa', async ({ leads, toast }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm('Automation '+leadName, leadData);
  const messageCreated = 'Pessoa salva com sucesso!';
  await toast.containText(messageCreated);
  await leads.clickEditByName('Automation '+leadName);
  await leads.submitLeadForm('Automation '+leadName+ ' Alterado', leadData);
  const messageUpdate = 'Pessoa atualizada com sucesso!';
  await toast.containText(messageUpdate);
  await leads.visit();
  await leads.clickDeleteByName('Automation '+leadName+ ' Alterado');
  await leads.deleteLeadModal();
});

test('deve validar paginação Proximo', async ({ leads, paginations }) => {
  await leads.visit();
  await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ leads, paginations }) => {
  await leads.visit();
  await paginations.validatePaginationNext(8);
  await paginations.validatePaginationPrevious(8);
});