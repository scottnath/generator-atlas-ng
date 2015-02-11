'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  compose: function() {
    this.composeWith('atlas', { options: {
      skipInstall: this.options['skip-install'],
      bowerJsonInstalled: true
    }});

  },

  promptModules: function () {
    var done = this.async();
    console.log('generator-atlaszzzzz.appName');
    console.log(this.config.getAll());

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling' + chalk.red('AtlasNg') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'fappName',
      message: 'What is the SHAME of your application?',
      default: this.appname,
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.fappName = props.fappName;
      console.log('HERER');
      console.log(this.config.get('generator-atlas.appName'));
      this.appName = this.config.get('generator-atlas.appName');
      this.fappNameSafe = props.fappName.replace(/\W+/g, '-').toLowerCase();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.copy('_bower.json','app/bower.json');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
