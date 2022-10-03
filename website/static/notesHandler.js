function changeCategory(element, note){
    sendData('changeCategory', {'newCat':element.value, 'note':parseInt(note)})
}

function deleteNote(element, note){
    sendData('deleteNote', {'note':parseInt(note)})
}

function changeNote(element, note){
    console.log(note)
    let parent = element.parentElement
    let deleteBtn = parent.childNodes[3]
    let name = document.getElementsByTagName('h1')[1]
    console.log(deleteBtn)
    if(element.innerText == 'Redaguoti'){
        let text = document.getElementsByTagName('p')[1]
        element.innerText = 'Išsaugoti'
        text.innerHTML = `<textarea style='width:100%;height:${text.offsetHeight}px' value='${text.innerText}'>${text.innerText}</textarea>`
        name.innerHTML = `<input value='${name.innerText}'>`
        deleteBtn.innerText = 'Atšautki'
        deleteBtn.onclick = function(){
            location.reload()
        }
    }
    else {
        let text = document.getElementsByTagName('textarea')[0]
        let new_name = document.getElementsByTagName('input')[0].value
        sendData('updateNote', {'note':parseInt(note),'text':text.value,'name':new_name})
    }
}

function invertNoteColors(element){
    if(window.event.target == element)
        {
        if(element.style.color == 'white'){
            element.style.color = ''
            element.style.background = ''
            element.style.fontWeight = ''
            document.getElementsByTagName('body')[0].style.filter = ''
        }
        else{
            element.style.color = 'white'
            element.style.background = 'black'
            element.style.fontWeight = 'bold'
            document.getElementsByTagName('body')[0].style.filter = 'invert(0.8)'
        }
    }
}