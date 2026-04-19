import { test, expect } from '../../../support';
import { faker as fakerLib } from '@faker-js/faker';
const faker = fakerLib;
faker.locale = 'pt_BR';

test('deve validar paginação Proximo', async ({ visit, paginations }) => {
    await visit.Reports();
    await paginations.validatePaginationNext(8);
});

test('deve validar paginação Anterior', async ({ visit, paginations }) => {
    await visit.Reports();
    await paginations.validatePaginationNext(8);
    await paginations.validatePaginationPrevious(8);
});