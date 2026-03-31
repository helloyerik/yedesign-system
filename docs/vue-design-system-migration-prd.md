# PRD — Миграция React Design System в Vue для yedesign-system

> Canonical planning home: `yedesign-system/docs`
>
> Supersedes: `dreamstore/docs/prd/vue-design-system-migration-prd.md`

## 1. Назначение документа

Этот PRD фиксирует новую каноническую программу миграции дизайн-системы из React в Vue.

Главная цель:

- перевести текущий foundation-layer из `dreamstore/src/components` в production-ready Vue workspace `yedesign-system` без редизайна, без потери токенов и без расползания API-стиля

Вторичная цель:

- после достижения parity подготовить adoption-ready план для downstream-потребителей, чтобы React foundation layer можно было перевести в legacy maintenance mode

Документ не является live-статусом реализации. Live task-state должен жить в:

- `docs/vue-design-system-migration-ralph-cycle.json`

## 2. Текущий baseline

### 2.1 Канонические источники

- Canonical React source: `dreamstore/src/components`
- Secondary visual/reference source: `dreamstore-design-system/src/components`
- Canonical Vue target: `yedesign-system/packages/components/src`
- Canonical token source for Vue target: `yedesign-system/packages/tokens/src/tokens.css`

### 2.2 Инвентарь на момент старта

- `dreamstore/src/components`: `51` React-компонент
- React Storybook coverage в source repo: `21` компонентов со stories
- `yedesign-system/packages/components/src/atoms`: `20` Vue-компонентов
- Vue atom story coverage: `20 / 20`
- `packages/components/src/molecules`: фактически пустой слой
- `packages/components/src/blocks`: фактически пустой слой
- `packages/components/src/templates`: фактически пустой слой

### 2.3 Naming mismatch, который уже существует

Сейчас workspace использует несколько несовместимых identity-слоев одновременно:

- public root package: `@yerik/yedesign-system`
- internal components package: `@mi/components`
- internal tokens package: `@mi-design-system/tokens`
- tsconfig alias: `@mi/tokens`

Это состояние нельзя считать устойчивым. Миграция должна завершиться с одной согласованной naming model.

### 2.4 Что уже есть в Vue target

Source-backed и уже существующие в Vue:

- `BottomSheet`
- `BrandLogo`
- `Button`
- `ButtonIcon`
- `Checkbox`
- `Dialog`
- `DotPagination`
- `ImageCounter`
- `Input`
- `Radio`
- `SearchInput`
- `Select`
- `Skeleton`
- `StarRating`
- `Switch`
- `Tooltip`
- `UserAvatar`

Target-only и уже существующие в Vue, но не входящие в source parity denominator:

- `ListItem`
- `Modal`
- `Tag`

## 3. Проблема

Текущая ситуация плоха не потому, что Vue workspace отсутствует. Она плоха потому, что migration state не замкнут:

1. Источник истины размыт между старым PRD, `dreamstore`, `dreamstore-design-system` и частично готовым `yedesign-system`.
2. Уже портированные Vue-компоненты не прошли formal parity audit against canonical source.
3. Internal naming и public naming конфликтуют друг с другом.
4. Missing-компоненты не разложены в execution-ready backlog с atomic tasks и dependency gates.
5. Граница между design-system scope и app/feature scope не зафиксирована, поэтому агенты могут начать переносить feature-coupled компоненты в DS package.

## 4. Goals

### Product goals

- сделать `yedesign-system` новым Vue source of truth для foundation-layer
- сохранить visual parity с React-источником на уровне public DS components
- нормализовать package identity, aliases и build surface
- закрыть story coverage и acceptance surface для всех migrated in-scope components
- подготовить downstream adoption plan для Dreamstore и следующих потребителей

### Engineering goals

- исключить ad hoc решения при переносе props, slots, emits и controlled state
- убрать `@mi/*` naming drift из workspace
- не тянуть feature-specific contexts в published DS package
- обеспечить lane-based execution через Ralph backlog

### UX goals

- не допустить утвержденных критических visual regressions
- не потерять keyboard/focus behavior там, где оно уже есть
- сохранить token-driven look and feel без hardcoded redesign drift

