module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      // '@babel/preset-typescript', // If you are using TypeScript
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };