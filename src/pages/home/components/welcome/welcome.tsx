import { Flex, Heading, Text } from "@radix-ui/themes";
import { WelcomeProps } from "./type";

import style from "./style.module.scss";

export const Welcome = ({ ...props }: WelcomeProps) => {
    return (
        <Flex direction="column" align="stretch" gap="8" {...props}>
            <Flex direction="column" align="center" gap="5">
                <Heading
                    as="h1"
                    size={{
                        initial: "3",
                        md: "6",
                    }}
                    className={style["title"]}
                >
                    HUGO FRAME
                </Heading>

                <Text align="center" style={{ alignSelf: "center", maxWidth: "48rem" }}>
                    Quick way to set frame for your avatar.
                </Text>
            </Flex>
        </Flex>
    );
};
