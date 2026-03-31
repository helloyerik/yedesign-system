# Component Parity Log

Use this file as the running handoff list for parity checks and migration completion.

## Completed Batches

- Foundation and naming normalization completed
- First migration batch completed: `Accordion`, `InCartButton`, `ButtonGroup`
- Second migration batch completed: `Drawer`, `DropdownMenu`, `QuantityStepper`
- Third migration batch completed: `NavigationItem`, `Pagination`, `Tabs`, `Segmented`, `ActionIconGroup`
- Fourth migration batch completed: `ActionsPanel`, `AsideHeader`, `DiscountReasonContainer`, `PaymentMethodIcons`, `Toast`
- Fifth migration batch completed: `ProductLabel`, `SpecificationItem`, `GiftItem`, `FeaturedServiceItem`
- Sixth migration batch completed: `ReviewItem`, `ReviewSummary`, `StoreItem`, `PromoBannerSide`
- Seventh migration batch completed: `ProductCard`, `MobileProductCard`, `Table`, `Tree`

## Verification Notes

- `npm run build` green after the seventh batch
- `npm run build-storybook` green after the seventh batch
- `Table` and `Tree` icon imports were normalized to the `Ph*` export convention used by `@phosphor-icons/vue`
- `Dialog` and `Modal` parity fix pass completed for close button props, footer props, header surface defaults, and the missing secondary body background
- Storybook controls were expanded for `Dialog` and `Modal` so header/footer parity states are easier to review visually
- Atom parity batch completed: `Button`, `Input`, `Select`, `Tooltip`
- `Select` now uses the shared Vue `DropdownMenu` to match React selected-mark and menu interaction behavior
- `Input` focus-border and `errorOutline` class-placement parity restored
- `Tooltip` arrow orientation corrected to match the React source

## Follow-Up Visual Fix Queue

- `ListItem`
- final parity pass on pre-existing Vue atoms
