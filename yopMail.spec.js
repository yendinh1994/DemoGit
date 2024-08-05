const {test, expect} = require('@playwright/test');

// Test
test('test yopmail', async({page}) => {
    await page.goto('https://yopmail.com/');
    const inputmail = page.getByPlaceholder('Enter your inbox here');
    await inputmail.fill('test1111@yopmail.com');
    await inputmail.press('Enter');
    await page.waitForTimeout(3000);

    const kyonsmail = page.locator('button:has(span.lmf:text("Kyons"))');
    await kyonsmail.click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Xin chào' })).toBeVisible();    

});