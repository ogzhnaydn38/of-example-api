const cron = require("node-cron");
const startCronJobs = async () => {
  cron.schedule("0 0 0 * * *", async () => {
    console.group("Message Chek System", new Date());

    console.groupEnd();
  });
};

module.exports = { startCronJobs };
