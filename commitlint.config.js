export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "deps",
        "auth",
        "ui",
        "api",
        "config",
        "docs",
        "test",
        "ci",
        "chore",
        "refactor",
        "style",
      ],
    ],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "style",
        "refactor",
        "ci",
        "test",
        "perf",
        "revert",
        "vercel",
      ],
    ],
  },
};
