# Render decorators 🪆 for React Intl

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/cultivate-software/render-with-react-intl/release.yml?branch=main)
![Code Coverage](docs/coverage-badge.svg)
![npm (scoped)](https://img.shields.io/npm/v/@render-with/react-intl)
![NPM](https://img.shields.io/npm/l/@render-with/react-intl)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-bright%20green)

Use the `withIntl(..)` decorator if your component under test requires a [React `IntlProvider`](https://formatjs.io/docs/react-intl/):

Example:

```jsx
import { render, screen, withIntl } from './test-utils'

it('presents home page in German when locale is German', () => {
  render(<HomePage />, withIntl('de'))
  expect(screen.getByRole('heading', { name: /willkommen/i })).toBeInTheDocument()
})
```

_Note: Refer to the [core library](https://github.com/cultivate-software/render-with-decorators) to learn more about how decorators can simplify writing tests for React components with [React Testing Library](https://www.npmjs.com/package/@testing-library/react)._

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Test Scenarios](#test-scenarios)
- [API](#api)
- [Issues](#issues)
- [Contributors](#contributors)
- [LICENSE](#license)

## Installation

This library is distributed via [npm](https://www.npmjs.com/), which is bundled with [node](https://nodejs.org/) and should be installed as one of your project's `devDependencies`.

First, install the [core library](https://github.com/cultivate-software/render-with-decorators) with a render function that supports decorators:

```shell
npm install --save-dev @render-with/decorators
```

Next, install the React Intl decorators provided by this library:

```shell
npm install --save-dev @render-with/react-intl
...
```

or

for installation via [yarn](https://classic.yarnpkg.com/):

```shell
yarn add --dev @render-with/decorators
yarn add --dev @render-with/react-intl
```

This library has the following `peerDependencies`:

![npm peer dependency version](https://img.shields.io/npm/dependency-version/@render-with/react-intl/peer/react-intl)

and supports the following `node` versions:

![node-current (scoped)](https://img.shields.io/node/v/@render-with/react-intl)

## Setup

In your test-utils file, re-export the render function that supports decorators and the React Intl decorators:

```javascript
// test-utils.js
// ...
export * from '@testing-library/react'  // makes all React Testing Library's exports available
export * from '@render-with/decorators' // overrides React Testing Library's render function
export * from '@render-with/react-intl' // makes decorators like withIntl(..) available
```

Then, create a `withIntl` provider using `configureWithIntl`. The configuration function comes in two flavors:

You can either pass an object that maps locales to the corresponding messages:

```javascript
// test-utils.js
// ...
const TRANSLATIONS = {
  en: englishTranslations,
  de: germanTranslations,
}

export const withIntl = configureWithIntl(TRANSLATIONS)
```

Or you can pass a function that returns messages for a given locale:

```javascript
// test-utils.js
// ...
const getMessagesForLocale = locale => { /* retrieve messages for locale */ }

export const withIntl = configureWithIntl(getMessagesForLocale)
```

What configuration to choose depends on your project's React Intl setup.

Finally, use the React Intl decorator in your tests:

```jsx
import { render, screen, withIntl } from './test-utils'

it('presents home page in German when locale is German', () => {
  render(<HomePage />, withIntl('de'))
  expect(screen.getByRole('heading', { name: /willkommen/i })).toBeInTheDocument()
})
```

## Test Scenarios

The following examples represent tests for these translation messages:

```json
{
  "en": {
    "greeting": "Welcome",
    "username": "Username",
    "...": "..."
  },
  "de": {
    "greeting": "Willkommen",
    "username": "Nutzername",
    "...": "..."
  }
}
```

and this `<HomePage />` component:

```jsx
import { FormattedMessage as T } from 'react-intl'

const HomePage = () => {
  const { t } = useIntl()
  
  return (
    <div>
      <h1><T id='greeting' defaultMessage='Welcome' /></h1>
      <input type='text' placeholder={t({ id: 'username', defaultMessage: 'Username' })} />
      <!-- ... -->
    </div>
  )
}
```

### Just need an `IntlProver`?

If your test does not care about the locale or is okay with the default locale, you can use the `withIntl(..)` decorator and omit the locale argument. The decorator will create, configure and use an `IntlPRovider` for you:

```jsx
import { render, screen, withIntl } from './test-utils'

it('shows title', () => {
  render(<HomePage />, withIntl())
  expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument()
})
```

### Need to verify translations?

If your test does care about the locale, you can use the `withIntl(..)` decorator and pass a locale as argument:

```jsx
import { render, screen, withIntl } from './test-utils'

it('shows title', () => {
  render(<HomePage />, withIntl('de'))
  expect(screen.getByRole('heading', { name: /willkommen/i })).toBeInTheDocument()
})
```

## API

_Note: This API reference uses simplified types. You can find the full type specification [here](https://github.com/cultivate-software/render-with-react-intl/blob/main/types/index.d.ts)._

```
function configureWithIntl(translations: Translations | getMessagesForLocale, defaultLocale?: string): withIntl
```

Creates a `withIntl` decorator that wraps the component under test in a React `IntlProvider`.

```
type withIntl = (locale?: string) => Decorator
```

Wraps component under test in a React `IntlProvider`. It can resolve messages with the given `locale`.

```
type Translations = { [locale: string]: Messages }
```

An object that maps locales to messages.

```
type getMessagesForLocale = (locale: string) => Messages
```

A function that retrieves messages for a given local.

```
type Messages = { [id: string]: string }
```

An object that maps translation ids to translation texts.

```
function withMessages(messages: Messages, locale?: string, defaultLocale?: string): Decorator
```

Wraps component under test in a React `IntlProvider` that is configured with the given `messages`, `locale`, and `defaultLocale`. This decorator is used under the hood when creating a `withIntl` decorator with `configureWithIntl`.

## Issues

Looking to contribute? PRs are welcome. Checkout this project's [Issues](https://github.com/cultivate-software/render-with-react-intl/issues?q=is%3Aissue+is%3Aopen) on GitHub for existing issues.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[See Bugs](https://github.com/cultivate-software/render-with-react-intl/issues?q=is%3Aissue+label%3Abug+is%3Aopen+sort%3Acreated-desc)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding a 👍. This helps maintainers prioritize what to work on.

[See Feature Requests](https://github.com/cultivate-software/render-with-react-intl/issues?q=is%3Aissue+label%3Aenhancement+sort%3Areactions-%2B1-desc+is%3Aopen)

### 📚 More Libraries

Please file an issue on the core project to suggest additional libraries that would benefit from decorators. Vote on library support adding a 👍. This helps maintainers prioritize what to work on.

[See Library Requests](https://github.com/cultivate-software/render-with-decorators/issues?q=is%3Aissue+label%3Alibrary+sort%3Areactions-%2B1-desc+is%3Aopen)

### ❓ Questions

For questions related to using the library, file an issue on GitHub.

[See Questions](https://github.com/cultivate-software/render-with-react-intl/issues?q=is%3Aissue+label%3Aquestion+sort%3Areactions-%2B1-desc)

## Contributors

<table>
<tbody>
<tr>
  <td align="center">
    <a href="https://cultivate.software">
    <img alt="David Bieder" src="https://avatars.githubusercontent.com/u/9366720?v=4&s=100" />
    <br />
    <sub><b>David Bieder</b></sub>
    </a>
  </td>
  <td align="center">
    <a href="https://cultivate.software">
    <img alt="cultivate(software)" src="https://avatars.githubusercontent.com/u/31018345?v=4&s=100" />
    <br />
    <sub><b>cultivate(software)</b></sub>
    </a>
  </td>
</tr>
</tbody>
</table>

## LICENSE

[MIT](LICENSE)