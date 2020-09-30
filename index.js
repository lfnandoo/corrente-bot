const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 100, height: 1000 });
  await page.goto(
    "https://www.linkedin.com/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fin%2Fluizfernandoo&fromSignIn=true&trk=public_authwall_profile-login-link"
  );

  await page.type("#username", "heroice.contato.oficial@gmail.com");
  await page.type("#password", "26650010");
  await page.focus("button");
  await page.$eval("button", (form) => form.click());

  await page.waitForNavigation();
  await page.waitForSelector(".pv-top-card");
  const div = await page.$(".pv-top-card");
  await div.screenshot({ path: "fer.png", height: 1000 });

  await browser.close();
})();
