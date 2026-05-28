let btn = document.getElementById("btn-criar")
let inputPergunta = document.getElementById("input-pergunta")
let containerLista = document.getElementById("container-lista")
let cards = new Map()
let contadorCards = 0
let contadorAlternativas = 2

function criarFlashcard() {
  let pergunta = inputPergunta.value
  if (pergunta === "") {
    alert("Digite uma pergunta antes de criar o card!")
    return
  }

  let inputsAlternativas = document.querySelectorAll(".input-alternativa")
  let alternativas = []
  let i = 0
  while (i < inputsAlternativas.length) {
    if (inputsAlternativas[i].value !== "") {
      alternativas.push(inputsAlternativas[i].value)
    }
    i++
  }

  contadorCards = cards.size + 1
  cards.set(contadorCards, {
    pergunta: pergunta,
    alternativas: alternativas,
    modo: getModoAtivo()
  })

  renderizarCardNaLista(contadorCards, pergunta)
  limparFormulario()
}

function renderizarCardNaLista(id, pergunta) {
  if (contadorCards === 1) {
    containerLista.innerHTML = ""
  }

  let itemCard = document.createElement("div")
  itemCard.dataset.id = id
  itemCard.textContent = "Card " + id + ": " + pergunta

  let btnDeletar = document.createElement("button")
  btnDeletar.textContent = "✕"
  btnDeletar.addEventListener("click", function () {
    deletarCard(id, itemCard)
  })

  itemCard.appendChild(btnDeletar)
  containerLista.appendChild(itemCard)
}

function deletarCard(id, elemento) {
  cards.delete(id)
  containerLista.removeChild(elemento)

  if (cards.size === 0) {
    containerLista.innerHTML = "<p>Nenhum card criado ainda.</p>"
  } else {
    renumerarLista()
  }
}

function renumerarLista() {
  let itens = containerLista.querySelectorAll("div")
  let i = 0

  while (i < itens.length) {
    let id = Number(itens[i].dataset.id)
    let card = cards.get(id)
    let btnDeletar = itens[i].querySelector("button")
    itens[i].textContent = "Card " + (i + 1) + ": " + card.pergunta
    itens[i].appendChild(btnDeletar)
    i++
  }

  contadorCards = cards.size
}

function adicionarAlternativa() {
  contadorAlternativas++
  let novaAlternativa = document.createElement("input")
  novaAlternativa.type = "text"
  novaAlternativa.placeholder = "Alternativa " + contadorAlternativas
  novaAlternativa.classList.add("input-alternativa")

  let btnAdd = document.getElementById("btn-add-alternativa")
  let container = document.getElementById("container-alternativas")
  container.insertBefore(novaAlternativa, btnAdd)
}

function getModoAtivo() {
  let botaoAtivo = document.querySelector("#modos button.ativo")
  if (botaoAtivo === null) return "padrão"
  return botaoAtivo.textContent
}

function selecionarModo(botao) {
  let botoesModo = document.querySelectorAll("#modos button")
  let i = 0
  while (i < botoesModo.length) {
    botoesModo[i].classList.remove("ativo")
    i++
  }
  botao.classList.add("ativo")
}

function limparFormulario() {
  inputPergunta.value = ""
  let inputsAlternativas = document.querySelectorAll(".input-alternativa")
  let i = 0
  while (i < inputsAlternativas.length) {
    inputsAlternativas[i].value = ""
    i++
  }
}


btn.addEventListener("click", criarFlashcard)
document.getElementById("btn-add-alternativa").addEventListener("click", adicionarAlternativa)
document.getElementById("btn-limpar").addEventListener("click", limparFormulario)
document.querySelectorAll("#modos button").forEach(function (botao) {
  botao.addEventListener("click", function () {
    selecionarModo(botao)
  })
})