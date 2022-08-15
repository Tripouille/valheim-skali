/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.discordapp.com', 'media.discordapp.net', 'puu.sh', 'i.imgur.com'],
	},
	i18n: {
		locales: ['fr'],
		defaultLocale: 'fr',
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/valhabba',
				permanent: true,
			},
		];
	},
	webpack: function (config, { isServer, webpack }) {
		if (!isServer) {
			config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /mongodb/ }));
		}
		return config;
	},
	eslint: {
		dirs: [
			'api-utils',
			'components',
			'data',
			'hooks',
			'pages',
			'storybook',
			'test',
			'theme',
			'types',
			'utils',
		],
	},
};
