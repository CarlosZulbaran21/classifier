const fs = require("fs");
const csv = require("csv-parser");

// Función para leer el dataset CSV
function readDataset(filename) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (row) => {
        const example = {
          CreditScore: parseInt(row.CreditScore),
          Geography: row.Geography,
          Gender: row.Gender,
          Age: parseInt(row.Age),
          Tenure: parseInt(row.Tenure),
          Balance: parseFloat(row.Balance),
          NumOfProducts: parseInt(row.NumOfProducts),
          HasCrCard: parseInt(row.HasCrCard),
          IsActiveMember: parseInt(row.IsActiveMember),
          EstimatedSalary: parseFloat(row.EstimatedSalary),
          Exited: parseInt(row.Exited),
          Complain: parseInt(row.Complain),
          SatisfactionScore: parseInt(row["Satisfaction Score"]),
          CardType: row["Card Type"],
          PointEarned: parseInt(row["Point Earned"]),
        };
        data.push(example);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = { readDataset };
