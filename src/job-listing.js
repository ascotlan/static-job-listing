let jobs = [];

//read data from file
const loadData = () => {
  const jobsJSON = require("/public/data.json");
  try {
    jobs = jobsJSON ? jobsJSON : [];
  } catch (e) {
    jobs = [];
  }
};

loadData();

//get data function
const getListing = () => jobs;

export { getListing };
