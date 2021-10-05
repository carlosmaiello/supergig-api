const { database } = require("../models");

(async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log(error);
  }
})();
