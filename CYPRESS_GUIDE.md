# ✅ Cypress - Configuración Completada

## Estado Actual

Cypress está **configurado correctamente** y listo para usar en el proyecto.

### ✅ Configurado:
- ✅ Cypress 13.15.0 instalado
- ✅ Soporte para Component Testing con React 18
- ✅ Soporte para E2E Testing
- ✅ Configuración de TypeScript
- ✅ Archivos de soporte creados
- ✅ Scripts NPM agregados

---

## 📁 Estructura de Cypress

```
cypress/
├── component/          # Tests de componentes
│   ├── ActionBar.cy.tsx
│   ├── Button.cy.tsx
│   ├── CanvasInput.cy.tsx
│   ├── TaskForm.cy.tsx
│   ├── TaskItem.cy.tsx
│   ├── TaskList.cy.tsx
│   └── ...
├── e2e/               # Tests end-to-end
│   └── task_list.cy.ts
├── fixtures/          # Datos de prueba
│   └── tasks.json
├── integration/       # Tests de integración
│   └── taskManagement.cy.ts
└── support/           # Archivos de soporte
    ├── commands.ts    # Comandos personalizados
    ├── component.ts   # Configuración de componentes
    └── e2e.ts        # Configuración E2E
```

---

## 🚀 Comandos Disponibles

### Abrir Cypress UI

```powershell
# Abrir selector de modo de testing
npm run cypress:open

# Abrir directamente en modo Component Testing
npm run cypress:component

# Abrir directamente en modo E2E Testing
npm run cypress:e2e
```

### Ejecutar Tests en Terminal (CI/CD)

```powershell
# Ejecutar todos los tests de componentes
npm test

# Ejecutar todos los tests (component + e2e)
npm run cypress:run

# Ejecutar solo tests E2E
npx cypress run --e2e

# Ejecutar solo tests de componentes
npx cypress run --component
```

### Ejecutar Tests Específicos

```powershell
# Ejecutar un archivo específico
npx cypress run --component --spec "cypress/component/Button.cy.tsx"

# Ejecutar tests en modo headed (ver navegador)
npx cypress run --component --headed

# Ejecutar tests en un navegador específico
npx cypress run --component --browser chrome
```

---

## 📝 Escribir Tests

### Component Testing

Los tests de componentes están en `cypress/component/`. Ejemplo:

```tsx
import React from 'react'
import Button from '@/components/Button'
import { Mail } from 'lucide-react'

describe('Button Component', () => {
  it('renders correctly', () => {
    cy.mount(
      <Button
        icon={<Mail data-testid="mail-icon" />}
        text="Send Email"
        disabled={false}
      />
    )
    
    cy.get('[data-testid="mail-icon"]').should('exist')
    cy.contains('Send Email').should('exist')
  })

  it('handles click events', () => {
    const onClick = cy.stub()
    
    cy.mount(
      <Button
        icon={<Mail />}
        text="Click me"
        disabled={false}
        onClick={onClick}
      />
    )
    
    cy.contains('Click me').click()
    cy.wrap(onClick).should('have.been.called')
  })
})
```

### E2E Testing

Los tests E2E están en `cypress/e2e/`. Ejemplo:

```typescript
describe('Task List E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('creates a new task', () => {
    cy.get('[data-testid="task-input"]').type('New task{enter}')
    cy.contains('New task').should('exist')
  })

  it('deletes a task', () => {
    cy.get('[data-testid="task-input"]').type('Task to delete{enter}')
    cy.contains('Task to delete').parent().find('[data-testid="delete-btn"]').click()
    cy.contains('Task to delete').should('not.exist')
  })
})
```

---

## 🔧 Configuración

### cypress.config.ts

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
```

### Características Clave

- **Framework**: Next.js
- **Bundler**: Webpack
- **TypeScript**: Completamente soportado
- **React**: v18
- **Estilos**: TailwindCSS incluido automáticamente

---

## 🎯 Best Practices

### 1. Usar data-testid para selectores
```tsx
<button data-testid="submit-btn">Submit</button>
```
```typescript
cy.get('[data-testid="submit-btn"]').click()
```

### 2. Evitar esperas arbitrarias
❌ **Malo:**
```typescript
cy.wait(1000)
```

✅ **Bueno:**
```typescript
cy.get('[data-testid="element"]').should('be.visible')
```

### 3. Limpiar datos entre tests
```typescript
beforeEach(() => {
  // Limpiar estado
  cy.clearLocalStorage()
  cy.clearCookies()
})
```

### 4. Usar fixtures para datos de prueba
```typescript
cy.fixture('tasks.json').then((tasks) => {
  // Usar datos de fixtures/tasks.json
})
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@/components/...'"

**Solución**: Verifica que `tsconfig.json` tenga:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Error: "cy.mount is not a function"

**Solución**: Asegúrate de que `cypress/support/component.ts` tenga:
```typescript
import { mount } from 'cypress/react'
Cypress.Commands.add('mount', mount)
```

### Tests E2E no cargan la aplicación

**Solución**: 
1. Asegúrate de que el servidor de desarrollo esté corriendo: `npm run dev`
2. Verifica que `baseUrl` en `cypress.config.ts` sea `http://localhost:3000`

### Estilos no se aplican en Component Tests

**Solución**: En `cypress/support/component.ts`, importa los estilos:
```typescript
import '../../src/app/globals.css'
```

---

## 📚 Recursos

- [Documentación de Cypress](https://docs.cypress.io)
- [Component Testing con React](https://docs.cypress.io/guides/component-testing/react/overview)
- [E2E Testing](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)

---

## ✅ Tests Existentes

El proyecto ya incluye tests para:

### Componentes:
- ✅ Button
- ✅ CanvasInput
- ✅ ActionBar
- ✅ TaskForm
- ✅ TaskItem
- ✅ TaskList

### Hooks:
- ✅ useMobileDetection
- ✅ useTaskManager

### Helpers:
- ✅ getStyledText

### E2E:
- ✅ Task management flow

---

**¡Cypress está listo para usar!** 🎉

Ejecuta `npm run cypress:component` para comenzar a probar tus componentes.
