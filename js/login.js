const resultado = document.getElementById("resultado");
resultado.innerHTML = "Usuário inválido!";

const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");

const form = document.querySelector(".form");
form.addEventListener("change", () => {
    resultado.innerHTML = "Usuário inválido!";
    verificaLogin();
});

function verificaLogin() {
    fetch("js/autenticacao.txt")
        .then((response) => response.text())
        .then((text) => {
            var allrows = text.split("\n");
            for (let row = 0; row < allrows.length; row += 2) {
                if (inputUsuario.value == allrows[row]) {
                    resultado.innerHTML = "";
                    for (let row = 1; row < allrows.length; row += 2) {
                        resultado.innerHTML = "Senha inválida!";
                        if (encrypt() == allrows[row]) {
                            resultado.innerHTML = "";
                            limparFomulario();
                            alert("Login feito com sucesso!");
                            return;
                        }
                    }
                }
            }
        });
}

function limparFomulario() {
    inputUsuario.value = "";
    inputSenha.value = "";
}

//encriptar senha
function encrypt() {
    var pass = inputSenha.value;
    if (pass == "") {
        return false;
    } else {
        var hash = CryptoJS.MD5(pass);
        return hash;
    }
}
