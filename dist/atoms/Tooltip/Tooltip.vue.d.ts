type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipWidthVariant = "fixed" | "hug";
type __VLS_Props = {
    className?: string;
    position?: TooltipPosition;
    autoPosition?: boolean;
    trigger?: HTMLElement | null;
    arrowOffset?: number;
    widthVariant?: TooltipWidthVariant;
    autoArrow?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    className: string;
    position: TooltipPosition;
    autoPosition: boolean;
    trigger: HTMLElement | null;
    arrowOffset: number;
    widthVariant: TooltipWidthVariant;
    autoArrow: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
