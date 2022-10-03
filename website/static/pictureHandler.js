function newNotePicture(element){
    if(window.event.target.innerText == '+')
    {
        childs = element.childNodes
        childs[childs.length-2].click()
    }
}

function newNotePictureHandler(element, instantSave = 0, note = 0){
    parent = element.parentElement
    childs = parent.childNodes
    for(let x=0;x<childs.length;x++){
        if(childs[x].innerText == '+'){
            addedPictures.push(element.files[element.files.length-1])
            img_src = URL.createObjectURL(element.files[element.files.length-1])
            childs[x].innerHTML = `<div onclick="document.getElementById('u${x}').showModal()" style="height:100%;overflow:hidden"><img style="height:100%;width:100%" src="${img_src}"></div>`+
                                    `<dialog class="picture" id="u${x}">`+
                                        `<img src="${img_src}">`+
                                        `<div class="control">`+
                                        `<div style="border-right: solid rgba(0, 0, 0, 0.356) 0.1px" onclick="document.getElementById('ud${x}').click()"><a href="${img_src}" id="ud${x}" download hidden></a>Atsisiųsti nuotrauką</div>`+
                                        `<div onclick="document.getElementById('u${x}').close()">Išjungti</div>`+                         
                                    `</dialog>`
            break
        }
    }
    if(instantSave = 1){
        console.log('sent')
        sendData('uploadPicture',{'img':element.files[0],'note':note})
    }
}

function instantPictureHandler(element){
    parent = element.parentElement
    childs = parent.childNodes
    for(let x=0;x<childs.length;x++){
        if(childs[x].innerText == '+'){

        }
    }
}