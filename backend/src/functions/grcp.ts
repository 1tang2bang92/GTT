import { AnyDefinition, load, PackageDefinition } from '@grpc/proto-loader'
import * as fs from 'fs/promises'
import * as path from 'path'

export async function getProtoList() {
  const fileList = await fs.readdir(`proto`)
  return fileList.filter(x => x.endsWith('.proto'))
}

export async function readProtoFile(name: string) {
  const filePath = path.resolve(`proto/${name}`)
  const data = await fs.readFile(filePath, {
    encoding: 'utf8',
  })
  return data
}

export async function getPackageDefinition(name: string) {
  const filePath = path.resolve(`proto/${name}`)
  return await load(filePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
}

export function isMessage(v: AnyDefinition) {
  return 'type' in v
}

export function isService(v: AnyDefinition) {
  return !('type' in v)
}

export async function getServiceNames(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([_, v]) => isService(v))
    .map(([k, _]) => k)
}

export async function getServices(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([k, v]) => isService(v))
    .reduce<Record<string, AnyDefinition>>((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
  // .reduce<(AnyDefinition)[]>((acc, [k, v]) => {
  //   acc.push(v)
  //   return acc
  // }, [])
}

export async function getAllServiceNames() {
  const protoFiles = await getProtoList()
  const protos = await Promise.all(
    (
      await Promise.all(protoFiles.map(getPackageDefinition))
    ).map(getServiceNames)
  )
  return protos.flat()
}

export async function getMessageNames(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([_, v]) => isMessage(v))
    .map(([k, _]) => k)
}

export async function getMessages(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([k, v]) => isMessage(v))
    .reduce<Record<string, AnyDefinition>>((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
}

;(async () => {
  const r = (await getPackageDefinition('hello.proto')) as any
  console.log(r['helloworld.Greeter']['Hello']['requestType']['type']['field'])
})()
