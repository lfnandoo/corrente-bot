const puppeteer = require("puppeteer");
const login = require("./login");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 100, height: 1000 });
  await page.goto(
    `https://www.linkedin.com/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fin%2F${login.user}&fromSignIn=true&trk=public_authwall_profile-login-link`
  );

  await page.type("#username", login.usernameOrEmail);
  await page.type("#password", login.password);
  await page.focus("button");
  await page.$eval("button", (form) => form.click());

  await page.waitForNavigation();
  await page.waitForSelector(".pv-top-card");
  const div = await page.$(".pv-top-card");
  await div.screenshot({
    path: "fer.png",
    clip: { x: 0, y: 170, width: 300, height: 400 }
  });

  await browser.close();
})();
