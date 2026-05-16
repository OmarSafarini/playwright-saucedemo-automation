# 🧪 Sauce Demo — Playwright Test Automation

End-to-end test automation suite for **[Sauce Demo](https://www.saucedemo.com)** built with **[Playwright](https://playwright.dev)** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Test Suites](#test-suites)
- [Page Objects](#page-objects)
- [Test Data (Parameterized Tests)](#test-data-parameterized-tests)
- [Configuration](#configuration)
- [Reports](#reports)

---

## Overview

This project provides automated E2E tests for the Sauce Demo web application — a sample e-commerce site used for practicing test automation. The suite covers core user flows including **login**, **add to cart**, **remove from cart**, **checkout**, and **product sorting**.

Key highlights:

- ✅ **Page Object Model** — Clean separation between test logic and page interactions
- ✅ **Parameterized Tests** — Data-driven testing with external test data files
- ✅ **Auth Session Reuse** — Login setup runs once and persists storage state for all subsequent tests
- ✅ **Cross-Browser Support** — Configured for Chromium and Firefox
- ✅ **HTML Reports** — Auto-generated Playwright HTML report after each run

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test authoring |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [Node.js](https://nodejs.org) | Runtime environment |

---

## Project Structure

```
QA-Project/
├── Pages/                          # Page Object Model classes
│   ├── LoginPage.ts                # Login page interactions
│   ├── InventoryPage.ts            # Product inventory / add-to-cart interactions
│   ├── CheckoutPage.ts             # Checkout flow interactions
│   ├── RemovePage.ts               # Remove-from-cart interactions
│   └── SortPage.ts                 # Product sorting interactions
│
├── tests/                          # Test spec files
│   ├── data/                       # Parameterized test data
│   │   ├── login.data.ts           # Invalid login scenarios
│   │   └── checkout.data.ts        # Invalid checkout scenarios
│   │
│   ├── login.setup.spec.ts         # Auth setup — saves session storage state
│   ├── login.spec.ts               # Login feature tests
│   ├── add-to-cart..spec.ts        # Add to cart feature tests
│   ├── remove-from-cart.spec.ts    # Remove from cart feature tests
│   ├── checkout.spec.ts            # Checkout feature tests
│   └── sort.spec.ts                # Product sorting feature tests
│
├── .env                            # Environment variables (not committed)
├── .gitignore                      # Git ignore rules
├── playwright.config.ts            # Playwright configuration
├── storageState.json               # Persisted auth session (auto-generated)
├── package.json                    # Project dependencies & scripts
└── README.md                       # This file
```

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd QA-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Configure environment variables

Create a `.env` file in the project root (see [Environment Variables](#environment-variables) below).

### 5. Run the login setup to generate session state

```bash
npx playwright test login.setup.spec.ts
```

This creates `storageState.json`, which is reused by all other tests so they start already authenticated.

### 6. Run all tests

```bash
npx playwright test
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
BASE_URL=https://www.saucedemo.com
HOME_URL=https://www.saucedemo.com/inventory.html
USER_NAME=standard_user
PASSWORD=secret_sauce
```

| Variable | Description |
| --- | --- |
| `BASE_URL` | The login page URL of Sauce Demo |
| `HOME_URL` | The inventory/home page URL (post-login) |
| `USER_NAME` | Valid username for authentication |
| `PASSWORD` | Valid password for authentication |

---

## Running Tests

| Command | Description |
| --- | --- |
| `npx playwright test` | Run **all** tests |
| `npx playwright test login.spec.ts` | Run only login tests |
| `npx playwright test checkout.spec.ts` | Run only checkout tests |
| `npx playwright test sort.spec.ts` | Run only sort tests |
| `npx playwright test add-to-cart..spec.ts` | Run only add-to-cart tests |
| `npx playwright test remove-from-cart.spec.ts` | Run only remove-from-cart tests |
| `npx playwright test --project=chromium` | Run on Chromium only |
| `npx playwright test --project=firefox` | Run on Firefox only |
| `npx playwright test --headed` | Run in headed (visible browser) mode |
| `npx playwright show-report` | Open the HTML test report |

---

## Test Suites

### 🔐 Login (`login.spec.ts`)

| Test Case | Type |
| --- | --- |
| Valid Login | Positive |
| Invalid Password | Negative |
| Invalid Username | Negative |
| Empty Username | Negative |
| Empty Password | Negative |
| Empty Fields | Negative |
| Long Username (50 chars) | Boundary |
| Long Password (50 chars) | Boundary |
| Locked User Login | Negative |
| Username with Spaces | Negative |

### 🛒 Add to Cart (`add-to-cart..spec.ts`)

| Test Case | Type |
| --- | --- |
| Add single item to cart | Positive |
| Add multiple items to cart | Positive |

### 🗑️ Remove from Cart (`remove-from-cart.spec.ts`)

| Test Case | Type |
| --- | --- |
| Remove single item from cart | Positive |
| Remove multiple items from cart | Positive |

### 💳 Checkout (`checkout.spec.ts`)

| Test Case | Type |
| --- | --- |
| Checkout single item | Positive |
| Checkout multiple items | Positive |
| Checkout with empty first name | Negative |
| Checkout with empty last name | Negative |
| Checkout with empty postal code | Negative |
| Checkout with all fields empty | Negative |

### 🔀 Sort (`sort.spec.ts`)

| Test Case | Type |
| --- | --- |
| Sort products from A to Z | Positive |
| Sort products by price high to low | Positive |

---

## Page Objects

All page objects live in the `Pages/` directory and encapsulate locators and actions for a specific page.

### `LoginPage.ts`

| Method | Description |
| --- | --- |
| `goto()` | Navigate to the login page |
| `login(username, password)` | Fill credentials and click login |
| `verifyValidLogin()` | Assert redirect to the inventory page |
| `verifyErrorMessage()` | Assert the error message is visible |

### `InventoryPage.ts`

| Method | Description |
| --- | --- |
| `addSingleItem()` | Add "Sauce Labs Backpack" to cart |
| `addMultipleItems()` | Add backpack + bike light to cart |
| `openCart()` | Click the shopping cart icon |
| `verifyProductInCart(productName)` | Assert a product is visible in the cart |
| `verifyCartCount(count)` | Assert the cart badge count |

### `CheckoutPage.ts`

| Method | Description |
| --- | --- |
| `startCheckout()` | Click the checkout button |
| `fillCheckoutInfo(first, last, zip)` | Fill shipping info and continue |
| `finishCheckout()` | Click the finish button |
| `verifyCheckoutSuccess(title)` | Assert the success message |
| `verifyCheckoutError(message)` | Assert the error message |

### `RemovePage.ts`

| Method | Description |
| --- | --- |
| `removeBackpackItem()` | Remove the backpack from cart |
| `removeBikeLightItem()` | Remove the bike light from cart |
| `verifyCartCount(count)` | Assert the cart badge count |
| `verifyCartIsEmpty()` | Assert no items remain in cart |
| `verifyProductStillExists(name)` | Assert a specific product is still in cart |

### `SortPage.ts`

| Method | Description |
| --- | --- |
| `sortByNameAZ()` | Select "Name (A to Z)" from dropdown |
| `sortByPriceHighToLow()` | Select "Price (high to low)" from dropdown |
| `verifyAZSorting()` | Assert products are in alphabetical order |
| `verifyPriceHighToLowSorting()` | Assert prices are descending |

---

## Test Data (Parameterized Tests)

Test data is stored in `tests/data/` and consumed via `for...of` loops to generate parameterized test cases.

### `login.data.ts`

Exports `invalidScenarios` — an array of 9 invalid login scenarios covering wrong credentials, empty fields, boundary-length inputs, locked users, and whitespace injection.

### `checkout.data.ts`

Exports `invalidCheckoutScenarios` — an array of 4 invalid checkout scenarios covering missing first name, last name, postal code, and all fields empty.

---

## Configuration

The Playwright configuration (`playwright.config.ts`) includes:

| Setting | Value |
| --- | --- |
| Test directory | `./tests` |
| Parallel execution | Enabled (`fullyParallel: true`) |
| Retries (CI) | 2 |
| Reporter | HTML |
| Headless mode | `false` (browser is visible) |
| Storage state | `storageState.json` (session reuse) |
| Trace collection | On first retry |
| Browsers | Chromium, Firefox |

---

## Reports

After running tests, Playwright generates an HTML report in the `playwright-report/` directory.

To open the report:

```bash
npx playwright show-report
```

---

## 📄 License

ISC
