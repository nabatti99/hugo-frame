import { Center, Icon } from "@components";
import { Upload } from "@global/components";
import { setAvatarBlobUrl, setFrameBlobUrl } from "@pages/home/redux";
import { useAppDispatch } from "@store";
import { CropperSectionProps } from "./type";

import style from "./style.module.scss";

export const PrepareSection = ({ ...props }: CropperSectionProps) => {
    const dispatch = useAppDispatch();

    return (
        <Center
            gap="8"
            direction={{
                initial: "column",
                md: "row",
            }}
            {...props}
        >
            <Upload
                flexShrink="0"
                ri="ri-image-add-line"
                description="Choose your frame"
                className={style["upload"]}
                onChange={(imageBlobUrl) => dispatch(setFrameBlobUrl(imageBlobUrl))}
            />

            <Icon ri="ri-add-large-line" size="8" color="gray" />

            <Upload
                flexShrink="0"
                ri="ri-user-4-line"
                description="Choose your avatar"
                className={style["upload"]}
                onChange={(imageBlobUrl) => dispatch(setAvatarBlobUrl(imageBlobUrl))}
            />
        </Center>
    );
};
