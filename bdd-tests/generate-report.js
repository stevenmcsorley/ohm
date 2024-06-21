// generate-report.js
import { generate } from "multiple-cucumber-html-reporter";

generate({
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
