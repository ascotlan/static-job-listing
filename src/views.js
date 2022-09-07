import { getFilters, setFilters } from "./filters";
import { getListing } from "./job-listing";

//create DOM structure func
const generateDOMStructure = (listing) => {
  const jobEl = document.createElement("div");
  const logoEl = document.createElement("img");
  const headerEl = document.createElement("div");
  const nameEl = document.createElement("p");
  const newEl = document.createElement("span");
  const featuredEl = document.createElement("span");
  const titleEl = document.createElement("h2");
  const footerEl = document.createElement("ul");
  const postedAtEl = document.createElement("li");
  const contractEl = document.createElement("li");
  const locationEl = document.createElement("li");
  const filterEl = document.createElement("div");
  const levelEl = document.createElement("button");
  const roleEl = document.createElement("button");

  logoEl.setAttribute("src", `${listing.logo}`);
  logoEl.classList.add("job-logo");

  headerEl.classList.add("job-company");
  footerEl.classList.add("job-description");
  filterEl.classList.add("job-filters");

  nameEl.textContent = listing.company;
  nameEl.classList.add("company-name");
  headerEl.appendChild(nameEl);

  if (listing.new) {
    newEl.textContent = "new!";
    newEl.classList.add("new");
    headerEl.appendChild(newEl);
  }

  if (listing.featured) {
    featuredEl.textContent = "featured";
    featuredEl.classList.add("featured");
    headerEl.appendChild(featuredEl);
  }

  titleEl.textcontent = listing.position;
  titleEl.classList.add("job-position");

  postedAtEl.textContent = listing.postedAt;
  contractEl.textContent = listing.contract;
  locationEl.textContent = listing.location;

  footerEl.appendChild(postedAtEl);
  footerEl.appendChild(contractEl);
  footerEl.appendChild(locationEl);

  levelEl.textContent = listing.level;
  levelEl.classList.add("btn");
  roleEl.textContent = listing.role;
  roleEl.classList.add("btn");
  filterEl.appendChild(roleEl);
  filterEl.appendChild(levelEl);

  if (listing.languages) {
    listing.languages.forEach((language) => {
      const languageEl = document.createElement("button");
      languageEl.classList.add("btn");
      languageEl.textContent = language;
      filterEl.appendChild(languageEl);

      languageEl.addEventListener("click", (e) => {
        if (!getFilters().languages.includes(e.target.innerHTML)) {
          setFilters({
            languages: e.target.innerHTML,
          });
          renderFilters();
          renderJobs();
        }
      });
    });
  }
  if (listing.tools) {
    listing.tools.forEach((tool) => {
      const toolEl = document.createElement("button");
      toolEl.classList.add("btn");
      toolEl.textContent = tool;
      filterEl.appendChild(toolEl);

      toolEl.addEventListener("click", (e) => {
        if (!getFilters().tools.includes(e.target.innerHTML)) {
          setFilters({
            tools: e.target.innerHTML,
          });
          renderFilters();
          renderJobs();
        }
      });
    });
  }

  jobEl.classList.add("job");

  jobEl.appendChild(logoEl);
  jobEl.appendChild(headerEl);
  jobEl.appendChild(titleEl);
  jobEl.appendChild(footerEl);
  jobEl.appendChild(filterEl);

  roleEl.addEventListener("click", (e) => {
    if (!Object.values(getFilters()).includes(e.target.innerHTML)) {
      setFilters({
        role: e.target.innerHTML,
      });
      renderFilters();
      renderJobs();
    }
  });

  levelEl.addEventListener("click", (e) => {
    if (!Object.values(getFilters()).includes(e.target.innerHTML)) {
      setFilters({
        level: e.target.innerHTML,
      });
      renderFilters();
      renderJobs();
    }
  });

  return jobEl;
};

//create renderJobs func
const renderJobs = () => {
  const jobCardsEl = document.querySelector(".job-cards");
  const filters = getFilters();
  const listings = getListing();
  //check value of filter, if set, filter job lisiting
  const filteredJobs = listings.filter((listing) => {
    return (
      listing["role"].includes(filters["role"]) &&
      listing["level"].includes(filters["level"]) &&
      filters["languages"].every((language) =>
        listing["languages"].includes(language)
      ) &&
      filters["tools"].every((tool) => listing["tools"].includes(tool))
    );
  });

  jobCardsEl.innerHTML = "";

  filteredJobs.forEach((listing) => {
    jobCardsEl.appendChild(generateDOMStructure(listing));
  });
};

const renderFilters = () => {
  const filterEl = document.querySelector(".container-filter");
  const containerEl = document.createElement("div");
  containerEl.classList.add("filters");
  const filters = getFilters();

  filterEl.innerHTML = "";

  //add a filter div of any filters that are selected:
  const keys = Object.keys(filters);
  const values = Object.values(filters);
  if (values.join("").length !== 0) {
    filterEl.classList.remove("no-filter");
    keys.forEach((key) => {
      if ((key === "role" || key === "level") && filters[key]) {
        const containerFilterEl = document.createElement("div");
        const jobEl = document.createElement("span");
        const btn1 = document.createElement("button");
        btn1.innerHTML = "x";
        btn1.setAttribute("name", key);
        jobEl.textContent = filters[key].trim();

        btn1.classList.add("filter-remove-btn");
        jobEl.classList.add("filter-text");
        containerFilterEl.classList.add("filter");

        containerFilterEl.appendChild(jobEl);
        containerFilterEl.appendChild(btn1);
        containerEl.appendChild(containerFilterEl);

        btn1.addEventListener("click", (e) => {
          const obj = {};
          obj[e.target.name] = "";
          setFilters(obj);
          renderFilters();
          renderJobs();
        });
      }
      if ((key === "languages" || key === "tools") && filters[key].length) {
        filters[key].forEach((item) => {
          if (item) {
            const containerFilterEl = document.createElement("div");
            const othersEl = document.createElement("span");
            const btn2 = document.createElement("button");

            containerFilterEl.classList.add("filter");
            btn2.classList.add("filter-remove-btn");
            othersEl.classList.add("filter-text");

            btn2.innerHTML = "x";
            btn2.setAttribute("name", key);
            othersEl.textContent = item;
            containerFilterEl.appendChild(othersEl);
            containerFilterEl.appendChild(btn2);
            containerEl.appendChild(containerFilterEl);

            btn2.addEventListener("click", (e) => {
              const obj = {};
              obj[e.target.name] = item;
              setFilters(obj);
              renderFilters();
              renderJobs();
            });
          }
        });
      }
    });
    const clearBtnEl = document.createElement("button");
    clearBtnEl.innerHTML = "Clear";
    clearBtnEl.classList.add("filter-clear");
    filterEl.appendChild(containerEl);
    filterEl.appendChild(clearBtnEl);

    clearBtnEl.addEventListener("click", (e) => {
      setFilters({
        role: "",
        level: "",
        languages: "",
        tools: "",
      });
      renderFilters();
      renderJobs();
    });
  } else {
    filterEl.innerHTML = "";
    filterEl.classList.add("no-filter");
  }

  //handle input from 'clear' button to reset all filter object values to ''
};

export { renderJobs, renderFilters };
