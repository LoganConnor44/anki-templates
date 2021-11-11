import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'beautify-chinese-study',
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      baseUrl: 'http://beautify-chinese-study',
      serviceWorker: null,
    },
  ]
};
