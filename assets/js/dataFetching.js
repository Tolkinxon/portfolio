// const portfoliosTemplate = document.querySelector('#portfolios').content
// const portfolioList = document.querySelector('.portfolio-container')
// const portfolioDetailsImgTemplate = document.querySelector('#portfolio-details__img').content
// const portfolioDetailsImgList = document.querySelector('.swiper-wrapper-for-porfolio-details')
// const clientCompany = document.querySelector('.client')
// const category = document.querySelector('.category')



// function renderForPortfolios(arr, node) {
//     node.innerHTML = null
//     const fragment = document.createDocumentFragment()

//     arr.forEach(item => {
//         const { location, cropped_photo, project_type, id } = item
//         const clonePortfolios = portfoliosTemplate.cloneNode(true)

//         clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`filter-${project_type}`)
//         clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
//         clonePortfolios.querySelector('.portfolio-location').textContent = location
//         clonePortfolios.querySelector('.before').id = id

//         fragment.appendChild(clonePortfolios)
//     })

//     node.appendChild(fragment)
// }

// function renderForPortfolioDetailsImg(data, node) {
//   console.log(data);
//   const { project_type, client, photos } = data
//   clientCompany.textContent = client
//   category.textContent = project_type

//   node.innerHTML = null
//   const fragment = document.createDocumentFragment()

//   photos.forEach(item => {
//       const { url } = item
//       const clonePortfolioDetails = portfolioDetailsImgTemplate.cloneNode(true)

//       clonePortfolioDetails.querySelector('.img').src = url
    

//       fragment.appendChild(clonePortfolioDetails)
//   })

//   node.appendChild(fragment)
// }


// (async () => {
//     const request = await fetch('http://13.233.132.195:8000/api/project/?type=all', {
//       headers:{
//         'accept': 'application/json',
//         'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
//       }  
//     })

//     const data = await request.json()
//     renderForPortfolios(data, portfolioList)

    
//     let portfolioContainer = select('.portfolio-container');
//     if (portfolioContainer) {
//       let portfolioIsotope = new Isotope(portfolioContainer, {
//         itemSelector: '.portfolio-item'
//       });

//       let portfolioFilters = select('#portfolio-flters li', true);

//       on('click', '#portfolio-flters li', function(e) {
//         e.preventDefault();
//         portfolioFilters.forEach(function(el) {
//           el.classList.remove('filter-active');
//         });
//         this.classList.add('filter-active');

//         portfolioIsotope.arrange({
//           filter: this.getAttribute('data-filter')
//         });
        
//         portfolioIsotope.on('arrangeComplete', function() {
//           AOS.refresh()
//         });
//       }, true);
//     }

// })()






// window.addEventListener('DOMContentLoaded', () => {
  
//   const imgShowing  = document.querySelector('.img-showing')
//   const wrapper = document.querySelector('.wrapper')
//   const mainWrapper = document.querySelector('.main-wrapper')
//   const portfolioContainer = document.querySelector('.portfolio-container')
//   const before = document.querySelectorAll('.before')
//   const closeBtn = document.querySelector('.img-showing__close')
//   const aloneImg = document.querySelectorAll('.img-showing__alone-img')
//   const prev = document.querySelector('.img-showing__prev')
//   const next = document.querySelector('.img-showing__next') 
//   const closeP = document.querySelector('.closeP')
//   const portfolioFilters = document.querySelector('#portfolio-flters')


// //------------------------ portfolios openning and closing side -------------------------
//   portfolioContainer.addEventListener('click', (evt) => {
//     if(evt.target.matches('.before')){
//       imgShowing.style.display = 'none'
//       mainWrapper.style.display = 'none'
//       wrapper.style.display = 'block'
//       const id = evt.target.id


//       const fetchingProjectsWithId = async () => {
//         const request = await fetch(`http://13.233.132.195:8000/api/project/${id}`, {
//           headers:{
//             'accept': 'application/json',
//             'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
//           }  
//         })
  
//         const data = await request.json()
//         renderForPortfolioDetailsImg(data, portfolioDetailsImgList)

//         const img = document.querySelectorAll('.img')
//         img.forEach(item => {
//           item.addEventListener('click', () => {
//             imgShowing.style.display = 'flex'
//             mainWrapper.style.display = 'none'
//             wrapper.style.display = 'none'
//         }) 
//         })
//       }
  
//       fetchingProjectsWithId()
//     }
//   })
// //------------------------ portfolios openning and closing side -------------------------




  
//   //--------------------- showing and hiding side when clicking --------------------------



  
//   closeBtn.addEventListener('click', () => {
//     imgShowing.style.display = 'none'
//     mainWrapper.style.display = 'none'
//     wrapper.style.display = 'block'
//   }) 
  
//   closeP.addEventListener('click', () => {
//     imgShowing.style.display = 'none'
//     mainWrapper.style.display = 'block'
//     wrapper.style.display = 'none'
//   }) 
//   // ------------------------- showing and hiding side when clicking ----------------------
//   })

const resumeEducationTemplate = document.querySelector('#resume-education').content
const resumeEducationList = document.querySelector('.resume-item__list')


function renderForResume( arr, node, template ) {

  node.innerHTML = null
  const fragment = document.createDocumentFragment()

  arr.forEach(item => {
      const { year_range, title, text, sub_title } = item
      const cloneTemplate = template.cloneNode(true)

      cloneTemplate.querySelector('.resume-education-text').textContent = text
      cloneTemplate.querySelector('.resume-education-sub_title').textContent = sub_title
      cloneTemplate.querySelector('.resume-education-year_range').textContent = year_range
      cloneTemplate.querySelector('.resume-education-title').textContent = title
    

      fragment.appendChild(cloneTemplate)
  })

  node.appendChild(fragment)
}

(async () => {
    const request = await fetch('https://test.itpoint.uz/api/career/?type=education', {
      headers:{
        'accept': 'application/json',
        'X-CSRFToken': 'GJcGnVz5mEfkDnWaTRFbsVdUAXq9FxU5Iw07Jk9Sv2bPuvKw7Fp2uOlyozpuOx6V'
      }  
    })

    const data = await request.json()
    renderForResume(data, resumeEducationList, resumeEducationTemplate)

})()




