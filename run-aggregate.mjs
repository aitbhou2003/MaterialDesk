import path from "node:path";
import { pathToFileURL } from "node:url";
import "dotenv/config";
import mongoose from "mongoose";

const defaultUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pl_aggregations";

let mongoUri = defaultUri;
let collectionName;
let pipelineFilePath;

const args = process.argv.slice(2);
if (args.length === 2) {
  // Usage: node run-aggregate.mjs loans exercices/exercice-1.pipeline.mjs
  collectionName = args[0];
  pipelineFilePath = args[1];
} else if (args.length >= 3) {
  // Usage: node run-aggregate.mjs <mongoUri> <collectionName> <pipelineFilePath>
  mongoUri = args[0];
  collectionName = args[1];
  pipelineFilePath = args[2];
} else {
  console.error("Usage: node run-aggregate.mjs [mongoUri] <collectionName> <pipelineFilePath>");
  console.error("Exemple: node run-aggregate.mjs loans exercices/exercice-1.pipeline.mjs");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);

  const absolutePath = path.resolve(process.cwd(), pipelineFilePath);
  const moduleUrl = pathToFileURL(absolutePath).href;
  const imported = await import(moduleUrl);
  const pipeline = imported.default || imported.pipeline;

  if (!Array.isArray(pipeline)) {
    throw new Error(`Le pipeline exporté depuis ${pipelineFilePath} doit être un tableau d'étapes.`);
  }

  const collection = mongoose.connection.collection(collectionName);
  const results = await collection.aggregate(pipeline).toArray();

  console.log(`\n=== Résultats pour "${collectionName}" (${results.length} document(s)) ===`);
  console.table(results);

  await mongoose.disconnect();
} catch (error) {
  console.error("Erreur lors de l'exécution :", error);
  process.exit(1);
}
