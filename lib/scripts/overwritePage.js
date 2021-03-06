const terminal = require("../utils/terminal");
const createNewApp = require("./create-app");
const { deleteWebApp } = require("./delete-app");
const { updatePageCount } = require("./updatePageCount");
const installDependencies = require("./create-app/installDependencies");
/**
 * Overwite Web Page.
 */
module.exports = overwriteWebPage = (fileName, destination, args) => {
  terminal.continousPrompt(
    "warning",
    `You are about to overwrite the ${fileName} page folder. Are you sure (Y/N)? `,
    (answer) => {
      if (answer === "Y" || answer === "y") {
        deleteWebApp(fileName, destination).then((substat) => {
          updatePageCount(fileName, "remove", args);
          if (substat === "success") {
            createNewApp(fileName, args, destination).then((substat2) => {
              if (substat2 === "duplicate") {
                updatePageCount(fileName, "append", args);
                terminal.success("Page Overwritten.");
                if (args.includes_npm) {
                  installDependencies(fileName, args, destination);
                }
              }
            });
          }
        });
      }
    }
  );
};
