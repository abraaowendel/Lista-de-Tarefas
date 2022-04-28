
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const sendBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco))

const criarItem = (tarefa, status, index) =>{
  const item = document.createElement('label')
  item.classList.add('box__item')
  item.innerHTML = `
    <input type="checkbox" ${status} data-index="${index}">
    <div>${tarefa}</div>
    <input type="button" value="X" data-index="${index}">
  `
  document.querySelector('.box').appendChild(item)
}
const inserirItem = (event) => {
     if(event.key === 'Enter'){
        let tarefa = event.target.value;
        const banco = getBanco();
        banco.push({tarefa: `${tarefa}`, status: ""})
        sendBanco(banco)
        limparConteudo();
        atualizarTela();
     }
}

const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, index) => criarItem(item.tarefa, item.status, index))
}

const limparTarefas = () =>{
  const todoList = document.querySelector('.box');
  //ENQUANTO EXISTIR O PRIMEIRO
  while(todoList.firstChild){
    todoList.removeChild(todoList.lastChild) // REMOVA O ÚLTIMO
  }
}

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1)
  sendBanco(banco);
  atualizarTela();
}

const atualizarStatus = (indice) =>{
     const banco = getBanco();
     banco[indice].status = banco[indice].status === ""? "checked":"";
     sendBanco(banco);
     atualizarTela();
}

const clickItem = (element) => {
    const elemento = element.target;
    const indice = elemento.dataset.index;
    switch(elemento.type){
      case "button":
        removerItem(indice);
        break
      case "checkbox":
        atualizarStatus(indice)
        break
    }
};

document.querySelector('.box').addEventListener("click", clickItem) 

const limparConteudo = () => document.querySelector('.box__new-item input').value = '';

document.querySelector('.box__new-item').addEventListener("keypress", inserirItem) 

atualizarTela();
