// @ts-check
const { test, expect } = require('@playwright/test');

// Test 
test('has title', async ({ page }) => {
    await page.goto('https://student.kyons.vn/sign-in');
  
    await expect(page).toHaveTitle("KYONS");
  });
  
test('login success', async ({ page }) => {
    await page.goto('https://student.kyons.vn/sign-in');
    await page.getByPlaceholder('Nhập email').fill('testyen@yopmail.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('@Yen221194');
    await page.getByRole('button',{ name: 'Đăng nhập', exact: true }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Xin chào' })).toBeVisible();
    });