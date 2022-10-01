function login(){
    var username = document.getElementById('login-username')
    var password = document.getElementById('login-password')
    if(!password.value || !username.value)
    {
        if(!password.value) password.style.borderColor = 'red'
        else password.style.borderColor = 'blue'
        if(!username.value) username.style.borderColor = 'red'
        else username.style.borderColor = 'blue'
        return
    }
    sendData('login', {'username':username.value, 'password':password.value})
}

function register(){
    let username = document.getElementById('reg-username')
    let email = document.getElementById('reg-email')
    let password = document.getElementById('reg-pass')
    let confirm = document.getElementById('reg-pass-confirm')
    if(!username.value || !email.value || !password.value || !confirm.value){
        if(!username.value) username.style.borderColor = 'red'
        else username.style.borderColor = 'blue'
        if(!email.value) email.style.borderColor = 'red'
        else email.style.borderColor = 'blue'
        if(!password.value) password.style.borderColor = 'red'
        else password.style.borderColor = 'blue'
        if(!confirm.value) confirm.style.borderColor = 'red'
        else confirm.style.borderColor = 'blue'
        return
    }
    sendData('register', {'username':username.value, 'password':password.value, 'email':email.value, 'confirm':confirm.value})
}

function sendData(reqType, data){
    var xml = new XMLHttpRequest()
    xml.open("POST", "/welcome", true)
    xml.setRequestHeader('Content-Type', 'application/json')
    if (reqType == 'login'){
        xml.send(JSON.stringify({
            'request':reqType,
            'username':data.username,
            'password':data.password
        }))
    }
    else if(reqType == 'register'){
        xml.send(JSON.stringify({
            'request':reqType,
            'username':data.username,
            'password':data.password,
            'confirm':data.confirm,
            'email':data.email
        }))
    }
    xml.onload = function(){
        response = JSON.parse(this.responseText)
        if (response['response'] != 1) return alert(response['response'])
        else return location.replace('/')
    }
}