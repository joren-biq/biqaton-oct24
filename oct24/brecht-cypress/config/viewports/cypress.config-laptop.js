const { defineConfig } = require('cypress');

module.exports = defineConfig({
  //viewport for a 720p laptop (720p @ 100% scaling or 1080p @150% scaling)
  viewportWidth: 1280,
  viewportHeight: 613,
});
