var addedPictures = []

function createNote(category = 1){
    if(document.getElementById('note-name').value == '' || document.getElementById('create-note').value == ''){
        if(document.getElementById('note-name').value == '') document.getElementById('note-name').style.borderColor = 'red'
        else document.getElementById('note-name').style.borderColor = 'blue'
        if(document.getElementById('create-note').value == '') document.getElementById('create-note').style.borderColor = 'red'
        else document.getElementById('create-note').style.borderColor = 'blue'
        return
    }
    if(addedPictures.length < 1 && document.getElementById('cat-picture').files.length > 0){
        for(let x=0;x<document.getElementById('cat-picture').files.length;x++){
            addedPictures.push(document.getElementById('cat-picture').files[x])
        }
    }
    sendData('createNote',{'img':addedPictures,'name':document.getElementById('note-name').value,'note':document.getElementById('create-note').value,'category':parseInt(category)})
}

function createCategory(noNotes){
    let name = document.getElementById('cat-name')
    if(name.value == '') return name.style.borderColor('red')
    let finalNotes = []
    let newNote = ''
    let isNew = 0
    if(noNotes == 0){
        let addedNotes = document.getElementsByClassName('small-list-wrapper')[0].childNodes
        for(let x=0;x<addedNotes.length;x++){
            isNew = 1
            for(let y=0;y<optionElements.length;y++){
                if(optionElements[y][1] == addedNotes[x].innerText){
                    finalNotes.push(optionElements[y][2])
                    isNew = 0
                    break
                }
            }
            if(isNew == 1){
                newNote = addedNotes[x].innerHTML.split("</i> ")[1]
            }
        }
    }
    if(isNew == 1) return sendData('createCategory', {'name':name.value,'notes':finalNotes}, newNote)
    else sendData('createCategory', {'name':name.value,'notes':finalNotes})
}

function sendData(reqType, data, newNote = ''){
    var xml = new XMLHttpRequest()
    var formData = new FormData()

    xml.open("POST", "/category", true)

    if(reqType == 'createNote'){
        if (data.img.length > 0)
        {
            for(let x=0;x<data.img.length;x++){
                formData.append('img', data.img[x])
            }
        }
        formData.append('note', data.note)
        formData.append('name', data.name)
        formData.append('request', reqType)
        if(data.category > 1){
            formData.append('category', data.category)
        }
        xml.send(formData)
    }
    else if(reqType == 'createCategory'){
        formData.append('request',reqType)
        formData.append('name', data.name)
        if(data.notes.length > 0)
        {
            for(let x=0;x<data.notes.length;x++)
            {
                formData.append('notes', data.notes[x])
            }
        }
        if(newNote != ''){
            formData.append('new-note', newNote)
        }
        xml.send(formData)
    }
    else if(reqType == 'uploadPicture'){
        formData.append('request',reqType)
        formData.append('img',data.img)
        formData.append('note',data.note)
        xml.send(formData)
    }
    else if(reqType == 'changeCategory'){
        formData.append('request',reqType)
        formData.append('new-cat', data.newCat)
        formData.append('note', data.note)
        xml.send(formData)
    }
    else if(reqType == 'updateNote'){
        formData.append('request',reqType)
        formData.append('note', data.note)
        formData.append('text', data.text)
        formData.append('name', data.name)
        xml.send(formData)
    }
    else if(reqType == 'deleteNote'){
        formData.append('request',reqType)
        formData.append('note',data.note)
        xml.send(formData)
    }

    xml.onload = function(){
        response = JSON.parse(this.responseText)
        if (response['response'] != 1) return alert(response['response'])
        else if(reqType == 'uploadPicture' || reqType == 'changeCategory') return
        else if(reqType == 'deleteNote') return window.location.replace('/')
        else {
            if(reqType=='createCategory' && newNote != ''){
                document.getElementsByClassName('login')[1].style.border = '0.3rem solid green'
                document.getElementById('note-name').value = newNote
                document.getElementById('note-name').style.border = '0.2rem solid green'
                alert('Dabar galite sukurti užrašą, kuris pateks į Jūsų paskutinę sukurtą kategoriją. Jeigu norite, kad įrašas patektų į kitą kategoriją - perkraukite puslapį.')
                document.getElementsByClassName('login')[0].style.display = 'none'
            }
            else return location.reload()
        }
    }
}