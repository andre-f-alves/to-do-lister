const menuButton = document.getElementById('menu-button')
const newListButton = document.getElementById('new-list-button')

function changeSidebarVisibility() {
  const sidebar = document.getElementById('sidebar')

  const icon = document.getElementById('sidebar-control-icon')
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

function addFile() {
  const fileList = document.getElementById('file-list')
  const template = document.getElementById('file-list-item-template')
  const fileListItemTemplate = template.content.querySelector('.file-list-item')
  
  let fileName
  do {
    fileName = prompt('Digite um nome para o arquivo:').trim()
    if (fileName === null) return
  } while (!fileName)

  const fileListItem = document.importNode(fileListItemTemplate, true)
  const fileLink = fileListItem.firstElementChild

  fileLink.textContent = fileName
  fileLink.title = fileName

  if (document.getElementById('empty-message')) {
    fileList.removeChild(document.getElementById('empty-message'))
  }

  fileList.appendChild(fileListItem)
}

menuButton.addEventListener('click', function() { changeSidebarVisibility.call(this) })
newListButton.addEventListener('click', () => addFile())
