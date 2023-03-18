import { Chart, ChartProps, Size } from 'cdk8s';
import { ContainerPort, Cpu, CpuResources, Deployment, DeploymentStrategy, EnvValue, HostPathVolumeType, MemoryResources, PersistentVolumeAccessMode, PersistentVolumeClaim, PersistentVolumeClaimProps, Protocol, Secret, Service, ServiceType, Volume } from 'cdk8s-plus-26';
import { Construct } from 'constructs';

/**
 * Props for configuring the valheim server backups
 */
export interface BackupProps {
  /**
   * Should backups be enabled
   * @default true
   */
  readonly enabled: boolean;
  /**
   * The cron schedule for the backup job
   * @default 0 * * * *
   */
  readonly scheduleCron?: string;
  /**
   * The directory to store backups
   * @default /config/backups
   */
  readonly directory?: string;
  /**
   * The retention age for backups
   * @default 3
   */
  readonly retentionAge?: number;
  /**
   * The retention count for backups
   * @default unlimited
   */
  readonly maxBackups?: number;
  /**
   * Only backup if server idle
   * @default true
   */
  readonly performIfIdle?: boolean;
  /**
   * The grace period for the server to be idle
   * @default 3600s
   */
  readonly idleGracePeriod?: number;
  /**
   * Should the backups be zipped
   * @default true
   */
  readonly zip?: boolean;
  /**
   * Permission mask for the backup directory
   */
  readonly permissionUmask?: string;
}

/**
 * Props for configuring valheim plus
 */
export interface ValheimPlusProps {
  /**
   * Should valheim plus be enabled
   * @default false
   */
  readonly enabled: boolean;
  /**
   * The version of valheim plus to use
   * @default latest
   */
  readonly release?: string;
}

/**
 * Props for configuring the supervisor
 */
export interface SupervisorHttpProps {
  /**
   * Should the supervisor http server be enabled
   * @default false
   */
  readonly enabled: boolean;
  /**
   * The port the supervisor http server runs on
   * @default 9001
   */
  readonly port?: number;
  /**
   * The supervisor username
   * @default admin
   */
  readonly username?: string;
  /**
   * The supervisor password
   */
  readonly password: PasswordProps;
  /**
   * The service type for the supervisor http server
   * @default ServiceType.CLUSTER_IP
   */
  readonly serviceType?: ServiceType;
}

/**
 * Props for configuring the status http server
 */
export interface StatusHttpProps {
  /**
   * Should the status http server be enabled
   * @default false
   */
  readonly enabled: boolean;
  /**
   * The port the status http server runs on
   * @default 80
   */
  readonly port?: number;
  /**
   * Path to the busybox httpd config
   * @deafult /config/httpd.conf
   */
  readonly configPath?: string;
  /**
   * Path to the status httpd htdocs where status.json is written
   * @deafult /opt/valheim/htdocs
   */
  readonly htdocLocation?: string;
  /**
   * The service type for the status http server
   * @default ServiceType.CLUSTER_IP
   */
  readonly serviceType?: ServiceType;
}

/**
 * Props for configuring syslog
 */
export interface SysLogProps {
  /**
   * The remote syslog host
   */
  readonly remoteHost?: string;
  /**
   * The remote syslog port
   * @default 514
   */
  readonly remotePort?: number;
  /**
   * Should logging be done local
   */
  readonly logLocal?: boolean;
}

/**
 * Password properties. Used to determine if the password should be a raw string in manifest or retrieved from an existing secret
 */
export interface PasswordProps {
  /**
   * The raw password string. Will be visible in manifest. Should not use.
   */
  readonly raw?: string;
  /**
   * The name of the secret to retrieve the password from. The secret should be stored in a key named "password"
   */
  readonly secret?: string;
}

/**
 * Props for configuring a Valheim server
 */
