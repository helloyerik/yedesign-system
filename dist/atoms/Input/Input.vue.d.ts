import { type Component } from "vue";
type InputSize = "XL" | "L";
type InputState = "default" | "hover" | "active" | "filled" | "disabled" | "error" | "errorOutline" | "textOnly";
type __VLS_Props = {
    label?: string;
    value?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    size?: InputSize;
    state?: InputState;
    startIcon?: Component | null;
    endIcon?: Component | null;
    className?: string;
    errorText?: string;
    autoFocus?: boolean;
};
declare var __VLS_1: {}, __VLS_8: {}, __VLS_15: {}, __VLS_22: {};
type __VLS_Slots = {} & {
    startIcon?: (props: typeof __VLS_1) => any;
} & {
    endIcon?: (props: typeof __VLS_8) => any;
} & {
    startIcon?: (props: typeof __VLS_15) => any;
} & {
    endIcon?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    blur: (event: FocusEvent) => any;
    change: (value: string) => any;
    focus: (event: FocusEvent) => any;
    keydown: (event: KeyboardEvent) => any;
    "update:value": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:value"?: ((value: string) => any) | undefined;
}>, {
    label: string;
    size: InputSize;
    disabled: boolean;
    type: string;
    className: string;
    name: string;
    value: string;
    id: string;
    placeholder: string;
    state: InputState;
    startIcon: Component | null;
    endIcon: Component | null;
    errorText: string;
    autoFocus: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
