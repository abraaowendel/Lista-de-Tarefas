const criarItem = (tarefa, status) =>{
  const item = document.createElement('label')
  item.classList.add('box__item')

  item.innerHTML = `
    <input type="checkbox">${status}
    <div>${tarefa}</div>
    <input type="button" value="X">
  `
  document.querySelector('.box').appendChild(item)
}
const inserirItem = (event) => {
     if(event.key === 'Enter'){
        let tarefa = event.target.value;
        criarItem(tarefa, '')
        limparConteudo();
     }
}

const limparConteudo = () => document.querySelector('.box__new-item input').value = ''


document.querySelector('.box__new-item').addEventListener("keypress", inserirItem) 