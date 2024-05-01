import { Seo } from "@global/components";
import { Container, Flex, Section } from "@radix-ui/themes";
import { useEffect } from "react";
import { CropperSection, PrepareSection, Welcome } from "./components";
import { HomePageProps } from "./type";
import { TileBackground } from "@components";

import CrystalPng from "./images/crystal.png";
import styles from "./styles.module.scss";

export const HomePage = ({}: HomePageProps) => {
    useEffect(() => window.scrollTo({ behavior: "smooth", top: 0 }));

    return (
        <>
            <TileBackground height="100%">
                <Flex direction="column" align="stretch" gap="5">
                    <Section size="2" style={{ backgroundImage: `url(${CrystalPng})`, borderBottom: "2px solid var(--accent-7)" }} className={styles["header"]}>
                        <Container>
                            <Welcome />
                        </Container>
                    </Section>

                    <Section size="1">
                        <Container>
                            <PrepareSection />
                        </Container>
                    </Section>

                    <Section size="1">
                        <Container>
                            <CropperSection />
                        </Container>
                    </Section>
                </Flex>
            </TileBackground>

            <Seo />
        </>
    );
};

// Using for lazy loading page
export default HomePage;
