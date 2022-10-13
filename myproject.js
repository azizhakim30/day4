let projects = []

function addProject(event) {
  event.preventDefault()

  let name = document.getElementById('inputName').value
  let startDate = document.getElementById('inputStartDate').value
  let endDate = document.getElementById('inputEndDate').value
  let desc = document.getElementById('inputDesc').value
  let icons = {
    nodeJs: document.querySelector('input[name="checkboxNodejs"]').checked,
    reactJs: document.querySelector('input[name="checkboxReactJs"]').checked,
    javaScript: document.querySelector('input[name="checkboxJavaScript"]')
      .checked,
    vueJs: document.querySelector('input[name="checkboxVueJs"]').checked,
  }
  let dataImage = document.getElementById('inputImage').files[0]

  dataImage = URL.createObjectURL(dataImage)

  let project = {
    title: name,
    startDate: startDate,
    endDate: endDate,
    description: desc,
    icon: icons,
    image: dataImage,
  }

  projects.push(project)

  renderCard()
}

function getProjectDuration(endDate, startDate) {
  const distance = endDate - startDate

  const miliseconds = 1000
  const secondInMinute = 60
  const minuteInHour = 60
  const secondInHour = secondInMinute * minuteInHour // 3600
  const hourInDay = 24
  const dayInMonth = 30
  const monthInYear = 12

  let monthDistance =
    distance / (miliseconds * secondInHour * hourInDay * dayInMonth)
  let dayDistance = distance / (miliseconds * secondInHour * hourInDay)

  if (monthDistance >= 12) {
    return `${Math.floor(monthDistance / monthInYear)}` + ` Year`
  } else if (dayDistance >= 30) {
    return `${Math.floor(dayDistance / dayInMonth)}` + ' Month'
  } else {
    return `${Math.floor(dayDistance)}` + ' day'
  }
}

function renderCard() {
  let containerProject = document.getElementById('cardProjects')
  containerProject.innerHTML = ''

  for (let i = 0; i < projects.length; i++) {
    const startDateVariable = new Date(projects[i].startDate)
    const endDateVariable = new Date(projects[i].endDate)
    const duration = getProjectDuration(endDateVariable, startDateVariable)

    containerProject.innerHTML += `
      <div class="cardProjects" id="cardProjects">
        <div class="card">
          <div class="img">
            <img src="${projects[i].image}" />
          </div>
          <div class="projectTitle">
            <a href="detailProject.html?${projects[i].title}">${
      projects[i].title
    }</a>
            <br /><small>Durasi: ${duration}</small>
          </div>
          <div class="projectContent">
            ${projects[i].description}
          </div>
          <div class="icons">
            ${
              projects[i].icon.nodeJs === true
                ? '<i class="fa-brands fa-node-js"></i>'
                : ''
            }
            ${
              projects[i].icon.reactJs === true
                ? '<i class="fa-brands fa-react"></i>'
                : ''
            }
            ${
              projects[i].icon.javaScript === true
                ? '<i class="fa-brands fa-js"></i></i>'
                : ''
            }
            ${
              projects[i].icon.vueJs === true
                ? '<i class="fa-brands fa-vuejs"></i>'
                : ''
            }
          </div>
          <div class="mod">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
        `
  }
}
