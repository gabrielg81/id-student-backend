const express = require("express");
const puppeteer = require("puppeteer");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 80;

const StudentCheckModel = require("./db/models/StudentCheckModel");
const { db } = require("./db/config");

const corsOptions = {
  origin: ["http://localhost:3000", "https://identidade-estudantil.vercel.app"],
  preflightContinue: false,
  credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.get("/list", async function (req, res) {
  const allStudentIDs = await StudentCheckModel.findAll();
  if (allStudentIDs.length > 0) {
    res.status(200).json(allStudentIDs);
  } else {
    res
      .status(204)
      .json({ success: false, mensagem: "Não há estudantes cadastrados!" });
  }
});

app.post("/check", async (req, res) => {
  const pagePrimary =
    "http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx";

  const result = req.body;

  const browser = await puppeteer.launch({
    headless: true, //false abre interface gráfica true não abre.
    defaultViewport: null, //Tira o tamanho padrão 800x600
    args: ["--start-maximized", "--no-sandbox"],//permite que seja uma página http e página maximizada
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
    await page.click('[type="submit"]');
    await page.waitForNavigation(); //Espera o carregamento da página
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
      res.status(200).send({
        name: checkName.name,
      });
    } else {
      return res.status(500).json({
        success: false,
      });
    }
  } catch (err) {
    await browser.close();
    console.log("Erro ao executar => : ", err);
    return res.status(400).json({
      success: false,
    });
  } finally {
    await browser.close();
  }
});

app.get("/getstudentsid", function (req, res) {
  res
    .status(200)
    .json({ result: "Carteirinhas cadastradas no banco de dados" });
});

app.post("/registry", async (req, res) => {
  await db.sync(); //Sincronizar tabelas do banco de dados
  const data = req.body;
  data.password = await bcrypt.hash(data.password, 8);
  const studentCheck = await StudentCheckModel.findOne({
    where: {
      codeStudent: data.codeStudent,
      cpf: data.cpf,
    },
  });

  if (studentCheck) {
    return res.status(501).json({
      success: false,
      messagem: "Estudante já cadastrado!",
    });
  }

  await StudentCheckModel.create(data) //Cadastrar os dados vindos do frontend no banco de dados
    .then(() => {
      return res.status(200).json({
        success: true,
        messagem: "Estudante cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        success: false,
        messagem: "Erro ao cadastrar estudante!",
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
