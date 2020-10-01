const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 100, height: 1000 });

  const user = prompt("User profile URL (https:/www.lindekin.com/in/xxx): ");
  await page.goto(
    `https://www.linkedin.com/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fin%2F${user}&fromSignIn=true&trk=public_authwall_profile-login-link`
  );

  const userNameOrEmail = prompt("Linkedin username or email: ");
  await page.type("#username", userNameOrEmail);
  const password = prompt("Linkedin password: ");
  await page.type("#password", password);
  await page.focus("button");
  console.log("======== Login ========");
  await page.$eval("button", (form) => form.click());

  await page.waitForNavigation();
  await page.waitForSelector(".pv-top-card");
  const div = await page.$(".pv-top-card");

  console.log("======== Capturing screenshot ========");
  await div.screenshot({
    path: "fer.png",
    clip: { x: 0, y: 170, width: 300, height: 400 }
  });
  console.log("======== Screenshot saved ========");

  console.log("======== Log off ========");
  await browser.close();
})();
