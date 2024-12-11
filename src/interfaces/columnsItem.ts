import type ITask from '@/interfaces/task'
export default interface IColumnsItem {
  id: number | string,
  columnTitle: string,
  tasks: ITask[]
}