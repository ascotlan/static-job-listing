//declare filters object
const filters = {
  role: "",
  level: "",
  languages: [],
  tools: [],
};
//create get filters func
const getFilters = () => filters;

//create update/set filters func
const setFilters = (update) => {
  if (typeof update.role === "string") {
    filters.role = update.role;
  }

  if (typeof update.level === "string") {
    filters.level = update.level;
  }

  if (typeof update.languages === "string") {
    if (filters.languages.includes(update.languages)) {
      filters.languages.splice(filters.languages.indexOf(update.languages), 1);
    } else if (update.languages === "") {
      filters.languages = [];
    } else {
      filters.languages.push(update.languages);
    }
  }

  if (typeof update.tools === "string") {
    if (filters.tools.includes(update.tools)) {
      filters.tools.splice(filters.tools.indexOf(update.tools), 1);
    } else if (update.tools === "") {
      filters.tools = [];
    } else {
      filters.tools.push(update.tools);
    }
  }
};

//export
export { getFilters, setFilters };
