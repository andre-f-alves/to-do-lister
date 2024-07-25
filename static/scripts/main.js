const menuButton = document.getElementById('menu-button')
const newFileButton = document.getElementById('new-file-button')
const fileNameDialog = document.getElementById('file-name-dialog')
const fileNameInput = document.getElementById('file-name-input')
const submitButton = document.getElementById('submit-button')
const cancelButton = document.getElementById('cancel-button')

function toggleSidebarVisibility() {
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
  const fileListItemTemplate = document.getElementById('file-list-item-template')
    .content.querySelector('.file-list-item')

  const fileListItem = document.importNode(fileListItemTemplate, true)
  const fileLink = fileListItem.firstElementChild

  fileLink.textContent = file
  fileLink.title = file

  if (fileList.querySelector('.empty-message')) {
    fileList.removeChild(fileList.querySelector('.empty-message'))
  }

  fileList.appendChild(fileListItem)
}

menuButton.addEventListener('click', function() { toggleSidebarVisibility.call(this) })

newFileButton.addEventListener('click', () => fileNameDialog.showModal())

fileNameInput.addEventListener('input', function() {
  if (this.value.trim()) {
    submitButton.removeAttribute('disabled')

  } else {
    submitButton.setAttribute('disabled', '')
  }
})

cancelButton.addEventListener('click', () => fileNameDialog.close())

submitButton.addEventListener('click', (event) => {
  event.preventDefault()
  const fileName = fileNameInput.value.trim()

  if (!fileName) {
    fileNameInput.value = ''
    return
  }

  fileNameDialog.close(fileName)
  fileNameInput.value = ''
})

fileNameDialog.addEventListener('close', function() {
  if (this.returnValue) {
    addFile(this.returnValue)
    this.returnValue = ''
  }
})
