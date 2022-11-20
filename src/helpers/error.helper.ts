const formatMultiErrors = (errors: any) => {
  const formatedErrorMessages = [];
  for (var key in errors) {
    formatedErrorMessages.push(`${key} ${errors[key].join(",")}`);
  }
  return formatedErrorMessages.join(",");
};

export { formatMultiErrors };
