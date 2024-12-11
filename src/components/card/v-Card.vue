<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ props.card_data.columnTitle }}</h5>

      <div class="tasks-block">
        <draggable
          class="list-group"
          :list="props.card_data.tasks"
          group="people"
          @change="log"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <p class="card-title task-title">{{ element.title }}</p>
              <button
                type="button"
                class="task-description"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="$emit('openModalTaskInfo', element)"
              >
                {{ element.description ? element.description : 'Відкрити деталі задачі' }}
              </button>
            </div>
          </template>
        </draggable>

        <button
          type="button"
          class="btn btn-light"
          @click="addNameTask"
          v-show="hideBtnAddCard"
        >
          + Add a card
        </button>

        <div
          class="input-add-tasks"
          v-show="hideInput"
        >
          <input
            type="text"
            v-model="task"
            placeholder="Input your card name..."
            @keyup.enter="addNewTask(props.card_data.columnTitle)"
          />
          <div class="buttons d-flex mt-1">
            <button
              type="button"
              class="btn btn-primary add-new-task"
              @click="addNewTask(props.card_data.columnTitle)"
            >
              Add new task
            </button>
            <button
              type="button"
              class="btn btn-light close"
              @click="closeInput"
            >Close</button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import draggable from 'vuedraggable'
import { useCreateColumnStore } from "@/stores/createColumn"
import type ITask from '@/interfaces/task'
import uniqid from 'uniqid'

const props = defineProps({
  card_data: {
    type: Object,
    required: true
  }
})

const columnStore = useCreateColumnStore()

const task = ref<string>('')
const hideInput = ref<boolean>(false)
const hideBtnAddCard = ref<boolean>(true)

const log = function () {
  props.card_data.tasks.forEach((item: ITask) => {
    if (item.status !== props.card_data.columnTitle) {
      item.status = props.card_data.columnTitle
    }
  })
  localStorage.setItem('tasks', JSON.stringify(columnStore.columns))
}

function addNameTask(): void {
  hideInput.value = true
  hideBtnAddCard.value = false
}

// Function to close input form for adding new task
function closeInput(): void {
  hideInput.value = false
  hideBtnAddCard.value = true
}

// function to adding new task and add to store
function addNewTask(title: string): void {
  if (task.value === '') {
    closeInput()
  } else {
    const taskObj: ITask = {
      id: uniqid(),
      title: task.value,
      column: title,
      status: title
    }

    columnStore.addTask(taskObj)
    task.value = ''
    closeInput()
  }
}

</script>

<style lang="css" scoped>
.card {
  width: 300px;
  height: fit-content;
}

.card-body {
  padding: 0;
}

.card-title {
  padding: 10px 20px;
  background-color: #f0c996;
  text-align: center;
  margin: 0;
}

.tasks-block {
  padding: 10px 20px;
}

.input-add-tasks input {
  padding: 10px 5px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #949494;
  margin-bottom: 10px;
}

.add-new-task {
  margin-right: 20px;
}

.btn-light {
  border: 1px solid #949494;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  padding: 0;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid;
  cursor: move;
}

.task-title {
  background-color: #76767670;
}

.task-description {
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 6px 10px;
  margin-bottom: 0;
  color: #949494;
  text-align: left;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
