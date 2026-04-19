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
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
});

test('não deve alterar o cadastro quando a data é vazia', async ({ visit, modal, haveText, form }) => {
    await visit.Leads();
    await modal.openModalFirst(UI.BUTTONS.EDIT);
    await form.submitLeadForm('Everton Alves', '');
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
});

test('não deve alterar o cadastro quando os campos são vazios', async ({ visit, modal, haveText, form }) => {
    await visit.Leads();
    await modal.openModalFirst(UI.BUTTONS.EDIT);
    await form.submitLeadForm('', '');
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
    await haveText.errorHaveText(UI.MESSAGES.INVALID_DATE);
});

test('não deve alterar o cadastro com data futura', async ({ visit, modal, haveText, form }) => {
    const leadName = faker.name.fullName();
    const leadData = new Date();
    leadData.setDate(leadData.getDate() + 1);
    const dataFutura = leadData.toISOString().split('T')[0];
    await visit.Leads();
    await modal.openModalFirst(UI.BUTTONS.EDIT);
    await form.submitLeadForm(leadName, dataFutura);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.PUT_LEAD_FAILED);
});

test('não deve alterar o cadastro com nome inválido', async ({ visit, modal, haveText, form }) => {
    const leadName = faker.random.numeric(10);
    const leadData = faker.date
        .birthdate({ mode: 'age', min: 18, max: 123 })
        .toISOString()
        .split('T')[0];
    await visit.Leads();
    await modal.openModalFirst(UI.BUTTONS.EDIT);
    await form.submitLeadForm(leadName + '@#$%!¨&*()_-=+{`}?😝', leadData);
    await modal.buttonModal(UI.BUTTONS.SAVE);
    await haveText.errorHaveText(UI.MESSAGES.NAME_REQUIRED);
});