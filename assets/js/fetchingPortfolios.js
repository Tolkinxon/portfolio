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

    setTimeout(() => {
    const isotopScript  = document.createElement('script')
    isotopScript.src = 'assets/vendor/isotope-layout/isotope.pkgd.min.js'

    const mainScript  = document.createElement('script')
    mainScript.src = 'assets/js/main.js'

    document.body.append(isotopScript)
    document.body.append(mainScript)
    }, 2000)
}


(async () => {
    const request = await fetch('https://test.itpoint.uz/api/project/?type=all', {
      headers:{                  
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })

    const data = await request.json()

    const interiorData = await data.filter(item => item.project_type == 'interior')
    .sort((a, b) => 0.5 - Math.random());
    const exteriorData = await data.filter(item => item.project_type == 'exterior')
    .sort((a, b) => 0.5 - Math.random());

    function sliceData(arr) {
      if(arr.length > 3){
        return arr.slice(0, 3)
      }
      else {
        return arr
      }
    }

    const allRandomSlicedData = [...sliceData(interiorData),...sliceData(exteriorData)]

    renderForPortfolios(allRandomSlicedData, portfolioList)
    renderForPortfolios(data, portfolioContainerSeeMore)


      document.body.style.overflow = 'auto'

      const allImages = document.querySelectorAll('.portfolio-img')

    //   allImages.forEach(item => {
    //     console.log(item.complete);
    // })
})()


