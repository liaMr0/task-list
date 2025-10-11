# 🚀 Comandos Rápidos - Task List Project

## 📦 Instalación Inicial

```powershell
# Clonar e instalar
git clone <repo-url>
cd task-list
npm install

# Configurar variables de entorno
copy .env.example .env
# Editar .env con tus credenciales de Supabase

# Generar Prisma Client
npx prisma generate
```

---

## 🔧 Desarrollo

```powershell
# Iniciar servidor de desarrollo
npm run dev
# → http://localhost:3000

# Iniciar con puerto personalizado
npx next dev -p 3001

# Ver logs en tiempo real
npm run dev | more
```

---

## 🧪 Testing

### Cypress Interactivo (UI)

```powershell
# Abrir selector de modo
npm run cypress:open

# Component Testing
npm run cypress:component

# E2E Testing
npm run cypress:e2e
```

### Ejecutar Tests (Headless)

```powershell
# Todos los tests de componentes
npm test

# Todos los tests (component + e2e)
npm run cypress:run

# Test específico
npx cypress run --component --spec "cypress/component/Button.cy.tsx"

# En modo headed (ver navegador)
npx cypress run --component --headed

# Con navegador específico
npx cypress run --component --browser chrome
```

---

## 🗄️ Base de Datos (Prisma)

### Comandos Básicos

```powershell
# Generar Prisma Client (después de cambios en schema)
npx prisma generate

# Ver datos en Prisma Studio
npx prisma studio
# → http://localhost:5555

# Ver estado de migraciones
npx prisma migrate status

# Formatear schema.prisma
npx prisma format
```

### Migraciones

```powershell
# Crear nueva migración (desarrollo)
npx prisma migrate dev --name nombre_descriptivo

# Aplicar migraciones (producción)
npx prisma migrate deploy

# Resetear base de datos (⚠️ elimina datos)
npx prisma migrate reset

# Sincronizar schema sin migración (desarrollo)
npx prisma db push
```

### Seed y Reset

```powershell
# Ejecutar seed (si existe)
npx prisma db seed

# Limpiar y recrear DB
npx prisma migrate reset --force
```

---

## 🏗️ Build y Deploy

### Build Local

```powershell
# Build para producción
npm run build

# Iniciar servidor de producción
npm start
# → http://localhost:3000

# Analizar bundle
npm run build -- --profile
```

### Verificaciones Pre-Deploy

```powershell
# Linting
npm run lint

# Linting con auto-fix
npm run lint -- --fix

# Type checking
npx tsc --noEmit

# Ejecutar todos los tests
npm run cypress:run
```

### Deploy a Vercel

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy a producción
vercel --prod
```

---

## 🔍 Debugging y Análisis

### Logs y Debugging

```powershell
# Ver variables de entorno
Get-Content .env

# Verificar instalación de dependencias
npm list --depth=0

# Limpiar cache de Next.js
Remove-Item -Recurse -Force .next

# Limpiar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install

# Verificar versión de Node
node --version
npm --version
```

### Análisis de Base de Datos

```powershell
# Inspeccionar schema
npx prisma db pull

# Validar schema
npx prisma validate

# Ver SQL de migración
Get-Content prisma\migrations\[MIGRATION_NAME]\migration.sql
```

---

## 📊 Utilidades

### Git

```powershell
# Estado del repositorio
git status

# Agregar cambios
git add .

# Commit
git commit -m "mensaje descriptivo"

# Push
git push origin main

# Ver historial
git log --oneline -10
```

### NPM

```powershell
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias (cuidado!)
npm update

# Auditar vulnerabilidades
npm audit

# Arreglar vulnerabilidades
npm audit fix

# Ver tamaño de paquetes
npm list --depth=0 --long
```

---

## 🧹 Limpieza

```powershell
# Limpiar build
Remove-Item -Recurse -Force .next

# Limpiar Cypress
Remove-Item -Recurse -Force cypress\screenshots
Remove-Item -Recurse -Force cypress\videos

# Limpiar todo y reinstalar
Remove-Item -Recurse -Force .next, node_modules
npm install
npx prisma generate
```

---

## 🔐 Variables de Entorno

### Desarrollo (.env)

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NODE_ENV=development
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
```

### Producción (Vercel)

1. Ve a: Vercel Dashboard > Project > Settings > Environment Variables
2. Agrega las mismas variables que `.env`
3. Redeploy para aplicar cambios

---

## 📱 URLs Importantes

```
Aplicación Local:      http://localhost:3000
Prisma Studio:         http://localhost:5555
Vercel Dashboard:      https://vercel.com/dashboard
Supabase Dashboard:    https://supabase.com/dashboard
Deployment:            https://task-list-6kisxc2m5-liamr0s-projects.vercel.app/
```

---

## 🆘 Troubleshooting Rápido

### Problema: "Module not found"
```powershell
Remove-Item -Recurse -Force node_modules, .next
npm install
```

### Problema: "Prisma Client not generated"
```powershell
npx prisma generate
```

### Problema: "Database connection failed"
```powershell
# Verificar .env
Get-Content .env

# Regenerar Prisma Client
npx prisma generate

# Test conexión
npx prisma db pull
```

### Problema: "Cypress no abre"
```powershell
# Limpiar cache de Cypress
npx cypress cache clear
npx cypress install
```

### Problema: "Puerto 3000 ocupado"
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID)
taskkill /PID <PID> /F

# O usar puerto diferente
npx next dev -p 3001
```

---

## 💡 Tips

### Desarrollo más rápido

```powershell
# Turbopack (Next.js experimental)
npm run dev -- --turbo

# Skip lint en build
npm run build -- --no-lint
```

### Productividad

```powershell
# Abrir VS Code en el proyecto
code .

# Abrir múltiples terminales
# Terminal 1: npm run dev
# Terminal 2: npm run cypress:component
# Terminal 3: npx prisma studio
```

---

**Guarda este archivo como referencia rápida! 📌**
