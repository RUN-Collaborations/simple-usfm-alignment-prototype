const name = "Simple USFM Alignment";
const ID = 'SimpleUsfmAlignment';
const ignore = [ // files/folders to not copy to app (in regex format)
  '^/.idea',
  '^/.vscode',
  '^/libs',
  '^/out',
  '^/src',
  '^/node_modules/.cache'
];

module.exports = {
  packagerConfig: {
    ignore,
    osxUniversal: { // config options for `@electron/universal`
      x64ArchFiles: '**/fsevents.node'
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: ID,
        authors: 'ANON',
        description: 'A simple USFM Aligner',
        // iconUrl: './public/favicon-32x32.png',
        // setupIcon: './public/favicon-32x32.png',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: { name },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './public/favicon-32x32.png',
        format: 'ULFO',
        name
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: { name },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: { name },
    },
  ],
};

console.log('module.exports', JSON.stringify(module.exports));
