# Lightning Payment Pipeline - Start Prompt

> Prompt diseñado para orquestar la implementación completa de pagos Lightning via NWC en un proyecto e-commerce existente.

## Prompt

```
Ejecutá /pipeline-run para implementar pagos Lightning en este proyecto.

## Contexto

Este es un proyecto e-commerce con:
- Carrito de compras funcional
- Página de checkout con formulario
- API de orders (fake/placeholder)
- API de invoices (fake/placeholder)

## Objetivo

Implementar pagos reales con Bitcoin Lightning usando:
- NWC (Nostr Wallet Connect) para backend
- Bitcoin Connect para UI de pago
- QR codes escaneables
- Polling de estado de pago

## Requisitos

1. **Opción de implementación**: Hybrid (D)
   - Backend: NWC directo via @getalby/sdk
   - Frontend: Bitcoin Connect modal + QR code manual

2. **Incluir test page**: Sí
   - Ruta: /pipeline-test
   - Permite probar invoice creation sin checkout completo

3. **Documentación**: Generar todos los docs en .pipeline/
   - 01-site-analysis.md
   - 02-architecture-map.md
   - 03-payment-options.md
   - 04-implementation-plan.md
   - 05-wallet-config.md
   - 06-test-results.md

4. **Commits**: Atómicos, uno por paso lógico
   - Formato: feat(scope): descripción
   - Cada commit debe compilar

5. **Verificación final**:
   - npm run build pasa
   - npm run dev funciona
   - /pipeline-test carga correctamente

## Fases del Pipeline

| Fase | Agente | Output |
|------|--------|--------|
| 1 | Scout | Análisis de estructura del sitio |
| 2 | Architect | Mapeo de puntos de integración |
| 3 | Sócrates | Research de opciones NWC |
| 4 | Human | Selección de opción (D: Hybrid) |
| 5 | Strategist | Plan de implementación detallado |
| 6 | Builder | Código + commits |
| 7 | Wallet | Guía de configuración NWC |
| 8 | Tester | Verificación E2E |

## Notas Importantes

- Usar dynamic imports para @getalby/bitcoin-connect-react (evitar SSR errors)
- El NWC_URL va en .env.local (no commitear)
- Crear .env.local.example con documentación clara
- Actualizar README.md con instrucciones de testing
```

---

## Uso

1. Copiá el prompt de arriba
2. Pegalo en una nueva conversación de Claude Code
3. Claude ejecutará `/pipeline-run` automáticamente
4. En la Phase 4 (Decision), elegí:
   - Opción: **D (Hybrid)**
   - Test page: **Sí**

---

## Pre-requisitos del Proyecto

Antes de ejecutar este prompt, el proyecto debe tener:

- [ ] Next.js con App Router
- [ ] Carrito funcional (cualquier state manager)
- [ ] Página de checkout (`/checkout`)
- [ ] API route de orders (`/api/orders`)
- [ ] API route de invoices (`/api/invoices`) - puede ser fake
- [ ] Tailwind CSS configurado
- [ ] i18n configurado (next-intl o similar)

---

## Output Esperado

### Archivos Creados/Modificados

```
src/
├── lib/
│   └── nwc.ts                    # NWC client singleton
├── app/
│   ├── api/
│   │   └── invoices/
│   │       ├── route.ts          # POST - crear invoice real
│   │       └── [id]/
│   │           └── status/
│   │               └── route.ts  # GET - verificar pago
│   ├── checkout/
│   │   └── success/
│   │       └── page.tsx          # Página de éxito
│   └── pipeline-test/
│       └── page.tsx              # Página de testing
├── components/
│   ├── checkout/
│   │   ├── CheckoutForm.tsx      # Modificado con PaymentModal
│   │   └── PaymentModal.tsx      # Nuevo - modal de pago
│   └── providers/
│       ├── Providers.tsx         # Modificado
│       └── BitcoinConnectProvider.tsx  # Nuevo
└── types/
    └── index.ts                  # Extendido con NWCInvoice

.pipeline/
├── 01-site-analysis.md
├── 02-architecture-map.md
├── 03-payment-options.md
├── 04-implementation-plan.md
├── 05-wallet-config.md
└── 06-test-results.md

.env.local.example               # Documentación de config
README.md                        # Actualizado con instrucciones
```

### Dependencias Instaladas

```json
{
  "@getalby/sdk": "^7.0.0",
  "@getalby/bitcoin-connect-react": "^3.x",
  "qrcode.react": "^4.x"
}
```

### Commits Generados

1. `feat(deps): install Bitcoin Connect and QR dependencies`
2. `feat(lib): add NWC client and payment types`
3. `feat(api): implement real NWC invoice creation and status`
4. `feat(ui): add Bitcoin Connect provider and PaymentModal`
5. `feat(checkout): integrate payment modal in checkout flow`
6. `feat(pages): add checkout success page and i18n`
7. `feat(test): add pipeline test page and documentation`
8. `docs(pipeline): add wallet config and test results documentation`
9. `docs(env): add comprehensive NWC configuration example`
10. `docs(readme): add Lightning payment testing instructions`
11. `fix(bitcoin-connect): use dynamic import to avoid SSR HTMLElement error`

---

## Troubleshooting

### Error: "HTMLElement is not defined"
Bitcoin Connect usa APIs del browser. Solución: dynamic imports.

```typescript
// MAL
import { init } from '@getalby/bitcoin-connect-react';

// BIEN
useEffect(() => {
  import('@getalby/bitcoin-connect-react').then(({ init }) => {
    init({ appName: 'Mi App' });
  });
}, []);
```

### Error: "Export nwc doesn't exist"
El SDK de Alby usa subpath exports. Solución:

```typescript
// MAL
import { nwc } from '@getalby/sdk';

// BIEN
import { NWCClient } from '@getalby/sdk/nwc';
```

---

## Créditos

Pipeline diseñado por **Orion** (Orquestador de Oryon Soluciones)

> *"Las estrellas no brillan solas. Brillan en constelación."*
