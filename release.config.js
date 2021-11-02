module.exports = {
  branches: 'main',
  repositoryUrl: 'https://github.com/Tripouille/valheim-skali',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
};
