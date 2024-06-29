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
        clonePortfolios.querySelector('.before').id = id

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


window.addEventListener('DOMContentLoaded', () => {
  
  const imgShowing  = document.querySelector('.img-showing')
  const wrapper = document.querySelector('.wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  const portfolioContainer = document.querySelector('.portfolio-container')
  const before = document.querySelectorAll('.before')
  const img = document.querySelector('.img')
  const closeBtn = document.querySelector('.img-showing__close')
  const aloneImg = document.querySelectorAll('.img-showing__alone-img')
  const prev = document.querySelector('.img-showing__prev')
  const next = document.querySelector('.img-showing__next') 
  const closeP = document.querySelector('.closeP')
  const portfolioFilters = document.querySelector('#portfolio-flters')



  portfolioContainer.addEventListener('click', (evt) => {
    if(evt.target.matches('.before')){
      imgShowing.style.display = 'none'
      mainWrapper.style.display = 'none'
      wrapper.style.display = 'block'
    }
  })
  
  // showing and hiding side when clicking
  img.addEventListener('click', () => {
    imgShowing.style.display = 'flex'
    mainWrapper.style.display = 'none'
    wrapper.style.display = 'none'
  }) 
  
  closeBtn.addEventListener('click', () => {
    imgShowing.style.display = 'none'
    mainWrapper.style.display = 'none'
    wrapper.style.display = 'block'
  }) 
  
  closeP.addEventListener('click', () => {
    imgShowing.style.display = 'none'
    mainWrapper.style.display = 'block'
    wrapper.style.display = 'none'
  }) 
  // showing and hiding side when clicking
  })

