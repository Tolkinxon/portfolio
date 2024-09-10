 /**
   * Porfolio isotope and filter
   */  
 let portfolioContainer = select('.portfolio-container');

 let portfolioIsotope = new Isotope(portfolioContainer, {
   itemSelector: '.portfolio-item'
 });

 let portfolioFilters = select('#portfolio-flters li', true);

 on('click', '#portfolio-flters li', function(e) {
   e.preventDefault();
   portfolioFilters.forEach(function(el) {
     el.classList.remove('filter-active');
   });
   this.classList.add('filter-active');

   portfolioIsotope.arrange({
     filter: this.getAttribute('data-filter')
   });
   
   portfolioIsotope.on('arrangeComplete', function() {
     AOS.refresh()
   });
 }, true);

// see more side ----------------------------------------------------------
 let portfolioContainerSeeMoreList = select('.portfolio-container-see-more');
 let portfolioIsotopeSeeMore = new Isotope(portfolioContainerSeeMoreList, {
   itemSelector: '.portfolio-item'
 });

 let portfolioFiltersSeeMore = select('#portfolio-flters li', true);

 on('click', '#portfolio-flters li', function(e) {
   e.preventDefault();
   portfolioFiltersSeeMore.forEach(function(el) {
     el.classList.remove('filter-active');
   });
   this.classList.add('filter-active');

   portfolioIsotopeSeeMore.arrange({
     filter: this.getAttribute('data-filter')
   });
   
   portfolioIsotopeSeeMore.on('arrangeComplete', function() {
     AOS.refresh()
   });
 }, true);
