import { Seo } from "@global/components";
import { Box, Container, Flex, Section } from "@radix-ui/themes";
import { useEffect } from "react";
import { CropperSection, PrepareSection, Welcome } from "./components";
import { HomePageProps } from "./type";

export const HomePage = ({}: HomePageProps) => {
    useEffect(() => window.scrollTo({ behavior: "smooth", top: 0 }));

    return (
        <>
            <Flex direction="column" align="stretch" gap="5">
                <Section size="2" style={{ backgroundColor: "var(--accent-2)" }}>
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

            <Seo />
        </>
    );
};

// Using for lazy loading page
export default HomePage;
