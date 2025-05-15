// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    const lista = document.getElementById('listaDeTarefas');
    lista.innerHTML = ''; // Limpa a lista atual
  
    const tarefas = getTarefas(); // Busca no localStorage
  
    // Limita a exibição para até 5 tarefas
    const tarefasLimitadas = tarefas.slice(0, 5);
  
    // Para cada tarefa, cria um item na lista
    tarefasLimitadas.forEach(tarefa => {
      const li = document.createElement('li');
  
      li.innerHTML = `
        ${tarefa.title}
        <button class="btn-excluir" onclick="deletarTarefa(${tarefa.id})">Excluir</button>
      `;
  
      lista.appendChild(li);
    });
  }
  
  // Função para adicionar uma nova tarefa
  function adicionarTarefa() {
    const input = document.getElementById('novaTarefaInput');
    const title = input.value.trim();
  
    if (!title) return alert("Por favor, digite uma tarefa!");
  
    const novaTarefa = {
      id: Date.now(), // ID único baseado no horário
      title
    };
  
    salvarTarefa(novaTarefa); // Salva a nova tarefa
    input.value = ''; // Limpa o campo
    carregarTarefas(); // Atualiza a lista
  }
  
  // Função para deletar uma tarefa
  function deletarTarefa(id) {
    let tarefas = getTarefas();
    tarefas = tarefas.filter(t => t.id != id); // Remove a tarefa pelo ID
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o localStorage
    carregarTarefas(); // Atualiza a lista
  }
  
  // Função para buscar tarefas no localStorage
  function getTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
  }
  
  // Função para salvar uma nova tarefa
  function salvarTarefa(tarefa) {
    const tarefas = getTarefas();
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  // Carrega as tarefas assim que a página abre
  window.onload = carregarTarefas;