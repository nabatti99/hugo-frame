import { Helmet } from "react-helmet";
import { useAppDispatch } from "@store";
import { setGApiClient } from "./redux";
import { DRIVE_DISCOVERY_DOC, GAPI_KEY, GAPI_LIBRARY } from "./constants";

declare global {
    interface Window {
        gapi: any;
    }
}

export function GoogleProvider({ children }: GoogleProviderProps) {
    const dispatch = useAppDispatch();

    const handleGApiScriptTagLoaded = () => {
        const gApi = window.gapi;

        // Document from https://github.com/google/google-api-javascript-client/blob/master/docs/start.md
        async function start() {
            // 2. Initialize the JavaScript client library.
            await gApi.client.init({
                // Required API key
                apiKey: GAPI_KEY,
                // API key will be automatically added from the Discovery Document URLs.
                discoveryDocs: [DRIVE_DISCOVERY_DOC],
            });

            // 3. Save GApiClient.
            dispatch(setGApiClient(gApi.client));
        }

        // 1. Load the JavaScript client library.
        gApi.load("client", start);
    };

    const handleScriptInjected = (scriptTags: HTMLScriptElement[] | undefined) => {
        if (!scriptTags) return;

        const gApiScriptTag = scriptTags.find((scriptTag) => scriptTag.src === GAPI_LIBRARY);
        if (gApiScriptTag) gApiScriptTag.onload = handleGApiScriptTagLoaded;
    };

    return (
        <>
            <Helmet script={[{ src: GAPI_LIBRARY }]} onChangeClientState={(newState, addedTags) => handleScriptInjected(addedTags.scriptTags)}></Helmet>

            {children}
        </>
    );
}
