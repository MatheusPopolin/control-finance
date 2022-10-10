let filteredValues = [...insertedValues];
let valueId = insertedValues.length;
const filterButtons = document.querySelectorAll("#filterButton");
listCards(filteredValues);

function createCard(insertedValue){
    const {value, categoryID, id} = insertedValue;
    let card = document.createElement("li");
    card.classList = "card"
    let cardValue = document.createElement("p");
    cardValue.classList = "text_1_medium"
    const valueFormated = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    cardValue.innerText = `${valueFormated}`;
    let div = document.createElement("div");
    div.insertAdjacentHTML("afterbegin",
        `<p class="text_2_regular">${valuesCategory[categoryID-1]}</p>`);
    let trashButton = document.createElement("button");
    trashButton.classList = "icon";
    trashButton.id = id;
    trashButton.insertAdjacentHTML("afterbegin", 
        `<img id="${id}" src="/assets/trash.png" alt="Excluir">`);
    trashButton.addEventListener("click",(event)=>{
        filteredValues.forEach((value,index)=>{
            if(value.id==event.target.id){
                filteredValues.splice(index,1);                
            }
        });
        insertedValues.forEach((value,index)=>{
            if(value.id==event.target.id){
                insertedValues.splice(index,1);                
            }
        });
        listCards(filteredValues);     
    });
    div.appendChild(trashButton);
    card.append(cardValue, div);
    return card;
}   

function listCards(values){
    const cardList = document.getElementById("cardList");
    cardList.innerHTML = ``;

    const insertValueButton = document.querySelector("main #insertValue");
    
    if(values.length===0){
        insertValueButton.classList.remove("none");
        total.innerText = sum(values).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    } else{
        insertValueButton.classList.add("none");
        values.forEach(value => render(cardList,createCard(value)));
        let total = document.getElementById("total");
        total.innerText = sum(values).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
}

function sum(values){
    const sumEntries = values.reduce((total,currentValue)=>{
        if(currentValue.categoryID===1){
            return total+=currentValue.value;
        }
        return total;
    },0);
    const sumExits = values.reduce((total,currentValue)=>{
        if(currentValue.categoryID===2){
            return total+=currentValue.value;
        }
        return total;
    },0);
    let total = sumEntries-sumExits;
    if(sumExits>sumEntries){
        total=total*-1;
    }
    return total;
}

const insertValueButtons = document.querySelectorAll("#insertValue");
insertValueButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        openModal(createModalContent());
    });
});

function filterCards(){    
    filterButtons.forEach(button=>{
        button.addEventListener("click",()=>{            
            if(button.textContent==="Todos"){
                filteredValues = [...insertedValues]
                listCards(filteredValues);
                filterButtons.forEach(button=>button.classList.remove("button_outline_selected"));
                button.classList.toggle("button_outline_selected");

            } else if(button.textContent==="Entradas"){
                filteredValues = insertedValues.filter(value=>value.categoryID===1);
                listCards(filteredValues);
                filterButtons.forEach(button=>button.classList.remove("button_outline_selected"));
                button.classList.toggle("button_outline_selected");

            } else{
                filteredValues = insertedValues.filter(value=>value.categoryID===2);
                listCards(filteredValues);
                filterButtons.forEach(button=>button.classList.remove("button_outline_selected"));
                button.classList.toggle("button_outline_selected");
            }
        });

    });
}
filterCards();

function createModalContent(){
    let modalContainer = document.createElement("section");
    let modalTitle = document.createElement("h2");
    modalTitle.classList = "title_2_bold";
    modalTitle.innerText = "Registro de valor";
    let modalDescription = document.createElement("p");
    modalDescription.classList = "text_1_regular color_grey_2";
    modalDescription.innerText = "Digite o valor e em seguida aperte no botão referente ao tipo do valor";
    let modalDivValue = document.createElement("div");
    modalDivValue.insertAdjacentHTML("afterbegin",
         `<label for="inputValue" class="text_1_medium">Valor</label>
          <input type="number" id="inputValue" placeholder = "00,00" class="text_1_regular color_grey_2">`);
    let modalDivType = document.createElement("div");
    modalDivType.insertAdjacentHTML("afterbegin", 
        `<h3 class="text_1_medium">Tipo de valor</h3>
        <input type="radio" hidden id="type1" value="1" name="valueType">
        <label class="text_1_bold value_type1" for="type1">Entrada</label>
        <input type="radio" hidden id="type2" value="2" name="valueType">
        <label class="text_1_bold value_type2" for="type2">Saída</label>`);
    let modalFooter = document.createElement("footer");
    let cancelButton = document.createElement("button");
    cancelButton.classList = "text_1_bold button_greylow";
    cancelButton.innerText = "Cancelar";
    cancelButton.id = "cancelButton"
    let insertButton = document.createElement("button");
    insertButton.classList = "text_1_bold button_primary";
    insertButton.innerText = "Inserir Valor";
    insertButton.addEventListener("click",(event)=>{
        let {value} = document.getElementById("inputValue");
        value = parseInt(value);
        const type1 = document.getElementById("type1");
        const type2 = document.getElementById("type2");        
        if(value && type1.checked){
            valueId++;
            insertNewValue(valueId, value, 1);   
            filteredValues = [...insertedValues]
            listCards(filteredValues);
            filterButtons.forEach(button=>button.classList.remove("button_outline_selected"));
            document.getElementById("filterButton").classList.add("button_outline_selected");
        } else if(value && type2.checked){
            valueId++;
            insertNewValue(valueId, value, 2);
            filteredValues = [...insertedValues]
            listCards(filteredValues);
            filterButtons.forEach(button=>button.classList.remove("button_outline_selected"));
            document.getElementById("filterButton").classList.add("button_outline_selected"); 
        }
        event.path[3].remove();
    });
    modalFooter.append(cancelButton,insertButton);
    modalContainer.append(modalTitle, modalDescription, modalDivValue, modalDivType, modalFooter);
    return modalContainer;
}

function insertNewValue(id,value,categoryID){
    let newValue = {id, value, categoryID};
    insertedValues.push(newValue);    
}

