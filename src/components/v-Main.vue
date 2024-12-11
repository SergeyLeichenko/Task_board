<template>
  <div class="main">
    <Header @open-create-column="openCreateColumn" />

    <div
      class="container mt-4 d-flex justify-content-center"
      v-if="hideInputNewColumn"
    >
      <div class="add-new-column d-flex">
        <input
          type="text"
          placeholder="add title column"
          class="form-control"
          v-model="addNewColumn"
        />
        <span class="close text-black fs-6" @click="closeInputNewColumn">X</span>
        <button
          type="button"
          class="btn btn-primary add-new-column__btn"
          @click="createColumn"
        >{{ btnCreateColumn }}</button>
      </div>
    </div>

    <CardList />

  </div>
</template>

<script setup lang="ts">
import Header from './base/v-Header.vue'
import CardList from './card/v-CardList.vue'
import { ref, computed } from 'vue'
import { useCreateColumnStore } from "@/stores/createColumn";
import type IColumnsItem from '@/interfaces/columnsItem'
import uniqid from 'uniqid'

const columnStore = useCreateColumnStore()

const hideInputNewColumn = ref<boolean>(false)
const addNewColumn = ref<string>('')

const openCreateColumn = () => hideInputNewColumn.value = true

// button for create new column
const btnCreateColumn = computed(() => {
  return addNewColumn.value === '' ? 'Закрити' : 'Додати'
})

// close input form for adding new column
const closeInputNewColumn = () => {
  hideInputNewColumn.value = false
  addNewColumn.value = ''
}

// create new column and add to store
const createColumn = () => {
  if (addNewColumn.value === '') {
    hideInputNewColumn.value = false
  } else {
    const columnObj: IColumnsItem = {
      id: uniqid(),
      columnTitle: addNewColumn.value,
      tasks: []
    }

    columnStore.addColumn(columnObj)
    hideInputNewColumn.value = false
    addNewColumn.value = ''
  }
}

</script>

<style scoped>
.main {
  background: url('./../assets/images/bg.jpg') no-repeat center / cover;
  height: 100vh;
}

.add-new-column {
  width: 400px;
  position: relative;
}

.add-new-column__btn {
  margin-left: 5px;
  width: 100px;
}
.close {
  position: absolute;
  top: 7px;
  right: 97px;
  cursor: pointer;
}
</style>
