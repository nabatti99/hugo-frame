import { Center, Icon } from "@components";
import { Upload } from "@global/components";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { CropperSectionProps } from "./type";

import style from "./style.module.scss";

export const PrepareSection = ({ ...props }: CropperSectionProps) => {
    return (
        <Center gap="8" {...props}>
            <Upload ri="ri-image-add-line" description="Upload your photo" />

            <Icon ri="ri-add-large-line" size="8" />

            <Upload ri="ri-user-4-line" description="Choose your frame" />
        </Center>
    );
};
