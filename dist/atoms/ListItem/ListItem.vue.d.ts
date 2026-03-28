type ListItemSize = "XL" | "L" | "M" | "S" | "XS";
type ListItemVariant = "plain" | "filled" | "fill" | "generic";
type __VLS_Props = {
    title: string;
    subtitle?: string;
    imageSrc?: string;
    imageAlt?: string;
    size?: ListItemSize;
    variant?: ListItemVariant;
    chevron?: boolean;
    interactive?: boolean;
    disabled?: boolean;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_10: {}, __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    start?: (props: typeof __VLS_1) => any;
} & {
    media?: (props: typeof __VLS_3) => any;
} & {
    subtitle?: (props: typeof __VLS_10) => any;
} & {
    meta?: (props: typeof __VLS_12) => any;
} & {
    end?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    variant: ListItemVariant;
    size: ListItemSize;
    disabled: boolean;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    chevron: boolean;
    interactive: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
