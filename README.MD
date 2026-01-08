## UI & API Tests for ParaBank

### Overview

This project uses `Playwright` with `TypeScript` based on `Node.js`. 
For this demo, I selected `ParaBank`, an open-source public demo application intended for testing exercises.

The objective is to showcase my coding style, best practices, framework structure, and problem-solving skills.

### Framework Architecture

#### Project Structure
```
tests/
├── setup/                         # Global setup and authentication
│   ├── global-setup.ts            # Login and session storage
│   └── base-fixture.ts            # Custom test fixtures
├── ui/                            # UI automation tests
│   ├── pages/                     # Page Object Model
│   │   ├── login-page.ts
│   │   ├── ....
│   │   └── page-manager.ts        # Composition-based page management
│   └── specs/                     # UI test specifications
├── api/                           # API testing
│   ├── request/                   # Shared API requests
│   ├── specs/                     # API test specifications
└── common/                        # Shared utilities
    ├── api/                       # API request handlers
    │   ├── api-request.ts         # Generic API request function
    │   └── api-paths.ts           # API endpoint definitions
    ├── interfaces/                # TypeScript interfaces
    │   ├── api-interface.ts
    │   └── user-interface.ts
    ├── payloads/                  # API request payloads
    │   └── customer.ts
    └── test-data/                 # Test data management
        ├── user-data.ts           
        └── account-data.ts        
```

#### Key Patterns

**1. Page Object Model (Composition)**
- Each page is represented as a separate class with locators and methods
- `PageManager` uses composition (not inheritance) to aggregate all page objects
- Pages are instantiated once and reused throughout tests

**2. Custom Fixtures**
- `base-fixture.ts` extends Playwright's test fixtures
- Provides custom test options including `pm` (PageManager) and 
- `openPage` ensures page is navigated to baseURL before each test

**3. Generic API Request Handler**
- Centralized `executeRequest()` function handles all HTTP methods
- Implements error handling and response validation
- Supports custom context and session management via `session.json`

**4. Session Management**
- Global setup runs before all tests to authenticate and save session state
- Session stored in `session.json` and reused across test runs
- Eliminates redundant login steps in individual tests

**5. Test Data Management**
- Uses `@faker-js/faker` for dynamic, realistic test data generation
- Environment variables (via `.env`) for sensitive credentials for security.
- A data-driven approach for test data handling
- Dedicated interfaces for type-safe test data structures

**6. Configuration**
- Playwright config uses `fullyParallel` for concurrent test execution
- Screenshots and traces captured only on test failures
- HTML reporter with custom title for test results
- Desktop Chrome is the target browser

**7. Best practices**
- The use of interfaces and enums when applicable for type-safe.
- The implementation of custom fixtures and common utilities ensure reusability.


#### Content

This project includes:

1. General testing documentation such as a Test Plan and Test Cases for Functional and API testing sample.
2. The E2E and API automation framework.


### NOTE: 
Given the use of a public demo application for testing, some functionality displayed in the app is not available or working as expected. This introduces some limitations in my demo, and I was not able to fully implement certain techniques in both UI and API.    

### Install and Run

1. Install the project: `npm i`
2. Run all tests: `npm run test`
    Check `package.json` for more scripts.
3. Open report: `npm run report`    
