const getResponse = async () => {
  const response = await fetch("./data.json");

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to fetch job listing data");
  }
};

export { getResponse as default };
