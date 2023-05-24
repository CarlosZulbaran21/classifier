// importaciones de librerias
const express = require("express");
const natural = require("natural");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readDataset } = require("../utils/read-dataset");

// variables para configuracion del servidor
const app = express();
const port = 8989;

// instancia la clase BayesClassifier
const classifier = new natural.BayesClassifier();

// middlewares del servidor
app.use(bodyParser.json());
app.use(cors());

// inicio el entrenamiento previo a los request
datasetAsync = readDataset(process.cwd() + "/data/Customer-Churn-Records.csv");
datasetAsync
  .then((dataset) => {
    dataset.forEach((element) => {
      classifier.addDocument(
        [element.Geography, element.Gender, element.CreditScore, element.Age],
        element.Exited
      );
    });
    console.log("Entrenando...");
    classifier.train();
  })
  .catch((error) => console.log("[ERROR]: ", error));

// api para realizar las clasificaciones
app.post("/", (req, res) => {
  const { geography, gender, creditScore, age } = req.body;
  console.log(req.body);
  console.log("Realizando prueba de clasificación...");
  res.json({
    classify: classifier.classify([
      geography,
      gender,
      `${creditScore}`,
      `${age}`,
    ]),
  });
});

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
