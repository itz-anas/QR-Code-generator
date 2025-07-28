import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    console.log("QR code image has been saved as qr_img.png");
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in this environment.");
    } else {
      console.error("Something went wrong:", error);
    }
  });
