const { CronJob } = require("cron");
const createDailyResult = require("./job/createDailyResult");

const job = new CronJob("* * * * *", async () => {
  try {
    console.log("Running daily result creation job...");
    await createDailyResult();
  } catch (error) {
    console.error("Error running daily result creation job:", error);
  }
});

job.start();
