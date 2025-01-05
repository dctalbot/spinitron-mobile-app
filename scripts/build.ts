import { getConfig } from "expo/config";
import * as fs from "fs";
import * as path from "path";

const variantsPath = "variants";
const privacyTemplatePath = "scripts/PRIVACY_template.md";

const variantBasenames = fs.readdirSync(variantsPath);
const privacyTemplate: string = fs.readFileSync(privacyTemplatePath, "utf8");

variantBasenames.forEach((basename) => {
  const vPath = path.join(variantsPath, basename);
  const vConfig: string = fs.readFileSync(
    path.join(vPath, "app.config.ts"),
    "utf8",
  );
  fs.writeFileSync("app.config.ts", vConfig, "utf8");
  const cfg = getConfig(".");

  // write privacy policy
  fs.writeFileSync(
    path.join(vPath, "PRIVACY.md"),
    privacyTemplate.replace(/{{APP_NAME}}/g, `"${cfg.exp.name}"`),
    "utf8",
  );
});

// clean up
fs.rmSync("app.config.ts");
