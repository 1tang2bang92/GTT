import { loadPackageDefinition } from '@grpc/grpc-js'
import { AnyDefinition, load, PackageDefinition } from '@grpc/proto-loader'
import * as fs from 'fs/promises'
import * as path from 'path'

function removeDuplicates<T>(arr: T[]) {
  // return arr.filter((x, i) => arr.indexOf(x) === i)
  return Array.from(new Set(arr))
}

export async function getProtoFileList() {
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

export function getGrpcObject(pd: PackageDefinition) {
  return loadPackageDefinition(pd)
}

export function isPackage(ad: AnyDefinition) {
  // return 'type' in ad
}

export function isMessage(ad: AnyDefinition) {
  // return 'type' in ad
  return !!ad.type
}

export function isService(ad: AnyDefinition) {
  // return !('type' in ad)
  return !ad.type
}
export function getPackageNames(pd: PackageDefinition) {
  const packageNames = Object.keys(pd).map(x =>
    x.split('.').slice(0, -1).join('.')
  )
  return removeDuplicates(packageNames)
}

export async function getAllPackageNames() {
  const protoFiles = await getProtoFileList()
  const protos = (await Promise.all(protoFiles.map(getPackageDefinition))).map(
    getPackageNames
  )
  return removeDuplicates(protos.flat())
}

export function getServiceNames(pd: PackageDefinition) {
  return Object.entries(pd)
    .filter(([_, v]) => isService(v))
    .map(([k, _]) => k.split('.').pop()!!)
}

export function getServices(pd: PackageDefinition) {
  return Object.entries(pd)
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
  const protoFiles = await getProtoFileList()
  const protos = (await Promise.all(protoFiles.map(getPackageDefinition))).map(
    getServiceNames
  )
  return protos.flat()
}

export function getMessageNames(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([_, v]) => isMessage(v))
    .map(([k, _]) => k)
}

export function getMessages(proto: PackageDefinition) {
  return Object.entries(proto)
    .filter(([k, v]) => isMessage(v))
    .reduce<Record<string, AnyDefinition>>((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
}
