import { test as base, expect } from '@playwright/test';
import { Toast, Popup, Paginations } from './actions/Components';
import { Leads } from './actions/Leads';

type Actions = {
  leads: Leads;
  toast: Toast;
  popup: Popup;
  paginations: Paginations;
};

export const test = base.extend<Actions>({
  leads: async ({ page }, use) => {
    await use(new Leads(page));
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