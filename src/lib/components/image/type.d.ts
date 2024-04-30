import { BoxProps } from "@radix-ui/themes/dist/cjs/components/box";
import { Responsive } from "@radix-ui/themes/dist/cjs/props";

export type ImageProps = Omit<BoxProps, "src" | "width" | "height" | "asChild"> &
    Omit<React.ComponentPropsWithoutRef<"img">, "width" | "height"> & {
        src: string;
        width?: Responsive<string>;
        height?: Responsive<string>;
        objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    };
