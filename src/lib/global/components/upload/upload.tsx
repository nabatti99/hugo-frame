import { Image } from "@components";
import { Center } from "@components/center";
import { Icon } from "@components/icon";
import { Flex, Text } from "@radix-ui/themes";
import cls from "classnames";
import { useEffect, useRef, useState } from "react";
import { UploadProps } from "./type";

import styles from "./style.module.scss";

export const Upload = ({ ri, description, className, imageUrl, onChange = () => {}, ...props }: UploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadImageUrl, setUploadImageUrl] = useState<string | undefined>(imageUrl);

    useEffect(() => {
        setUploadImageUrl(imageUrl);
    }, [imageUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadImageUrl(url);
            onChange(url);
        }
    };

    return (
        <Center
            direction="column"
            p={{
                initial: "4",
                lg: "8",
            }}
            className={cls(styles["container"], className)}
            {...props}
        >
            <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />

            {uploadImageUrl ? (
                <Center direction="column" gap="2" onClick={() => fileInputRef.current!.click()}>
                    <Image src={uploadImageUrl} alt="upload" width="12rem" height="12rem" objectFit="contain" />
                    <Flex align="center" gap="1">
                        <Icon ri="ri-restart-line" size="3" color="gray" />
                        <Text color="gray">Choose another file</Text>
                    </Flex>
                </Center>
            ) : (
                <Center direction="column" gap="2" onClick={() => fileInputRef.current!.click()}>
                    <Icon ri={ri} size="6" />
                    <Text color="gray">{description}</Text>
                </Center>
            )}
        </Center>
    );
};
