import { Request, Response } from "express";
import puppeteer from "puppeteer";

import { Builder, By, Key } from "selenium-webdriver";

import chrome from "selenium-webdriver/chrome";
import Nightmare from "nightmare";

export class VerifyStudentController {
  // async checkInfoStudents(req: Request, res: Response) {
  //   const pagePrimary =
  //     "http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx";

  //   const result = req.body;

  //   const browser = await puppeteer.launch({
  //     headless: true, //false abre interface gráfica true não abre.
  //     //headless: chrome.headless,
  //     defaultViewport: null, //Tira o tamanho padrão 800x600
  //     //args: ["--disable-setuid-sandbox", "--start-maximized"], //permite que seja uma página http e página maximizada
  //     args: chrome.args,
  //     ignoreHTTPSErrors: true,
  //     executablePath: await chrome.executablePath,
  //   });

  //   try {
  //     const page = await browser.newPage();
  //     await page.setUserAgent(
  //       "Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10"
  //     );
  //     await page.goto(`${pagePrimary}`);
  //     await page.type(
  //       '[name="ctl00$PageContent$LoginPanel$UserName"]',
  //       `${result.matriculation}`
  //     );
  //     await page.type(
  //       "#ctl00_PageContent_LoginPanel_Password",
  //       `${result.password}`
  //     );
  //     await page.click('[type="submit"]');
  //     await page.waitForNavigation(); //Espera o carregamento da página
  //     let checkName = await page.evaluate(() => {
  //       const name = document.querySelector(".usuario-nome")?.innerHTML;
  //       return {
  //         name,
  //       };
  //     });
  //     if (!checkName) {
  //       await page.click('[name="ctl00$btnLogin"]'); //ctl00$btnLogin Se houver algum comunicado na página
  //       await page.waitForNavigation();
  //       checkName = await page.evaluate(() => {
  //         const name = document.querySelector(".usuario-nome")?.innerHTML;
  //         return {
  //           name,
  //         };
  //       });
  //     }
  //     await browser.close();
  //     if (checkName.name != undefined) {
  //       res.status(200).send({
  //         name: checkName.name,
  //       });
  //     } else {
  //       return res.status(500).json({
  //         success: false,
  //       });
  //     }
  //   } catch (err) {
  //     await browser.close();
  //     console.log("Erro ao executar => : ", err);
  //     return res.status(400).json({
  //       success: false,
  //     });
  //   } finally {
  //     await browser.close();
  //   }
  // }

  // async checkInfoStudents(req: Request, res:Response) {
  //   const pagePrimary = 'http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx';
  //   const result = req.body;

  //   const options = new chrome.Options();
  //   options.headless(); // Executar em modo headless (sem interface gráfica)

  //   const driver = await new Builder()
  //     .forBrowser('chrome')
  //     .setChromeOptions(options)
  //     .build();

  //   try {
  //     await driver.get(pagePrimary);
  //     await driver.findElement(By.name('ctl00$PageContent$LoginPanel$UserName')).sendKeys(result.matriculation);
  //     await driver.findElement(By.css('#ctl00_PageContent_LoginPanel_Password')).sendKeys(result.password, Key.RETURN);
  //     await driver.wait(driver.findElement(By.css('.usuario-nome')).isDisplayed(), 5000);

  //     const nameElement = await driver.findElement(By.css('.usuario-nome'));
  //     const name = await nameElement.getAttribute('innerHTML');

  //     if (name) {
  //       res.status(200).send({
  //         name: name.trim(),
  //       });
  //     } else {
  //       return res.status(500).json({
  //         success: false,
  //       });
  //     }
  //   } catch (err) {
  //     console.log('Erro ao executar:', err);
  //     return res.status(400).json({
  //       success: false,
  //     });
  //   } finally {
  //     await driver.quit();
  //   }
  // }

  async checkInfoStudents(req: Request, res: Response) {
    const pagePrimary =
      "http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx";
    const result = req.body;

    const nightmare = new Nightmare({ show: false }); // Executar em modo headless (sem interface gráfica)

    try {
      await nightmare
        .goto(pagePrimary)
        .type(
          '[name="ctl00$PageContent$LoginPanel$UserName"]',
          result.matriculation
        )
        .type("#ctl00_PageContent_LoginPanel_Password", result.password)
        .click('[type="submit"]')
        .wait(".usuario-nome");

      const name = await nightmare.evaluate(() => {
        const nameElement = document.querySelector(".usuario-nome");
        return nameElement ? nameElement.innerHTML.trim() : null;
      });

      if (name) {
        res.status(200).send({
          name: name,
        });
      } else {
        return res.status(500).json({
          success: false,
        });
      }
    } catch (err) {
      console.log("Erro ao executar:", err);
      return res.status(400).json({
        success: false,
      });
    } finally {
      await nightmare.end();
    }
  }
}
