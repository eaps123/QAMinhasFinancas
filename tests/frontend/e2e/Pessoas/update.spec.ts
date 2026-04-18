import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve alterar o nome e a data do cadastro da pessoa', async ({ visit, modal, toast, form }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 81, max: 81 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm(leadName + ' Alterado', leadData);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await toast.containText(UI.MESSAGES.PUT_LEAD_SUCCESS);
});

test('deve cancelar a alteração da pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await modal.buttonModal(UI.BUTTONS.CANCEL);
});

test('deve fechar o modal de alteração da pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await modal.buttonModal(UI.BUTTONS.CLOSE);
});

test('deve clickar fora do modal de alteração de pessoa e fechar', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await modal.outsideModal();
});

test('não deve alterar o cadastro quando o nome é vazio', async ({ visit, modal, haveText, form }) => {
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm('', leadData);
  await haveText.errorHaveText('Nome é obrigatório');
});

test('não deve alterar o cadastro quando a data é vazia', async ({ visit, modal, haveText, form }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm('Everton Alves', '');
  await haveText.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro quando os campos são vazios', async ({ visit, modal, haveText, form }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm('', '');
  await haveText.errorHaveText('Nome é obrigatório');
  await haveText.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro com data inválida', async ({ visit, modal, haveText, form }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 150, max: 223 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm(leadName, leadData);
  await haveText.errorHaveText('Invalid input: expected date, received Date');
});

test('não deve alterar o cadastro com nome inválido', async ({ visit, modal, haveText, form }) => {
  const leadName = faker.random.numeric(10);
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.EDIT);
  await form.submitLeadForm(leadName + '@#$%!¨&*()_-=+{`}?', leadData);
  await haveText.errorHaveText('Nome é obrigatório');
});