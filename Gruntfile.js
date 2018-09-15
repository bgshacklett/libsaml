// Gruntfile
// =========
// Tasks for development and testing.

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      options: {
        reload: true
      },
      dev: {
        files: ['index.js', 'Gruntfile.js'],
        tasks: ['eslint']
      }
    },
    eslint: {
      target: ['**/*.js', '!node_modules/**/*.js']
    }
  });

  grunt.registerTask('default', 'develop');
  grunt.registerTask('develop', ['watch:dev']);
};
