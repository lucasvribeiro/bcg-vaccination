const csv = require("csv-parser");
const fs = require("fs");

let values = {
  AC: [],
  AL: [],
  AP: [],
  AM: [],
  BA: [],
  CE: [],
  DF: [],
  ES: [],
  GO: [],
  MA: [],
  MT: [],
  MS: [],
  MG: [],
  PA: [],
  PB: [],
  PR: [],
  PE: [],
  PI: [],
  RJ: [],
  RN: [],
  RS: [],
  RO: [],
  RR: [],
  SC: [],
  SP: [],
  SE: [],
  TO: [],
};

fs.createReadStream("mun_data_bcg.csv")
  .pipe(csv())
  .on("data", (row) => {
    values[row.estado_abrev].push(row);
  })
  .on("end", () => {
    for (let v in values) {
      var json = JSON.stringify({ data: values[v] });
      var fileName = "data-json/" + v + ".json";

      fs.writeFile(
        fileName,
        json,
        "utf8",
        // eslint-disable-next-line no-loop-func
        function readFileCallback(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Arquivo " + fileName + " gerado com sucesso!");
          }
        }
      );
    }
  });
