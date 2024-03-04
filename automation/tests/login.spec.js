import { test, expect } from '@playwright/test';

test('Only password', async ({ page }) => {
    await page.goto('https://karshten.github.io/demo-day.github.io/#');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Введите ваш логин!');
        await dialog.accept();
    });
    await page.getByPlaceholder('Пароль', { exact: true }).fill('secure123');
    await page.getByRole('button', { name: 'Регистратсия' }).click();   
})

test('No password', async ({page})=>{ 
    await page.goto('https://karshten.github.io/demo-day.github.io/#');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Вы не придумали пароль!');
        await dialog.accept();
    });
    await page.getByPlaceholder('Логин').fill('AB');
    await page.getByRole('button', { name: 'Регистратсия' }).click();  
})

test('Same passwords', async ({page})=> {
    await page.goto('https://karshten.github.io/demo-day.github.io/#');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Пароли не совпали');
        await dialog.accept();
    });
    await page.getByPlaceholder('Логин').fill('john');
    await page.getByPlaceholder('Пароль', { exact: true }).fill('tester123');
    await page.getByPlaceholder('Повторите пароль').fill('123secure');

    await page.getByRole('button', { name: 'Регистратсия' }).click();  
})

test('Exist user', async ({page})=> {
    await page.goto('https://karshten.github.io/demo-day.github.io/#');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Такой пользователь уже существует!');
        await dialog.accept();
    });
    await page.getByPlaceholder('Логин').fill('john_doe');
    await page.getByPlaceholder('Пароль', { exact: true }).fill('tester123');
    await page.getByPlaceholder('Повторите пароль').fill('tester123');
    await page.getByRole('button', { name: 'Регистратсия' }).click();  
})

test('New user', async({page})=>{
    await page.goto('https://karshten.github.io/demo-day.github.io/#');
    await page.getByPlaceholder('Логин').fill('john123121');
    await page.getByPlaceholder('Пароль', { exact: true }).fill('tester123');
    await page.getByPlaceholder('Повторите пароль').fill('tester123');
    await page.getByRole('button', { name: 'Регистратсия' }).click();  
    await page.waitForTimeout(2000)
    await expect(page).toHaveScreenshot('login.png', { maxDiffPixelRatio: 0.1 })

})

