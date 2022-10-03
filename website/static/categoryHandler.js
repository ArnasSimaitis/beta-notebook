function deleteCategory(category){
    sendData("deleteCategory", {'category':category})
}

function updateCategory(element, category){
    let deleteBtn = document.getElementById('deleteCategory')
    let name = document.getElementsByTagName('h1')[1]

    if(element.innerText == 'Redaguoti'){
        deleteBtn.innerText = 'Atšaukti'
        deleteBtn.onclick = function(){ window.location.reload()}
        
        name.innerHTML = `<input id="newCatName" value=${name.innerText}>`

        element.innerText = 'Išsaugoti'
    }
    else{
        let new_name = document.getElementById('newCatName').value
        sendData("updateCategory", {'category':category,'name':new_name})
    }
}