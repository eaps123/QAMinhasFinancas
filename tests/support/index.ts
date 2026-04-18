import { test as base, expect } from '@playwright/test';
import {
    Toast,
    Popup,
    Paginations,
    HaveText,
    Find,
    Form,
    Visit,
    Modal,
    Click,
} from './actions/Components.js';

type Actions = {
    modal: Modal;
    toast: Toast;
    popup: Popup;
    haveText: HaveText;
    find: Find;
    paginations: Paginations;
    form: Form;
    visit: Visit;
    click: Click;
};

export const test = base.extend<Actions>({
    click: async ({ page }, use) => {
        await use(new Click(page));
    },

    modal: async ({ page }, use) => {
        await use(new Modal(page));
    },

    form: async ({ page }, use) => {
        await use(new Form(page));
    },

    haveText: async ({ page }, use) => {
        await use(new HaveText(page));
    },

    find: async ({ page }, use) => {
        await use(new Find(page));
    },

    visit: async ({ page }, use) => {
        await use(new Visit(page));
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