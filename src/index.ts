import { stringify, v4 as uuidV4 } from 'uuid'

type task = {id: string, title: string, completed: boolean, createAt: Date}

const log = console.log

const list = document.querySelector('#list') as HTMLUListElement
const form = document.querySelector('#new-task-form') as HTMLFormElement
const input = document.querySelector('#new-task-title') as HTMLInputElement
const tasks: task[] = []
tasks.forEach(addListItem)

form.addEventListener('submit', e => {
  e.preventDefault()
  if(input?.value === '' || input?.value === null) return

  const newTask: task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ''
})

function addListItem(task: task) {
  const item = document.createElement('li')
  item.classList.add('list-item')
  const label = document.createElement('label')
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete'
  const checkBox = document.createElement('input')
  checkBox.type = 'checkbox'

  checkBox.addEventListener('change', () => {
    task.completed = checkBox.checked
    if(task.completed === true){
      item.classList.add('task-completed')
    }else{
      item.classList.remove('task-completed')
    }    
    saveTasks()
  })

  deleteBtn.addEventListener('click', () => {
    item.classList.add('removedItem')
  })

  checkBox.checked = task.completed
  label.append(checkBox, task.title)
  label.append(deleteBtn)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}



// function loadTasks(): task[] {
//   const taskJSON = localStorage.getItem('tasks')
//   if(taskJSON === null) return []
//   return JSON.parse(taskJSON)
// }







