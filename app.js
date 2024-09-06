function adicionarDias(data, dias) { //calcular quanto tempo para a recuperação
    let novaData = new Date(data);
    novaData.setDate(novaData.getDate() + dias);
    return novaData;
  }

function pesquisar() {
  // Seleciona o elemento HTML com o ID "resultados-pesquisa" e armazena em uma variável.
  // Este elemento será preenchido com os resultados da pesquisa.
  let section = document.getElementById("resultados-pesquisa");
  console.log(section); // Linha usada para depuração, mostra o elemento no console do navegador.

  // Inicializa uma string vazia para armazenar os resultados da pesquisa.
  // Conforme o loop, cada item será adicionado a esta string.
  let resultados = "";

  // Itera sobre cada "dado" dentro da lista de dados (assumindo que 'dados' seja um array de objetos).
  // Para cada dado, cria um novo elemento HTML e adiciona-o à string 'resultados'.
  for (let dado of dados) {
    // Cria uma nova div para representar um item de resultado.
    // Utiliza template literals (``) para construir a string HTML de forma mais legível.
    // Cada propriedade do objeto 'dado' é inserida em seu respectivo elemento HTML.

    // Data da lesão
    let dataInicio = new Date(dado.dataInicioLesao);

    // Extraindo o número e a unidade (segundo o Gemini, aqui ele separa entre o número "cheio" e qual unidade de tempo ele vai multiplicar na próxima função)
    let [numero, unidade] = dado.tempoEstimadoRecuperacao.split(' ');
    let tempoEmDias = parseInt(numero); // Segundo o Gemini novamente, aqui ele transforma o texto número em um número de fato pra poder usar abaixo. Faz sentido.

    // Convertendo para dias
    let tempoRecuperacaoEmDias = tempoEmDias;
    if (unidade === 'meses') {
      tempoRecuperacaoEmDias *= 30; // Assumindo 30 dias por mês
    } else if (unidade === 'semanas') {
      tempoRecuperacaoEmDias *= 7;
    }

    // Calculando a data de recuperação
    let dataRecuperacao = adicionarDias(dataInicio, tempoRecuperacaoEmDias);

    // Formatando a data
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dataFormatada = dataRecuperacao.toLocaleDateString('pt-BR', options);

    resultados += `<div class="item-resultado">
      <h2>
        <a href="#" target="_blank">${dado.nome}</a>
      </h2>
      <p class="posicao-meta">${dado.posicao}</p>
      <p class="lesao-meta">${dado.lesao}</p>
      <p class="tempoEstimadoRecuperacao-meta">${dado.tempoEstimadoRecuperacao}</p>
      <p>Data estimada de recuperação: ${dataFormatada}</p>
      <p class="descricao-meta">${dado.descricao}</p>
      <a href=${dado.instagram} target="_blank">Confira a recuperação do jogador no Instagram</a>
    </div>`;
  }

  // Atribui a string completa de resultados ao conteúdo HTML do elemento 'section'.
  // Isso substitui o conteúdo anterior do elemento com os novos resultados.
  section.innerHTML = resultados;
}