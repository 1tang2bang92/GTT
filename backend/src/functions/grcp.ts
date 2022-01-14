import { load } from '@grpc/proto-loader'
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

export async function getServices(name: string) {
  const proto = await getPackageDefinition(name)
  return Object.keys(proto).filter(x => !('type' in proto[x]))
}

export async function getAllServices() {
  const protoFiles = await getProtoList()
  const protos = await Promise.all(protoFiles.map(getServices))
  return protos.flat()
}

export async function getMessages(name: string) {
  const proto = await getPackageDefinition(name)
  return Object.keys(proto).filter(x => 'type' in proto[x])
}

;(async () => {
  const r = await getPackageDefinition('hello.proto')
  console.log(r['helloworld.Greeter'])
})()
