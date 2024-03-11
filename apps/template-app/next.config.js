//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const path = require('path');
const fs = require('fs');

const REMOTE_APP_URL =
  process.env.NEXT_PUBLIC_REMOTE_APP_URL ?? 'http://localhost:3001';

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    'remote-app': `remote-app@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const typeRemotes = {
  'remote-app': `remote-app@${REMOTE_APP_URL}/_next/static/chunks//remoteEntry.js`,
};

const exposes = {
  './index': './pages/index.tsx',
};
const exposePath = './pages';

fs.readdirSync(path.resolve(__dirname, exposePath)).forEach((file) => {
  if (path.extname(file) === '.tsx' && !file.startsWith('_')) {
    const exposeName = path.basename(file, path.extname(file));
    exposes[`./${exposeName}`] = `${exposePath}/${exposeName}.tsx`;
  }
});

console.info('exposes', exposes);

const federationConfig = {
  exposes,
  extraOptions: {},
  filename: 'static/chunks/remoteEntry.js',
  name: 'template-app',
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        ...federationConfig,
        remotes: remotes(options.isServer),
      })
    );

    config.plugins.push(
      new FederatedTypesPlugin({
        federationConfig: {
          ...federationConfig,
          remotes: typeRemotes,
        },
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
