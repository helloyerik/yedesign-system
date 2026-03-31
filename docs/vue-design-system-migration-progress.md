# Vue Design System Migration Progress

Last updated: 2026-03-31

This file is the operational progress log for the React-to-Vue migration inside `yedesign-system`.

It complements:

- `vue-design-system-migration-prd.md`
- `vue-design-system-migration-ralph-cycle.json`

Use this document for onboarding, handoff, and quick status checks.

## Status Summary

Current phase:

- `C0-C2` complete
- `C4-C5` in active execution
- `C6-C8` not started as a dedicated hardening/governance pass

High-level state:

- canonical PRD and Ralph backlog are in place
- package naming has been normalized away from `@mi/*`
- Storybook and package builds are green
- a large part of the reusable Vue surface has already been ported from React source of truth
- the final high-complexity component batch is now implemented and green
- the first pre-existing atom parity batch is now implemented and green
- remaining heavy work is concentrated in the visual parity fix pass and audit/hardening layers

## Completed Work

### Foundation and Planning

Completed:

- created canonical migration PRD
- created Ralph execution backlog
- moved canonical planning home into `yedesign-system/docs`
- updated workspace README to point to the new planning home
- made strict 1:1 parity explicit for visuals, interactions, states, and variants

### Package and Build Normalization

Completed:

- normalized package names away from `@mi/*`
- updated token import paths
- updated component package build rewrites
- verified root build
- verified Storybook build

### Migrated Components

Completed atoms:

- `Drawer`
- `InCartButton`
- `QuantityStepper`

Previously present and still in workspace:

- `BottomSheet`
- `BrandLogo`
- `Button`
- `ButtonIcon`
- `Checkbox`
- `Dialog`
- `DotPagination`
- `ImageCounter`
- `Input`
- `ListItem`
- `Modal`
- `Radio`
- `SearchInput`
- `Select`
- `Skeleton`
- `StarRating`
- `Switch`
- `Tag`
- `Tooltip`
- `UserAvatar`

Completed molecules:

- `Accordion`
- `ActionIconGroup`
- `ActionsPanel`
- `AsideHeader`
- `ButtonGroup`
- `DiscountReasonContainer`
- `DropdownMenu`
- `NavigationItem`
- `Pagination`
- `PaymentMethodIcons`
- `ProductLabel`
- `Segmented`
- `SpecificationItem`
- `Tabs`
- `Toast`

Completed blocks:

- `FeaturedServiceItem`
- `GiftItem`
- `ProductCard`
- `MobileProductCard`
- `PromoBannerSide`
- `ReviewItem`
- `ReviewSummary`
- `StoreItem`
- `Table`
- `Tree`

### Storybook and Verification

Completed:

- added Storybook coverage for every newly ported component listed above
- verified `npm run build`
- verified `npm run build-storybook`
- handled incremental Storybook feedback fixes, including `ListItem` story spacing adjustments
- closed the final high-complexity build issues by aligning Vue icon imports with the actual `@phosphor-icons/vue` export surface
- completed the first visual parity repair pass for `Dialog` and `Modal` header behavior, including close button controls, footer controls, and the missing secondary body default background
- completed the first pre-existing atom parity batch for `Button`, `Input`, `Select`, and `Tooltip`
- aligned `Select` to React menu behavior by routing it through the shared Vue `DropdownMenu`
- restored missing focus-border behavior and container class placement parity in `Input`
- restored missing active/hover parity in `Button` and corrected tooltip arrow orientation and API parity in `Tooltip`

## Outstanding Work

Still likely in-scope but not yet ported or audited as final DS decisions:

- `ProductLabelGroup`
- `ProductDiscountTooltip`
- `ProductPriceTooltip`
- `DeliveryMethodContainer`
- `MobileBottomTabBar`
- `InspectOverlay`
- `ThemePanel`

Items that also need a dedicated parity fix pass:

- `ListItem`
- existing Vue atoms that were created before the strict parity pass

## Known Follow-Up Passes

After the main component-port wave:

- visual parity audit against React source of truth
- Storybook state audit
- accessibility pass
- token compliance pass
- rollout/adoption documentation pass

## Working Rules

Keep following these rules while migrating:

- React source in `dreamstore/src/components` is the design source of truth
- Vue output must match visuals, interactions, states, and variants 1:1 unless explicitly approved otherwise
- every migrated component gets Storybook coverage
- every major batch must end with `npm run build` and `npm run build-storybook`
- update this progress file after each major migration batch
