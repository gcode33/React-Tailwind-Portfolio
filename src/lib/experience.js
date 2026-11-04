const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// Whole years actually worked across all jobs, so gaps between jobs don't count.
// A job with no end date is still running. Used for the shirt number.
export const yearsOfExperience = (jobs, today = new Date()) => {
  const worked = jobs.reduce((total, job) => {
    const end = job.end ? new Date(job.end) : today;
    return total + Math.max(0, end - new Date(job.start));
  }, 0);
  return Math.floor(worked / MS_PER_YEAR);
};
