import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "delete all files marked for deletion",
  { hours: 24 }, // day
  internal.files.deleteAllFiles
);

export default crons;
