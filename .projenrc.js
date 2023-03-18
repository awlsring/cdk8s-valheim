const { cdk8s } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'awlsring',
  authorAddress: 'mattcanemail@gmail.com',
  cdk8sVersion: '1.4.10',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-valheim',
  repositoryUrl: 'https://github.com/mattcanemail/cdk8s-valheim.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();