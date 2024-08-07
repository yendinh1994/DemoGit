const { chromium } = require('playwright');
const easyYopmail = require('easy-yopmail');
const fs = require('fs');

const DEFAULT_PASSWORD = '@Yen221194';
const URL_SIGNUP = 'https://student.kyons.vn/sign-up';

(async () => {
  // Lấy email từ easyYopmail
  const myEmail = await easyYopmail.getMail();
    console.log(myEmail); // Output: [randomly generated name]@yopmail.com
 
  // Khởi động trình duyệt Playwright
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to main page
  await page.goto(URL_SIGNUP);
  await page.getByPlaceholder('Nhập email của bạn (*)').fill(myEmail);
  await page.getByPlaceholder('Nhập mật khẩu').fill(DEFAULT_PASSWORD);
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
    
  async function checkAndReadEmail() {
    // Lấy danh sách email từ inbox
    const inboxData = await easyYopmail.getInbox(myEmail);
    // Lấy ID của email đầu tiên
    const emailId = inboxData.inbox[0].id;
    // Đọc nội dung email
    const emailContent = await easyYopmail.readMessage(myEmail,emailId,{format: 'html'});
    const content = emailContent.content;
    return content;
    }

  async function extractVerificationLink(mail_content){
    const mailContentString = String(mail_content);
    const startString = 'Bạn hãy bấm <a href="';
    const endString = '" style="text-decoration';
    const startLinkIndex = mailContentString.indexOf(startString) + startString.length;
    const endLinkIndex = mailContentString.indexOf(endString,startLinkIndex);
    return mailContentString.substring(startLinkIndex,endLinkIndex);
  }

  async function main(){
    const emailContent = await checkAndReadEmail();
    const verifyLinkPromise = extractVerificationLink(emailContent); // trả về object Promise <string>

    // Chờ Promise hoàn thành và lấy giá trị chuỗi
    const verifyLink = await verifyLinkPromise;
    console.log("Verification link: ",verifyLink);
    
    // Khởi chạy trình duyệt và điều hướng đến verify link
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(verifyLink);
    await page.waitForTimeout(5000)

    // Điều hướng đến trang Đăng nhập
    await page.getByRole('link',{name: 'Đăng nhập ngay thôi'}).click();
    await page.getByPlaceholder('Nhập email').fill(myEmail);
    await page.getByPlaceholder('Nhập mật khẩu').fill(DEFAULT_PASSWORD);
    await page.getByRole('button', {name: 'Đăng nhập'}).click();
    await page.waitForTimeout(5000);

    // Đóng browser
    await browser.close();
  }

  main();
  await browser.close();

})();
