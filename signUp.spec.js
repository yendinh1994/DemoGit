const {test, expect} = require('@playwright/test');

// Test
test('test sign up', async({page}) => {
    // 1. Navigate to main page
    // await page.goto('https://student.kyons.vn/sign-in');
    // await page.getByRole('link',{name: 'Đăng ký tại đây', exact: true}).click();
    // await page.getByPlaceholder('Nhập email của bạn (*)').fill('test111@4yopmail.com');
    // await page.getByPlaceholder('Nhập mật khẩu').fill('@Yen221194');
    // await page.getByLabel('Gói miễn phí').check();
    // await page.getByLabel('Tôi đồng ý với điều kiện và điều khoản sử dụng của Kyons. Xem điều kiện và điều khoản sử dụng tại').check();
    // await page.getByRole('button',{name: 'Tạo tài khoản'}).click();
    // await page.waitForTimeout(3000);



    // 2. Navigate to mail page
    await page.goto('https://yopmail.com/');
    const inputmail = page.getByPlaceholder('Enter your inbox here');
    await inputmail.fill('test1114@yopmail.com');
    await inputmail.press('Enter');
    await page.waitForTimeout(3000);




    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Xin chào' })).toBeVisible();


});