/// <reference path="./globals.d.ts" />
import { World as CucumberWorld } from "@cucumber/cucumber";
import { BrowserContext, Page } from "playwright";

export interface OurWorld extends CucumberWorld {
  context: BrowserContext;
  page: Page;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
