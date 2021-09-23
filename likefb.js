const { Builder, By, Key, until } = require("selenium-webdriver");

const DELAY = 5000;

//config Facebook account
const account = {
  username: "tinhtinhh4@gmail.com",
  password: "anhtinh999",
};
const randomComments = ["❤❤", "💖💖"];

(async function AutoComment() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://m.facebook.com/");

    //email fill in
    driver.findElement({ id: "m_login_email" }).then(async function (el) {
      await el.click();
      await el.sendKeys(account.username);

      //password fill in
      driver.findElement({ id: "m_login_password" }).then(async function (el) {
        await el.click();
        await el.sendKeys(account.password);

        //wait 1s and press enter
        let a1 = driver.actions();
        await a1.pause(1000).perform();
        await a1.sendKeys(Key.RETURN).perform();

        //return to fb
        await a1.pause(1000).perform();

        // when user logged in, loop comment [home -> click post -> comment -> home]
        while (true) {
          await driver.get("https://m.facebook.com/");
          //click comment first post of new feed
          await driver.findElement(By.className("_15kq _77li _l-a")).click();

          // scroll to bottom
          // let lenOfPage = driver.executeScript(
          //   "window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;"
          // );
          // let match = false;
          // while (match == false) {
          //   let lastCount = lenOfPage;
          //   await sleep(3000);
          //   lenOfPage = driver.executeScript(
          //     "window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;"
          //   );
          //   if (lastCount == lenOfPage) match = true;
          // }

          //wait 3s while page loading
          await a1.pause(3000).perform();
          console.log("click input");
          //fill in comment
          await driver.findElement({ id: "composerInput" }).then(async function (el) {
            const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];
            await el.sendKeys(randomComment);
          });
          console.log("click submit");
          await a1.pause(2000).perform();

          await driver.findElement(By.css("div._7om2._2pin._2pi8._4-vo > div:nth-child(3) > button")).click();
          console.log(`wait ${DELAY}s`);
          await sleep(DELAY);
        }
      });
    });

    // await driver.wait(until.titleIs('Facebook'), 1000);
  } catch (err) {
    await driver.executeScript(`document.querySelector("button[value='Đăng']").click()`);

    console.log(err);
  }
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
