import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve excluir o cadastro da pessoa', async ({ visit, modal }) => {
    await visit.Leads();
    await modal.openModalFirst('Deletar');
    await modal.buttonModal('Deletar');
  });
  
  test('deve cancelar a exclução da pessoa', async ({ visit, modal }) => {
    await visit.Leads();
    await modal.openModalFirst('Deletar');
    await modal.buttonModal('Cancelar');
  });
  
  test('deve fechar o modal de excluir pessoa', async ({ visit, modal }) => {
    await visit.Leads();
    await modal.openModalFirst('Deletar');
    await modal.buttonModal('Close');
  });
  
  test('deve clickar fora do modal de excluir pessoa e fechar', async ({ visit, modal }) => {
    await visit.Leads();
    await modal.openModalFirst('Deletar');
    await modal.outsideModal();
  });