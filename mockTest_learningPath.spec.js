// @ts-check
const { test, expect } = require('@playwright/test');

//test mock-test
test('test mock-test', async ({ page }) => {
    
    //1. Login
    await page.goto('https://student-stg.kyons.vn/sign-in');
    await page.getByPlaceholder('Nhập email').fill('dtp.yen@kyons.vn');
    await page.getByPlaceholder('Nhập mật khẩu').fill('@Yen221194');
    await page.getByRole('button',{ name: 'Đăng nhập', exact: true }).click();

    //2. Create mock-test

        //2.1. Select program
    await page.locator('//button[text()="Tạo mục tiêu học tập mới "]').click();
    await page.waitForTimeout(3000)
    await page.locator('select[data-tooltip-content="Hãy chọn môn học mà bạn muốn"]').selectOption('Môn Toán');
    await page.locator('select[data-tooltip-content="Chọn tiếp chương trình học"]').selectOption('Toán 10 THPTQG');
    await page.locator('select[data-tooltip-content="Chọn thêm mục tiêu học tập của bạn"]').selectOption('Lớp 10');
    await page.getByRole('button',{ name: 'Bắt đầu', exact: true }).click();

        //2.2. Checkbox để chọn 7-28 topics
    await page.getByLabel('Mệnh đề',{exact: true}).click();
    await page.getByLabel('Tập hợp',{exact: true}).click();
    await page.getByLabel('Các phép toán trên tập hợp',{exact: true}).click();
    await page.getByLabel('Đường tròn trong mặt phẳng tọa độ',{exact: true}).click();
    await page.getByLabel('Ba đường conic trong mặt phẳng tọa độ',{exact: true}).click();
    await page.getByLabel('Xác suất của biến cố',{exact: true}).click();
    await page.getByLabel('Bất phương trình bậc nhất hai ẩn',{exact: true}).click();

    await page.getByRole('button',{name: 'Làm bài kiểm tra', exact: true}).click();

        // 2.3. Làm test
    for (let i=0; i<4; i++) {
        const icon = page.locator(".icon-ChevronRight").first();
        await icon.click();
        await page.waitForTimeout(500);
    }
    
    await page.getByRole('button',{name: '50',exact: true}).click();

    await page.getByRole('button',{name: 'Nộp bài', exact: true}).click();

    await page.getByRole('button',{name: 'Nộp bài luôn', exact: true}).click();
    await page.getByRole('button',{name: 'Nộp bài luôn', exact: true}).click();

    // 3. Review mock-test
    await page.getByRole('button',{name: 'Xem lại đáp án bài kiểm tra', exact: true}).click();
    await page.getByRole('button',{name: '5',exact: true}).click();
    await page.getByRole('button',{name: '10',exact: true}).click();
    
    for (let i=0; i<4; i++) {
        const icon = page.locator(".icon-ChevronRight").first();
        await icon.click();
        await page.waitForTimeout(500);
    }
    
    await page.getByRole('button',{name: '50',exact: true}).click();

    // 4. Create learning path
    await page.getByRole('button',{name: 'Tạo lộ trình học', exact: true}).click();

        // 4.1. Làm lesson
    const specificElement = page.locator('[data-tooltip-content="Bạn hãy bấm vào đây để làm bài tập thực hành theo lộ trình học"]').first();
    await specificElement.click();
    await page.getByLabel('Đáp án A:').check();
    await page.getByRole('button',{name: 'Nộp bài', exact: true}).click();
    await page.getByRole('button',{name: 'Câu kế tiếp', exact: true}).click();

        // 4.2. Xem bài học
    await page.locator('button.btn.orange:has(i.icon-Crown.text-white)').click();
    await page.waitForTimeout(3000);
    await page.getByRole('button',{name: 'Đã hiểu', exact: true}).click();
    await page.locator('i.icon-ChevronLeft + span:has-text("Về lộ trình học")').click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Lớp 10' })).toBeVisible();
    });