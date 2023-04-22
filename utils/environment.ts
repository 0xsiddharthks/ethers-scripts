import { config as dotEntConfig } from "dotenv";

export default function () {
  dotEntConfig({ path: "./.env" });
}