## 5. Non-goals

- не переписывать весь Dreamstore на Vue в рамках этой инициативы
- не переносить `src/app/components`, `src/features/product/components`, `src/features/cart/components`
- не переносить feature-coupled source components в published DS package
- не делать Nuxt/SSR migration
- не менять visual language и token vocabulary как часть этой программы
- не поддерживать React и Vue как два равноценных active foundation-layer после выполнения release/freeze criteria

## 6. Scope freeze

### 6.1 In-scope source-backed components: `44`

#### Already ported in Vue: `17`

- `BottomSheet`
- `BrandLogo`
- `Button`
- `ButtonIcon`
- `Checkbox`
- `Dialog`
- `DotPagination`
- `ImageCounter`
- `Input`
- `Radio`
- `SearchInput`
- `Select`
- `Skeleton`
- `StarRating`
- `Switch`
- `Tooltip`
- `UserAvatar`

#### Missing and must be ported: `27`

- `Accordion`
- `ActionIconGroup`
- `ActionsPanel`
- `AsideHeader`
- `ButtonGroup`
- `DiscountReasonContainer`
- `Drawer`
- `DropdownMenu`
- `FeaturedServiceItem`
- `GiftItem`
- `InCartButton`
- `NavigationItem`
- `Pagination`
- `PaymentMethodIcons`
- `ProductCard`
- `ProductLabel`
- `PromoBannerSide`
- `QuantityStepper`
- `ReviewItem`
- `ReviewSummary`
- `Segmented`
- `SpecificationItem`
- `StoreItem`
- `Table`
- `Tabs`
- `Toast`
- `Tree`

### 6.2 Excluded from DS parity denominator: `7`

These components stay documented as consumer-layer or feature-layer artifacts and are not part of the Vue DS parity denominator:

- `DeliveryMethodContainer`
  reason: PDP-specific copy, scroll behavior, AB-test coupling
- `InspectOverlay`
  reason: devtools-like inspection utility, not reusable consumer UI
- `MobileBottomTabBar`
  reason: app shell navigation component, route coupling
- `ProductDiscountTooltip`
  reason: product-context-driven feature copy
- `ProductLabelGroup`
  reason: product-context + AB-test + supplier/price feature composition
- `ProductPriceTooltip`
  reason: product-context-driven pricing composition
- `ThemePanel`
  reason: internal experiment/debug panel

### 6.3 Target-only retained components: `3`

These remain in `yedesign-system` but are not counted toward React parity completion:

- `ListItem`
- `Modal`
- `Tag`

Policy:

- they must be audited and normalized
- they must keep story coverage
- they must not block declaration of source parity completion

## 7. Frozen implementation policies

### 7.1 Public package identity

Frozen public consumer surface:

- `@yerik/yedesign-system`
- `@yerik/yedesign-system/style.css`
- `@yerik/yedesign-system/tokens.css`

No new public-facing `@mi/*` package names may be introduced.

### 7.2 Internal package naming

Target internal naming model:

- `packages/components` -> `@yerik/yedesign-system-components`
- `packages/tokens` -> `@yerik/yedesign-system-tokens`
- `apps/storybook` -> `@yerik/yedesign-system-storybook`

Internal source aliases may stay short, but they must not use `@mi/*`.

Allowed local aliases after normalization:

- `@tokens/*`
- `@tokens-studio/*`
- `@components/*`
- `@storybook-app/*`

### 7.3 Styling policy

- published Vue components must not depend on Tailwind runtime
- React utility-class styling must be translated into token-driven CSS or SCSS inside the Vue workspace
- token names and CSS variable API are preserved unless a separate token-governance change is approved
- no hardcoded colors, typography sizes, radii, or spacing values inside migrated components unless the PRD explicitly documents an exception

### 7.4 React-to-Vue API mapping policy

Default conversion rules:

