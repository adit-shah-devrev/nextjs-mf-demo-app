//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const TEMPLATE_APP_URL =
  process.env.NEXT_PUBLIC_TEMPLATE_APP_URL ?? 'http://localhost:3000';

// const remotes = (isServer) => {
//   const location = isServer ? 'ssr' : 'chunks';

//   return {
//     'template-app': `template-app@[window.templateAppUrl]/_next/static/${location}/remoteEntry.js`,
//   };
// };

// const typeRemotes = {
//   'template-app': `template-app@$[window.templateAppUrl]/_next/static/chunks//remoteEntry.js`,
// };

// const remotes = (isServer) => {
//   const location = isServer ? 'ssr' : 'chunks';

//   return {
//     'template-app': `template-app@${TEMPLATE_APP_URL}/_next/static/${location}/remoteEntry.js`,
//   };
// };

// const typeRemotes = {
//   'template-app': `template-app@${TEMPLATE_APP_URL}/_next/static/chunks//remoteEntry.js`,
// };

const federationConfig = {
  extraOptions: {},
  filename: 'static/chunks/remoteEntry.js',
  name: 'host-app',
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
    if (!config.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          ...federationConfig,
          remotes: [],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // runtimePlugins: [require.resolve('./runtimePlugin.js')],
        })
      );
      // config.plugins.push(new ExternalTemplateRemotesPlugin());
    }

    // config.plugins.push(
    //   new FederatedTypesPlugin({
    //     federationConfig: {
    //       ...federationConfig,
    //       remotes: typeRemotes,
    //     },
    //   })
    // );

    return config;
  },
};

module.exports = withNx(nextConfig);
