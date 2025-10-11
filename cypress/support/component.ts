// ***********************************************************
// This support file is processed and loaded automatically before your component tests.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
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

// Import global styles if needed
import '../../src/app/globals.css'