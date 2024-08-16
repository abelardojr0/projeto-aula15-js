const formulario = document.querySelector("#formulario")
const nome = document.querySelector("#nome")
const numero = document.querySelector("#numero")
const email = document.querySelector("#email")
const contatos = document.querySelector("#contatos")

    const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
    let contador = 1
    if(lista_de_contatos.length > 0){
        contador = lista_de_contatos[lista_de_contatos.length - 1].id + 1
    }


function criarCard(objeto_contato){
    const novo_elemento = document.createElement("div")

    const elemento_nome = document.createElement("h2")
    elemento_nome.textContent = `Nome: ${objeto_contato.nome}`

    const elemento_numero = document.createElement("p")
    elemento_numero.textContent = `Número de telefone: ${objeto_contato.numero}`

    const elemento_email = document.createElement("p")
    elemento_email.textContent = `E-mail: ${objeto_contato.email}`

    const elemento_div_botoes = document.createElement("div")
    elemento_div_botoes.classList.add("div_botoes")

    const elemento_editar = document.createElement("img")
    elemento_editar.classList.add("icon")
    elemento_editar.src = "./edit_icon.png"


    elemento_editar.addEventListener("click", ()=>{
        const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
        lista_de_contatos.forEach((contato_da_vez)=>{
            if(objeto_contato.id === contato_da_vez.id){
                const index = lista_de_contatos.indexOf(contato_da_vez)
                localStorage.setItem("contato_edit", JSON.stringify(lista_de_contatos[index]))
                window.location.href = "./edit.html"
            }
        })
    })

    const elemento_excluir = document.createElement("img")
    elemento_excluir.classList.add("icon")
    elemento_excluir.src = "./delete_icon.png"

    elemento_excluir.addEventListener("click", ()=>{
        const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
        lista_de_contatos.forEach((contato_da_vez)=>{
            if(objeto_contato.id === contato_da_vez.id){
                const index = lista_de_contatos.indexOf(contato_da_vez)

                lista_de_contatos.splice(index, 1)
            }
        })
        localStorage.setItem("lista",JSON.stringify(lista_de_contatos))
        contatos.removeChild(novo_elemento)
    })

    elemento_div_botoes.append(elemento_editar,elemento_excluir )

    novo_elemento.append(elemento_nome,elemento_numero,elemento_email, elemento_div_botoes )
    novo_elemento.classList.add("box")

    contatos.appendChild(novo_elemento)
}

function cadastrarContato(e){
    e.preventDefault()
    const objeto = {
        id: contador,
        nome: nome.value,
        numero: numero.value,
        email: email.value
    }
    contador ++

    criarCard(objeto)

    const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
    lista_de_contatos.push(objeto)

    localStorage.setItem("lista",JSON.stringify(lista_de_contatos))

    nome.value = ""
    numero.value = ""
    email.value = ""
    nome.focus()
}


function mascararTelefone(value) {
    let digitos = value.replace(/\D/g, '');

    digitos = digitos.replace(/^(\d{2})(\d)/g, '($1) $2');
    digitos = digitos.replace(/(\d{5})(\d)/, '$1-$2');

    return digitos;
}

numero.addEventListener('input', (e) => {
    const valorMascarado = mascararTelefone(e.target.value);
    numero.value = valorMascarado;
});


function carregarPagina(){
    const lista_de_contatos = JSON.parse(localStorage.getItem("lista")) || []
    lista_de_contatos.forEach((contato_da_vez) =>{
        criarCard(contato_da_vez)
    })
}

carregarPagina()

formulario.addEventListener("submit", cadastrarContato)
