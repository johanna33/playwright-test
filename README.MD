## UI & API Tests for ParaBank 

### Overview

This project uses `Playwright` with `TypeScript` based on `Node.js`. 
For this demo, I selected `ParaBank`, an open-source public demo application intended for testing exercises.

My objective is to showcase my coding style, best practices, framework structure, and problem-solving skills.

### Content

This project includes:

1. General testing documentation such as a Test Plan and Test Cases for Functional and API testing.
2. The E2E and API automation framework, which contains:
    - The use of the page objects technique with composition, not inheritance.
    - The use of interfaces and enums when applicable.
    - A data-driven approach for test data handling, along with the Faker library to avoid hardcoded values.
    - Implementation of custom fixtures for common functionality and easy reusability.
    - The use of a generic API request function to handle all methods and errors dynamically.
    - Sample of mocking and Intersecting API.

#### NOTE: 
Given the use of a public demo application for testing, some functionality displayed in the app is not available or working as expected. This introduces some limitations in my demo, and I was not able to fully implement certain techniques in both UI and API.    

### Install and Run

1. Install the project: `npm i`
2. Run all tests: `npm run test`
    Check `package.json` for more scripts.
3. Open report: `npm run report`    

