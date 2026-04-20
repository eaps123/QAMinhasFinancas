import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve cadastrar uma pessoa', async ({ visit, modal, toast, form }) => {
  const leadName = faker.name.fullName();
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];

  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm(leadName, leadData);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await toast.containText(UI.MESSAGES.POST_LEAD_SUCCESS);
});

test('deve cadastrar uma pessoa menor de idade', async ({ visit, modal, toast, form }) => {
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 1, max: 17 })
    .toISOString()
    .split('T')[0];

  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm('1- Automation Kid', leadData);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await toast.containText(UI.MESSAGES.POST_LEAD_SUCCESS);
});

test('deve cancelar o cadastro de pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await modal.buttonModal(UI.BUTTONS.CANCEL);
});

test('deve fechar o cadastro de pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await modal.buttonModal(UI.BUTTONS.CLOSE);
});

test('deve clickar fora do modal de cadastro de pessoa e fechar', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await modal.outsideModal();
});

test('não deve cadastrar quando o nome não é preenchido', async ({ visit, modal, haveText, form }) => {
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm('', leadData);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
});

test('não deve cadastrar quando a data não é preenchida', async ({ visit, modal, haveText, form }) => {
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm('Everton Alves', '');
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ visit, modal, haveText, form }) => {
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm('', '');
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
  await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
});

test('não deve cadastrar com data futura', async ({ visit, modal, haveText, form }) => {
  const leadName = faker.name.fullName();
  const leadData = new Date();
    leadData.setDate(leadData.getDate() + 1);
    const dataFutura = leadData.toISOString().split('T')[0];
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm(leadName, dataFutura);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await haveText.errorHaveText(UI.MESSAGES.PUT_LEAD_FAILED);
});

test('não deve cadastrar com nome inválido', async ({ visit, modal, haveText, form }) => {
  const leadName = faker.random.numeric(10);
  const leadData = faker.date
    .birthdate({ mode: 'age', min: 18, max: 123 })
    .toISOString()
    .split('T')[0];
  await visit.Leads();
  await modal.openModal(UI.BUTTONS.ADD_LEAD);
  await form.submitLeadForm(leadName + '@#$%!¨&*()_-=+{`}?👌', leadData);
  await modal.buttonModal(UI.BUTTONS.SAVE);
  await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
});