import { Center, Icon, Image as ImageUI } from "@components";
import { Upload } from "@global/components";
import { setAvatarUrl, setFrameUrl } from "@pages/home/redux";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useDriveFilesListAPI } from "@services/google";
import { pushErrorNotification } from "@services/notification";
import { useAppDispatch, useAppSelector } from "@store";
import { getDriveLh3Url } from "@utilities";
import { useEffect } from "react";
import { CropperSectionProps } from "./type";

import style from "./style.module.scss";

export const PrepareSection = ({ ...props }: CropperSectionProps) => {
    const dispatch = useAppDispatch();

    const { data: files } = useDriveFilesListAPI("");
    files.sort((file1, file2) => (new Date(file1.modifiedTime) > new Date(file2.modifiedTime) ? -1 : 1));

    const { frameUrl, avatarUrl } = useAppSelector((state) => state.home);

    useEffect(() => {
        if (!frameUrl) return;

        const image = new Image();
        image.src = frameUrl;

        image.addEventListener(
            "load",
            (event) => {
                const image = event.target as HTMLImageElement;
                const imageWidth = image.naturalWidth;
                const imageHeight = image.naturalHeight;

                let isValid = true;

                if (imageWidth !== imageHeight) {
                    dispatch(
                        pushErrorNotification({
                            message: "Frame image is not square. Please choose another one.",
                        })
                    );
                    isValid = false;
                }

                if (imageWidth < 400) {
                    dispatch(
                        pushErrorNotification({
                            message: "Frame image is too small. Please choose another one.",
                        })
                    );
                    isValid = false;
                }

                dispatch(setFrameUrl(isValid ? image.src : undefined));
            },
            { once: true }
        );
    }, [dispatch, frameUrl]);

    return (
        <Flex direction="column" align="center" gap="8" {...props}>
            <Center
                gap="8"
                direction={{
                    initial: "column",
                    md: "row",
                }}
            >
                <Upload
                    flexShrink="0"
                    ri="ri-image-add-line"
                    description="Frame (2000px x 2000px)"
                    className={style["upload"]}
                    imageUrl={frameUrl}
                    onChange={(imageUrl) => dispatch(setFrameUrl(imageUrl))}
                />

                <Icon ri="ri-add-large-line" size="8" color="gray" />

                <Upload flexShrink="0" ri="ri-user-4-line" description="Choose your avatar" className={style["upload"]} onChange={(imageUrl) => dispatch(setAvatarUrl(imageUrl))} />
            </Center>

            {(!frameUrl || !avatarUrl) && (
                <Flex direction="column" gap="4" className={style["suggestion"]}>
                    <Heading as="h2" size="1" align="center" color="iris">
                        Pre made frame suggestions
                    </Heading>

                    <Grid columns={`repeat(auto-fill, minmax(16rem, 1fr))`} className={style["suggestion-list"]}>
                        {files.map((file) => (
                            <Center
                                key={file.id}
                                direction="column"
                                gap="2"
                                p={{
                                    initial: "2",
                                    lg: "4",
                                }}
                                className={style["suggestion-item"]}
                                onClick={() => dispatch(setFrameUrl(getDriveLh3Url(file.id)))}
                            >
                                <ImageUI src={file.thumbnailLink} alt="upload" width="8rem" height="8rem" objectFit="contain" />
                                <Text size="1" weight="medium" color="gray" align="center">
                                    {file.name
                                        .split(".")
                                        .filter((word: string) => word !== file.fileExtension)
                                        .join(".")}
                                </Text>
                            </Center>
                        ))}
                    </Grid>
                </Flex>
            )}
        </Flex>
    );
};
