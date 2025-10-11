// ***********************************************************
// This support file is processed and loaded automatically before your component tests.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
// CSS import is disabled due to compatibility issues between Next.js 15 and Cypress
// Component tests will focus on functionality without styled rendering
import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Import global styles - Commented out due to Next.js 15 compatibility issues
// If you need styles in tests, import them directly in test files or
// use a custom mount command that includes styles
// import '../../src/app/globals.css'