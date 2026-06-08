const usuariosFixos = {
    tutor:      { senha: "123456",   papel: "tutor",      nome: "Tutor" },
    candidato:  { senha: "cand!098", papel: "candidato",  nome: "Candidato" },
    Ong:        { senha: "ong$-135", papel: "ong",        nome: "ONG" },
    prefeitura: { senha: "pref@456", papel: "prefeitura", nome: "Prefeitura" },
};

function senhaEfetiva(login) {
    if (usuariosFixos[login]) {
        var override = localStorage.getItem("senhaOverride_" + login);
        return override || usuariosFixos[login].senha;
    }
    var dados = JSON.parse(localStorage.getItem("usuariosCadastrados") || "{}");
    return dados[login] ? dados[login].senha : null;
}

function fazerLogin() {
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value;
    var nome = login;

    if (usuariosFixos[login]) {
        if (senhaEfetiva(login) !== senha) {
            alert("Senha incorreta");
            return;
        }
        nome = usuariosFixos[login].nome;
        sessionStorage.setItem("usuario", login);
        sessionStorage.setItem("papel", usuariosFixos[login].papel);
        sessionStorage.setItem("nome", nome);
        window.location.href = "pagina-principal.html";
        return;
    }

    const dados = JSON.parse(localStorage.getItem("usuariosCadastrados") || "{}");
    const user = dados[login];
    if (!user) {
        alert("Usuário não encontrado");
        return;
    }
    if (user.senha !== senha) {
        alert("Senha incorreta");
        return;
    }
    nome = user.nome || login;
    sessionStorage.setItem("usuario", login);
    sessionStorage.setItem("papel", user.papel);
    sessionStorage.setItem("nome", nome);
    window.location.href = "pagina-principal.html";
}

function redefinirSenha(login, novaSenha) {
    if (usuariosFixos[login]) {
        localStorage.setItem("senhaOverride_" + login, novaSenha);
        return true;
    }
    var dados = JSON.parse(localStorage.getItem("usuariosCadastrados") || "{}");
    if (!dados[login]) return false;
    dados[login].senha = novaSenha;
    localStorage.setItem("usuariosCadastrados", JSON.stringify(dados));
    return true;
}
