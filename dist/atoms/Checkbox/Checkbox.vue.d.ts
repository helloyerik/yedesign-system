type CheckboxSize = "M" | "L" | "XL";
type CheckboxVariant = "brand" | "secondary";
type __VLS_Props = {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
};
declare var __VLS_11: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: boolean) => any;
    "update:checked": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((value: boolean) => any) | undefined;
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    variant: CheckboxVariant;
    size: CheckboxSize;
    disabled: boolean;
    checked: boolean;
    indeterminate: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
