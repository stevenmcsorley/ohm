import {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { BrowserContext, Page } from "playwright";
import configs from "./config";
import { OurWorld } from "./types";
import { createJiraTicket } from "./utils/jiraBugReporter";
import colors from "colors";

colors.enable();

let browser: any;

// Set the default timeout to 10 seconds
setDefaultTimeout(30000);

BeforeAll(async function () {
  // Choose a configuration to use (in this example, we're using the first one)
  const config = configs[0];
  // Launch the browser with the options from the configuration
  browser = await config.type.launch(config.options);
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: OurWorld) {
  // Choose a configuration to use (in this example, we're using the first one)
  const config = configs[0];
  // Create a new context with the viewport settings from the configuration
  this.context = await browser.newContext({
    viewport: config.viewport,
    recordVideo: config.options.recordVideo, // Add this line to pass on the recordVideo option to the new context
  });
  // Create a new page object in the context
  this.page = await this.context.newPage();
  // Add this line to close the context and record the video
  this.context.close.bind(this.context);
});

After(async function (this: OurWorld) {
  // Close the page and context objects
  await this.page.close();
  await this.context.close();
});

After(async function (testCase) {
  if (testCase.result!.status === Status.FAILED) {
    // If an error occurs, call the jiraBugReporter function with a message and the error
    try {
      // code that may cause an error here
      await createJiraTicket(testCase.result);
      console.log(colors.green("JIRA ticket created"));
    } catch (error) {
      console.log(colors.red("Error creating JIRA ticket:"));
      console.log(error);
    }
  }
});
