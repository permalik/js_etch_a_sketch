module.exports = {
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: {
        grid: 'autoplace',
        add: true,
        env: '.browserlistrc',
        remove: true,
        flexbox: true,
      },
    }),
  ],
};
