export interface Medicine {
  id: number,
  name: string,
  addToCabinet: boolean,
  note? : string,
  effectiveness? : number,
  effects? : number
}