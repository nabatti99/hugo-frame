import { Center } from "@components";
import { Box, Button } from "@radix-ui/themes";
import Cropper from "cropperjs";
import { useEffect, useRef } from "react";
import { CropperSectionProps } from "./type";

import AvatarPng from "./images/avatar.jpg";
import FramePng from "./images/frame.png";
import style from "./style.module.scss";

export const CropperSection = ({ ...props }: CropperSectionProps) => {
    const cropperContainerElementRef = useRef<HTMLDivElement>(null);
    const cropperViewerContainerElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cropperViewerContainerElement = cropperViewerContainerElementRef.current!;
        const cropperContainerElement = cropperContainerElementRef.current!;
        if (cropperContainerElement.dataset.loaded === "true") return;

        const avatar = new Image();
        avatar.src = AvatarPng;
        avatar.alt = "Avatar";

        const frame = new Image();
        frame.src = FramePng;
        frame.alt = "Frame";

        const cropper = new Cropper(avatar, {
            container: cropperContainerElement,
            template: `
                <cropper-canvas background>
                    <cropper-image src="${AvatarPng}"></cropper-image>
                    <cropper-handle action="move" plain></cropper-handle>
                    <cropper-selection id="cropperSelection">
                        <cropper-grid role="grid" bordered covered></cropper-grid>
                    </cropper-selection>
                </cropper-canvas>
            `,
        });

        cropperContainerElement.dataset.loaded = "true";

        const cropperCanvas = cropper.getCropperCanvas()!;

        async function renderAvatar() {
            const canvas = await cropperCanvas.$toCanvas({
                width: frame.width,
                height: frame.height,
            });

            canvas.getContext("2d")!.drawImage(frame, 0, 0, canvas.width, canvas.height);
            canvas.style.width = "40rem";

            cropperViewerContainerElement.innerHTML = "";
            cropperViewerContainerElement.appendChild(canvas);
        }

        let timeoutId = 0;
        cropperCanvas.addEventListener("action", async function (event: any) {
            if (["move", "scale"].includes(event.detail.action)) {
                clearTimeout(timeoutId);

                cropperContainerElement.style.opacity = "0.5";
                setTimeout(() => {
                    cropperContainerElement.style.opacity = "0";
                }, 500);

                await renderAvatar();
            }
        });

        renderAvatar();
    }, []);

    const handleDownload = () => {
        const canvas = cropperViewerContainerElementRef.current!.querySelector("canvas")!;
        const link = document.createElement("a");

        link.download = "avatar.jpg";
        link.href = canvas.toDataURL("image/jpg");
        link.click();
    };

    return (
        <Center direction="column" gap="8" {...props}>
            <Box className={style["container"]}>
                <Box ref={cropperContainerElementRef} className={style["cropper-container"]} />
                <Box ref={cropperViewerContainerElementRef} className={style["viewer-container"]}></Box>
            </Box>
            <Button onClick={handleDownload}>Download</Button>
        </Center>
    );
};
