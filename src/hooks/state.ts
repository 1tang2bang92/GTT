export class Atom<T> {
  name: string
  
  constructor({ name, defaultValue}: { name: string; defaultValue: T }) {
    this.name = name
  }
}
