# Doc-It

[![Build](https://github.com/etn-ccis/blui-doc-it/actions/workflows/blui-ci.yml/badge.svg?branch=master)](https://github.com/etn-ccis/blui-doc-it/actions/workflows/blui-ci.yml)

The [Brightlayer UI documentation site](https://brightlayer-ui.github.io/), built with React, Redux, Material UI, and MDX.

## Quick Start

Use Node.js 20 and Yarn to match CI.

```sh
git clone https://github.com/etn-ccis/blui-doc-it
cd blui-doc-it
yarn install
yarn start
```

| Command               | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `yarn build`          | Regenerate the search index and build the site |
| `yarn test`           | Run tests                                      |
| `yarn lint`           | Check source code                              |
| `yarn prettier:check` | Check source formatting                        |
| `yarn check:links`    | Check documentation links                      |

## Editing Documentation

- Edit page content in [src/docs](src/docs).
- After content changes, run `yarn indexer` from the repository root to refresh [src/database](src/database).
- When changing [navigation.tsx](src/__configuration__/navigationMenu/navigation.tsx), update [sitemap.json](__scripts__/crawl/sitemap.json) too.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Project Layout

| Folder                                         | Contents                                                   |
| ---------------------------------------------- | ---------------------------------------------------------- |
| [src/docs](src/docs)                           | Documentation pages (MDX)                                  |
| [src/app](src/app)                             | Components, pages, routing, and Redux state                |
| [src/**configuration**](src/__configuration__) | Navigation, themes, and site configuration                 |
| [src/database](src/database)                   | Generated search data                                      |
| [public](public)                               | Static assets, version history, and GitHub Pages redirects |

## Deployment

Pushes to these branches deploy the current documentation at the site root:

| Branch   | Site                                  |
| -------- | ------------------------------------- |
| `dev`    | https://brightlayer-ui-dev.github.io/ |
| `master` | https://brightlayer-ui.github.io/     |

### Create a History Snapshot

Snapshots preserve a design version at `/vN/`. The folder number comes from `designVersion` in [package.json](package.json), not the package's `version`.

1. Choose the branch or tag containing the content to archive. Confirm its `designVersion` (for example, `"1"` creates `/v1/`) and push any changes.
2. In GitHub Actions, run **Deploy Quarterly Release Snapshot** for that revision. Select `dev` or `prod`.
3. Verify `/v1/`, internal navigation, and a deep link such as `/v1/design/colors`, including a page refresh. Repeat for the other environment when ready.

The workflow builds with `PUBLIC_URL="/vN"`, publishes the snapshot without cleaning other folders, and updates the shared version menu. Rerunning the same design version updates its existing snapshot.

**Before running:** keep the outgoing version's revision available before changing its content. Review its version-history manifest too: running an older revision can overwrite newer menu entries.

### Update the Version Menu

All versions load the menu from `/version-history.json` at the hosting root. In [public/version-history.json](public/version-history.json), put the current release first with `"url": ""` and keep published snapshots with URLs such as `"/v1"`.

Example after moving the root site to Design v2:

```json
[
    {
        "label": "Design v2",
        "release": "R42",
        "date": "Updated January 2027",
        "url": ""
    },
    {
        "label": "Design v1",
        "release": "R41",
        "date": "Updated October 2026",
        "url": "/v1"
    }
]
```

Use the actual release names and dates. For a new design version, update `designVersion`, add the current entry, and point the previous entry to its snapshot. Only list snapshots deployed in the target environment; removing an entry does not delete its folder.

### Deployment Caveats

- **Root cleanup:** root deployments can remove snapshot folders. Until the root workflow is configured to preserve them, deploy the root first, then recreate the required snapshots with the intended version-history manifest.
- **Shared menu:** both deployment workflows publish their revision's manifest to the root. Keep historical entries in it to avoid losing menu options.
- **Missing versions:** unavailable paths such as `/v4` redirect to `/`. Failed availability checks also fall back to root. This requires the updated root 404 page to be deployed.

## Browser Support

The latest two versions of Edge, Firefox, Chrome, and Safari.
