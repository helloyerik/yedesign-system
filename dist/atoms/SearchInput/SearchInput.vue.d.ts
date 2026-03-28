type SearchInputWidth = "hug" | "full";
type SearchInputSurface = "generic" | "plain";
type __VLS_Props = {
    modelValue?: string;
    placeholder?: string;
    width?: SearchInputWidth;
    surface?: SearchInputSurface;
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    keydown: (event: KeyboardEvent) => any;
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    disabled: boolean;
    width: SearchInputWidth;
    modelValue: string;
    placeholder: string;
    surface: SearchInputSurface;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