export interface ServerProps {
  /**
   * The port the server runs on. This and the port + 1 must be open on the host
   * The specified port is used for game conncections, and the increment port is
   * used for the server query
   * @default 2456
   */
  readonly port?: number;
  /**
   * The name of the server
   * @default "My Server"
   */
  readonly name?: string;
  /**
   * The world name
   * @default "Dedicated"
   */
  readonly worldName?: string;
  /**
   * The server password
   */
  readonly password?: PasswordProps;
  /**
   * If the server is public
   * @default true
   */
  readonly public?: boolean;
  /**
   * Arguments to pass to the server on start
   */
  readonly launchArgs?: string;
  /**
   * Space separated list of admin SteamIDs in SteamID64 format. Overrides any existing adminlist.txt entries!
   */
  readonly adminList?: string[];
  /**
   * Space separated list of banned SteamIDs in SteamID64 format. Overrides any existing banlist.txt entries!
   */
  readonly blockList?: string[];
  /**
   * Space separated list of allowed SteamIDs in SteamID64 format. Overrides any existing permittedlist.txt entries!
   */
  readonly allowList?: string[];
  /**
   * Should enable crossplay
   */
  readonly crossplay?: boolean;
  /**
   * The server update schedule
   * @default "*\/15 * * * *"
   */
  readonly updateCron?: string;
  /**
   * The time window, in seconds, to wait for incoming UDP datagrams on non-public servers before determining if the server is idle
   */
  readonly idleDatagramWindow?: number;
  /**
   * The number of incoming UDP datagrams the container should tolerate (including useless datagrams such as mDNS, as well as useful datagrams like queries against the UDP query port and active connections by players) on non-public servers before deciding that the server is not idle
   */
  readonly idleDatagramMaxCount?: number;
  /**
   * Only run update check if no players are connected to the server (true or false)
   * @default true
   */
  readonly updateWhenIdle?: boolean;
  /**
   * The server restart schedule
   * @default "0 5 * * *"
   */
  readonly restartCron?: string;
  /**
   * Only restart the server if no players are connected to the server (true or false)
   * @default true
   */
  readonly restartIfIdle?: boolean;
  /**
   * The container timezone
   * @default "Etc/UTC
   */
  readonly timezone?: string;
  /**
   * If the beta server branch should be used
   */
  readonly publicBeta?: boolean;
  /**
   * The service type in the cluster to expose the server on
   * @default ServiceType.LOAD_BALANCER
   */
  readonly serviceType?: ServiceType;
  /**
   * The arguments to pass to the steamcmd command
   */
  readonly steamCmdArgs?: string;
  /**
   * Properties for ValheimPlus
   */
  readonly valheimPlus?: ValheimPlusProps;
}

export interface PersistanceProps {
  /**
   * PVC configuration for server specific files
   */
  readonly server?: PersistentVolumeClaimConfigProps;
  /**
   * PVC configuration for data specific files
   */
  readonly config?: PersistentVolumeClaimConfigProps;
}

/**
 * Props for configuring a persistent volume claim
 * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/
 *
 */
export interface PersistentVolumeClaimConfigProps {
  /**
   * The name of the storage class
   */
  readonly storageClass: string;
  /**
   * The access mode from the volume
   * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes
   * @default = [READ_WRITE_ONCE]
   */
  readonly accessModes?: PersistentVolumeAccessMode[];
  /**
   * The size of the volume
   * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#capacity
   */
  readonly storage?: Size;
}

/**
 * Props for configuring resource limits
 * @see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
*/
export interface ResourceLimitsProps {
  /**
   * The CPU resources to allocate to the container
   * @see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu
   * @default = 2000m
   */
  readonly cpu?: CpuResources;
  /**
   * The memory resources to allocate to the container
   * @see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory
   * @default = 4Gi
   */
  readonly memory?: MemoryResources;
}

/**
 * Props for configuring security aspects of the container
 */
export interface SecurityProps {
  readonly user?: number;
  readonly group?: number;
  readonly privileged?: boolean;
  readonly readOnlyRootFilesystem?: boolean;
  readonly allowPrivilegeEscalation?: boolean;
}

/**
 * The props for the chart
 */
export interface ValheimChartProps extends ChartProps {
  readonly server?: ServerProps;
  readonly persistence?: PersistanceProps;
  readonly imageTag?: string;
  readonly resourceLimits?: ResourceLimitsProps;
  readonly backup?: BackupProps;
  readonly supervisorHttp?: SupervisorHttpProps;
  readonly statusHttp?: StatusHttpProps;
  readonly sysLog?: SysLogProps;
  readonly security?: SecurityProps;
}

/**
 * A chart to deploy a Valheim server
 * Uses the container by @lloesche
 * @see https://github.com/lloesche/valheim-server-docker
 */
