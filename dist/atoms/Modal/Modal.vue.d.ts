type __VLS_Props = {
    modelValue: boolean;
    title?: string;
    width?: "S" | "M" | "L";
    variant?: "Primary" | "Secondary";
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showFooter?: boolean;
    bodyClassName?: string;
    contentClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    secondaryAutoHeight?: boolean;
    footerBordered?: boolean;
    closeButtonClassName?: string;
    closeButtonVariant?: "ghost" | "secondary";
};
declare var __VLS_11: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    footer?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
