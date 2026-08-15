// Generates public/changelog.json from git history at build time. Merge
// commits are excluded so a PR merge yields one entry per real change
// rather than the merge commit alongside each of its branch commits.
// Runs via the `predev` / `prebuild` npm hooks. Fails soft: if git is
// unavailable (e.g. a shallow CI checkout with no history), it writes an
// empty changelog rather than breaking the build.

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolve(__dirname, "../public/changelog.json");

// Unit/record separators keep the parse robust against multi-line bodies.
const FIELD = "\x1f";
const RECORD = "\x1e";
const FORMAT = ["%H", "%h", "%ad", "%an", "%s", "%b"].join(FIELD) + RECORD;

function readCommits() {
    const raw = execFileSync(
        "git",
        ["log", "--no-merges", "--date=short", `--pretty=format:${FORMAT}`],
        { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
    );

    return raw
        .split(RECORD)
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
            const [hash, short, date, author, subject, body = ""] = entry.split(FIELD);
            return { hash, short, date, author, subject, body: body.trim() };
        });
}

let commits = [];
try {
    commits = readCommits();
    console.log(`gen-changelog: wrote ${commits.length} commits`);
} catch (err) {
    console.warn(`gen-changelog: could not read git history (${err.message}); writing empty changelog`);
}

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(commits, null, 2) + "\n");
