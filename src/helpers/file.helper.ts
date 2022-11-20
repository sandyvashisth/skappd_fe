const checkFileType = (fileName: string) =>
  /^.*\.(txt|RTF|Docx|doc|DOC|pdf|PDF)$/.test(fileName);

  export { checkFileType };