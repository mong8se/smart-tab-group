import lodash from "lodash";

async function main() {
  const [base, chrome, firefox] = await Promise.all([
    Deno.readTextFile("src/manifest.json").then((data) => JSON.parse(data)),
    Deno.readTextFile("src/chrome/manifest.json").then((data) =>
      JSON.parse(data),
    ),
    Deno.readTextFile("src/firefox/manifest.json").then((data) =>
      JSON.parse(data),
    ),
  ]);

  const chromeManifest = lodash.merge({}, base, chrome);
  const firefoxManifest = lodash.merge({}, base, firefox);

  await Promise.all([
    Deno.writeTextFile(
      "build/chrome/manifest.json",
      JSON.stringify(chromeManifest, null, 2),
    ),
    Deno.writeTextFile(
      "build/firefox/manifest.json",
      JSON.stringify(firefoxManifest, null, 2),
    ),
  ]);
}

await main();
