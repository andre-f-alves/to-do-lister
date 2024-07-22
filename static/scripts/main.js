const menuButton = document.getElementById('menu-button')
const newFileButton = document.getElementById('new-file-button')
const fileNameDialog = document.getElementById('file-name-dialog')
const inputFileName = document.getElementById('file-name')
const submitButton = document.getElementById('submit-button')
const cancelButton = document.getElementById('cancel-button')

function changeSidebarVisibility() {
  const sidebar = document.getElementById('sidebar')

  const icon = this.firstElementChild
  const url = new URL(icon.src)
  const filePath = url.pathname.split('/')

  if (filePath[filePath.length - 1] === 'open-sidebar.svg') {
    filePath[filePath.length - 1] = 'close-sidebar.svg'
    this.title = this.title.replace('Abrir', 'Fechar')

  } else {
    filePath[filePath.length - 1] = 'open-sidebar.svg'
    this.title = this.title.replace('Fechar', 'Abrir')
  }

  url.pathname = filePath.join('/')
  icon.src = url.toString()

  sidebar.classList.toggle('active')
}

function addFile(file) {
  const fileList = document.getElementById('file-list')
  const template = document.getElementById('file-list-item-template')
  const fileListItemTemplate = template.content.querySelector('.file-list-item')

  const fileListItem = document.importNode(fileListItemTemplate, true)
  const fileLink = fileListItem.firstElementChild

  fileLink.textContent = file
  fileLink.title = file

  if (document.getElementById('empty-message')) {
    fileList.removeChild(document.getElementById('empty-message'))
  }

  fileList.appendChild(fileListItem)
}

menuButton.addEventListener('click', function() { changeSidebarVisibility.call(this) })

newFileButton.addEventListener('click', () => fileNameDialog.showModal())

inputFileName.addEventListener('input', function() {
  if (this.value.trim()) {
    submitButton.removeAttribute('disabled')

  } else {
    submitButton.setAttribute('disabled', '')
  }
})

cancelButton.addEventListener('click', () => fileNameDialog.close())

submitButton.addEventListener('click', (event) => {
  event.preventDefault()
  const fileName = inputFileName.value.trim()

  if (!fileName) {
    inputFileName.value = ''
    return
  }

  fileNameDialog.close(fileName)
  inputFileName.value = ''
})

fileNameDialog.addEventListener('close', function() {
  if (this.returnValue) addFile(this.returnValue)
})
