module.exports = {
  branches: 'master',
  repositoryUrl: 'https://github.com/Tripouille/valheim-skali',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
};
