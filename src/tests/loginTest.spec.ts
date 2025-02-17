import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
//import logger from "../utils/LoggerUtil";
import {encrypt, decrypt } from "../utils/CryptoJsUtils";
import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptEnvFile";

const authFile = "src/config/auth.json";

test.skip("simple login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  //await loginPage.fillUsername_selfheal("demo_selfheal");
});

test("simple login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));//! is for not null value in TS 
  await loginPage.fillPassword(decrypt(process.env.password!));//process.env is used in Node.jsto access environment variables, which are key-value pairs
  
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  //logger.info("Test for login is completed");
 // await page.context().storageState({ path: authFile });
  //logger.info("Auth state is saved");
});
test.skip("sample env test", async({page})=>{
  console.log(process.env.NODE_ENV);
  console.log(process.env.userid);
  console.log(process.env.password);
})

// test.skip("Login with auth file", async ({ browser }) => {
//   const context = await browser.newContext({ storageState: authFile });
//   const page = await context.newPage();
//   await page.goto(
//     "https://mukunthanr2-dev-ed.lightning.force.com/lightning/page/home"
//   );
//   await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
// });
test.skip("sample env test ", async({page})=>{
  // const plainText = "Hello, mars!";
  // const encryptedText = encrypt(plainText);
  // console.log('SALT:', process.env.SALT);
  // console.log('Encrypted:', encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log('Decrypted:',decryptedText)

  encryptEnvFile();

})
