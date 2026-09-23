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
// CI verifies this list against the folders actually deployed to the docs repo
// (see __scripts__/verify-version-history.js) - keep both in sync when publishing/retiring a snapshot.
export const versionHistory: VersionHistoryItem[] = [
    { label: 'Design v1', release: 'R41', date: 'Updated October 2026', url: '/' },
];
