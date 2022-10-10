function openModal(children){
    const backgroundContainer = document.createElement("section");
    const closeModalButton = document.createElement("button");

    backgroundContainer.classList.add("modal_background");
    children.classList.add("modal_container");
    
    closeModalButton.classList = "modal_close title_2_bold";
    closeModalButton.id = "closeModalButton"
    closeModalButton.innerText = "X";

    backgroundContainer.addEventListener("click", (event)=> {
        const {className, id} = event.target;
        if(className === "modal_background" || id === "closeModalButton" || id === "cancelButton"){
            backgroundContainer.remove();
        }
    })

    children.appendChild(closeModalButton);
    backgroundContainer.appendChild(children);
    document.querySelector("body").appendChild(backgroundContainer);
}



