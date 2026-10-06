export type VersionHistoryItem = {
    // Short label shown in the drawer and menu (e.g. "Design v4")
    label: string;
    // Release identifier tied to /src/docs/release-notes (e.g. "R40")
    release: string;
    // Human readable date this snapshot was published
    date: string;
    // Path to the deployed snapshot; an empty string is the current (root) build
    url: string;
};
