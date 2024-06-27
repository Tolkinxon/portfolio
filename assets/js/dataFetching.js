const portfolios = document.querySelector('#portfolios').content
const portfolioList = document.querySelector('.portfolio-container')

function renderForPortfolios(arr, node) {
    node.innerHTML = null
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {
        const { location, cropped_photo, project_type, id } = item
        const clonePortfolios = portfolios.cloneNode(true)

        clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`filter-${project_type}`)
        clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
        clonePortfolios.querySelector('.portfolio-location').textContent = location

        fragment.appendChild(clonePortfolios)
    })

    node.appendChild(fragment)
}




(async () => {
    const request = await fetch('http://13.233.132.195:8000/api/project/?type=all', {
      headers:{
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })

    const data = await request.json()
    renderForPortfolios(data, portfolioList)
    
})()

