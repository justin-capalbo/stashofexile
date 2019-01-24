# Stash of Exile

### Getting Started

This project uses [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).  Most commands can be run from the workspace root and the below examples are given assuming they are run from the workspace root.

- To install [Yarn](https://yarnpkg.com/en/):
    - `npm i -g yarn`
- To install dependencies for all packages: 
    - `yarn`
- To install dependencies for a specific package:
    - `yarn workspace <package-name> install`
    - e.g. `yarn workspace stash-api install`

#### Using Scripts

This workspace leverages [wsrun](https://www.npmjs.com/package/wsrun) for ease of use.

- Run a script from the root `package.json`:
    - e.g. `yarn dev`, `yarn lint`
- Run a script in packages that contain that script in their own `package.json` (using `wsrun`):
    - `yarn run-all <script-name>`
    - e.g. `yarn run-all dev` (Runs the `dev` script in all packages that have it defined)
- Run a script in a specific package that might exist in other packages:
    - `yarn run-all -p <package-name> -c <script-name>`
    - e.g. `yarn run-all -p stash-api some-package -c dev` (Runs the `dev` script in stash-api and some-package)


### About

- Stash of Exile is a full stack application for exploring [Path of Exile](www.pathofexile.com) character inventory stashes. 
