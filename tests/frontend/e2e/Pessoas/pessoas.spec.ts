import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve Cadastrar, Alterar e excluir uma pessoa', async ({ visit, modal, toast, form, click }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_CATEGORY);
  await form.submitLeadForm('Automation '+leadName, leadData);
  await toast.containText(UI.MESSAGES.POST_LEAD_SUCCESS);
  await click.ByName('Automation '+leadName, UI.BUTTONS.EDIT);
  await form.submitLeadForm('Automation '+leadName+ ' Alterado', leadData);;
  await toast.containText(UI.MESSAGES.PUT_LEAD_SUCCESS);
  await visit.Leads();
  await click.ByName('Automation '+leadName+ ' Alterado', UI.BUTTONS.DELETE);
  await modal.buttonModal(UI.BUTTONS.CONFIRM);
});

test('deve validar paginação Proximo', async ({ visit, paginations }) => {
  await visit.Leads();
  await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ visit, paginations }) => {
  await visit.Leads();
  await paginations.validatePaginationNext(8);
  await paginations.validatePaginationPrevious(8);
});