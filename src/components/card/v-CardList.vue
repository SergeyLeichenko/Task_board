<template>
  <div class="d-flex flex-wrap">
    <div
      class="row mx-0 mt-4"
      v-for="column in columnStore.columns"
      :key="column.id"
    >
      <div class="col">
        <Card
        :card_data="column"
        @openModalTaskInfo="modalTaskInfo"
        />
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <Modal :task_info="allInformTask" @sendFormInfoTask="submitFormInfoTask" @removeTask="removeOneTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './v-Card.vue'
import Modal from '../modal/v-Modal.vue'
import { useCreateColumnStore } from "@/stores/createColumn"
import type ITask from "@/interfaces/task"
import { ref, onMounted } from 'vue'

const columnStore = useCreateColumnStore()
const storageColumns = ref<string | null>(localStorage.getItem('columns'))
const storageTasks = ref<string | null>(localStorage.getItem('tasks'))
const allInformTask = ref<ITask>({} as ITask)

const modalTaskInfo = (data: ITask) => {
  allInformTask.value = data
}

const submitFormInfoTask = (data: ITask) => {
  columnStore.addFullInfoTask(data)
}

const removeOneTask = (id: string) => {
  columnStore.removeTask(id)
}

onMounted(() => {
  if (storageTasks.value) {
    columnStore.columns = JSON.parse(storageTasks.value)
  } else if (storageColumns.value) {
    columnStore.columns = JSON.parse(storageColumns.value)
  } else {
    return columnStore
  }
})
</script>

<style lang="css" scoped>
.modal {
  padding-right: 0 !important;
}
</style>