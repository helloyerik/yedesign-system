export type SelectVariant = "default" | "compact" | "textOnly";
export interface SelectOption {
    value: string;
    label?: string;
    description?: string;
}
type __VLS_Props = {
    value: string;
    options: Array<string | SelectOption>;
    variant?: SelectVariant;
    caretWeight?: "regular" | "fill";
    caretSize?: number;
    showSelectedMark?: boolean;
    className?: string;
    placeholder?: string;
    dropdownMenuClassName?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: string) => any;
    "update:value": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((value: string) => any) | undefined;
    "onUpdate:value"?: ((value: string) => any) | undefined;
}>, {
    variant: SelectVariant;
    className: string;
    placeholder: string;
    caretWeight: "regular" | "fill";
    caretSize: number;
    showSelectedMark: boolean;
    dropdownMenuClassName: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
