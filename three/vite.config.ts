import { defineConfig } from "vite";
import fs from "node:fs";

const examples = fs.readdirSync("./example");

const exampleEntries = Object.fromEntries(examples.map((f) => [f, `./example/${f}`]));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        ...exampleEntries,
      },
    },
  },
});
