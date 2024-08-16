const contato_edit = JSON.parse(localStorage.getItem("contato_edit")) || {}
const botao = document.querySelector("#botao")
const nome2 = document.querySelector("#nome")
const numero2 = document.querySelector("#numero")
const email2 = document.querySelector("#email")


function atualizarContato(e) {
    e.preventDefault()
    const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
    lista_de_contatos.forEach((contato_da_vez) => {
        if (contato_da_vez.id === contato_edit.id) {
            const index = lista_de_contatos.indexOf(contato_da_vez)
            const contato_atualizado = {
                id: contato_edit.id,
                nome: nome2.value,
                numero: numero2.value,
                email: email2.value,
            }
            lista_de_contatos[index] = contato_atualizado
        }
    })
    localStorage.setItem("lista", JSON.stringify(lista_de_contatos))
    localStorage.removeItem("contato_edit")
    window.location.href = "./index.html"
}

botao.addEventListener("click", atualizarContato)


function carregarDados() {
    nome.value = contato_edit.nome
    numero.value = contato_edit.numero
    email.value = contato_edit.email
}
carregarDados()