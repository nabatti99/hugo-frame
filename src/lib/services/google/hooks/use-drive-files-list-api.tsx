import { useAppSelector } from "@store";
import { useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { DRIVE_FOLDER_ID } from "../constants";

export function useDriveFilesListAPI(initialQueryString?: string) {
    const gApiClient = useAppSelector((state) => state.google.gApiClient, shallowEqual);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const request = useCallback(
        async function (queryString = "") {
            if (!gApiClient) return;

            setIsLoading(true);

            // Get file from GG Drive as a Zip file
            const rawResponse = await gApiClient.drive.files.list({
                q: [`'${DRIVE_FOLDER_ID}' in parents`, "trashed=false", queryString].filter(Boolean).join(" and "),
                fields: "nextPageToken, files(id, name, fileExtension, thumbnailLink, mimeType, size, modifiedTime, createdTime)",
                spaces: "drive",
            });

            const response = JSON.parse(rawResponse.body);

            setData(response.files || []);
            setIsLoading(false);
        },
        [gApiClient]
    );

    useEffect(() => {
        if (typeof initialQueryString === "string") request(initialQueryString);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQueryString, gApiClient]);

    return {
        isLoading,
        data,
        request,
    };
}
