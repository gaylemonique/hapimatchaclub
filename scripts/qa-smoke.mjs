import fs from "node:fs";

function loadEnv() {
  const values = { ...process.env };
  const file = ".env.local";
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match && !values[match[1]]) values[match[1]] = match[2].trim();
    }
  }
  return values;
}

const env = loadEnv();
const baseUrl = env.QA_BASE_URL ?? "http://localhost:3000";
const checks = [];

async function checkRoute(path, expected) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.text();
  const passed = response.ok && body.includes(expected);
  checks.push(`${passed ? "PASS" : "FAIL"} ${path} (${response.status})`);
  if (!passed) throw new Error(`${path} did not contain expected content: ${expected}`);
}

for (const [path, expected] of [["/", "Hapi Matcha Club"], ["/menu", "Hapi Matcha Latte"], ["/about", "The Hapi feeling"], ["/order", "Order your hapi."], ["/admin", "Hapi admin"], ["/robots.txt", "sitemap"], ["/sitemap.xml", "/menu"], ["/api/health", '"ok":true']]) {
  await checkRoute(path, expected);
}

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error("Supabase environment variables are required for data checks.");
const headers = { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` };
for (const [table, expectedCount] of [["categories", 6], ["products", 33], ["product_variants", 33]]) {
  const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}?select=id`, { headers });
  const rows = await response.json();
  if (!response.ok || rows.length !== expectedCount) throw new Error(`${table} expected ${expectedCount} rows, received ${Array.isArray(rows) ? rows.length : "an error"}`);
  checks.push(`PASS Supabase ${table} count (${rows.length})`);
}

console.log(checks.join("\n"));
