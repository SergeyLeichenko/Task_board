<template>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header__title">
          <label
            class="form-label text-primary change-btn"
            @click="editField('title')"
          >Змінити назву</label>
          <h1
            v-if="!inputTitleTask"
            class="modal-title fs-5 title-task text-center"
          >
            {{ taskTitle }}</h1>

          <div
            class="mb-3 title-task"
            v-else
          >
            <input
              type="text"
              class="form-control fs-5 text-center"
              placeholder="Введіть заголовок тут..."
              v-model="form.title"
            />
          </div>

          <p class="modal-title fs-6">Статус: <strong>{{ props.task_info.status }}</strong></p>
        </div>
        <button
          type="button"
          class="btn-close mb-4"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form>

          <!-- Опис -->
          <div class="mb-3">
            <label
              class="form-label text-primary change-btn"
              @click="editField('description')"
            >Змінити опис</label>
            <p
              v-if="!inputDescTask"
              class="modal-title"
            >
              {{ taskDescription }}</p>
            <div
              class="mb-3"
              v-else
            >
              <textarea
                class="form-control"
                rows="5"
                cols="33"
                placeholder="Введіть опис тут..."
                id="descInput"
                v-model="form.description"
              />
            </div>
          </div>

          <!-- Відповідальна особа -->
          <div class="mb-3">
            <label
              class="form-label text-primary change-btn"
              @click="editField('person')"
            >Змінити відповідальну особа</label>
            <p
              v-if="!selectPersonTask"
              class="modal-title title-task"
            >
              {{ taskPerson }}</p>
            <select
              v-else
              class="form-select"
              v-model="form.person"
            >
              <option
                v-for="person in persones"
                :key="person.id"
                :value=person.name
              >
                {{ person.name }}</option>
            </select>
          </div>

          <!-- Виконавці -->
          <div class="mb-3">
            <label
              class="form-label text-primary change-btn"
              @click="editField('employees')"
            >Змінити виконавців</label>
            <p
              v-if="!selectEmployeesTask"
              class="modal-title title-task"
            >
              {{ taskEmployees }}</p>
            <select
              v-else
              class="form-select"
              multiple
              v-model="form.employee"
            >
              <option
                v-for="employee in employees"
                :key="employee.id"
                :value=employee.name
              >
                {{ employee.name }}</option>
            </select>
          </div>

          <!-- Статус -->
          <div class="mb-3">
            <label
              class="form-label text-primary change-btn"
              @click="editField('status')"
            >Змінити статус</label>
            <p
              v-if="!selectStatusTask"
              class="modal-title title-task"
            >
              {{ taskStatus }}</p>
            <select
              v-else
              class="form-select"
              v-model="form.status"
            >
              <option
                v-for="status in statuses"
                :key="status.id"
                :value=status.name
              >
                {{ status.name }}</option>
            </select>
          </div>

          <!-- Приорітет -->
          <div class="mb-3">
            <label
              class="form-label text-primary change-btn"
              @click="editField('prioriti')"
            >Змінити приорітет</label>
            <p
              v-if="!selectPrioritiTask"
              class="modal-title title-task"
            >
              {{ taskPrioriti }}</p>
            <select
              v-else
              class="form-select"
              v-model="form.prioriti"
            >
              <option
                v-for="prioriti in priorities"
                :key="prioriti.id"
                :value=prioriti.name
              >
                {{ prioriti.name }}</option>
            </select>
          </div>

          <div class="mb-3 d-flex justify-content-between">
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click.prevent="submitFormInfoTask"
            >
              Редагувати
            </button>

            <button
              type="submit"
              class="btn btn-warning"
              @click="removeTask(props.task_info.id)"
            >
              Видалити
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import type ITask from "@/interfaces/task"

const props = defineProps({
  task_info: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['sendFormInfoTask', 'removeTask'])

const inputTitleTask = ref<boolean>(false)
const inputDescTask = ref<boolean>(false)
const selectPersonTask = ref<boolean>(false)
const selectEmployeesTask = ref<boolean>(false)
const selectStatusTask = ref<boolean>(false)
const selectPrioritiTask = ref<boolean>(false)

const persones = reactive([
  { id: 1, name: 'person-1' },
  { id: 2, name: 'person-2' },
  { id: 3, name: 'person-3' }
])
const employees = reactive([
  { id: 1, name: 'employee-1' },
  { id: 2, name: 'employee-2' },
  { id: 3, name: 'employee-3' }
])
const statuses = reactive([
  { id: 1, name: 'ToDo' },
  { id: 2, name: 'In progress' },
  { id: 3, name: 'Done' }
])
const priorities = reactive([
  { id: 1, name: 'Нормальний' },
  { id: 2, name: 'Важливий' },
  { id: 3, name: 'Срочний' }
])

const form = reactive<ITask>({
  id: '',
  title: '',
  column: '',
  description: '',
  person: '',
  employee: [],
  status: '',
  prioriti: ''
})

const taskTitle = computed(() => {
  return form.title === '' ? props.task_info.title : form.title
})
const taskDescription = computed(() => {
  return form.description === '' ? props.task_info.description : form.description
})
const taskPerson = computed(() => {
  return form.person === '' ? props.task_info.person : form.person
})
const taskEmployees = computed(() => {
  return !form.employee ? props.task_info.employee : form.employee
})
const taskStatus = computed(() => {
  return form.status === '' ? props.task_info.status : form.status
})
const taskPrioriti = computed(() => {
  return form.prioriti === '' ? props.task_info.prioriti : form.prioriti
})

const submitFormInfoTask = () => {
  form.id = props.task_info.id
  form.column = props.task_info.column
  emit('sendFormInfoTask', form)
}

const removeTask = (id: string) => {
  emit('removeTask', id)
}

const editField = (str: string) => {
  switch (str) {
    case 'title':
      inputTitleTask.value = true
      form.title = props.task_info.title
      break
    case 'description':
      inputDescTask.value = true
      form.description = props.task_info.description
      break
    case 'person':
      selectPersonTask.value = true
      form.person = props.task_info.person
      break
    case 'employees':
      selectEmployeesTask.value = true
      form.employee = props.task_info.employees
      break
    case 'status':
      selectStatusTask.value = true
      form.status = props.task_info.status
      break
    case 'prioriti':
      selectPrioritiTask.value = true
      form.prioriti = props.task_info.prioriti
      break
  }
}

watch(() => form.title, (newTitle) => {
  if (props.task_info.title !== newTitle) {
    form.title = newTitle
  }
}, {
  immediate: true
})
</script>

<style lang="css" scoped>
.modal-header__title {
  width: 80%;
  cursor: pointer;
}

.edit-text {
  cursor: pointer;
}

.change-btn {
  cursor: pointer;
}
</style>
