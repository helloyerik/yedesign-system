**Vue ↔ React Parity Audit**

**Summary**
This document tracks visual/behavior/API parity between the Vue design system and the React backup. Source of truth: `yedesign-system-react-backup/src/components`. Tokens must come from `tokens.css`.

**Inventory (Mapping + Status)**
Legend: `Pending`, `Partial (adjusted)`, `No React reference`.

| Vue component | React reference | Status |
| --- | --- | --- |
| Button | Button | Partial (variant added) |
| ButtonIcon | ButtonIcon | Pending |
| BrandLogo | BrandLogo | Pending |
| BottomSheet | BottomSheet | Pending |
| Checkbox | Checkbox | Partial (adjusted) |
| Accordion | Accordion | Partial (adjusted) |
| Dialog | Dialog | Partial (adjusted) |
| Drawer | Drawer | Pending |
| DotPagination | DotPagination | Partial (adjusted) |
| Pagination | Pagination | Partial (adjusted) |
| ImageCounter | ImageCounter | Pending |
| InCartButton | InCartButton | Partial (adjusted) |
| Input | Input | Partial (story controls) |
| ListItem | — | No React reference |
| DropdownMenu | DropdownMenu | Partial (adjusted) |
| Modal | — | No React reference |
| NavigationItem | NavigationItem | Partial (adjusted) |
| Radio | Radio | Pending |
| Label | ProductLabel | Partial (adjusted) |
| QuantityStepper | QuantityStepper | Partial (adjusted) |
| SearchInput | SearchInput | Partial (adjusted) |
| Select | Select | Partial (adjusted) |
| Segmented | Segmented | Partial (adjusted) |
| Skeleton | Skeleton | Pending |
| SpecificationItem | SpecificationItem | Pending |
| StarRating | StarRating | Partial (adjusted) |
| Switch | Switch | Partial (adjusted) |
| Tag | — | No React reference |
| Tabs | Tabs | Partial (adjusted) |
| Toast | Toast | Partial (adjusted) |
| Tooltip | Tooltip | Partial (adjusted) |
| Tree | Tree | Partial (adjusted) |
| UserAvatar | UserAvatar | Pending |
| ButtonGroup | ButtonGroup | Pending |
| ActionIconGroup | ActionIconGroup | Pending |
| ActionsPanel | ActionsPanel | Pending |
| AsideHeader | AsideHeader | Partial (adjusted) |
| DiscountReasonContainer | DiscountReasonContainer | Pending |
| DeliveryMethodContainer | DeliveryMethodContainer | Pending |
| FeaturedServiceItem | FeaturedServiceItem | Partial (adjusted) |
| InspectOverlay | InspectOverlay | Pending |
| MobileBottomTabBar | — | No React reference |
| PaymentMethodIcons | PaymentMethodIcons | Pending |
| ProductCard | ProductCard | Partial (visual updated) |
| ProductDiscountTooltip | ProductDiscountTooltip | Partial (adjusted) |
| ProductLabelGroup | ProductLabel | Pending |
| ProductPriceTooltip | — | No React reference |
| PromoBannerSide | PromoBannerSide | Pending |
| ReviewItem | ReviewItem | Pending |
| ReviewSummary | ReviewSummary | Pending |
| StoreItem | StoreItem | Pending |
| Table | Table | Pending |
| ThemePanel | ThemePanel | Pending |

**Current Fixes Applied (needs recheck vs React)**
- `Button`: added `secondary-info` variant (info text/icon color).
- `Button`: text-only hover/active backgrounds aligned to React.
- `FeaturedServiceItem`: layout/tokens aligned to React card structure.
- `AsideHeader`: collapse button moved to bottom center.
- `Select`: trigger text uses selected label/placeholder parity.
- `DropdownMenu`: 4px trigger gap, left offset, and menu padding updates.
- `Tooltip`: arrow height and fill aligned to React.
- `Switch`: label position left/right variant added.
- `ListItem`: padding X equals padding Y for S/XS/L sizes.
- `QuantityStepper`: gap set to 0.
- `QuantityStepper`: size tokens aligned to React.
- `Input`: border radius aligned to React.
- `Tabs`: pills height/padding aligned to React.
- `InCartButton`: height aligned to React.
- `Toast`: background, button styling, and min-height aligned to React.
- `DropdownMenu`: min width, item padding, and shadow aligned to React.
- `DropdownMenu`: default trigger size/hover aligned to React.
- `DotPagination`: container height aligned to React.
- `ProductDiscountTooltip`: content spacing and link color aligned to React.
- `ProductCard`: visual layout aligned to React spec.
- `Dialog`: header layout aligned to spec.
- `Checkbox`: icon sizing aligned to React.
- `SearchInput`: border radius aligned to React.
- `Label`: tooltip behavior + caret spacing aligned to React.
- `Pagination`: sizing and icon sizes aligned to React.
- `NavigationItem`: spacing/padding aligned to React.
- `Segmented`: spacing and height aligned to React.
- `Tree`: indentation and selection hover behavior aligned to React.
- `StarRating`: star gap aligned to React.
- `Accordion`: header gap aligned to React.

**Component Checklists**
**Atoms**
- **Button** — Status: Partial (variant added)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ButtonIcon** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **BrandLogo** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **BottomSheet** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Checkbox** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Accordion** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Dialog** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Drawer** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **DotPagination** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Pagination** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ImageCounter** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **InCartButton** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Input** — Status: Partial (story controls)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ListItem** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **DropdownMenu** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Modal** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **NavigationItem** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Radio** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Label** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **QuantityStepper** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **SearchInput** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Select** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Segmented** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Skeleton** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **SpecificationItem** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **StarRating** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Switch** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Tag** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Tabs** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Toast** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Tooltip** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Tree** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **UserAvatar** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)

**Molecules**
- **ButtonGroup** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ActionIconGroup** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)

**Blocks**
- **ActionsPanel** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **AsideHeader** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **DiscountReasonContainer** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **DeliveryMethodContainer** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **FeaturedServiceItem** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **InspectOverlay** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **MobileBottomTabBar** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **PaymentMethodIcons** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ProductCard** — Status: Partial (visual updated)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ProductDiscountTooltip** — Status: Partial (adjusted)
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ProductLabelGroup** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ProductPriceTooltip** — Status: No React reference
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **PromoBannerSide** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ReviewItem** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ReviewSummary** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **StoreItem** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **Table** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
- **ThemePanel** — Status: Pending
- [ ] Visual (layout, spacing, typography, colors)
- [ ] Interaction (hover/active/focus/disabled, motion)
- [ ] API parity (props/slots/events/defaults)
- [ ] Variants & states
- [ ] Accessibility (focus ring, aria)