- React `children` -> Vue default slot
- React icon/content node props -> Vue named slots when the content is structural, not scalar
- React scalar text props may stay scalar if that keeps the API clearer than a slot
- React `onClick` and similar callback props -> Vue emits with semantic names
- input-like controlled state -> `modelValue` + `update:modelValue`
- disclosure/open state -> `modelValue` + `update:modelValue`, with optional semantic events such as `open`, `close`, `select`
- styling extension uses native Vue `class` passthrough, not `className` prop, unless the component is multi-root and explicitly requires a named root class prop

Hard parity rule:

- visual output, interaction behavior, and public state model must match the React source 1:1 unless this PRD explicitly documents an allowed deviation
- if Vue requires an API-shape translation, the translated API must preserve the same semantic contract as the React source
- no migration task may simplify, redesign, or silently drop a variant, state, slot, icon position, transition, or interaction branch that exists in the React source

### 7.5 Layer rules

- `atoms`: one primitive control or one primitive display unit
- `molecules`: small compositions of atoms with local interaction
- `blocks`: self-contained reusable card, row, banner, summary, or content chunk
- `templates`: layout scaffolds only, never route pages

Rules:

- no product context
- no app navigation
- no feature storage
- no AB-test context
- no route-specific document querying inside the published package

## 8. Target architecture

```text
yedesign-system/
  apps/
    storybook/
  docs/
    vue-design-system-migration-prd.md
    vue-design-system-migration-ralph-cycle.json
  packages/
    tokens/
    components/
      src/
        atoms/
        molecules/
        blocks/
        templates/
```

### Build contract

- `packages/tokens` remains the source of truth for generated token CSS
- `packages/components` depends on tokens, not on Dreamstore runtime
- root package re-exports compiled components and root CSS entrypoints
- `scripts/build-package.mjs` must rewrite internal token imports to root `./tokens.css` in the published dist

### Storybook contract

Storybook is the acceptance surface for:

- visual comparison
- API examples
- edge states
- review-ready parity checks

Every in-scope component must be reviewable in Storybook before it can be marked accepted.

## 9. Delivery model

### C0 — Baseline and governance

Deliverables:

- fixed source/target inventory
- fixed in-scope and excluded matrix
- fixed package identity
- fixed API mapping rules
- fixed acceptance policy

### C1 — Inventory and parity matrix

Deliverables:

- one matrix covering source-backed, excluded, and target-only components
- one audit template for already-ported Vue components
- one deterministic split between primitive lane and composite lane

### C2 — Package and build normalization

Deliverables:

- no `@mi/*` naming in active workspace packages, aliases, build scripts, Storybook examples, or README examples
- build and Storybook still succeed after normalization

### C3 — Existing Vue audit

Deliverables:

- every already-ported Vue component re-audited against parity rules
- every target-only retained component re-audited against local quality rules
- no component is considered “done” only because it already exists

### C4 — Missing primitive ports

Execution bucket:

- `Accordion`
- `ActionIconGroup`
- `ActionsPanel`
- `AsideHeader`
- `ButtonGroup`
- `DiscountReasonContainer`
- `Drawer`
- `DropdownMenu`
- `InCartButton`
- `NavigationItem`
- `Pagination`
- `PaymentMethodIcons`
- `QuantityStepper`
- `Segmented`
- `Tabs`
- `Toast`

### C5 — Composite ports

Execution bucket:

- `FeaturedServiceItem`
- `GiftItem`
- `ProductCard`
- `ProductLabel`
- `PromoBannerSide`
- `ReviewItem`
- `ReviewSummary`
- `SpecificationItem`
- `StoreItem`
- `Table`
- `Tree`

### C6 — Storybook, QA, docs

Deliverables:

- stories for all new ports
- parity checklist
- API mapping doc
- accessibility/token compliance checklist
- smoke-check workflow
- release/freeze gates

### C7 — Consumer adoption planning

Deliverables:

- Dreamstore consumption surface map
- downstream adoption sequence
- pilot adoption slice
- treatment of excluded components
- React legacy freeze criteria
- downstream migration playbook

### C8 — Governance and finalization

Deliverables:

- docs linked from workspace root
- handoff template and status policy frozen
- final planning summary
- older Dreamstore PRD marked as historical when implementation kickoff begins

## 10. Ralph execution model

This migration must be executed in Ralph mode.

