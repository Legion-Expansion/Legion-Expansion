# Contributing

Thank you for looking to contribute to the Legion Expansion.

## Tooling

You will need the following to ensure your submissions adhere to the requirements and formatting of this project:

- eslint
- eslint-config-prettier
- eslint-plugin-lodash
- markdownlint
- prettier
- sonarlint
- stylelint
- stylelint-config-prettier
- stylelint-config-standard

The project is not tied to a specific version of these tools and will use the latest versions where possible.

## Submissions

Any pull request must only modify code necessary for the request, for example, a new feature should not be accompanied by additional clean-up or reformatting. Any such changes should be submitted separately.

Submissions must include a clear breakdown of the work done.

## Conventions

See [development guidelines](README.md#development) for details of required structures.

Any submissions should follow the requirements below:

- Indent using two spaces (soft tabs).
- All warnings and errors must be resolved prior to commit.
  - SonarLint's complexity requirements can be ignored for the function encapsulating a file's try...catch.
- HTML is loaded from a separate file, not included in the body of JavaScript.
- File shadowing will not be used unless unavoidable.
- Camel case will be used for variables.
- Code must comply with lodash 3.9.3/Chrome 40 support.
- Commit summaries must be informative but concise, with any required detail in the body.
