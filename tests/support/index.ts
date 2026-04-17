import { test as base, expect } from '@playwright/test';
import { Toast, Popup, Paginations } from './actions/Components.js';
import { Leads } from './actions/Leads.js';
import { Category } from './actions/Category.js';
import { Reports } from './actions/Reports.js';

type Actions = {
  leads: Leads;
  toast: Toast;
  popup: Popup;
  reports: Reports;
  category: Category;
  paginations: Paginations;
};

export const test = base.extend<Actions>({
  leads: async ({ page }, use) => {
    await use(new Leads(page));
  },

  reports: async ({ page }, use) => {
    await use(new Reports(page));
  },

  category: async ({ page }, use) => {
    await use(new Category(page));
  },

  paginations: async ({ page }, use) => {
    await use(new Paginations(page));
  },

  toast: async ({ page }, use) => {
    await use(new Toast(page));
  },

  popup: async ({ page }, use) => {
    await use(new Popup(page));
  },
});

export { expect };