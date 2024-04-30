import { CenterProps } from "@components/center/type";

export type UploadProps = CenterProps & {
    ri: string;
    description: string;
    onChange?: (imageFileBlob: string) => void;
};
