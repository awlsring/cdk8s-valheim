# CDK8s Valheim

This is a [CDK8s](https://cdk8s.io/) project that defines a Kubernetes deployment for [Valheim](https://www.valheimgame.com/) using the [lloesche/valheim-server](https://github.com/lloesche/valheim-server-docker) image.

## Use

A default deployment can be created with:

```typescript
new ValheimChart(app, 'valheim')
```

Default deployment will produce a server configured with all default [environment variables](https://github.com/lloesche/valheim-server-docker#environment-variables). The container will request resources for the games minimum recommended specs of 2 CPU and 4GB of memory.

Settings can be customized by passing in a `ValheimChartProps` object. This will allow you to configure all supported environment customizations and container configurations

```typescript
new ValheimChart(app, 'valheim', {
  server: {
    name: 'K8S Valheim',
    worldName: 'K8S',
    password: {
      raw: 'password',
    },
  },
})
```

## Persistence

By default, the server will store its data on a host path. This is not recommended as your world data can easily be lost.

This chart allows for storing the data on a PersistentVolumeClaim. Two pvcs can be created, one for the world data and one for the configuration. The world data is mounted at `/opt/valheim/data` directory and the configuration is mounted at `/config` directory.

To create these, the PVCs can be configured as follows:

```typescript
new ValheimChart(app, 'valheim'. {
    persistence: {
    server: {
      storageClass: "my-class",
    },
    config: {
      storageClass: "my-class",
    },
  },
})
```
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ValheimChart <a name="ValheimChart" id="@awlsring/cdk8s-valheim.ValheimChart"></a>

A chart to deploy a Valheim server Uses the container by @lloesche.

> [https://github.com/lloesche/valheim-server-docker](https://github.com/lloesche/valheim-server-docker)

#### Initializers <a name="Initializers" id="@awlsring/cdk8s-valheim.ValheimChart.Initializer"></a>

```typescript
import { ValheimChart } from '@awlsring/cdk8s-valheim'

new ValheimChart(scope: Construct, name: string, props?: ValheimChartProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.props">props</a></code> | <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps">ValheimChartProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@awlsring/cdk8s-valheim.ValheimChart.Initializer.parameter.props"></a>

- *Type:* <a href="#@awlsring/cdk8s-valheim.ValheimChartProps">ValheimChartProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.addDependency">addDependency</a></code> | Create a dependency between this Chart and other constructs. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.generateObjectName">generateObjectName</a></code> | Generates a app-unique name for an object given it's construct node path. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.toJson">toJson</a></code> | Renders this chart to a set of Kubernetes JSON resources. |

---

##### `toString` <a name="toString" id="@awlsring/cdk8s-valheim.ValheimChart.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@awlsring/cdk8s-valheim.ValheimChart.addDependency"></a>

```typescript
public addDependency(dependencies: IConstruct): void
```

Create a dependency between this Chart and other constructs.

These can be other ApiObjects, Charts, or custom.

###### `dependencies`<sup>Required</sup> <a name="dependencies" id="@awlsring/cdk8s-valheim.ValheimChart.addDependency.parameter.dependencies"></a>

- *Type:* constructs.IConstruct

the dependencies to add.

---

##### `generateObjectName` <a name="generateObjectName" id="@awlsring/cdk8s-valheim.ValheimChart.generateObjectName"></a>

```typescript
public generateObjectName(apiObject: ApiObject): string
```

Generates a app-unique name for an object given it's construct node path.

Different resource types may have different constraints on names
(`metadata.name`). The previous version of the name generator was
compatible with DNS_SUBDOMAIN but not with DNS_LABEL.

For example, `Deployment` names must comply with DNS_SUBDOMAIN while
`Service` names must comply with DNS_LABEL.

Since there is no formal specification for this, the default name
generation scheme for kubernetes objects in cdk8s was changed to DNS_LABEL,
since it’s the common denominator for all kubernetes resources
(supposedly).

You can override this method if you wish to customize object names at the
chart level.

###### `apiObject`<sup>Required</sup> <a name="apiObject" id="@awlsring/cdk8s-valheim.ValheimChart.generateObjectName.parameter.apiObject"></a>

- *Type:* cdk8s.ApiObject

The API object to generate a name for.

---

##### `toJson` <a name="toJson" id="@awlsring/cdk8s-valheim.ValheimChart.toJson"></a>

```typescript
public toJson(): any[]
```

Renders this chart to a set of Kubernetes JSON resources.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.isChart">isChart</a></code> | Return whether the given object is a Chart. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.of">of</a></code> | Finds the chart in which a node is defined. |

---

##### `isConstruct` <a name="isConstruct" id="@awlsring/cdk8s-valheim.ValheimChart.isConstruct"></a>

```typescript
import { ValheimChart } from '@awlsring/cdk8s-valheim'

ValheimChart.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdk8s-valheim.ValheimChart.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isChart` <a name="isChart" id="@awlsring/cdk8s-valheim.ValheimChart.isChart"></a>

```typescript
import { ValheimChart } from '@awlsring/cdk8s-valheim'

ValheimChart.isChart(x: any)
```

Return whether the given object is a Chart.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdk8s-valheim.ValheimChart.isChart.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@awlsring/cdk8s-valheim.ValheimChart.of"></a>

```typescript
import { ValheimChart } from '@awlsring/cdk8s-valheim'

ValheimChart.of(c: IConstruct)
```

Finds the chart in which a node is defined.

###### `c`<sup>Required</sup> <a name="c" id="@awlsring/cdk8s-valheim.ValheimChart.of.parameter.c"></a>

- *Type:* constructs.IConstruct

a construct node.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels applied to all resources in this chart. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChart.property.namespace">namespace</a></code> | <code>string</code> | The default namespace for all objects in this chart. |

---

##### `node`<sup>Required</sup> <a name="node" id="@awlsring/cdk8s-valheim.ValheimChart.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `labels`<sup>Required</sup> <a name="labels" id="@awlsring/cdk8s-valheim.ValheimChart.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Labels applied to all resources in this chart.

This is an immutable copy.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@awlsring/cdk8s-valheim.ValheimChart.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string

The default namespace for all objects in this chart.

---


## Structs <a name="Structs" id="Structs"></a>

### BackupProps <a name="BackupProps" id="@awlsring/cdk8s-valheim.BackupProps"></a>

Props for configuring the valheim server backups.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.BackupProps.Initializer"></a>

```typescript
import { BackupProps } from '@awlsring/cdk8s-valheim'

const backupProps: BackupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.enabled">enabled</a></code> | <code>boolean</code> | Should backups be enabled. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.directory">directory</a></code> | <code>string</code> | The directory to store backups. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.idleGracePeriod">idleGracePeriod</a></code> | <code>number</code> | The grace period for the server to be idle. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.maxBackups">maxBackups</a></code> | <code>number</code> | The retention count for backups. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.performIfIdle">performIfIdle</a></code> | <code>boolean</code> | Only backup if server idle. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.permissionUmask">permissionUmask</a></code> | <code>string</code> | Permission mask for the backup directory. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.retentionAge">retentionAge</a></code> | <code>number</code> | The retention age for backups. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.scheduleCron">scheduleCron</a></code> | <code>string</code> | The cron schedule for the backup job. |
| <code><a href="#@awlsring/cdk8s-valheim.BackupProps.property.zip">zip</a></code> | <code>boolean</code> | Should the backups be zipped. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="@awlsring/cdk8s-valheim.BackupProps.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true

Should backups be enabled.

---

##### `directory`<sup>Optional</sup> <a name="directory" id="@awlsring/cdk8s-valheim.BackupProps.property.directory"></a>

```typescript
public readonly directory: string;
```

- *Type:* string
- *Default:* /config/backups

The directory to store backups.

---

##### `idleGracePeriod`<sup>Optional</sup> <a name="idleGracePeriod" id="@awlsring/cdk8s-valheim.BackupProps.property.idleGracePeriod"></a>

```typescript
public readonly idleGracePeriod: number;
```

- *Type:* number
- *Default:* 3600s

The grace period for the server to be idle.

---

##### `maxBackups`<sup>Optional</sup> <a name="maxBackups" id="@awlsring/cdk8s-valheim.BackupProps.property.maxBackups"></a>

```typescript
public readonly maxBackups: number;
```

- *Type:* number
- *Default:* unlimited

The retention count for backups.

---

##### `performIfIdle`<sup>Optional</sup> <a name="performIfIdle" id="@awlsring/cdk8s-valheim.BackupProps.property.performIfIdle"></a>

```typescript
public readonly performIfIdle: boolean;
```

- *Type:* boolean
- *Default:* true

Only backup if server idle.

---

##### `permissionUmask`<sup>Optional</sup> <a name="permissionUmask" id="@awlsring/cdk8s-valheim.BackupProps.property.permissionUmask"></a>

```typescript
public readonly permissionUmask: string;
```

- *Type:* string

Permission mask for the backup directory.

---

##### `retentionAge`<sup>Optional</sup> <a name="retentionAge" id="@awlsring/cdk8s-valheim.BackupProps.property.retentionAge"></a>

```typescript
public readonly retentionAge: number;
```

- *Type:* number
- *Default:* 3

The retention age for backups.

---

##### `scheduleCron`<sup>Optional</sup> <a name="scheduleCron" id="@awlsring/cdk8s-valheim.BackupProps.property.scheduleCron"></a>

```typescript
public readonly scheduleCron: string;
```

- *Type:* string
- *Default:* 0 * * * *

The cron schedule for the backup job.

---

##### `zip`<sup>Optional</sup> <a name="zip" id="@awlsring/cdk8s-valheim.BackupProps.property.zip"></a>

```typescript
public readonly zip: boolean;
```

- *Type:* boolean
- *Default:* true

Should the backups be zipped.

---

### PasswordProps <a name="PasswordProps" id="@awlsring/cdk8s-valheim.PasswordProps"></a>

Password properties.

Used to determine if the password should be a raw string in manifest or retrieved from an existing secret

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.PasswordProps.Initializer"></a>

```typescript
import { PasswordProps } from '@awlsring/cdk8s-valheim'

const passwordProps: PasswordProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.PasswordProps.property.raw">raw</a></code> | <code>string</code> | The raw password string. |
| <code><a href="#@awlsring/cdk8s-valheim.PasswordProps.property.secret">secret</a></code> | <code>string</code> | The name of the secret to retrieve the password from. |

---

##### `raw`<sup>Optional</sup> <a name="raw" id="@awlsring/cdk8s-valheim.PasswordProps.property.raw"></a>

```typescript
public readonly raw: string;
```

- *Type:* string

The raw password string.

Will be visible in manifest. Should not use.

---

##### `secret`<sup>Optional</sup> <a name="secret" id="@awlsring/cdk8s-valheim.PasswordProps.property.secret"></a>

```typescript
public readonly secret: string;
```

- *Type:* string

The name of the secret to retrieve the password from.

The secret should be stored in a key named "password"

---

### PersistanceProps <a name="PersistanceProps" id="@awlsring/cdk8s-valheim.PersistanceProps"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.PersistanceProps.Initializer"></a>

```typescript
import { PersistanceProps } from '@awlsring/cdk8s-valheim'

const persistanceProps: PersistanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.PersistanceProps.property.config">config</a></code> | <code><a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps">PersistentVolumeClaimConfigProps</a></code> | PVC configuration for data specific files. |
| <code><a href="#@awlsring/cdk8s-valheim.PersistanceProps.property.server">server</a></code> | <code><a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps">PersistentVolumeClaimConfigProps</a></code> | PVC configuration for server specific files. |

---

##### `config`<sup>Optional</sup> <a name="config" id="@awlsring/cdk8s-valheim.PersistanceProps.property.config"></a>

```typescript
public readonly config: PersistentVolumeClaimConfigProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps">PersistentVolumeClaimConfigProps</a>

PVC configuration for data specific files.

---

##### `server`<sup>Optional</sup> <a name="server" id="@awlsring/cdk8s-valheim.PersistanceProps.property.server"></a>

```typescript
public readonly server: PersistentVolumeClaimConfigProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps">PersistentVolumeClaimConfigProps</a>

PVC configuration for server specific files.

---

### PersistentVolumeClaimConfigProps <a name="PersistentVolumeClaimConfigProps" id="@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps"></a>

Props for configuring a persistent volume claim.

> [https://kubernetes.io/docs/concepts/storage/persistent-volumes/](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.Initializer"></a>

```typescript
import { PersistentVolumeClaimConfigProps } from '@awlsring/cdk8s-valheim'

const persistentVolumeClaimConfigProps: PersistentVolumeClaimConfigProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.storageClass">storageClass</a></code> | <code>string</code> | The name of the storage class. |
| <code><a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.accessModes">accessModes</a></code> | <code>cdk8s-plus-26.PersistentVolumeAccessMode[]</code> | The access mode from the volume. |
| <code><a href="#@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.storage">storage</a></code> | <code>cdk8s.Size</code> | The size of the volume. |

---

##### `storageClass`<sup>Required</sup> <a name="storageClass" id="@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.storageClass"></a>

```typescript
public readonly storageClass: string;
```

- *Type:* string

The name of the storage class.

---

##### `accessModes`<sup>Optional</sup> <a name="accessModes" id="@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.accessModes"></a>

```typescript
public readonly accessModes: PersistentVolumeAccessMode[];
```

- *Type:* cdk8s-plus-26.PersistentVolumeAccessMode[]
- *Default:* = [READ_WRITE_ONCE]

The access mode from the volume.

> [https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)

---

##### `storage`<sup>Optional</sup> <a name="storage" id="@awlsring/cdk8s-valheim.PersistentVolumeClaimConfigProps.property.storage"></a>

```typescript
public readonly storage: Size;
```

- *Type:* cdk8s.Size

The size of the volume.

> [https://kubernetes.io/docs/concepts/storage/persistent-volumes/#capacity](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#capacity)

---

### ResourceLimitsProps <a name="ResourceLimitsProps" id="@awlsring/cdk8s-valheim.ResourceLimitsProps"></a>

Props for configuring resource limits.

> [https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.ResourceLimitsProps.Initializer"></a>

```typescript
import { ResourceLimitsProps } from '@awlsring/cdk8s-valheim'

const resourceLimitsProps: ResourceLimitsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ResourceLimitsProps.property.cpu">cpu</a></code> | <code>cdk8s-plus-26.CpuResources</code> | The CPU resources to allocate to the container. |
| <code><a href="#@awlsring/cdk8s-valheim.ResourceLimitsProps.property.memory">memory</a></code> | <code>cdk8s-plus-26.MemoryResources</code> | The memory resources to allocate to the container. |

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="@awlsring/cdk8s-valheim.ResourceLimitsProps.property.cpu"></a>

```typescript
public readonly cpu: CpuResources;
```

- *Type:* cdk8s-plus-26.CpuResources
- *Default:* = 2000m

The CPU resources to allocate to the container.

> [https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu)

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@awlsring/cdk8s-valheim.ResourceLimitsProps.property.memory"></a>

```typescript
public readonly memory: MemoryResources;
```

- *Type:* cdk8s-plus-26.MemoryResources
- *Default:* = 4Gi

The memory resources to allocate to the container.

> [https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory)

---

### SecurityProps <a name="SecurityProps" id="@awlsring/cdk8s-valheim.SecurityProps"></a>

Props for configuring security aspects of the container.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.SecurityProps.Initializer"></a>

```typescript
import { SecurityProps } from '@awlsring/cdk8s-valheim'

const securityProps: SecurityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.SecurityProps.property.allowPrivilegeEscalation">allowPrivilegeEscalation</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.SecurityProps.property.group">group</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.SecurityProps.property.privileged">privileged</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.SecurityProps.property.readOnlyRootFilesystem">readOnlyRootFilesystem</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.SecurityProps.property.user">user</a></code> | <code>number</code> | *No description.* |

---

##### `allowPrivilegeEscalation`<sup>Optional</sup> <a name="allowPrivilegeEscalation" id="@awlsring/cdk8s-valheim.SecurityProps.property.allowPrivilegeEscalation"></a>

```typescript
public readonly allowPrivilegeEscalation: boolean;
```

- *Type:* boolean

---

##### `group`<sup>Optional</sup> <a name="group" id="@awlsring/cdk8s-valheim.SecurityProps.property.group"></a>

```typescript
public readonly group: number;
```

- *Type:* number

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="@awlsring/cdk8s-valheim.SecurityProps.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- *Type:* boolean

---

##### `readOnlyRootFilesystem`<sup>Optional</sup> <a name="readOnlyRootFilesystem" id="@awlsring/cdk8s-valheim.SecurityProps.property.readOnlyRootFilesystem"></a>

```typescript
public readonly readOnlyRootFilesystem: boolean;
```

- *Type:* boolean

---

##### `user`<sup>Optional</sup> <a name="user" id="@awlsring/cdk8s-valheim.SecurityProps.property.user"></a>

```typescript
public readonly user: number;
```

- *Type:* number

---

### ServerProps <a name="ServerProps" id="@awlsring/cdk8s-valheim.ServerProps"></a>

Props for configuring a Valheim server.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.ServerProps.Initializer"></a>

```typescript
import { ServerProps } from '@awlsring/cdk8s-valheim'

const serverProps: ServerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.adminList">adminList</a></code> | <code>string[]</code> | Space separated list of admin SteamIDs in SteamID64 format. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.allowList">allowList</a></code> | <code>string[]</code> | Space separated list of allowed SteamIDs in SteamID64 format. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.blockList">blockList</a></code> | <code>string[]</code> | Space separated list of banned SteamIDs in SteamID64 format. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.crossplay">crossplay</a></code> | <code>boolean</code> | Should enable crossplay. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.idleDatagramMaxCount">idleDatagramMaxCount</a></code> | <code>number</code> | The number of incoming UDP datagrams the container should tolerate (including useless datagrams such as mDNS, as well as useful datagrams like queries against the UDP query port and active connections by players) on non-public servers before deciding that the server is not idle. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.idleDatagramWindow">idleDatagramWindow</a></code> | <code>number</code> | The time window, in seconds, to wait for incoming UDP datagrams on non-public servers before determining if the server is idle. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.launchArgs">launchArgs</a></code> | <code>string</code> | Arguments to pass to the server on start. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.name">name</a></code> | <code>string</code> | The name of the server. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.password">password</a></code> | <code><a href="#@awlsring/cdk8s-valheim.PasswordProps">PasswordProps</a></code> | The server password. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.port">port</a></code> | <code>number</code> | The port the server runs on. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.public">public</a></code> | <code>boolean</code> | If the server is public. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.publicBeta">publicBeta</a></code> | <code>boolean</code> | If the beta server branch should be used. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.restartCron">restartCron</a></code> | <code>string</code> | The server restart schedule. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.restartIfIdle">restartIfIdle</a></code> | <code>boolean</code> | Only restart the server if no players are connected to the server (true or false). |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.serviceType">serviceType</a></code> | <code>cdk8s-plus-26.ServiceType</code> | The service type in the cluster to expose the server on. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.steamCmdArgs">steamCmdArgs</a></code> | <code>string</code> | The arguments to pass to the steamcmd command. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.timezone">timezone</a></code> | <code>string</code> | The container timezone. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.updateCron">updateCron</a></code> | <code>string</code> | The server update schedule. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.updateWhenIdle">updateWhenIdle</a></code> | <code>boolean</code> | Only run update check if no players are connected to the server (true or false). |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.valheimPlus">valheimPlus</a></code> | <code><a href="#@awlsring/cdk8s-valheim.ValheimPlusProps">ValheimPlusProps</a></code> | Properties for ValheimPlus. |
| <code><a href="#@awlsring/cdk8s-valheim.ServerProps.property.worldName">worldName</a></code> | <code>string</code> | The world name. |

---

##### `adminList`<sup>Optional</sup> <a name="adminList" id="@awlsring/cdk8s-valheim.ServerProps.property.adminList"></a>

```typescript
public readonly adminList: string[];
```

- *Type:* string[]

Space separated list of admin SteamIDs in SteamID64 format.

Overrides any existing adminlist.txt entries!

---

##### `allowList`<sup>Optional</sup> <a name="allowList" id="@awlsring/cdk8s-valheim.ServerProps.property.allowList"></a>

```typescript
public readonly allowList: string[];
```

- *Type:* string[]

Space separated list of allowed SteamIDs in SteamID64 format.

Overrides any existing permittedlist.txt entries!

---

##### `blockList`<sup>Optional</sup> <a name="blockList" id="@awlsring/cdk8s-valheim.ServerProps.property.blockList"></a>

```typescript
public readonly blockList: string[];
```

- *Type:* string[]

Space separated list of banned SteamIDs in SteamID64 format.

Overrides any existing banlist.txt entries!

---

##### `crossplay`<sup>Optional</sup> <a name="crossplay" id="@awlsring/cdk8s-valheim.ServerProps.property.crossplay"></a>

```typescript
public readonly crossplay: boolean;
```

- *Type:* boolean

Should enable crossplay.

---

##### `idleDatagramMaxCount`<sup>Optional</sup> <a name="idleDatagramMaxCount" id="@awlsring/cdk8s-valheim.ServerProps.property.idleDatagramMaxCount"></a>

```typescript
public readonly idleDatagramMaxCount: number;
```

- *Type:* number

The number of incoming UDP datagrams the container should tolerate (including useless datagrams such as mDNS, as well as useful datagrams like queries against the UDP query port and active connections by players) on non-public servers before deciding that the server is not idle.

---

##### `idleDatagramWindow`<sup>Optional</sup> <a name="idleDatagramWindow" id="@awlsring/cdk8s-valheim.ServerProps.property.idleDatagramWindow"></a>

```typescript
public readonly idleDatagramWindow: number;
```

- *Type:* number

The time window, in seconds, to wait for incoming UDP datagrams on non-public servers before determining if the server is idle.

---

##### `launchArgs`<sup>Optional</sup> <a name="launchArgs" id="@awlsring/cdk8s-valheim.ServerProps.property.launchArgs"></a>

```typescript
public readonly launchArgs: string;
```

- *Type:* string

Arguments to pass to the server on start.

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdk8s-valheim.ServerProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* "My Server"

The name of the server.

---

##### `password`<sup>Optional</sup> <a name="password" id="@awlsring/cdk8s-valheim.ServerProps.property.password"></a>

```typescript
public readonly password: PasswordProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.PasswordProps">PasswordProps</a>

The server password.

---

##### `port`<sup>Optional</sup> <a name="port" id="@awlsring/cdk8s-valheim.ServerProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number
- *Default:* 2456

The port the server runs on.

This and the port + 1 must be open on the host
The specified port is used for game conncections, and the increment port is
used for the server query

---

##### `public`<sup>Optional</sup> <a name="public" id="@awlsring/cdk8s-valheim.ServerProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean
- *Default:* true

If the server is public.

---

##### `publicBeta`<sup>Optional</sup> <a name="publicBeta" id="@awlsring/cdk8s-valheim.ServerProps.property.publicBeta"></a>

```typescript
public readonly publicBeta: boolean;
```

- *Type:* boolean

If the beta server branch should be used.

---

##### `restartCron`<sup>Optional</sup> <a name="restartCron" id="@awlsring/cdk8s-valheim.ServerProps.property.restartCron"></a>

```typescript
public readonly restartCron: string;
```

- *Type:* string
- *Default:* "0 5 * * *"

The server restart schedule.

---

##### `restartIfIdle`<sup>Optional</sup> <a name="restartIfIdle" id="@awlsring/cdk8s-valheim.ServerProps.property.restartIfIdle"></a>

```typescript
public readonly restartIfIdle: boolean;
```

- *Type:* boolean
- *Default:* true

Only restart the server if no players are connected to the server (true or false).

---

##### `serviceType`<sup>Optional</sup> <a name="serviceType" id="@awlsring/cdk8s-valheim.ServerProps.property.serviceType"></a>

```typescript
public readonly serviceType: ServiceType;
```

- *Type:* cdk8s-plus-26.ServiceType
- *Default:* ServiceType.LOAD_BALANCER

The service type in the cluster to expose the server on.

---

##### `steamCmdArgs`<sup>Optional</sup> <a name="steamCmdArgs" id="@awlsring/cdk8s-valheim.ServerProps.property.steamCmdArgs"></a>

```typescript
public readonly steamCmdArgs: string;
```

- *Type:* string

The arguments to pass to the steamcmd command.

---

##### `timezone`<sup>Optional</sup> <a name="timezone" id="@awlsring/cdk8s-valheim.ServerProps.property.timezone"></a>

```typescript
public readonly timezone: string;
```

- *Type:* string
- *Default:* "Etc/UTC

The container timezone.

---

##### `updateCron`<sup>Optional</sup> <a name="updateCron" id="@awlsring/cdk8s-valheim.ServerProps.property.updateCron"></a>

```typescript
public readonly updateCron: string;
```

- *Type:* string
- *Default:* "*\/15 * * * *"

The server update schedule.

---

##### `updateWhenIdle`<sup>Optional</sup> <a name="updateWhenIdle" id="@awlsring/cdk8s-valheim.ServerProps.property.updateWhenIdle"></a>

```typescript
public readonly updateWhenIdle: boolean;
```

- *Type:* boolean
- *Default:* true

Only run update check if no players are connected to the server (true or false).

---

##### `valheimPlus`<sup>Optional</sup> <a name="valheimPlus" id="@awlsring/cdk8s-valheim.ServerProps.property.valheimPlus"></a>

```typescript
public readonly valheimPlus: ValheimPlusProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.ValheimPlusProps">ValheimPlusProps</a>

Properties for ValheimPlus.

---

##### `worldName`<sup>Optional</sup> <a name="worldName" id="@awlsring/cdk8s-valheim.ServerProps.property.worldName"></a>

```typescript
public readonly worldName: string;
```

- *Type:* string
- *Default:* "Dedicated"

The world name.

---

### StatusHttpProps <a name="StatusHttpProps" id="@awlsring/cdk8s-valheim.StatusHttpProps"></a>

Props for configuring the status http server.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.StatusHttpProps.Initializer"></a>

```typescript
import { StatusHttpProps } from '@awlsring/cdk8s-valheim'

const statusHttpProps: StatusHttpProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps.property.enabled">enabled</a></code> | <code>boolean</code> | Should the status http server be enabled. |
| <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps.property.configPath">configPath</a></code> | <code>string</code> | Path to the busybox httpd config. |
| <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps.property.htdocLocation">htdocLocation</a></code> | <code>string</code> | Path to the status httpd htdocs where status.json is written. |
| <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps.property.port">port</a></code> | <code>number</code> | The port the status http server runs on. |
| <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps.property.serviceType">serviceType</a></code> | <code>cdk8s-plus-26.ServiceType</code> | The service type for the status http server. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="@awlsring/cdk8s-valheim.StatusHttpProps.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* false

Should the status http server be enabled.

---

##### `configPath`<sup>Optional</sup> <a name="configPath" id="@awlsring/cdk8s-valheim.StatusHttpProps.property.configPath"></a>

```typescript
public readonly configPath: string;
```

- *Type:* string

Path to the busybox httpd config.

---

##### `htdocLocation`<sup>Optional</sup> <a name="htdocLocation" id="@awlsring/cdk8s-valheim.StatusHttpProps.property.htdocLocation"></a>

```typescript
public readonly htdocLocation: string;
```

- *Type:* string

Path to the status httpd htdocs where status.json is written.

---

##### `port`<sup>Optional</sup> <a name="port" id="@awlsring/cdk8s-valheim.StatusHttpProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number
- *Default:* 80

The port the status http server runs on.

---

##### `serviceType`<sup>Optional</sup> <a name="serviceType" id="@awlsring/cdk8s-valheim.StatusHttpProps.property.serviceType"></a>

```typescript
public readonly serviceType: ServiceType;
```

- *Type:* cdk8s-plus-26.ServiceType
- *Default:* ServiceType.CLUSTER_IP

The service type for the status http server.

---

### SupervisorHttpProps <a name="SupervisorHttpProps" id="@awlsring/cdk8s-valheim.SupervisorHttpProps"></a>

Props for configuring the supervisor.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.Initializer"></a>

```typescript
import { SupervisorHttpProps } from '@awlsring/cdk8s-valheim'

const supervisorHttpProps: SupervisorHttpProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps.property.enabled">enabled</a></code> | <code>boolean</code> | Should the supervisor http server be enabled. |
| <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps.property.password">password</a></code> | <code><a href="#@awlsring/cdk8s-valheim.PasswordProps">PasswordProps</a></code> | The supervisor password. |
| <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps.property.port">port</a></code> | <code>number</code> | The port the supervisor http server runs on. |
| <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps.property.serviceType">serviceType</a></code> | <code>cdk8s-plus-26.ServiceType</code> | The service type for the supervisor http server. |
| <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps.property.username">username</a></code> | <code>string</code> | The supervisor username. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* false

Should the supervisor http server be enabled.

---

##### `password`<sup>Required</sup> <a name="password" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.property.password"></a>

```typescript
public readonly password: PasswordProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.PasswordProps">PasswordProps</a>

The supervisor password.

---

##### `port`<sup>Optional</sup> <a name="port" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number
- *Default:* 9001

The port the supervisor http server runs on.

---

##### `serviceType`<sup>Optional</sup> <a name="serviceType" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.property.serviceType"></a>

```typescript
public readonly serviceType: ServiceType;
```

- *Type:* cdk8s-plus-26.ServiceType
- *Default:* ServiceType.CLUSTER_IP

The service type for the supervisor http server.

---

##### `username`<sup>Optional</sup> <a name="username" id="@awlsring/cdk8s-valheim.SupervisorHttpProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string
- *Default:* admin

The supervisor username.

---

### SysLogProps <a name="SysLogProps" id="@awlsring/cdk8s-valheim.SysLogProps"></a>

Props for configuring syslog.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.SysLogProps.Initializer"></a>

```typescript
import { SysLogProps } from '@awlsring/cdk8s-valheim'

const sysLogProps: SysLogProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.SysLogProps.property.logLocal">logLocal</a></code> | <code>boolean</code> | Should logging be done local. |
| <code><a href="#@awlsring/cdk8s-valheim.SysLogProps.property.remoteHost">remoteHost</a></code> | <code>string</code> | The remote syslog host. |
| <code><a href="#@awlsring/cdk8s-valheim.SysLogProps.property.remotePort">remotePort</a></code> | <code>number</code> | The remote syslog port. |

---

##### `logLocal`<sup>Optional</sup> <a name="logLocal" id="@awlsring/cdk8s-valheim.SysLogProps.property.logLocal"></a>

```typescript
public readonly logLocal: boolean;
```

- *Type:* boolean

Should logging be done local.

---

##### `remoteHost`<sup>Optional</sup> <a name="remoteHost" id="@awlsring/cdk8s-valheim.SysLogProps.property.remoteHost"></a>

```typescript
public readonly remoteHost: string;
```

- *Type:* string

The remote syslog host.

---

##### `remotePort`<sup>Optional</sup> <a name="remotePort" id="@awlsring/cdk8s-valheim.SysLogProps.property.remotePort"></a>

```typescript
public readonly remotePort: number;
```

- *Type:* number
- *Default:* 514

The remote syslog port.

---

### ValheimChartProps <a name="ValheimChartProps" id="@awlsring/cdk8s-valheim.ValheimChartProps"></a>

The props for the chart.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.ValheimChartProps.Initializer"></a>

```typescript
import { ValheimChartProps } from '@awlsring/cdk8s-valheim'

const valheimChartProps: ValheimChartProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.disableResourceNameHashes">disableResourceNameHashes</a></code> | <code>boolean</code> | The autogenerated resource name by default is suffixed with a stable hash of the construct path. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels to apply to all resources in this chart. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.namespace">namespace</a></code> | <code>string</code> | The default namespace for all objects defined in this chart (directly or indirectly). |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.backup">backup</a></code> | <code><a href="#@awlsring/cdk8s-valheim.BackupProps">BackupProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.imageTag">imageTag</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.persistence">persistence</a></code> | <code><a href="#@awlsring/cdk8s-valheim.PersistanceProps">PersistanceProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.resourceLimits">resourceLimits</a></code> | <code><a href="#@awlsring/cdk8s-valheim.ResourceLimitsProps">ResourceLimitsProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.security">security</a></code> | <code><a href="#@awlsring/cdk8s-valheim.SecurityProps">SecurityProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.server">server</a></code> | <code><a href="#@awlsring/cdk8s-valheim.ServerProps">ServerProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.statusHttp">statusHttp</a></code> | <code><a href="#@awlsring/cdk8s-valheim.StatusHttpProps">StatusHttpProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.supervisorHttp">supervisorHttp</a></code> | <code><a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps">SupervisorHttpProps</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimChartProps.property.sysLog">sysLog</a></code> | <code><a href="#@awlsring/cdk8s-valheim.SysLogProps">SysLogProps</a></code> | *No description.* |

---

##### `disableResourceNameHashes`<sup>Optional</sup> <a name="disableResourceNameHashes" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.disableResourceNameHashes"></a>

```typescript
public readonly disableResourceNameHashes: boolean;
```

- *Type:* boolean
- *Default:* false

The autogenerated resource name by default is suffixed with a stable hash of the construct path.

Setting this property to true drops the hash suffix.

---

##### `labels`<sup>Optional</sup> <a name="labels" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no common labels

Labels to apply to all resources in this chart.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* no namespace is synthesized (usually this implies "default")

The default namespace for all objects defined in this chart (directly or indirectly).

This namespace will only apply to objects that don't have a
`namespace` explicitly defined for them.

---

##### `backup`<sup>Optional</sup> <a name="backup" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.backup"></a>

```typescript
public readonly backup: BackupProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.BackupProps">BackupProps</a>

---

##### `imageTag`<sup>Optional</sup> <a name="imageTag" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.imageTag"></a>

```typescript
public readonly imageTag: string;
```

- *Type:* string

---

##### `persistence`<sup>Optional</sup> <a name="persistence" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.persistence"></a>

```typescript
public readonly persistence: PersistanceProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.PersistanceProps">PersistanceProps</a>

---

##### `resourceLimits`<sup>Optional</sup> <a name="resourceLimits" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.resourceLimits"></a>

```typescript
public readonly resourceLimits: ResourceLimitsProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.ResourceLimitsProps">ResourceLimitsProps</a>

---

##### `security`<sup>Optional</sup> <a name="security" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.security"></a>

```typescript
public readonly security: SecurityProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.SecurityProps">SecurityProps</a>

---

##### `server`<sup>Optional</sup> <a name="server" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.server"></a>

```typescript
public readonly server: ServerProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.ServerProps">ServerProps</a>

---

##### `statusHttp`<sup>Optional</sup> <a name="statusHttp" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.statusHttp"></a>

```typescript
public readonly statusHttp: StatusHttpProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.StatusHttpProps">StatusHttpProps</a>

---

##### `supervisorHttp`<sup>Optional</sup> <a name="supervisorHttp" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.supervisorHttp"></a>

```typescript
public readonly supervisorHttp: SupervisorHttpProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.SupervisorHttpProps">SupervisorHttpProps</a>

---

##### `sysLog`<sup>Optional</sup> <a name="sysLog" id="@awlsring/cdk8s-valheim.ValheimChartProps.property.sysLog"></a>

```typescript
public readonly sysLog: SysLogProps;
```

- *Type:* <a href="#@awlsring/cdk8s-valheim.SysLogProps">SysLogProps</a>

---

### ValheimPlusProps <a name="ValheimPlusProps" id="@awlsring/cdk8s-valheim.ValheimPlusProps"></a>

Props for configuring valheim plus.

#### Initializer <a name="Initializer" id="@awlsring/cdk8s-valheim.ValheimPlusProps.Initializer"></a>

```typescript
import { ValheimPlusProps } from '@awlsring/cdk8s-valheim'

const valheimPlusProps: ValheimPlusProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimPlusProps.property.enabled">enabled</a></code> | <code>boolean</code> | Should valheim plus be enabled. |
| <code><a href="#@awlsring/cdk8s-valheim.ValheimPlusProps.property.release">release</a></code> | <code>string</code> | The version of valheim plus to use. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="@awlsring/cdk8s-valheim.ValheimPlusProps.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* false

Should valheim plus be enabled.

---

##### `release`<sup>Optional</sup> <a name="release" id="@awlsring/cdk8s-valheim.ValheimPlusProps.property.release"></a>

```typescript
public readonly release: string;
```

- *Type:* string
- *Default:* latest

The version of valheim plus to use.

---



