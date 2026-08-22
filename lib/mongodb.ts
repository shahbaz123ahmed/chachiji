import { MongoClient, Db } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore in environments where setServers is restricted
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export const isMongoConfigured = Boolean(
  uri && uri.trim() !== "" && !uri.includes("<username>")
);

if (isMongoConfigured && uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the connection
    // is preserved across module reloads caused by HMR.
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, create a standard client promise.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!clientPromise) return null;
  return clientPromise;
}

export async function getMongoDb(
  dbName = "chachiji_store"
): Promise<Db | null> {
  const c = await getMongoClient();
  if (!c) return null;
  return c.db(dbName);
}

export default clientPromise;
