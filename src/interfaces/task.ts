export default interface ITask {
  id: number | string
  title: string
  column: string
  description?: string
  person?: string
  employee?: []
  status?: string
  prioriti?: string
}