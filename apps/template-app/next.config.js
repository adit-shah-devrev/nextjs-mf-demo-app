//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const REMOTE_APP_URL =
  process.env.NEXT_PUBLIC_REMOTE_APP_URL ?? 'http://localhost:3001';

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    'remote-app': `remote-app@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const federationConfig = (isServer) => ({
  exposes: {
    './page-url-to-component-map': './components/page-url-to-component-map.ts',
  },
  extraOptions: {},
  filename: 'static/chunks/remoteEntry.js',
  name: 'template-app',
  remotes: remotes(isServer),
});

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
      new NextFederationPlugin(federationConfig(options.isServer))
    );

    config.plugins.push(
      new FederatedTypesPlugin({
        federationConfig: federationConfig(false),
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
