await Bun.build({
  entrypoints: ['./src/index.html'],
  outdir: './docs',
  minify: true,
  target: 'browser'
})
