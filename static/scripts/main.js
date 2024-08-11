const sidebarButton = document.getElementById('sidebar-button')
const newFileButton = document.getElementById('new-file-button')
const fileNameDialog = document.getElementById('file-name-dialog')
const fileNameInput = document.getElementById('file-name-input')
const submitButton = document.getElementById('submit-button')
const cancelButton = document.getElementById('cancel-button')

const fileList = document.getElementById('file-list')
const fileListItemTemplate = document.getElementById('file-list-item-template')
  .content.querySelector('.file-list-item')

const contextMenu = document.getElementById('context-menu')
const deleteFileButton = document.getElementById('delete-file-button')

function loadFileOnList(fileName, fileID) {
  const fileListItem = document.importNode(fileListItemTemplate, true)
  const fileLink = fileListItem.firstElementChild
  const moreActionsButton = fileListItem.querySelector('.more-actions-button')

  fileListItem.setAttribute('data-file-id', fileID)
  
  fileLink.value = fileID
  fileLink.textContent = fileName

  moreActionsButton.addEventListener('click', function() {
    const { x, y, width } = this.getBoundingClientRect()
    const offsetScrollY = fileListItem.scrollTop
    const fileReference = fileListItem.dataset.fileId

    contextMenu.popover = 'manual'
    const contextMenuOpen = contextMenu.togglePopover()

    if (!contextMenuOpen && contextMenu.dataset.fileReference !== fileReference) {
      contextMenu.showPopover()
    }

    contextMenu.setAttribute('data-file-reference', fileReference)
    contextMenu.style.left = x + width + 'px'
    contextMenu.style.top = y - offsetScrollY + 'px'
  })

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

function deleteFile(fileID) {
  const fileListItem = document.querySelector(`.file-list-item[data-file-id="${fileID}"]`)
  localStorage.removeItem(fileID)
  fileList.removeChild(fileListItem)
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

deleteFileButton.addEventListener('click', () => {
  const fileID = contextMenu.dataset.fileReference
  deleteFile(fileID)
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
