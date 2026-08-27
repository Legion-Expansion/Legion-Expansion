# Contributing

Thank you for looking to contribute to the Legion Expansion.

## Tooling

Every linter this project uses is a dev dependency, so `npm install` is all that is needed to get
them:

```sh
npm install
npm run lint        # eslint, stylelint, markdownlint and prettier in turn
npm run lint:js     # or run one at a time: lint:js, lint:css, lint:md, lint:format
npm run format      # prettier --write
```

Each dependency is pinned to a major version in `package.json`; minor and patch updates are picked
up automatically. Note that ESLint is held at 9.x because `eslint-plugin-lodash` is unmaintained and
does not run on 10.

SonarLint is the exception - it is an IDE extension rather than an npm package. `.vscode/settings.json`
wires it to this project in connected mode.

The build itself is Python and has no npm involvement; see [installation](README.md#installation).

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
