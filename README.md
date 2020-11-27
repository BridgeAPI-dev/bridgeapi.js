<p align="center">
  <img src="./public/logo.svg" width="800">
</p>

(BridgeAPI)[https://bridgeapi.dev] is a serverless integration platform that
empowers users to connect apps through event-driven workflows.

This is the frontend codebase. The backend is made with Ruby on Rails and can be found (here)[https://github.com/angeljruiz/BridgeAPI.rb].

## About
TODO
- Made with nextjs
- Tested with cypress
- Mocked & stubbed with cypress & msw

## Installation

```sh
git clone https://github.com/williampj/bridgeapi.js
cd bridgeapi.js
npm i
npm run dev
```

## Testing

Follow the installation guide and then run:

```sh
# Fully automated
NEXT_PUBLIC_TEST_ENV=test npm run test

# Run individual tests
# Terminal 1
NEXT_PUBLIC_TEST_ENV=test npm run build
NEXT_PUBLIC_TEST_ENV=test npm run start

# Terminal 2
npm run cypress:open
```

## Contributors

- (andrewc910)[https://github.com/andrewc910] - creator and maintainer
- (angeljruiz)[https://github.com/angeljruiz] - creator and maintainer
- (williampj)[https://github.com/williampj] - creator and maintainer