export class ValheimChart extends Chart {
  constructor(scope: Construct, name: string, props?: ValheimChartProps) {
    super(scope, name, props);

    const serverVol = this.formServerPersistance(props?.persistence?.server);
    const configVol = this.formConfigPersistance(props?.persistence?.config);

    const ports = this.formPortRecords(props);
    const deployment = new Deployment(this, 'deployment', {
      replicas: 1,
      strategy: DeploymentStrategy.recreate(),
      containers: [
        {
          image: this.formImage(props?.imageTag),
          ports: Object.keys(ports).map((key) => ports[key]),
          envVariables: this.formEnvironment(props),
          volumeMounts: [
            {
              path: '/config',
              volume: configVol,
            },
            {
              path: '/opt/valheim',
              volume: serverVol,
            },
          ],
          securityContext: {
            ensureNonRoot: false,
            readOnlyRootFilesystem: props?.security?.readOnlyRootFilesystem ?? false,
            privileged: props?.security?.privileged,
            allowPrivilegeEscalation: props?.security?.allowPrivilegeEscalation,
            group: props?.security?.group,
            user: props?.security?.user,
          },
          resources: {
            memory: props?.resourceLimits?.memory ?? {
              request: Size.gibibytes(4),
            },
            cpu: props?.resourceLimits?.cpu ?? {
              request: Cpu.millis(2000),
            },
          },
        },
      ],
      volumes: [configVol, serverVol],
    });

    new Service(this, 'service', {
      type: props?.server?.serviceType ?? ServiceType.LOAD_BALANCER,
      selector: deployment,
      ports: [
        {
          name: ports.game.name,
          port: ports.game.number,
          targetPort: ports.game.number,
          protocol: Protocol.UDP,
        },
        {
          name: ports.query.name,
          port: ports.query.number,
          targetPort: ports.query.number,
          protocol: Protocol.UDP,
        },
      ],
    });

    if (props?.supervisorHttp?.enabled) {
      this.formService(deployment, ports.supervisor, props?.supervisorHttp.serviceType);
    }

    if (props?.statusHttp?.enabled) {
      this.formService(deployment, ports.status, props?.statusHttp.serviceType);
    }

  }

  private formImage(tag?: string) {
    return `ghcr.io/lloesche/valheim-server:${tag ?? 'latest'}`;
  }

  private formPortRecords(props?: ValheimChartProps): Record<string, ContainerPort> {
    const gamePort = props?.server?.port ?? 2456;
    const queryPort = gamePort + 1;

    let portRecords: Record<string, ContainerPort> = {
      game: {
        number: gamePort,
        name: 'server',
        protocol: Protocol.UDP,
      },
      query: {
        number: queryPort,
        name: 'query',
        protocol: Protocol.UDP,
      },
    };

    if (props?.supervisorHttp?.enabled) {
      portRecords.supervisor = {
        number: props.supervisorHttp.port ?? 9001,
        name: 'supervisor',
        protocol: Protocol.TCP,
      };
    }

    if (props?.statusHttp?.enabled) {
      portRecords.status = {
        number: props.statusHttp.port ?? 80,
        name: 'status',
        protocol: Protocol.TCP,
      };
    }
    return portRecords;
  }

  private formService(scope: Deployment, port: ContainerPort, type?: ServiceType): Service {
    let name = port.name;
    return new Service(this, `${name}-service`, {
      type: type ?? ServiceType.CLUSTER_IP,
      selector: scope,
      ports: [
        {
          port: port.number,
          targetPort: port.number,
          protocol: port.protocol,
        },
      ],
    });
  }

  private formHostVolume(name: string, path: string): Volume {
    return Volume.fromHostPath(this, `${name}-volume`, path, {
      path: `/data/valheim/${path}`,
      type: HostPathVolumeType.DIRECTORY_OR_CREATE,
    });
  }

  private formPersistanceVolume(name: string, props: PersistentVolumeClaimProps): Volume {
    let pvc = new PersistentVolumeClaim(this, `${name}-pvc`, props);
    return Volume.fromPersistentVolumeClaim(this, `${name}-volume`, pvc);
  }

  private formServerPersistance(props?: PersistentVolumeClaimConfigProps): Volume {
    let volume: Volume;
    if (props) {
      let pvcProps: PersistentVolumeClaimProps = {
        storageClassName: props?.storageClass ?? 'local-path',
        accessModes: props?.accessModes ?? [PersistentVolumeAccessMode.READ_WRITE_ONCE],
        storage: props?.storage ?? Size.gibibytes(10),
      };
      volume = this.formPersistanceVolume('server', pvcProps);
    } else {
      volume = this.formHostVolume('server', 'valheim-server');
    }
    return volume;
  }

