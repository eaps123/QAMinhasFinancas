import { test, expect } from '../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve excluir o cadastro da pessoa', async ({ leads, toast }) => {
    await leads.visit();
    await leads.openLeadDeleteModal();
    await leads.deleteLeadModal();
  });
  
  test('deve cancelar a exclução da pessoa', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadEditModal();
    await leads.cancelDeleteLead();
  });
  
  test('deve fechar o modal de excluir pessoa', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadDeleteModal();
    await leads.closeLeadModal();
  });
  
  test('deve clickar fora do modal de excluir pessoa e fechar', async ({ leads }) => {
    await leads.visit();
    await leads.openLeadDeleteModal();
    await leads.outsideLeadModal();
  });