document.addEventListener('contentLoaded', () => {

    const openButton = document.getElementById('menu-button')
    const sidebar = document.querySelector('.sidebar')
    const sidebarContent = document.querySelector('.sidebar-content')
    const shadowBox = document.querySelector('.shadow-box')


    openButton.addEventListener('click', () => {
        const body = parent.document.body;

        sidebar.classList.toggle('open')
        sidebarContent.classList.toggle('open')
        shadowBox.classList.toggle('visible')

        if(sidebar.classList.contains('open')) {
            body.style.overflowY = 'hidden'
        } else {
            body.style.overflowY = 'auto'
        }

    })

    shadowBox.addEventListener('click', () => {
        sidebar.classList.toggle('open')
        sidebarContent.classList.toggle('open')
        shadowBox.classList.toggle('visible')
    })

    function getSidebarIcons() {
        const iconsPath = ['house-door-fill.svg', 'bag-fill.svg','heart-fill.svg', 'bell-fill.svg', 'question-circle-fill.svg', 'gear-fill.svg']

        const sidebarIcons = document.querySelectorAll('.sidebar-menu-icon')
        sidebarIcons.forEach((sidebarIcon, index) => {
            sidebarIcon.src = `./assets/icons/sidebar-icons/${iconsPath[index]}`
        })

    }




    getSidebarIcons()
})


