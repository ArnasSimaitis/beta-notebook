document.getElementById('cat-picture').addEventListener('change', function(){
    document.getElementById('imgCount').innerText = document.getElementById('cat-picture').files.length
    //alert(document.getElementById('cat-picture').files[0].size)
})

function createNote(){
    if(document.getElementById('note-name').value == '' || document.getElementById('create-note').value == ''){
        if(document.getElementById('note-name').value == '') document.getElementById('note-name').style.borderColor = 'red'
        else document.getElementById('note-name').style.borderColor = 'blue'
        if(document.getElementById('create-note').value == '') document.getElementById('create-note').style.borderColor = 'red'
        else document.getElementById('create-note').style.borderColor = 'blue'
        return
    }
    sendData('createNote',{'img':document.getElementById('cat-picture').files,'name':document.getElementById('note-name').value,'note':document.getElementById('create-note').value})
}

function sendData(reqType, data){
    console.log(reqType,data)
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
        xml.send(formData)
    }

    xml.onload = function(){
        response = JSON.parse(this.responseText)
        console.log(response)
        if (response['response'] != 1) return alert(response['response'])
        else return location.replace('/category')
    }
}