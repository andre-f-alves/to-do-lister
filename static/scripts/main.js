const sidebar = document.querySelector('.sidebar-container')
const menuButton = document.querySelector('.menu-button')

menuButton.addEventListener('click', function() {
  const icon = document.getElementById('sb-ctrl-icon')
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
})
