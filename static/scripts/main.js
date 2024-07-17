const sidebar = document.querySelector('.sidebar-container')
const menuButton = document.querySelector('.menu-button')

menuButton.addEventListener('click', function() {
  const icon = document.getElementById('sb-ctrl-icon')
  const url = new URL(icon.src)
  const filePath = url.pathname.split('/')

  filePath[filePath.length - 1] = filePath[filePath.length - 1] === 'open-sidebar.svg' ? 'close-sidebar.svg' : 'open-sidebar.svg'

  url.pathname = filePath.join('/')
  icon.src = url.toString()

  sidebar.classList.toggle('active')
})
