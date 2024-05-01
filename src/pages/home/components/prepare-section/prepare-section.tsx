import { Center, Icon, Image } from "@components";
import { Upload } from "@global/components";
import { setAvatarUrl, setFrameUrl } from "@pages/home/redux";
import { useAppDispatch, useAppSelector } from "@store";
import { CropperSectionProps } from "./type";

import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import style from "./style.module.scss";

export const PrepareSection = ({ ...props }: CropperSectionProps) => {
    const dispatch = useAppDispatch();

    const { frameUrl, avatarUrl } = useAppSelector((state) => state.home);

    const frameSuggestionUrls = [...Array(1).keys()].map((index) => "https://i.imgur.com/e80Rtjs.png");

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
                    description="Choose your frame"
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
                        {frameSuggestionUrls.map((frameSuggestionUrl) => (
                            <Center
                                direction="column"
                                gap="2"
                                p={{
                                    initial: "2",
                                    lg: "4",
                                }}
                                className={style["suggestion-item"]}
                                onClick={() => dispatch(setFrameUrl(frameSuggestionUrl))}
                            >
                                <Image src={frameSuggestionUrl} alt="upload" width="8rem" height="8rem" objectFit="contain" />
                                <Text size="1" weight="medium" color="gray" align="center">
                                    HEROES COMPANY CAMPING 2024 - THE CELESTIAL EUPHORIA
                                </Text>
                            </Center>
                        ))}
                    </Grid>
                </Flex>
            )}
        </Flex>
    );
};
