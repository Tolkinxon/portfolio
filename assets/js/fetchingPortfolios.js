const portfolioItem = document.querySelectorAll('.portfolio-item')
const portfolioList = document.querySelector('.portfolio-container')
const portfolioContainerSeeMore = document.querySelector('.portfolio-container-see-more')
const portfoliosTemplate = document.querySelector('#portfolios').content


function renderForPortfolios(arr, node) {

    node.innerHTML = '';
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {
        const { title, cropped_photo, project_type, id } = item
        const clonePortfolios = portfoliosTemplate.cloneNode(true)
        // const testImg = document.createElement('img');

        clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`${project_type}`)

        // testImg.src = cropped_photo
        // let aspecRatio = testImg.naturalHeight / testImg.naturalWidth;  

        // clonePortfolios.querySelector('.portfolio-img').height = `${Math.abs(362 * aspecRatio)}`
        clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
        clonePortfolios.querySelector('.portfolio-location').textContent = title
        clonePortfolios.querySelector('.before').id = id

        fragment.appendChild(clonePortfolios)
    })

    let fragmentArr = []
    for(let item of fragment.children) {
        fragmentArr.push(item);
    }

    node.appendChild(fragment)


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

    
    if(boleanIsRandom){
      renderForPortfolios(allRandomSlicedData, portfolioList)
    } else {
      renderForPortfolios([...sliceData(clonedInteriorData), ...sliceData(clonedExteriorData)], portfolioList)
    }
    renderForPortfolios(data, portfolioContainerSeeMore)

    setTimeout(() => {
        const isotopeExecuteCode  = document.createElement('script')
        isotopeExecuteCode.src = 'assets/js/isotopeExecuteCode.js'
    
       
        document.body.append(isotopeExecuteCode)
      }, 3000)



      // const allImages = document.querySelectorAll('.portfolio-img')
    //   allImages.forEach(item => {
    //     console.log(item.complete);
    // })
})()




