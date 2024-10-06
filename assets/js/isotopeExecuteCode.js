//  /**
//    * Porfolio isotope and filter
//    */  
//  let portfolioContainer = select('.portfolio-container');

//  let portfolioIsotope = new Isotope(portfolioContainer, {
//    itemSelector: '.portfolio-item'
//  });

//  let portfolioFilters = select('#portfolio-flters li', true);

//  on('click', '#portfolio-flters li', function(e) {
//    e.preventDefault();
//    portfolioFilters.forEach(function(el) {
//      el.classList.remove('filter-active');
//    });
//    this.classList.add('filter-active');

//    portfolioIsotope.arrange({
//      filter: this.getAttribute('data-filter')
//    });
   
//    portfolioIsotope.on('arrangeComplete', function() {
//      AOS.refresh()
//    });
//  }, true);

// // see more side ----------------------------------------------------------
//  let portfolioContainerSeeMoreList = select('.portfolio-container-see-more');
//  let portfolioIsotopeSeeMore = new Isotope(portfolioContainerSeeMoreList, {
//    itemSelector: '.portfolio-item'
//  });

//  let portfolioFiltersSeeMore = select('#portfolio-flters li', true);

//  on('click', '#portfolio-flters li', function(e) {
//    e.preventDefault();
//    portfolioFiltersSeeMore.forEach(function(el) {
//      el.classList.remove('filter-active');
//    });
//    this.classList.add('filter-active');

//    portfolioIsotopeSeeMore.arrange({
//      filter: this.getAttribute('data-filter')
//    });
   
//    portfolioIsotopeSeeMore.on('arrangeComplete', function() {
//      AOS.refresh()
//    });
//  }, true);


/**
 * Portfolio isotope and filter
 */
let portfolioContainer = document.querySelector('.portfolio-container');
const allBtn = document.querySelector('[data-filter=".all"]')


let portfolioIsotope = new Isotope(portfolioContainer, {
  itemSelector: '.portfolio-item'
});

let portfolioFilters = document.querySelectorAll('.portfolio-filter-btns');

portfolioFilters.forEach(function(filter) {
  filter.addEventListener('click', function(e) {
    e.preventDefault();
    portfolioFilters.forEach(function(el) {
      el.classList.remove('filter-active');
    });
    this.classList.add('filter-active');

    portfolioIsotope.arrange({
      filter: this.getAttribute('data-filter')
    });

    // portfolioIsotope.on('arrangeComplete', function() {
    //   AOS.refresh();
    // });
  });
});


portfolioIsotope.arrange({
  filter: '.all'
});

closeIcon.addEventListener('click', () => {
  portfolioIsotope.arrange({
    filter: '.all'
  });
  allBtn.click();
})


seeMore.addEventListener('click', () => {
  portfolioIsotope.arrange({
    filter: '.all'
  });
  allBtn.click();
}) 




