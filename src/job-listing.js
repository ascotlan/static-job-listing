import getResponse from "./requests";
import { renderJobs, renderFilters } from "./views";

let jobs;

//read data from file
const getData = async () => {
  jobs = await getResponse();
  save();
  renderJobs();
  renderFilters();
};

const save = () => {
  localStorage.setItem("jobs", JSON.stringify(jobs));
};

const loadData = () => {
  const jobsJSON = localStorage.getItem("jobs");

  try {
    jobs = jobsJSON ? JSON.parse(jobsJSON) : [];
  } catch (e) {
    jobs = [];
  }
};

loadData();

//get data function
const getListing = () => jobs;

export { getListing, getData };
