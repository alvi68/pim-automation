# OrangeHRM PIM Automation

This project automates the OrangeHRM PIM module using Playwright and TypeScript. The main focus is the employee flow inside the PIM area: login, create employee, search for the employee, open personal details, edit the information, and confirm that the updated values remain saved.

## Test coverage

The project covers the main PIM workflow and a few additional regression checks:

- Login flow
  - Valid admin credentials open the Dashboard.
  - Invalid password shows the login error message and keeps the user on the login page.

- Add employee
  - Creates a new employee with basic details.
  - Confirms the success message after saving.
  - Covers the optional login setup flow with username, password, and profile image upload.

- Search and list checks
  - Searches employees by Employee ID.
  - Searches employees by Employee Name.
  - Verifies the expected record appears in the list.

- Employee workflow
  - Creates an employee.
  - Opens the employee details page.
  - Updates the first and last name.
  - Saves the changes.
  - Reloads the page and verifies the edited values remain saved.

- Reports module
  - Creates a predefined report.
  - Confirms the success message.
  - Searches for the report by name.
  - Deletes the report and verifies it is no longer shown.

## Framework design

The framework uses the Page Object Model with Playwright. Each page object keeps the locators and interaction methods for one screen, which keeps the tests easier to read and easier to maintain.

Folder structure:

- `tests/` contains the test cases.
- `pages/` contains page objects for login, employee list, employee details, and report pages.
- `data/` holds static values such as validation messages and report settings.
- `utils/test-data.ts` generates unique employee and report names to avoid test collisions.
- `types/employee.ts` defines the employee and login input types.
- `setup/auth.setup.ts` logs in once and stores the browser state for reuse.
- `components/ConfirmDialog.ts` handles the confirmation dialog used in delete flows.

This structure keeps data, UI actions, and assertions in separate places. That makes the suite easier to extend without repeating selectors and steps across many tests.

## Test execution

Before running the suite, copy `.env.example` to a new `.env` file in the project root and fill in your OrangeHRM values:

```bash
cp .env.example .env
```

Then update the file with your actual values:

```bash
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```


## Automation approach

The automation is built around stable locators, explicit assertions, and reusable actions.

- Locators are defined in page objects instead of inside the tests, so the selectors stay in one place.
- Assertions check the actual UI state that matters, such as a success toast, a visible row, or a saved value on the details page.
- Test data is generated dynamically so each run creates unique employee and report names, which reduces flaky results from duplicate values.
- The Playwright config loads the `.env` file, uses Chromium, and reuses a logged-in storage state for the browser setup.

This keeps the suite maintainable and simple to extend when new PIM scenarios are added.

## Design decisions

1. I used page objects for each screen instead of writing selectors directly inside the tests. This keeps the test files focused on behavior and makes future UI changes easier to update in one place.

2. I generated unique values for employee names and report names using timestamps. This avoids duplicate data between runs and prevents false failures caused by existing records.

3. I used a setup authentication step to save browser storage and reuse it across tests. This removes repeated login steps and keeps the tests faster and more stable.


Both runs completed successfully.

Note: this project currently uses the built-in Playwright report and does not include a custom reporting layer beyond the default HTML report configured in `playwright.config.ts`.
