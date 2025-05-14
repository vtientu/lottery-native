const cron = require("node-cron");
const createDailyResult = require("./job/createDailyResult");

// Chạy lúc 00:00 mỗi ngày
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily result creation job...");
  await createDailyResult();
});
