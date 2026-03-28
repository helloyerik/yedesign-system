type RadioSize = "M" | "L";
type RadioDirection = "horizontal" | "vertical";
interface RadioGroupOption {
    value: string;
    label: string;
    disabled?: boolean;
}
type __VLS_Props = {
    modelValue: string;
    options: RadioGroupOption[];
    size?: RadioSize;
    direction?: RadioDirection;
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: string) => any;
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    size: RadioSize;
    disabled: boolean;
    direction: RadioDirection;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
