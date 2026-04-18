import { test, expect } from '../../../support';
import { UI } from '../../../support/actions/Components';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve excluir o cadastro da pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.DELETE);
  await modal.buttonModal(UI.BUTTONS.DELETE);
});

test('deve cancelar a exclusÃ£o da pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.DELETE);
  await modal.buttonModal(UI.BUTTONS.CANCEL);
});

test('deve fechar o modal de excluir pessoa', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.DELETE);
  await modal.buttonModal(UI.BUTTONS.CLOSE);
});

test('deve clickar fora do modal de excluir pessoa e fechar', async ({ visit, modal }) => {
  await visit.Leads();
  await modal.openModalFirst(UI.BUTTONS.DELETE);
  await modal.outsideModal();
});