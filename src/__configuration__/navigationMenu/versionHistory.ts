export type VersionHistoryItem = {
    // Short label shown in the drawer and menu (e.g. "Design v4")
    label: string;
    // Release identifier tied to /src/docs/release-notes (e.g. "R40")
    release: string;
    // Human readable date this snapshot was published
    date: string;
    // Path to the deployed snapshot; '/' is the current (root) build
    url: string;
};

// Ordered newest -> oldest. First entry is treated as the current version.
// `url` matches the deploy pipeline's target-folder, keyed by design version (not the dev release number).
export const versionHistory: VersionHistoryItem[] = [
    { label: 'Design v3', release: 'R40', date: 'Updated July 2026', url: '/' },
    { label: 'Design v2', release: 'R21', date: 'Updated June 2025', url: '/v2/' },
    { label: 'Design v1', release: 'R8', date: 'Updated July 2018', url: '/v1/' },
];
