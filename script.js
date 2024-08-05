const { chromium } = require('playwright');
const easyYopmail = require('easy-yopmail');
const fs = require('fs');

(async () => {
  // Lấy email từ easyYopmail
  const myEmail = await easyYopmail.getMail();
    console.log(myEmail); // Output: [randomly generated name]@yopmail.com
 
  // // Khởi động trình duyệt Playwright
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to main page
  await page.goto('https://student.kyons.vn/sign-in');
  await page.getByRole('link',{name: 'Đăng ký tại đây', exact: true}).click();
  await page.getByPlaceholder('Nhập email của bạn (*)').fill(myEmail);
  await page.getByPlaceholder('Nhập mật khẩu').fill('@Yen221194');
  await page.getByLabel('Gói miễn phí').check();
  await page.getByLabel('Tôi đồng ý với điều kiện và điều khoản sử dụng của Kyons. Xem điều kiện và điều khoản sử dụng tại').check();
  await page.getByRole('button',{name: 'Tạo tài khoản'}).click();
  await page.waitForTimeout(3000);

  // Điều hướng đến trang web Yopmail
  await page.goto('https://yopmail.com/');
  
  // Thêm email vào ô nhập và thực hiện các thao tác khác
  const inputmail = page.getByPlaceholder('Enter your inbox here');
  await inputmail.fill(myEmail);
  await inputmail.press('Enter');
  await page.waitForTimeout(3000)
  
  // Thêm các thao tác khác nếu cần
  await easyYopmail.getInbox(myEmail).then(inboxData => {
    console.log(inboxData);
  });
    
  async function checkAndReadEmail() {
    try {
        // Lấy danh sách email từ inbox
        const inboxData = await easyYopmail.getInbox(myEmail);
        
        // Kiểm tra nếu có email
        if (inboxData.inbox && inboxData.inbox.length > 0) {
            // Lấy ID của email đầu tiên
            const emailId = inboxData.inbox[0].id;
            console.log("Email ID:", emailId);
            
            // Đọc nội dung email
            const emailContent = await easyYopmail.readMessage(myEmail,emailId,'html');
            console.log("Email Content:", emailContent);
        } else {
            console.log("Không có email nào trong hộp thư.");
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

checkAndReadEmail();

})();
