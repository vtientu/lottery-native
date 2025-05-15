const { CronJob } = require("cron");
const createDailyResult = require("./job/createDailyResult");

// Run at 00:00 every day
const job = new CronJob(
  "* * * * *",
  async () => {
    try {
      console.log("Running daily result creation job...");
      await createDailyResult();
    } catch (error) {
      console.error("Error running daily result creation job:", error);
    }
  },
  null,
  true,
  "Asia/Ho_Chi_Minh"
);

job.start();
