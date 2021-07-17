# userscript-template

[![speed: blazing](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280?s=20)
[![uses badges](https://img.shields.io/badge/uses-badges-important)](https://forthebadge.com)
[![gluten free](https://img.shields.io/badge/useful-yes-blue)](https://media.giphy.com/media/NEvPzZ8bd1V4Y/source.gif)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fuserscript-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fuserscript-template?ref=badge_shield)

Template for userscript development.

## Usage / Setup

### Start

- Fork this repository
- delete the CHANGELOG.md (it will be re-created by the release process)
- replace the repository.url node in `package.json`
  - modify the name, description and author as well
- modify the contents of the README.md file to your liking

### Init

To install all the packages necessary run:

```shell
yarn install
```

### Create / Code

- modify the [header](./src/Header.ts)
- add your code to the [main entry file](./src/index.ts)

### Build

Build the development-version of the plugin with:

```shell
yarn build

# or use watch mode
yarn watch
```

The resulting userscript can then be found in the `dist`-folder.

### Release

Start the release by manually by executing the [release workflow](.github/workflows/release.yml) in your GitHub actions.
This will use the current state of the main branch to create the userscript files.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fuserscript-template.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fuserscript-template?ref=badge_large)
