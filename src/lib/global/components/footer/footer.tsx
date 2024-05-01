import { Icon, Image, LayoutGrid, Link } from "@components";
import { LogoImg } from "@global/images";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import cls from "classnames";
import { FooterProps } from "./type";

import style from "./style.module.scss";

export const Footer = ({ className, ...props }: FooterProps) => {
    return (
        <Box asChild className={cls(style["footer"], className)} {...props}>
            <footer>
                <Container py="5" className={style["container"]}>
                    <Flex justify="between" align="center" gap="5">
                        <Text as="p" className={style["description"]}>
                            <Icon ri="ri-macbook-line" /> Made by Hugo IT.
                        </Text>
                        <Link asChild to="https://github.com/nabatti99/hugo-frame" target="_blank" className={style["social"]}>
                            <Icon ri="ri-github-fill" size="6" />
                        </Link>
                    </Flex>
                </Container>
            </footer>
        </Box>
    );
};
