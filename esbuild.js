/* eslint-disable @typescript-eslint/no-var-requires */
async function start() {
  return Promise.all([
    require('esbuild').build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV === 'development',
      mainFields: ['module', 'main'],
      external: ['coc.nvim'],
      platform: 'node',
      target: 'node16',
      outfile: 'lib/index.js',
    }),
  ]);
}

start().catch((e) => {
  console.error(e);
});