Rules:

- one active task per lane
- tasks inside one lane are strictly sequential
- cycles are gate-controlled
- every task must end with a short handoff note
- if scope grows, split the task instead of silently expanding it
- already-ported Vue components must be audited before any rewrite or cleanup is considered complete
- consumer-adoption work cannot start before parity and QA cycles close

### Frozen lanes

- `L1` Governance and Inventory
- `L2` Packaging and Tokens
- `L3` Existing Vue Audit
- `L4` Missing Primitive Components
- `L5` Composite Components
- `L6` Storybook QA and Docs
- `L7` Consumer Adoption and Rollout

### Recommended merge order

1. `L1`
2. `L2`
3. `L3`
4. `L4` and `L5`
5. `L6`
6. `L7`

## 11. Acceptance criteria

### Parity acceptance

- all `44` in-scope source-backed components are either:
  - already ported and accepted after audit, or
  - newly ported and accepted
- no excluded component is silently moved into DS scope
- retained target-only components do not count against the parity denominator
- each accepted Vue component matches the source component for:
  - variants
  - sizes
  - default state
  - hover state
  - active state
  - focus-visible state
  - disabled state
  - loading state when present in source
  - selected/checked state when present in source
  - open/closed state when present in source
  - content-slot behavior and icon placement
  - token-driven spacing, radius, typography, and color behavior
- any deviation from source parity must be documented in the PRD or in the task handoff note and explicitly approved before the component can be marked accepted

### Storybook acceptance

Each in-scope component must expose the necessary states for review.

Minimum state expectations by class:

- button-like/action components: default, hover, active, disabled, loading if applicable
- form controls: default, focus-visible, filled, selected, disabled, error if applicable
- overlay/disclosure components: closed/open, focus handling, dismissal behavior
- card/list/summary components: canonical content, truncated content, dense layout if applicable

For parity review, Storybook is not only documentation. It is the required review surface for checking that the Vue component still behaves like the React source.

### Accessibility acceptance

- semantic HTML preserved or improved
- keyboard access preserved for interactive elements
- focus-visible states remain present
- no parity task may remove a11y behavior already present in source without explicit PRD change

### Build acceptance

- tokens package builds
- components package builds
- root package builds
- Storybook runs and builds

## 12. Risks and mitigations

### Risk: false parity due to incomplete source stories

Mitigation:

- source story coverage is tracked separately
- missing story coverage triggers code-level comparison plus manual parity review

### Risk: package identity drift remains half-migrated

Mitigation:

- no broad porting work begins before C2 naming normalization closes

### Risk: feature-coupled components pollute DS package

Mitigation:

- exclusions are frozen in C0/C1
- excluded components get rollout treatment docs, not DS component tasks

### Risk: already-ported Vue atoms differ from the canonical React source

Mitigation:

- all existing Vue components have mandatory audit tasks
- existing implementation is never treated as automatically accepted

## 13. Adoption-ready outputs

This initiative stops at an adoption-ready state, not at a full product rewrite.

That means the PRD requires:

- a consumer migration cookbook
- a Dreamstore surface map
- a rollout sequence
- a pilot slice definition
- a plan for excluded feature-layer components
- React freeze criteria

This initiative does not require immediate in-place replacement of Dreamstore runtime with Vue.

## 14. Definition of done

The migration program is considered done when:

1. the Ralph backlog reaches parity completion for all in-scope components
2. package identity is normalized and build-stable
3. Storybook covers the accepted Vue surface
4. release/freeze criteria are documented
5. downstream adoption artifacts exist and are usable
6. React foundation layer can be placed into legacy mode under explicit freeze criteria

## 15. Source of truth artifacts

Planning source of truth:

- `docs/vue-design-system-migration-prd.md`
- `docs/vue-design-system-migration-ralph-cycle.json`

Historical but no longer canonical:

- `dreamstore/docs/prd/vue-design-system-migration-prd.md`

Runtime source references:

- `dreamstore/src/components`
- `dreamstore-design-system/src/components`
- `yedesign-system/packages/components/src`
- `yedesign-system/packages/tokens/src/tokens.css`
