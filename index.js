const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const colors = require("colors");

const fileNames = new Array();
const linkedinNames = new Array();

(async () => {
  console.log(
    "======== If there is any typo, the bot will fail ========".bold.red
  );
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 100, height: 1000 });

  await page.goto(
    `https://www.linkedin.com/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fin%2Fluizfernandoo&fromSignIn=true&trk=public_authwall_profile-login-link`
  );

  const userNameOrEmail = prompt("Linkedin username or email: ".blue);
  await page.type("#username", userNameOrEmail);

  const password = prompt("Linkedin password: ".blue);
  await page.type("#password", password);

  await page.focus("button");
  console.log("======== Login ========".bold.yellow);
  await page.$eval("button", (form) => form.click());

  await page.waitForNavigation();
  await getScreenshots(page);

  await browser.close();

  console.log("======== Creating PDF ========".bold.yellow);
  await createPDF();

  console.log(" ");
  console.log("======== Output text ========".bold.yellow);
  console.log(" ");
  linkedinNames.map((name) => {
    console.log(`@${name}`.green);
    console.log(" ");
  });
  console.log("======== Output text ========".bold.yellow);
  console.log(" ");

  console.log(
    "======== Made by: https://github.com/lfnandoo ========".bold.green
  );
})();

async function getScreenshots(page) {
  const user = prompt(
    "User profile URL (https:/www.lindekin.com/in/xxx): ".blue
  );
  const jobRole = prompt("User job role: ".blue);
  await page.goto(`https://www.linkedin.com/in/${user}`);
  await page.addStyleTag({ path: "styles.css" });

  await page.waitForSelector(".pv-top-card");
  await page.waitForSelector(".inline.t-24");
  console.log("======== Capturing screenshot ========".bold.yellow);
  const div = await page.$(".pv-top-card");
  const li = await page.$(".inline.t-24");
  const name = await (await li.getProperty("innerText")).jsonValue();
  linkedinNames.push(`${name} ${jobRole}`);

  await div.screenshot({
    path: `./screenshots/${user}.png`
  });
  console.log("======== Screenshot saved ========".bold.green);
  fileNames.push(user);

  const keepScreenshot = prompt(
    "[y] for more screenshot's and [s] for stop: ".blue
  );
  if (keepScreenshot === "y" || keepScreenshot === "Y") {
    await getScreenshots(page);
  } else {
    return console.log("======== Closing browser ========".bold.green);
  }
}

async function createPDF() {
  const doc = new PDFDocument({
    size: [350, 350]
  });

  doc.pipe(fs.createWriteStream("./result/output.pdf"));

  doc.text("Corrente bot!", 100, 100);

  fileNames.map((fileName) => {
    doc.addPage().image(`screenshots/${fileName}.png`, {
      fit: [210, 290]
    });
  });

  doc.end();

  return console.log("======== PDF Created ========".bold.green);
}
