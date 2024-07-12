const sidebar = document.querySelector('#sidebar')
const menuButton = document.querySelector('#menu-button')

menuButton.addEventListener('click', function() {
  const icon = this.firstElementChild
  let src = icon.src.split('/')

  src[src.length - 1] = src[src.length - 1] === 'menu.svg' ? 'close.svg' : 'menu.svg'

  icon.src = src.join('/')

  sidebar.classList.toggle('active')

})
