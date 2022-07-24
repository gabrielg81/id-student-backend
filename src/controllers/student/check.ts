import { Request, Response } from "express";
import puppeteer from "puppeteer";

export class CheckController {
  async handle(req: Request, res: Response) {
    const pagePrimary =
      "http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx";

    const result = req.body;

    const browser = await puppeteer.launch({
      headless: true, //false abre interface gráfica true não abre.
      defaultViewport: null, //Tira o tamanho padrão 800x600
      args: ["--start-maximized", "--no-sandbox"], //permite que seja uma página http e página maximizada
      ignoreHTTPSErrors: true,
    });

    try {
      const page = await browser.newPage();
      await page.goto(`${pagePrimary}`);
      //O puppeter insere os dados de matrícula e senha nos campos e envia
      await page.type(
        '[name="ctl00$PageContent$LoginPanel$UserName"]',
        `${result.matriculation}`
      );
      await page.type(
        "#ctl00_PageContent_LoginPanel_Password",
        `${result.password}`
      );
      await Promise.all([
        page.click('[type="submit"]'),
        page.waitForNavigation(),
      ]);

      //await page.waitForNavigation(); //Espera o carregamento da página
      // Aqui dentro executará toda DOM do javascript
      let checkName = await page.evaluate(() => {
        const name = document.querySelector(".usuario-nome")?.innerHTML;
        return {
          name,
        };
      });
      if (!checkName) {
        await page.click('[name="ctl00$btnLogin"]'); //ctl00$btnLogin Se houver algum comunicado na página
        await page.waitForNavigation();
        checkName = await page.evaluate(() => {
          const name = document.querySelector(".usuario-nome")?.innerHTML;
          return {
            name,
          };
        });
      }
      await browser.close();
      if (checkName.name != undefined) {
        res.status(200).setHeader("Content-Type", "application/json").send({
          name: checkName.name,
        });
      } else {
        return res
          .status(500)
          .setHeader("Content-Type", "application/json")
          .json({
            success: false,
          });
      }
    } catch (err) {
      await browser.close();
      console.log("Erro ao executar => : ", err);
      return res
        .status(400)
        .setHeader("Content-Type", "application/json")
        .json({
          success: false,
        });
    } finally {
      await browser.close();
    }
  }
}
