// axios('./links/header.html')
//     .then(response => loadHeader(response.data))
// 
// function loadHeader(html) {
//     const header = document.querySelector('.home-header')
// 
//     const headerTempDiv = document.createElement('div')
//     
//     headerTempDiv.innerHTML = html
// 
//     while (headerTempDiv.firstChild) {
//         header.appendChild(headerTempDiv.firstChild)
//     }
// 
//     const event = new CustomEvent('headerLoaded');
//     document.dispatchEvent(event)
// }


const links = ['header.html', 'sidebar.html'];

function loadContent(html, containerName) {
    let container = document.querySelector(`.home-${containerName}`);
    container.innerHTML = html;
}

function loadAllContent() {
    const promises = links.map(link => {
        return axios('./links/' + `${link}`)
            .then(response => {
                loadContent(response.data, link.split('.')[0]);
            })
            .catch(error => {
                console.error('Erro ao carregar', error);
            });
    });

    Promise.all(promises)
        .then(() => {
            const event = new CustomEvent('contentLoaded');
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error('Erro em uma das requisições', error);
        });
}

loadAllContent();