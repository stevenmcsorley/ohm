import {
  chromium,
  firefox,
  webkit,
  BrowserType,
  BrowserContextOptions,
} from "playwright";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const baseURL = process.env.BASE_URL || "http://localhost:8000";
const isCI = process.env.CI === "true";

const tabletViewport = {
  width: 768,
  height: 1024,
};

type BrowserConfig = {
  name: string;
  type: BrowserType;
  options: BrowserContextOptions & { [key: string]: any };
  viewport: any;
};

const configs: BrowserConfig[] = [
  {
    name: "chromium",
    type: chromium,
    options: {
      headless: isCI,
      slowMo: isCI ? 0 : 1150,
      recordVideo: isCI
        ? undefined
        : {
            dir: "./videos/",
            size: {
              width: 800,
              height: 600,
            },
          },
      baseURL: baseURL,
    },
    viewport: tabletViewport,
  },
  {
    name: "firefox",
    type: firefox,
    options: {
      headless: isCI,
      slowMo: isCI ? 0 : 50,
      video: isCI ? undefined : "on",
      videoSize: isCI
        ? undefined
        : {
            width: 1280,
            height: 720,
          },
      baseURL: baseURL,
    },
    viewport: {
      width: 411,
      height: 731,
    },
  },
  {
    name: "webkit",
    type: webkit,
    options: {
      headless: isCI,
      slowMo: isCI ? 0 : 50,
      video: isCI ? undefined : "on",
      videoSize: isCI
        ? undefined
        : {
            width: 1280,
            height: 720,
          },
      baseURL: baseURL,
    },
    viewport: {
      width: 411,
      height: 731,
    },
  },
];

export default configs;
