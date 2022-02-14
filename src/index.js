console.log(data)

function createDogListItem(dog) {
  const li = document.createElement("li")
  const dogContainer = document.querySelector(".main")

  li.className = "dogs-list__button"
  li.innerText = dog.name

  // (1)

  li.addEventListener("click", function () {
    const container = createDogCard(dog)
    const section = document.querySelector("section")
    if (section != null) section.remove()
    dogContainer.append(container)
  })

  return li
}

function createSection() {
  const section = document.createElement("section")
  section.className = "main__dog-section"
  return section
}

const createDogCardDesc = (bio) => {
  const div = document.createElement("div")
  div.className = "main__dog-section__desc"

  //(2)
  const header = document.createElement("h3")
  header.innerText = "Bio"
  console.log(bio)
  const text = document.createElement("p")
  text.innerText = bio

  div.append(header)
  div.append(text)

  return div
}

function createDogCardBottomSection(dog) {
  const button = document.createElement("button")
  const text = document.createElement("p")
  text.innerText = "Is naughty?"
  const div = document.createElement("div")
  div.className = "main__dog-section__btn"

  const isNaughty = document.createElement("h5")
  if (dog.isGoodDog) {
    isNaughty.innerText = "yes!"
  } else if (!dog.isGoodDog) {
    isNaughty.innerText = "No!"
  }
  if (dog.isGoodDog) {
    button.innerText = "Good Dog!"
  } else if (!dog.isGoodDog) {
    button.innerText = "Bad Dog!"
  }

  // (6)
  button.addEventListener("click", function () {
    if (dog.isGoodDog) {
      dog.isGoodDog = false
      button.innerText = "Bad Dog!"
      isNaughty.innerText = "yes!"
    } else if (!dog.isGoodDog) {
      dog.isGoodDog = true
      button.innerText = "Good Dog!"
      isNaughty.innerText = "No!"
    }
  })

  div.append(text, isNaughty, button)

  return div
}

const createDogCard = (dog) => {
  const section = createSection()
  const header = document.createElement("h2")
  header.innerText = dog.name

  // (3)
  const picture = document.createElement("img")
  picture.setAttribute("src", dog.image)

  const desc = createDogCardDesc(dog.bio)
  const bottomSection = createDogCardBottomSection(dog)

  section.append(header, picture, desc, bottomSection)

  return section
}

function createForm() {
  const form = document.createElement("form")

  const nameInput = createInput("name")
  const imgInput = createInput("image", "url")
  const bioInput = createInput("bio", "textarea")
  const submitInput = createInput("submit", "submit", "Let's add a dog!")

  const nameLabel = createLabel("name", "Dog's name")
  const imgLabel = createLabel("image", "Dog's picture")
  const bioLabel = createLabel("bio", "Dog's bio")

  form.className = "form"
  submitInput.className = "form__button"

  //(5)
  form.addEventListener("submit", function (event) {
    event.preventDefault()
    const nameInput = document.querySelector("#name")
    const imgInput = document.querySelector("#image")
    const bioInput = document.querySelector("#bio")

    const newDoggo = {
      id: data.length + 1,
      name: nameInput.value,
      bio: bioInput.value,
      isGoodDog: true,
      formNicture: imgInput.value,
    }

    imgInput.value = ""
    nameInput.value = ""
    bioInput.value = ""

    data.unshift(newDoggo)

    renderDogList(data)
  })

  form.append(
    nameLabel,
    nameInput,
    imgLabel,
    imgInput,
    bioLabel,
    bioInput,
    submitInput
  )
  return form
}

function createInput(idName, type = "text", value) {
  let input = null

  if (type === "textarea") {
    input = document.createElement("textarea")
    input.setAttribute("rows", "5")
  } else {
    input = document.createElement("input")
    input.setAttribute("type", type)
  }

  input.setAttribute("id", idName)
  input.setAttribute("name", idName)

  if (value) input.setAttribute("value", value)

  return input
}

function createLabel(forAttr, text) {
  const label = document.createElement("label")
  label.attributes.for = forAttr
  label.innerText = text

  return label
}

function renderMainForm() {
  const section = createSection()
  const form = createForm()
  const h2 = document.createElement("h2")

  h2.innerText = "Add a new Dog"

  section.append(h2, form)

  return section
}

function renderDogList(dogsArr) {
  const listContainer = document.querySelector(".dogs-list")
  for (const dog of dogsArr) {
    const item = createDogListItem(dog)
    listContainer.append(item)
  }
}

renderDogList(data)

const formButton = document.querySelector(".dogs-list__button--add")
const dogContainer = document.querySelector(".main")

// (4)
formButton.addEventListener("click", function () {
  const section = document.querySelector("section")
  section.remove()
  const mainForm = renderMainForm()
  dogContainer.append(mainForm)
})
