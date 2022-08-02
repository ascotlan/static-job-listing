//declare filters object
const filters = {
  selectedText: "",
};
//create get filters func
const getFilters = () => filters;

//create update/set filters func
const setFilters = (update) => {
  if (typeof update.selectedText === "string") {
    filters.selectedText = update.selectedText;
  }
};

//export
export { getFilters, setFilters };
