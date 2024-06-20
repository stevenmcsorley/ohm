import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { OurWorld } from "../types";
import configs from "../config";

const baseURL = configs[0].options.baseURL;

Given("I view the homepage", async function (this: OurWorld) {
  await this.page.goto(baseURL);
});

When("I click {string}", async function (this: OurWorld, text: string) {
  await this.page.$eval(`a:text("${text}")`, (element: HTMLElement) => {
    element.scrollIntoView();
  });
  await this.page.click(`a:text("${text}")`);
});

Then(
  "I should see the {string} page",
  async function (this: OurWorld, pageName: string) {
    const pageTitle = await this.page.title();
    const currentURL = await this.page.url();

    console.log(`Navigated to URL: ${currentURL}`);
    console.log(`Page title is: ${pageTitle}`);

    assert.strictEqual(
      pageTitle.includes(pageName),
      true,
      `Expected page title to include "${pageName}", but got "${pageTitle}"`
    );
  }
);
