// Practice your JS here!
let url = "http://localhost:3000/resources"
let dogURL = "https://dog.ceo/api/breeds/image/random/4"
let mainDiv = document.querySelector('#main-div')
let form = document.querySelector('.userinfo')



//requst info from back-end
fetch(url)
.then(res => res.json())
.then(userList => {
    console.log(userList)
    userList.forEach(userLists => {
        createList(userLists)
    });
})

//subtmit info
form.addEventListener('submit', (event) => {
    let userName = event.target.names.value;
    let userEmail = event.target.emails.value;
    let userPhone = event.target.phones.value;
    event.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            phone: userPhone
        })
    })
    .then(res => res.json())
    .then(newList => {
        createList(newList)
    })
})




//Create a uer info list
function createList(userInfo) {
    let userUl = document.createElement('ul')
    let nameList = document.createElement('li')
    let emailList = document.createElement('li')
    let phoneList = document.createElement('li')
    let editorbtn = document.createElement('button')
    let delbtn = document.createElement('button')

    userUl.className = "list"

    nameList.className = "infolist"
    nameList.id = "name"

    emailList.className = "infolist"
    emailList.id = "email"

    phoneList.className = "infolist"
    phoneList.id = "phone"

    editorbtn.innerText = "Edit"
    delbtn.innerText = "Deleted"

    nameList.innerText = userInfo.name
    emailList.innerText = userInfo.email
    phoneList.innerText = userInfo.phone

    userUl.append(nameList, emailList, phoneList, editorbtn, delbtn)
    mainDiv.append(userUl)

    editorbtn.addEventListener('click', (even) => {
        let name = document.querySelector('#names').value
        let email = document.querySelector('#emails').value
        let phone = document.querySelector('#phones').value

        if(name != "") {
           userInfo.name = name
        }else if(email != "") {
           userInfo.email = email
        }else if(phone != ""){
           userInfo.phone = phone
        }

        fetch(`http://localhost:3000/resources/${userInfo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone
            })  
        })
        .then(res => res.json())
        .then((edit) => {
            console.log(edit.phone)

            //Edit DOM
                nameList.innerText = edit.name
                emailList.innerText = edit.email
                phoneList.innerText = edit.phone 

            //Edit Memory
                edit.name = userInfo.name
                edit.email = userInfo.email
                edit.phone = userInfo.phone
            
        })
    })

    delbtn.addEventListener('click', (event) => {
        fetch(`http://localhost:3000/resources/${userInfo.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(
            userUl.remove()
        )
    })
}


/*let showBtn = document.createElement('button')
showBtn.className = "dogImg"
showBtn.innerText = "Show my favorite dog"*/ 