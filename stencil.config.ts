import { Config } from '@stencil/core';
import { env } from '@alepop/stencil-env';

export const config: Config = {
	namespace: 'beautify-chinese-study',
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'docs-readme',
			dir: 'output',
		},
		{
			type: 'www',
			baseUrl: 'http://beautify-chinese-study',
			serviceWorker: null,
		},
	],
	plugins: [env()],
};
