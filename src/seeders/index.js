const db = require("../models");
const { User } = db;
const seedData = async () => {
  console.log("Seeding Data");
  if (process.env.SEED_DATA == false || process.env.SEED_DATA == "false")
    return;

  // Seed Users
  const userDatas = require("./users.json");
  await User.bulkCreate(userDatas);

  console.log("Seeding Completed!");
};

module.exports = { seedData };
