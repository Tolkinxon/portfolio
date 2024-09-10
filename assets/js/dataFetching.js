const resumeEducationTemplate = document.querySelector('#resume-education').content
const resumeEducationList = document.querySelector('.resume-ecucation-item__list')
const resumeExperienceTemplate = document.querySelector('#resume-experience').content
const resumeExperienceList = document.querySelector('.resume-experience-item__list')
const testimonialItemTemplate = document.querySelector('#testimonial-item-template').content
const testimonialItemList = document.querySelector('.testimonial-item-template-list')



function renderForResumeEducation( arr, node, template ) {

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

function renderForResumeExperience( arr, node, template ) {

  node.innerHTML = null
  const fragment = document.createDocumentFragment()

  arr.forEach(item => {
      const { year_range, title, position_tasks, sub_title } = item
      const cloneTemplate = template.cloneNode(true)

      cloneTemplate.querySelector('.resume-experience__sub_title').textContent = sub_title
      cloneTemplate.querySelector('.resume-experience__year_range').textContent = year_range
      cloneTemplate.querySelector('.resume-experience__title').textContent = title

      position_tasks.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = item.text
        cloneTemplate.querySelector('.resume-experience__text-list').appendChild(li)
      })
    

      fragment.appendChild(cloneTemplate)
  })

  node.appendChild(fragment)
}

function renderForTestimonial( arr, node, template ) {

  node.innerHTML = null
  const fragment = document.createDocumentFragment()

  arr.forEach(item => {
      const { job, full_name, avatar, comment } = item
      const cloneTemplate = template.cloneNode(true)

      cloneTemplate.querySelector('.testimonial-item__comment').textContent = comment
      cloneTemplate.querySelector('.testimonial-item__full_name').textContent = full_name
      cloneTemplate.querySelector('.testimonial-item__job').textContent = job
      cloneTemplate.querySelector('.testimonial-item__avatar').src = avatar


      fragment.appendChild(cloneTemplate)
  })

  node.appendChild(fragment)
}


//data fetching for resume, education & experience & testimonial side
(async () => {
  //data fetching for resume and education side
    const requestEducation = await fetch('https://test.itpoint.uz/api/career/?type=education', {
      headers:{
        'accept': 'application/json',
        'X-CSRFToken': 'GJcGnVz5mEfkDnWaTRFbsVdUAXq9FxU5Iw07Jk9Sv2bPuvKw7Fp2uOlyozpuOx6V'
      }  
    })

    const dataEducation = await requestEducation.json()
    renderForResumeEducation(dataEducation, resumeEducationList, resumeEducationTemplate)


  //--------------------------------------------------------------------------------------------------
  // data fetching for experience side
    const requestExperience = await fetch('https://test.itpoint.uz/api/career/?type=experience', {
      headers:{
        'accept': 'application/json',
        'X-CSRFToken': 'GJcGnVz5mEfkDnWaTRFbsVdUAXq9FxU5Iw07Jk9Sv2bPuvKw7Fp2uOlyozpuOx6V'
      }  
    })

    const dataExperience = await requestExperience.json()
    renderForResumeExperience(dataExperience, resumeExperienceList,resumeExperienceTemplate)

      //--------------------------------------------------------------------------------------------------
  // data fetching for testimonial side
  const requestTestimonialItem = await fetch('https://test.itpoint.uz/api/commentary', {
    headers:{
      'accept': 'application/json',
      'X-CSRFToken': 'GJcGnVz5mEfkDnWaTRFbsVdUAXq9FxU5Iw07Jk9Sv2bPuvKw7Fp2uOlyozpuOx6V'
    }  
  })

  const dataTestimonialItem = await requestTestimonialItem.json()
  renderForTestimonial(dataTestimonialItem, testimonialItemList, testimonialItemTemplate)
})()