  private formConfigPersistance(props?: PersistentVolumeClaimConfigProps): Volume {
    let volume: Volume;
    if (props) {
      let pvcProps: PersistentVolumeClaimProps = {
        storageClassName: props.storageClass,
        accessModes: props?.accessModes ?? [PersistentVolumeAccessMode.READ_WRITE_ONCE],
        storage: props?.storage ?? Size.gibibytes(1),
      };
      volume = this.formPersistanceVolume('config', pvcProps);
    } else {
      volume = this.formHostVolume('config', 'valheim-config');
    }
    return volume;
  }

  private formPasswordEnvValue(name:string, props: PasswordProps) {
    let envValue: EnvValue;
    if (props.secret) {
      const secret = Secret.fromSecretName(this, `${name}-password`, props.secret);
      envValue = EnvValue.fromSecretValue(
        {
          secret: secret,
          key: 'password',
        },
      );
    } else if (props.raw) {
      envValue = EnvValue.fromValue(props.raw);
    } else {
      throw new Error('Invalid password configuration');
    }
    return envValue;
  }

  private formEnvironment(props?: ValheimChartProps): {[name: string]: EnvValue} {
    let env: {[name: string]: EnvValue} = {};

    let launchArgs = '';
    if (props?.server?.launchArgs) {
      launchArgs = props.server.launchArgs;
    }
    if (props?.server?.crossplay) {
      launchArgs += ' -crossplay';
    }
    if (launchArgs !== '') {
      env.SERVER_ARGS = EnvValue.fromValue(launchArgs);
    }

    if (props?.server) {
      if (props.server.port) {
        env.SERVER_PORT = EnvValue.fromValue(props.server.port.toString());
      }
      if (props.server.name) {
        env.SERVER_NAME = EnvValue.fromValue(props.server.name);
      }
      if (props.server.worldName) {
        env.WORLD_NAME = EnvValue.fromValue(props.server.worldName);
      }
      if (props.server.password) {
        env.SERVER_PASS = this.formPasswordEnvValue('server', props.server.password);
      }
      if (props.server.public !== undefined) {
        let isPublic = 'false';
        if (props.server.public) {
          isPublic = 'true';
        }
        env.SERVER_PUBLIC = EnvValue.fromValue(isPublic);
      }
      if (props.server.updateCron) {
        env.UPDATE_CRON = EnvValue.fromValue(props.server.updateCron);
      }
      if (props.server.idleDatagramWindow) {
        env.IDLE_DATAGRAM_WINDOW = EnvValue.fromValue(props.server.idleDatagramWindow.toString());
      }
      if (props.server.idleDatagramMaxCount) {
        env.IDLE_DATAGRAM_MAX_COUNT = EnvValue.fromValue(props.server.idleDatagramMaxCount.toString());
      }
      if (props.server.updateWhenIdle !== undefined) {
        let updateWhenIdle = 'false';
        if (props.server.updateWhenIdle) {
          updateWhenIdle = 'true';
        }
        env.UPDATE_WHEN_IDLE = EnvValue.fromValue(updateWhenIdle);
      }
      if (props.server.restartIfIdle !== undefined) {
        let restartIfIdle = 'false';
        if (props.server.restartIfIdle) {
          restartIfIdle = 'true';
        }
        env.RESTART_IF_IDLE = EnvValue.fromValue(restartIfIdle);
      }
      if (props.server.timezone) {
        env.TZ = EnvValue.fromValue(props.server.timezone);
      }
      if (props.server.adminList) {
        env.ADMINLIST_IDS = EnvValue.fromValue(props.server.adminList.join(' '));
      }
      if (props.server.blockList) {
        env.BANNEDLIST_IDS = EnvValue.fromValue(props.server.blockList.join(' '));
      }
      if (props.server.allowList) {
        env.PERMITTEDLIST_IDS = EnvValue.fromValue(props.server.allowList.join(' '));
      }
      if (props.server.publicBeta !== undefined) {
        let publicBeta = 'false';
        if (props.server.publicBeta) {
          publicBeta = 'true';
        }
        env.PUBLIC_BETA = EnvValue.fromValue(publicBeta);
      }
      if (props.server.steamCmdArgs) {
        env.STEAMCMD_ARGS = EnvValue.fromValue(props.server.steamCmdArgs);
      }

      if (props.server.valheimPlus) {
        if (props.server.valheimPlus.enabled !== undefined) {
          let valheimPlusEnabled = 'false';
          if (props.server.valheimPlus.enabled) {
            valheimPlusEnabled = 'true';
          }
          env.VALHEIM_PLUS = EnvValue.fromValue(valheimPlusEnabled);
        }
        if (props.server.valheimPlus.release) {
          env.VALHEIM_PLUS_RELEASE = EnvValue.fromValue(props.server.valheimPlus.release);
        }
      }
    }

    if (props?.backup) {
      if (props.backup.enabled !== undefined) {
        let doBackups = 'false';
        if (props.backup.enabled) {
          doBackups = 'true';
        }
        env.BACKUPS_ENABLED = EnvValue.fromValue(doBackups);
      }
      if (props.backup.scheduleCron) {
        env.BACKUPS_CRON = EnvValue.fromValue(props.backup.scheduleCron);
      }
      if (props.backup.directory) {
        env.BACKUPS_DIRECTORY = EnvValue.fromValue(props.backup.directory);
      }
      if (props.backup.retentionAge) {
        env.BACKUPS_MAX_AGE = EnvValue.fromValue(props.backup.retentionAge.toString());
      }
      if (props.backup.maxBackups) {
        env.BACKUPS_MAX_COUNT = EnvValue.fromValue(props.backup.maxBackups.toString());
      }
      if (props.backup.performIfIdle) {
        env.BACKUPS_IF_IDLE = EnvValue.fromValue(props.backup.performIfIdle.toString());
      }
      if (props.backup.idleGracePeriod) {
        env.BACKUPS_IDLE_GRACE_PERIOD = EnvValue.fromValue(props.backup.idleGracePeriod.toString());
      }
      if (props.backup.zip !== undefined) {
        let zipBackups = 'false';
        if (props.backup.zip) {
          zipBackups = 'true';
        }
        env.BACKUPS_ZIP = EnvValue.fromValue(zipBackups);
      }
      if (props.backup.permissionUmask) {
        env.PERMISSIONS_UMASK = EnvValue.fromValue(props.backup.permissionUmask.toString());
      }
    }

    if (props?.supervisorHttp) {
      if (props.supervisorHttp.enabled !== undefined) {
        let supervisorHttpEnabled = 'false';
        if (props.supervisorHttp.enabled) {
          supervisorHttpEnabled = 'true';
        }
        env.SUPERVISOR_HTTP = EnvValue.fromValue(supervisorHttpEnabled);
      }
      if (props.supervisorHttp.port) {
        env.SUPERVISOR_HTTP_PORT = EnvValue.fromValue(props.supervisorHttp.port.toString());
      }
      if (props.supervisorHttp.username) {
        env.SUPERVISOR_HTTP_USER = EnvValue.fromValue(props.supervisorHttp.username);
      }
      if (props.supervisorHttp.password) {
        env.SUPERVISOR_HTTP_PASS = this.formPasswordEnvValue('supervisor', props.supervisorHttp.password);;
      }
    }

    if (props?.statusHttp) {
      if (props.statusHttp.enabled !== undefined) {
        let statusHttpEnabled = 'false';
        if (props.statusHttp.enabled) {
          statusHttpEnabled = 'true';
        }
        env.STATUS_HTTP = EnvValue.fromValue(statusHttpEnabled);
      }
      if (props.statusHttp.port) {
        env.STATUS_HTTP_PORT = EnvValue.fromValue(props.statusHttp.port.toString());
      }
      if (props.statusHttp.configPath) {
        env.STATUS_HTTP_CONF = EnvValue.fromValue(props.statusHttp.configPath);
      }
      if (props.statusHttp.htdocLocation) {
        env.STATUS_HTTP_HTDOCS = EnvValue.fromValue(props.statusHttp.htdocLocation);
      }
    }

    if (props?.sysLog) {
      if (props.sysLog.remoteHost) {
        env.SYSLOG_HOST = EnvValue.fromValue(props.sysLog.remoteHost);
      }
      if (props.sysLog.remotePort) {
        env.SYSLOG_PORT = EnvValue.fromValue(props.sysLog.remotePort.toString());
      }
      if (props.sysLog.logLocal !== undefined) {
        let logLocal = 'false';
        if (props.sysLog.logLocal) {
          logLocal = 'true';
        }
        env.SYSLOG_LOCAL = EnvValue.fromValue(logLocal);
      }
    }

    if (props?.security?.user) {
      env.PGID = EnvValue.fromValue(props.security?.user.toString());
    }
    if (props?.security?.group) {
      env.PUID = EnvValue.fromValue(props.security?.group.toString());
    }

    return env;
  }
}