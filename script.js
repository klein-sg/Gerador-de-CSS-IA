let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"


async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    if (!textoUsuario) {
        alert("Descreve algo antes de gerar!");
        return;
    }


    botao.disabled = true;
    botao.innerHTML = "Gerando... ⏳";
    blocoCodigo.textContent = "A IA está pensando...";

    try {
        let resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer + SUA_CHAVE_AQUI" 
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. Nunca use markdown. Formato: primeiro <style>, depois o HTML. Sempre centralize o conteúdo."
                    },
                    { role: "user", content: textoUsuario }
                ]
            })
        })

        let dados = await resposta.json()

        if (resposta.status === 200) {
            let resultado = dados.choices[0].message.content
            blocoCodigo.textContent = resultado
            resultadoCodigo.srcdoc = resultado
        } else {
            blocoCodigo.textContent = "Erro na IA: " + (dados.error?.message || "Erro desconhecido");
        }

    } catch (erro) {
        blocoCodigo.textContent = "Houve um erro de conexão. Verifica a tua internet.";
        console.error(erro);
    } finally {
        // Feedback Visual: Fim
        botao.disabled = false;
        botao.innerHTML = "Gerar Código ⚡️";
    }
}

botao.addEventListener("click", gerarCodigo)