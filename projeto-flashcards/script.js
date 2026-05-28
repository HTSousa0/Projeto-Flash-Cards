let btn = document.getElementById("btn-criar")
let input = document.getElementById("input-pergunta")
let lista = document.getElementById("container-lista")

function criarFlashcard() {
  let pergunta = input.value

  if (pergunta === "") return

  let inputs = document.querySelectorAll(".input-alternativa")
  let alternativas = []
  let i = 0

  while (i < inputs.length) {
    alternativas.push(inputs[i].value)
    i++
  }

  let novoCard = {
    pergunta: pergunta,
    alternativas: alternativas
  }

  let item = document.createElement("p")
  item.textContent = pergunta
  lista.appendChild(item)

  input.value = ""
}

btn.addEventListener("click", criarFlashcard)