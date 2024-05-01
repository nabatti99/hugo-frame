import { Image } from "@components";
import { Center } from "@components/center";
import { Icon } from "@components/icon";
import { Flex, Text } from "@radix-ui/themes";
import cls from "classnames";
import { useRef, useState } from "react";
import { UploadProps } from "./type";

import styles from "./style.module.scss";

export const Upload = ({ ri, description, className, onChange = () => {}, ...props }: UploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setImageBlobUrl(blobUrl);
            onChange(blobUrl);
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

            {imageBlobUrl ? (
                <Center direction="column" gap="2" onClick={() => fileInputRef.current!.click()}>
                    <Image src={imageBlobUrl} alt="upload" width="12rem" height="12rem" objectFit="contain" />
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
