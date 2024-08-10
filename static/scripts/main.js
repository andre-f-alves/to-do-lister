const sidebarButton = document.getElementById('sidebar-button')
const newFileButton = document.getElementById('new-file-button')
const fileNameDialog = document.getElementById('file-name-dialog')
const fileNameInput = document.getElementById('file-name-input')
const submitButton = document.getElementById('submit-button')
const cancelButton = document.getElementById('cancel-button')

const fileList = document.getElementById('file-list')
const fileListItemTemplate = document.getElementById('file-list-item-template')
  .content.querySelector('.file-list-item')

function loadFileOnList(fileName, fileID) {
  const fileListItem = document.importNode(fileListItemTemplate, true)

  fileListItem.setAttribute('data-file-id', fileID)
  fileListItem.firstElementChild.value = fileID
  fileListItem.firstElementChild.textContent = fileName

  fileList.appendChild(fileListItem)
}

function createFile(file) {
  const fileID = localStorage.getItem('nextFileID')

  localStorage.setItem(fileID, JSON.stringify({
    fileName: file,
    content: ''
  }))

  localStorage.setItem('nextFileID', String(parseInt(fileID) + 1).padStart(6, '0'))

  loadFileOnList(file, fileID)
}

sidebarButton.addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar')
  sidebar.classList.toggle('active')
})

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
  submitButton.setAttribute('disabled', '')

  if (this.returnValue) {
    createFile(this.returnValue)
    this.returnValue = ''
  }
})

if (localStorage.getItem('nextFileID') === null) {
  localStorage.setItem('nextFileID', '000000')
}

if (localStorage.length > 1) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!/\d{6}/.test(key)) continue

    const fileName = JSON.parse(localStorage.getItem(key)).fileName
    loadFileOnList(fileName, key)
  }
}
