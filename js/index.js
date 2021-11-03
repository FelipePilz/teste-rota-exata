const btnReset = document.getElementById("btnReset");
const btnSubmit = document.getElementById("btnSubmit"); //Salvando o elemento do botão
botaoIndisponivel(); // Chamar esse metodo para começar com o botão indisponível

const resultado = document.getElementById("resultado");
resultadoFracasso(); // Chamar esse metodo para começar com a mensagem de preenchimento de campos

const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");
const inputDescricao = document.getElementById("descricao");

const form = document.querySelector(".form");

form.addEventListener("change", () => {
    if (inputUsuario.value != "" && inputSenha.value != "" && inputDescricao.value != "") {
        resultadoSucesso();
        botaoDisponivel();
    } else {
        botaoIndisponivel();
        resultadoFracasso();
    }
});

//Prevenindo o botao ficar disponivel mesmo sem nada escrito nos campos
btnReset.addEventListener("click", () => {
    botaoIndisponivel();
    resultadoFracasso();
});

form.addEventListener("submit", (event) => {
    if (confirmaInformacoes()) {
        //retorne verdadeiro
        limparFomulario();
        event.preventDefault();
    } else {
        //retorne falso
        event.preventDefault();
        return;
    }
});

function confirmaInformacoes() {
    return confirm(
        "Os seus dados são? \n Usuário: " +
            inputUsuario.value +
            "\n Senha: " +
            inputSenha.value +
            "\n Descrição: " +
            inputDescricao.value
    );
}

//Configurações padrões do botão de submit
function limparFomulario() {
    inputUsuario.value = "";
    inputSenha.value = "";
    inputDescricao.value = "";
    resultadoFracasso();
    botaoIndisponivel();
}

function botaoIndisponivel() {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.5;
    btnSubmit.style.cursor = "not-allowed";
}

function botaoDisponivel() {
    btnSubmit.disabled = false;
    btnSubmit.style.opacity = 1;
    btnSubmit.style.cursor = "pointer";
}

//Configurações padrões do resultado
function resultadoFracasso() {
    resultado.innerHTML = "Preencha todos os campos!";
}

function resultadoSucesso() {
    resultado.innerHTML = "";
}
