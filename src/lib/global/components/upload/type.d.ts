import { CenterProps } from "@components/center/type";

export type UploadProps = Omit<CenterProps, "onChange"> & {
    ri: string;
    description: string;
    imageUrl?: string;
    onChange?: (imageFileBlob: string) => void;
};
