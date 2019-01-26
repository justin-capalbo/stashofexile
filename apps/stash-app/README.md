# Stash of Exile - Stash App

### Installation

Dependencies should be installed from the workspace root, since this package shares dependencies with other packages.  See the root level README.md.

### Usage

1. Start the nextJS server
    - Together with GraphQL, from workspace root (Recommended): `yarn wsrun dev`
    - Just this project, from workspace root: `yarn wsrun -p stash-app -c dev`
    - Just this project, this directory: `yarn dev`
2. Navigate to http://localhost:3000 in a browser window.

### Codegen

This project uses the [Apollo CLI tooling](https://github.com/apollographql/apollo-tooling) for schema introspection and type generation for client side queries and mutations.  

- From workspace root `yarn wsrun codegen`
- From this directory `yarn codegen`

### About

- Stash App is a Next JS + React + Typescript + Apollo Client application for viewing POE stashes.  It is backed by the `stash-api` package in this workspace - they are meant to be run together.
    * [`React`](https://reactjs.org/): A component based library for expressing UI as a function of state and props.
    * [`Next JS`](https://nextjs.org/): A React framework for developing server-rendered applications, and much more.
    * [`Apollo Client`](https://www.apollographql.com/docs/react/): Flexible frontend GraphQL library allowing for easily composable and reusable queries and mutations.  Paired with `graphql-tag` and `react-apollo` for easy integration into React apps.
    * [`typescript`](https://www.typescriptlang.org/): The one we all know and love.  Adds optional types and much more to Javascript.
