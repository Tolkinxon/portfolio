const portfolioItem = document.querySelectorAll('.portfolio-item')
const portfolioList = document.querySelector('.portfolio-container')
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

        //   data.forEach((item, idx) => {
        //     const { title, cropped_photo, project_type, id } = item
            
        //     if(idx < portfolioItem.length){
        //       portfolioItem[idx].classList.remove('visually-hidden')
        //       portfolioItem[idx].classList.add(`${project_type}`)
        //       portfolioItem[idx].querySelector('.portfolio-img').src = cropped_photo
        //       portfolioItem[idx].querySelector('.portfolio-location').textContent = title
        //       portfolioItem[idx].querySelector('.before').id = id
        //     }
         
        //   })

    renderForPortfolios(data, portfolioList)


      document.body.style.overflow = 'auto'

      const allImages = document.querySelectorAll('.portfolio-img')

    //   allImages.forEach(item => {
    //     console.log(item.complete);
    // })

     



})()


