// @ts-check
const { test, expect } = require('@playwright/test');

//test
test('test chat AI', async ({ page }) => {
    
    //1. Login
    await page.goto('https://student.kyons.vn/sign-in');
    await page.getByPlaceholder('Nhập email').fill('testyen@yopmail.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('@Yen221194');
    await page.getByRole('button',{ name: 'Đăng nhập', exact: true }).click();

    // 2. Chat vs Kyo
    await page.getByRole('link', {name:'Chat với Kyo'}).click();
    const inputElement = page.getByPlaceholder('Trò chuyện...');
    await inputElement.fill('test 1');
    await inputElement.press('Enter');
    await page.waitForTimeout(5000);

    await page.getByRole('button',{name: 'Tạo mới'}).click();
    await inputElement.fill('test 2');
    await inputElement.press('Enter');
    


     // Expects page to have a heading with the name of Installation.

     // Lấy element dựa trên thuộc tính title và class
    const historyItem1 = page.locator('a.history-item[title="test 1"]');
    const historyItem2 = page.locator('a.history-item[title="test 2"]');

    // Kiểm tra xem element có hiển thị hay không
    await expect(historyItem1).toBeVisible();
    await expect(historyItem2).toBeVisible();
    });