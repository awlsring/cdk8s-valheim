import { AwlsringCdk8sLibrary } from '@awlsring/projen-commons';

const project = new AwlsringCdk8sLibrary({
  cdk8sVersion: '2.7.36',
  constructsVersion: '10.1.281',
  name: 'cdk8s-valheim',
  repositoryUrl: 'https://github.com/awlsring/cdk8s-valheim.git',
  description: 'A package that vends a Valheim server chart.',
  keywords: [
    'cdktf',
    'proxmox',
    'backend',
  ],
  deps: [
    'constructs@^10.1.281',
  ],
  peerDeps: [
    'cdk8s-plus-26@2.2.2',
  ],
  devDeps: [
    'constructs@10.1.281',
  ],
  publish: true,
});
project.gitignore.exclude('package-lock.json');
project.synth();