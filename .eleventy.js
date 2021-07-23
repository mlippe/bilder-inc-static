module.exports = function (eleventyConfig) {
  
  // set copy asset folder to dist
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.addWatchTarget('dist/css/*.css');

  eleventyConfig.setBrowserSyncConfig({
    files: ['dist/css/*.css']
  });

  // set input and output folder
  return {
    passthroughFileCopy: true,
    dir: { input: 'src', output: 'dist' },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}