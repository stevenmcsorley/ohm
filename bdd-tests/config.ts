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
      headless: false,
      slowMo: 1150,
      recordVideo: {
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
      headless: false,
      slowMo: 50,
      video: "on",
      videoSize: {
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
      headless: false,
      slowMo: 50,
      video: "on",
      videoSize: {
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
