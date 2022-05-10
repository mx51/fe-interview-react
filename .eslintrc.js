module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  plugins: ["react", "@typescript-eslint", "unicorn"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Although this rule theoretically works with TypeScript, it's more hassle than it's worth
    "react/prop-types": "off",
    // Enforce file naming convention
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ["vite-env.d.ts"],
      },
    ],
    // Allow prop spreading.
    "react/jsx-props-no-spreading": "off",
    // Allow imports from devDependencies in tests, configs
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "vite.config.ts",
          "./src/utils/testUtils.tsx",
        ],
      },
    ],
    // Allow alias/absolute imports (no extension)
    "import/extensions": "off",
    // Allow alias/absolute imports
    "no-absolute-path": "off",
    // Allow new JSX transform
    "react/react-in-jsx-scope": "off",
    // Look for ts files too
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    // Allow hoisting. Duh.
    "no-use-before-define": "off",
    // Allow hoisting. Duh.
    "@typescript-eslint/no-use-before-define": ["off"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/require-default-props": "off",
    "no-param-reassign": ["error", { props: false }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
      },
    },
  },
};
