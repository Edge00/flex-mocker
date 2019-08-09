const chokidar = require("chokidar");
const chalk = require("chalk");

module.exports = ({ mockDir, ignoreFile }) => {
  if (process.env.NODE_ENV === "development") {
    chokidar
      .watch(mockDir, {
        ignored: ignoreFile || null,
        ignoreInitial: true
      })
      .on("all", (event, path) => {
        if (event !== "change" && event !== "add") return;
        try {
          // delete require cache
          Object.keys(require.cache).forEach(i => {
            i.includes(mockDir) && delete require.cache[require.resolve(i)];
          });
          console.log(chalk.green(`\n Mock file updated: ${path}`));
        } catch (error) {
          console.log(chalk.red(error));
        }
      });
  }
  console.log(chalk.green("\n Mock server start running!"));
};
