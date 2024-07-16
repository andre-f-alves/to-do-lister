const sidebar = document.querySelector('.sidebar')
const menuButton = document.querySelector('.menu-button')

menuButton.addEventListener('click', function() {
  const icon = this.firstElementChild
  const url = new URL(icon.src)
  const filePath = url.pathname.split('/')

  filePath[filePath.length - 1] = filePath[filePath.length - 1] === 'menu.svg' ? 'close.svg' : 'menu.svg'

  url.pathname = filePath.join('/')
  icon.src = url.toString()

  sidebar.classList.toggle('active')
})
