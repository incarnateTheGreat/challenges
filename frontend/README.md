# Didomi Challenge

## Notes

Thanks for allowing me to work on this challenge! Here are some notes regarding what I worked on and what I changed:

- Instead of using `React-Redux` for state management, I went about using `json-server` to simulate a live working environment where data would be accessible from anywhere.
- `react-query` was utilized for HTTP calls to the `json-server`.
- `Materialize` (based off of Material Design) was used for the styles and scaffolding; the application is fully responsive.

## Setup

- Please run `npm i` or `yarn` to apply new dependencies to the project.
- When ready, run `npm run dev` or `yarn dev`. This should load the `json-server` and the local React environment.
- The `json-server` loads first and rather quickly. The React environment runs after and might take a bit of time, but it will get there. If this doesn't work, the calls can be run separately as `npm run start` or `yarn start` and `npm run json:server` or `yarn json:server`.
- Enjoy!
