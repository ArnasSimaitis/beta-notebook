function createNote(){
    let name = document.getElementById('note-name')
    let note = document.getElementById('create-note')
    
    if(name.value == '') return name.style.borderColor = 'red'
    else{
        name.style.borderColor = ''
    }

    if(note.value == '') return note.style.borderColor = 'red'
    else note.style.borderColor = ''

    for(let x=0;x<10;x++){
        if(window.localStorage.getItem(`name${x}`) == null){
            window.localStorage.setItem(`name${x}`, name.value)
            window.localStorage.setItem(`note${x}`, note.value)
            note.value = ''
            name.value = ''
            break
        }
    }

    location.reload()
}

function displayNotes(){
    const wrapper = document.getElementsByClassName('cat-wrapper')[0]

    let categories = []
    let name = []
    let notesPictures = []
    let pictureInfo = []
    let note = []

    for(let y=0;y<10;y++){
        if(window.localStorage.getItem(`note${y}`) == null) continue
        x = categories.length
        categories.push(document.createElement('div'))
        categories[x].className = 'categories'
        wrapper.appendChild(categories[x])

        name.push(document.createElement('h1'))
        name[x].innerText = window.localStorage.getItem(`name${y}`)
        name[x].onclick = function(){ location.replace(`/guest?note=${y}`) }
        categories[x].appendChild(name[x])

        notesPictures.push(document.createElement('div'))
        notesPictures[x].className = 'notes-pictures'
        categories[x].appendChild(notesPictures[x])

        pictureInfo.push(document.createElement('div'))
        pictureInfo[x].onclick = function(){location.replace('/logout')}
        pictureInfo[x].innerText = 'Kad galėtumėte pridėti nutoraukas - prisijunkite'
        notesPictures[x].appendChild(pictureInfo[x])

        note.push(document.createElement('p'))
        note[x].innerText = window.localStorage.getItem(`note${y}`)
        categories[x].appendChild(note[x])
    }
}

function noteInfo(noteid){
    if(window.localStorage.getItem(`name${noteid}`) == null && window.localStorage.getItem(`note${noteid}`) == null){
        return location.replace('/guest')
    }
    let name = document.getElementById('name')
    let note = document.getElementById('note')

    name.innerText = window.localStorage.getItem(`name${noteid}`)
    note.innerText = window.localStorage.getItem(`note${noteid}`)
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

function deleteNote(note){
    window.localStorage.removeItem(`note${note}`)
    window.localStorage.removeItem(`name${note}`)
    window.location.replace('/guest')
}

function editMode(noteid){
    let editBtn = document.getElementById('edit')
    let name = document.getElementById('name')
    let note = document.getElementById('note')
    let deleteBtn = document.getElementById('delete')

    if(editBtn.innerText == 'Redaguoti'){      
        name.innerHTML = `<input id="edit_name" value="${name.innerText}">`
        note.innerHTML = `<textarea style='width:100%;height:${note.offsetHeight}px' value='${note.innerText}'>${note.innerText}</textarea>`

        deleteBtn.innerText = 'Atšaukti'
        deleteBtn.onclick = function(){window.location.reload()}

        editBtn.innerText = 'Išsaugoti'
    }
    else{
        name.innerHTML = document.getElementById('edit_name').value
        note.innerHTML = document.getElementsByTagName('textarea')[0].value

        deleteBtn.innerText = 'Ištrinti'
        deleteBtn.onclick = function(){deleteNote(noteid)}

        editBtn.innerText = 'Redaguoti'

        window.localStorage.setItem(`name${noteid}`, name.innerText)
        window.localStorage.setItem(`note${noteid}`, note.innerText)
    }
}