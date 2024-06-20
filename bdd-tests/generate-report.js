// generate-report.js
const reporter = require("multiple-cucumber-html-reporter");

reporter.generate({
  jsonDir: "reports/",
  reportPath: "reports/",
  openReportInBrowser: true,
  pageTitle: "StevenMcSorley Test Report",
  reportName: "StevenMcSorley Test Report",
  displayDuration: true,
  durationInMS: true,
  customData: {
    title: "StevenMcSorley Test run information",
    data: [
      { label: "Project", value: "StevenMcSorley" },
      { label: "Version", value: "1.0.0" },
      { label: "Environment", value: "staging" },
    ],
  },
});
