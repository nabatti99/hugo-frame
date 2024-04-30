import { TextProps } from "@radix-ui/themes";

export type IconProps = Omit<TextProps, "as" | "asChild"> & {
    ri: string;
};
