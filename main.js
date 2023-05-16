const natural = require("natural");
const classifier = new natural.BayesClassifier();

const { readDataset } = require("./utils");

datasetAsync = readDataset("Customer-Churn-Records.csv");

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
    console.log("Realizando prueba de clasificación...");

    console.log(classifier.classify(["Spain", "Male", "800", "20"]));
  })
  .catch((error) => console.log("[ERROR]: ", error));
