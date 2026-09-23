# Documentation Release Guide

This guide explains how to publish a design-system release and preserve versioned documentation on GitHub Pages.

## Deployment model

The documentation is deployed to two GitHub Pages repositories:

- Dev: `brightlayer-ui-dev/brightlayer-ui-dev.github.io`
- Production: `brightlayer-ui/brightlayer-ui.github.io`

The normal `blui-ci.yml` workflow deploys the latest site to the root URL:

```text
https://brightlayer-ui.github.io/
```

The `quarterly-release.yml` workflow creates a permanent version folder such as:

```text
https://brightlayer-ui.github.io/v1/
https://brightlayer-ui.github.io/v2/
```

The version folder is read from `designVersion` in `package.json`.

## Before a release

1. Confirm that the source code represents the design version being released.
2. Update `designVersion` in `package.json`:

   ```json
   "designVersion": "1"
   ```

3. Update `src/__configuration__/navigationMenu/versionHistory.ts`.
4. Keep only versions that have actually been deployed. Do not add a `/vN/` entry before that folder exists.
5. Run the normal checks locally:

   ```bash
   yarn lint
   npx tsc --noEmit
   yarn prettier:check
   ```

## First release

For the first release, there is no previous snapshot.

1. Keep only the current root entry in `versionHistory.ts`:

   ```ts
   export const versionHistory: VersionHistoryItem[] = [
       { label: 'Design v1', release: 'R40', date: 'Updated July 2026', url: '/' },
   ];
   ```

2. Push the release branch.
3. Open GitHub Actions and select **Deploy Quarterly Release Snapshot**.
4. Select the release branch under **Use workflow from**.
5. Run it with `environment: dev`.
6. Verify the versioned dev URL:

   ```text
   https://brightlayer-ui-dev.github.io/v1/
   ```

7. Merge the release into the branch used by `blui-ci.yml` so the latest site is deployed at `/`.
8. Run **Deploy Quarterly Release Snapshot** again with `environment: prod`.
9. Verify:

   ```text
   https://brightlayer-ui.github.io/
   https://brightlayer-ui.github.io/v1/
   ```

## Subsequent release

For Design v2, update the metadata before running the workflow:

`package.json`:

```json
"designVersion": "2"
```

`versionHistory.ts`:

```ts
export const versionHistory: VersionHistoryItem[] = [
    { label: 'Design v2', release: 'R41', date: 'Updated October 2026', url: '/' },
    { label: 'Design v1', release: 'R40', date: 'Updated July 2026', url: '/v1/' },
];
```

Then:

1. Push the release branch.
2. Run the quarterly workflow with `environment: dev`.
3. Verify `/v2/` and deep links such as `/v2/roadmap`.
4. Merge to the branch handled by `blui-ci.yml` to update `/`.
5. Run the quarterly workflow with `environment: prod`.
6. Verify `/`, `/v1/`, and `/v2/` in production.

## Version retention

After deployment, the quarterly workflow scans the selected hosting repository for folders matching `v` followed by digits:

```text
v1, v2, v12, v100
```

It sorts them numerically, keeps the three highest versions, and removes older folders. The root site `/` is not removed.

For example, after deploying `v4`, the hosting repository retains:

```text
v2/
v3/
v4/
```

The cleanup applies to whichever environment was selected. Run the workflow for `dev` first, validate it, then run it for `prod`.

## Release menu maintenance

`versionHistory.ts` is manually maintained.

- The first entry represents the latest root deployment and uses `url: '/'`.
- Older entries use their permanent folder, such as `url: '/v1/'`.
- Do not list a folder that has not been deployed.
- Remove entries when the cleanup policy removes their folders.

Old snapshots are frozen builds. Updating `versionHistory.ts` does not update an already-deployed historical folder; that folder must be rebuilt and redeployed if its menu needs changing.

## Troubleshooting

### A version folder is missing

Check the workflow run and confirm the `designVersion` value. The workflow deploys to the folder derived from that value, for example `designVersion: "2"` becomes `/v2/`.

### A nested URL redirects to the latest site

Verify that the deployed build contains the version-aware `404.html` and that the build was created with the correct `PUBLIC_URL`, such as `/v2`.

### The dropdown links to a 404

Check that the folder exists in the hosting repository and that `versionHistory.ts` points to the correct URL. Do not add historical entries before deployment.

### Dev works but production does not

The dev and production repositories are separate. Run the workflow for both environments after dev validation; a successful dev deployment does not publish production automatically.

## Required secret

The workflow uses `DEV_DEPLOY_TOKEN` to push builds to the selected GitHub Pages repository. Ensure the token has permission to write to the hosting repository before running a release.
