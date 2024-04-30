import { Center, Icon } from "@components";
import { Box, Button } from "@radix-ui/themes";
import { useAppSelector } from "@store";
import Cropper from "cropperjs";
import { useEffect, useRef } from "react";
import { CropperSectionProps } from "./type";
import { shallowEqual } from "react-redux";

import style from "./style.module.scss";

export const CropperSection = ({ ...props }: CropperSectionProps) => {
    const { avatarBlobUrl, frameBlobUrl } = useAppSelector((state) => state.home, { equalityFn: shallowEqual });

    const cropperContainerElementRef = useRef<HTMLDivElement>(null);
    const cropperViewerContainerElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!avatarBlobUrl || !frameBlobUrl) return;

        const cropperViewerContainerElement = cropperViewerContainerElementRef.current!;
        const cropperContainerElement = cropperContainerElementRef.current!;

        // Prevent re-render
        if (cropperContainerElement.dataset.loaded === "true") return;

        const avatar = new Image();
        avatar.src = avatarBlobUrl;
        avatar.alt = "Avatar";

        const frame = new Image();
        frame.src = frameBlobUrl;
        frame.alt = "Frame";

        cropperContainerElement.innerHTML = "";
        const cropper = new Cropper(avatar, {
            container: cropperContainerElement,
            template: `
                <cropper-canvas background>
                    <cropper-image></cropper-image>
                    <cropper-handle action="move" plain></cropper-handle>
                    <cropper-selection id="cropperSelection">
                        <cropper-grid role="grid" bordered covered></cropper-grid>
                    </cropper-selection>
                </cropper-canvas>
            `,
        });

        // Prevent re-render
        cropperContainerElement.dataset.loaded = "true";

        const cropperCanvas = cropper.getCropperCanvas()!;

        async function renderAvatar() {
            const canvas = await cropperCanvas.$toCanvas({
                width: frame.width,
                height: frame.height,
            });

            canvas.getContext("2d")!.drawImage(frame, 0, 0, canvas.width, canvas.height);

            cropperViewerContainerElement.innerHTML = "";
            cropperViewerContainerElement.appendChild(canvas);
        }

        async function handleCropperAction(event: any) {
            if (["move", "scale"].includes(event.detail.action)) {
                clearTimeout(timeoutId);

                cropperContainerElement.style.opacity = "0.5";
                setTimeout(() => {
                    cropperContainerElement.style.opacity = "0";
                }, 500);

                await renderAvatar();
            }
        }

        let timeoutId = 0;
        cropperCanvas.addEventListener("action", handleCropperAction);

        renderAvatar();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            cropperCanvas.removeEventListener("action", handleCropperAction);

            // Prevent re-render
            cropperContainerElement.dataset.loaded = "false";
        };
    }, [avatarBlobUrl, frameBlobUrl]);

    const handleDownload = () => {
        const canvas = cropperViewerContainerElementRef.current!.querySelector("canvas")!;
        const link = document.createElement("a");

        link.download = "avatar.jpg";
        link.href = canvas.toDataURL("image/jpg");
        link.click();
    };

    return (
        <Center direction="column" gap="4" {...props}>
            {avatarBlobUrl && frameBlobUrl ? (
                <>
                    <Box className={style["container"]}>
                        <Box ref={cropperContainerElementRef} className={style["cropper-container"]} />
                        <Box ref={cropperViewerContainerElementRef} className={style["viewer-container"]} />
                    </Box>
                    <Button size="4" variant="surface" onClick={handleDownload}>
                        <Icon ri="ri-download-2-line" size="4" />
                        <span>Download</span>
                    </Button>
                </>
            ) : (
                <p>Choose your avatar and frame</p>
            )}
        </Center>
    );
};
