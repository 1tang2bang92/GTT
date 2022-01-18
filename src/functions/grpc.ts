import { AnyDefinition, MethodDefinition, PackageDefinition } from '@grpc/proto-loader'

function removeDuplicates<T>(arr: T[]) {
  // return arr.filter((x, i) => arr.indexOf(x) === i)
  return Array.from(new Set(arr))
}

export function isMessage(any: AnyDefinition | [string, AnyDefinition]) {
  if (Array.isArray(any)) {
    return !!any[1].type
  }
  return !!any.type
}

export function isService(any: AnyDefinition | [string, AnyDefinition]) {
  if (Array.isArray(any)) {
    return !any[1].type
  }
  return !any.type
}

export function getAnyDefinitions(pd: PackageDefinition) {
  return Object.entries(pd).map<[string, AnyDefinition]>(([k, v]) => [
    k.split('.').pop()!!,
    v,
  ])
}

export function getPackageNames(pd: PackageDefinition) {
  const packageNames = Object.keys(pd).map(x =>
    x.split('.').slice(0, -1).join('.')
  )
  return removeDuplicates(packageNames)
}

export const getAllPackageNames = (pds: PackageDefinition[]) => {
  const protos = pds.map(getPackageNames)
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
    .map<[string, AnyDefinition]>(([k, v]) => [k.split('.').pop()!!, v])
  // .map(([k, v]) => v)
  // .reduce<Record<string, AnyDefinition>>((acc, [k, v]) => {
  //   acc[k] = v
  //   return acc
  // }, {})
}

export const filterPackageDefinitionByPackageName = (
  pds: PackageDefinition[],
  name: string
) => {
  return pds.filter(x => getPackageNames(x).includes(name))
  // const result: Record<string, AnyDefinition> = {}
  // for (const pd of pds.filter(x => getPackageNames(x).includes(name))) {
  //   Object.entries(pd).forEach(([k, v]) => {
  //     if (!result[k]) result[k] = v
  //     result[k] = { ...result[k], ...v }
  //   })
  // }
  // return result
}

export function getAnyDefinitionsByPackageName(
  pds: PackageDefinition[],
  name: string
) {
  const result: [string, AnyDefinition][] = []
  for (const pd of filterPackageDefinitionByPackageName(pds, name)) {
    result.push(...getAnyDefinitions(pd))
  }
  return result
}

export function getServicesByPackageName(
  pds: PackageDefinition[],
  name: string
) {
  const result: [string, AnyDefinition][] = []
  for (const pd of filterPackageDefinitionByPackageName(pds, name)) {
    result.push(...getServices(pd))
  }
  return result
}

export function getMethods(any: AnyDefinition | [string, AnyDefinition]) {
  const ad = Array.isArray(any) ? any[1] : any;

  if (ad.type) return []

  return Object.entries(ad) as [string, MethodDefinition<object, object>][]
}
