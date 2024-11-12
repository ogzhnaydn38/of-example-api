if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".test.env" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".dev.env" });
} else {
  require("dotenv").config();
}

console.log("--------------------");
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("DB_HOST", process.env.DB_HOST);
console.log("DB_PORT", process.env.DB_PORT);
console.log("DB_USER", process.env.DB_USER);
console.log("DB_PASS", process.env.DB_PASS);
console.log("DB_NAME", process.env.DB_NAME);
console.log("DB_DIALECT", process.env.DB_DIALECT);
console.log("--------------------");

const app = require("./app");

const db = require("./models");
const startListener = require("./listeners");
const { startCronJobs } = require("./jobs");
const { seedData } = require("./seeders");

const startMapping = require("./mappings");

let expressServer = null;

const start = async () => {
  await db.sequelize.sync({ force: false });

  const servicePort = process.env.SERVICE_PORT
    ? process.env.SERVICE_PORT
    : 3000;
  expressServer = app.listen(servicePort);
  console.log("Listening port " + servicePort.toString());

  await startMapping();
  await startListener();
  await seedData();
  await startCronJobs();
};

process.on("SIGINT", async () => {
  console.log("Caught interrupt signal");
  await expressServer.close();
  process.exit(0);
});

start();
