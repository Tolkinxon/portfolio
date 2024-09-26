const portfolioItem = document.querySelectorAll('.portfolio-item')
const portfolioList = document.querySelector('.portfolio-container')
const portfoliosTemplate = document.querySelector('#portfolios').content
const seeMore = document.querySelector('.portfolio__see-more')
const closeIcon = document.querySelector('.close-icon')



function renderForPortfolios(arr, node) {

    node.innerHTML = '';
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {
        const { title, cropped_photo, project_type, id } = item
        const clonePortfolios = portfoliosTemplate.cloneNode(true)
        clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`${project_type}`)
        clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
        clonePortfolios.querySelector('.portfolio-location').textContent = title
        clonePortfolios.querySelector('.before').id = id

        fragment.append(clonePortfolios)
    })
    node.appendChild(fragment)
}

function addExtraClass(item, category) {
  item.classList.add('all', `sliced-${category}`)
}

function removeExtraClass(item, category) {
  item.classList.remove('all', `sliced-${category}`)
}


(async () => {

  document.body.style.overflow = 'auto'

    const request = await fetch('https://test.itpoint.uz/api/project/?type=all', {
      headers:{                  
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })
    const data = await request.json()

    const requestIsRandom = await fetch('https://test.itpoint.uz/api/configuration/', {
      headers:{                  
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })
    const dataIsRandom = await requestIsRandom.json()
    let boleanIsRandom = dataIsRandom.at(-1).is_random_order
    

    const interiorData = await data.filter(item => item.project_type == 'interior')
    const exteriorData = await data.filter(item => item.project_type == 'exterior')

    const clonedInteriorData = JSON.parse(JSON.stringify(interiorData))
    const clonedExteriorData = JSON.parse(JSON.stringify(exteriorData))
    

    function sliceData(arr) {
      if(arr.length > 5){
        return arr.slice(0, 5)
      }
      else {
        return arr
      }
    }
    const allRandomSlicedData = [...sliceData(interiorData.sort((a, b) => 0.5 - Math.random())),...sliceData(exteriorData.sort((a, b) => 0.5 - Math.random()))]
    const allOrderedSlicedData = [...sliceData(clonedInteriorData), ...sliceData(clonedExteriorData)]

    renderForPortfolios(data, portfolioList)

      // if(boleanIsRandom){
    //   renderForPortfolios(allRandomSlicedData, portfolioList)
    // } else {
    //   renderForPortfolios(allOrderedSlicedData, portfolioList)
    // }

    portfolioList.childNodes.forEach((item, idx) => {
      if(item.nodeName == '#text'){
        portfolioList.removeChild(item)
      }
    })

    portfolioList.childNodes.forEach((item, idx) => {
      if(item.nodeName == '#text'){
        portfolioList.removeChild(item)
      }
    })


    if(boleanIsRandom){
      allRandomSlicedData.forEach(item => {
        let idx = data.findIndex(itemFindIndex => itemFindIndex.id == item.id)
        addExtraClass(portfolioList.childNodes[idx], data[idx].project_type)
      })
    } else {
      allOrderedSlicedData.forEach(item => {
        let idx = data.findIndex(itemFindIndex => itemFindIndex.id == item.id)
        addExtraClass(portfolioList.childNodes[idx], data[idx].project_type)
      })
    }

    
    
    
    seeMore.addEventListener('click', () => {
      portfolioList.childNodes.forEach((item, idx) => {
        if(!(item.matches('.all'))) {
          addExtraClass(item, data[idx].project_type)
        }
      })
    })

    closeIcon.addEventListener('click', () => {
      portfolioList.childNodes.forEach((item, idx) => {
          removeExtraClass(item, data[idx].project_type)
      })

      if(boleanIsRandom){
        allRandomSlicedData.forEach(item => {
          let idx = data.findIndex(itemFindIndex => itemFindIndex.id == item.id)
          addExtraClass(portfolioList.childNodes[idx], data[idx].project_type)
        })
      } else {
        allOrderedSlicedData.forEach(item => {
          let idx = data.findIndex(itemFindIndex => itemFindIndex.id == item.id)
          addExtraClass(portfolioList.childNodes[idx], data[idx].project_type)
        })
      }
    })
 
  
 

      setTimeout(() => {
        const isotopeExecuteCode  = document.createElement('script')
        isotopeExecuteCode.classList.add('isotope')
        isotopeExecuteCode.src = 'assets/js/isotopeExecuteCode.js'
        document.body.append(isotopeExecuteCode)
      }, 3000)
})()




