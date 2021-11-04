const btnReset = document.getElementById("btnReset");
const btnSubmit = document.getElementById("btnSubmit"); //Salvando o elemento do botão
botaoIndisponivel(); // Chamar esse metodo para começar com o botão indisponível

const resultado = document.getElementById("resultado");
resultadoFracasso(); // Chamar esse metodo para começar com a mensagem de preenchimento de campos

const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");
const inputEmail = document.getElementById("email");
const inputDescricao = document.getElementById("descricao");
const inputGenero = document.querySelector('input[name="genero"]:checked');
var termos = "nao";

const form = document.querySelector(".form");

document.getElementById("receberEmail").onclick = function () {
    // access properties using this keyword
    if (this.checked) {
        // Returns true if checked
        termos = this.value;
    } else {
        termos = "nao";
    }
};

form.addEventListener("change", () => {
    verificarUsuario();
    if (
        inputUsuario.value != "" &&
        inputSenha.value != "" &&
        inputEmail.value != "" &&
        inputDescricao.value != "" &&
        inputGenero.value != ""
    ) {
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
    //Caso o usuario ja exista
    if (confirmaInformacoes()) {
        //retorne verdadeiro
        alert("Dados registrados com sucesso!");
        limparFomulario();
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
            "\n Email: " +
            inputEmail.value +
            "\n Descrição: " +
            inputDescricao.value +
            "\n Gênero: " +
            inputGenero.value +
            "\n Concorda com os termos? " +
            termos
    );
}

//Configurações padrões do botão de submit
function limparFomulario() {
    inputUsuario.value = "";
    inputSenha.value = "";
    inputDescricao.value = "";
    inputGenero.value = "";
    inputEmail.value = "";
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

//Ler o txt

function verificarUsuario() {
    fetch("js/autenticacao.txt")
        .then((response) => response.text())
        .then((text) => {
            var allrows = text.split("\n");
            for (let row = 0; row < allrows.length; row += 2) {
                if (inputUsuario.value == allrows[row]) {
                    botaoIndisponivel();
                    alert("Usuario já registrado!");
                    return;
                }
            }
        });
}

//encriptar senha
function encrypt() {
    var pass = inputSenha.value;
    var hash = CryptoJS.MD5(pass);
    return hash;
}
