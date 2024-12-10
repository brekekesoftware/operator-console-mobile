export type LoginParams = {
  hostname?: string
  port?: string
  tenant?: string
  username?: string
  password?: string
  pbxDirectoryName?: string
}

export type OptionsInitSystem = {
  onInitSuccessFunction?: (extensions: Array<any>) => void
  onInitFailFunction?: (err: any) => void
} & LoginParams
