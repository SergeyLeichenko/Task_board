import { defineStore } from 'pinia'
import type IColumnsItem from '@/interfaces/columnsItem'
import type ITask from '@/interfaces/task'
import uniqid from 'uniqid'

export const useCreateColumnStore = defineStore('createColumnStore', {
  state: () => ({
    columns: [
      {
        id: uniqid(),
        columnTitle: 'ToDo',
        tasks: [] as ITask[],
      } as IColumnsItem,
    ],
  }),
  actions: {
    saveInLocalStorage(str: string) {
      localStorage.setItem(str, JSON.stringify(this.$state.columns))
    },

    addColumn(object: IColumnsItem) {
      this.$state.columns.push(object)
      this.saveInLocalStorage('columns')
    },

    addTask(object: ITask) {
      this.$state.columns.forEach((item) => {
        if (item.columnTitle === object.column) {
          item.tasks.push(object)
        }
      })
      this.saveInLocalStorage('tasks')
    },

    addFullInfoTask(info: ITask) {
      this.$state.columns.forEach((item) => {
        item.tasks.forEach((el) => {
          if (el.id === info.id) {
            const fullInfo = Object.assign(el, info)
            el = fullInfo
          }
        })
      })
      this.saveInLocalStorage('tasks')
    },

    removeTask(id: string) {
      this.$state.columns.forEach((item) => {
        const result = item.tasks.filter((elem) => elem.id !== id)
        item.tasks = result

        this.saveInLocalStorage('tasks')
      })
    },
  },
})
