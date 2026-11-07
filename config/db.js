import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pl_aggregations";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connecté à MongoDB : ${MONGO_URI.replace(/:([^:@]+)@/, ":****@")}`);
  } catch (err) {
    console.error("Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  }
}
