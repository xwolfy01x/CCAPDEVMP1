function removeBg() {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
    document.getElementsByTagName('body')[0].style.backgroundColor = '#444444';
}
var firebaseConfig = {
    apiKey: "AIzaSyBfu8nmRL9wRyL0So8840PIK_K5hUWu5MQ",
    authDomain: "website-resume-5cf5d.firebaseapp.com",
    databaseURL: "https://website-resume-5cf5d.firebaseio.com",
    projectId: "website-resume-5cf5d",
    storageBucket: "website-resume-5cf5d.appspot.com",
    messagingSenderId: "378855045633",
    appId: "1:378855045633:web:b82f9dc66bacd1be631e00",
    measurementId: "G-BSMS4DK398"
};
var defaultProject = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        showContent(1);
        document.getElementsByClassName('form')[0].style.display='none';
        document.getElementsByClassName(`container`)[0].style.display = 'grid';
        document.getElementsByClassName(`container`)[0].style.gridTemplateColumns ='350px 1fr';
        getIndex();
    }).catch(function(error) {
        alert(error);
    });
}
function hideAll() {
    let buttons = ['intro', 'education', 'works', 'orgs'];
    for (let x=1; x<=2; x++) {
        document.getElementsByClassName(`right-col${x}`)[0].style.display ='none';
        document.getElementById(buttons[x-1]).style.borderBottom='3px solid #444444';
        document.getElementById(buttons[x-1]).style.color='white';
        document.getElementById(buttons[x-1]).style.backgroundColor='#222222';
    }
    document.getElementById('addHobbyForm').style.display='none';
    document.getElementById('editDescriptionForm').style.display='none';
    document.getElementById('editContactLinks').style.display='none';
}
function showContent(x) {
    hideAll();
    let buttons = ['intro', 'education', 'works', 'orgs'];
    document.getElementById('number').value=1;
    document.getElementById(buttons[x-1]).style.backgroundColor = '#E1E7E4';
    document.getElementById(buttons[x-1]).style.color = 'black';
    document.getElementById(buttons[x-1]).style.borderBottom = '3px solid green';
    document.getElementsByClassName(`right-col${x}`)[0].style.display ='block';
}

function getIndex() {
    document.getElementById('description').innerHTML='';
    document.getElementById('hobbies').innerHTML='';
    document.getElementById('links').innerHTML='';
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('description').innerHTML+=`${doc.data().description}`;
            document.getElementById('description').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML+=`${doc.data().description}`;
        });
    });
    db.collection("hobbies").orderBy('name','asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('hobbies').innerHTML+=`<img src="public/images/removehobby.png" height="15" width="15" style="cursor: pointer" onclick="removeHobby('${doc.id}');"> ${doc.id}<br><br>`;
        });
    });
    db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var object={link: doc.data().link, id: doc.id};
            document.getElementById('links').innerHTML+=`<img src="${doc.data().imglink}" id="contactimg"></div>`;
            if (doc.data().name==='call' || doc.data().name==='email')
                document.getElementById('links').innerHTML+=`<span id="contactlink">${doc.data().link}</span>`;
            else document.getElementById('links').innerHTML+=`<a id="contactlink" href=${doc.data().link}>${doc.data().link}</a>`;
            document.getElementById('links').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick='showContactForm("${doc.id}");'>`;
        });
    });
}
function getEducation() {
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('educdescription').innerHTML=`${doc.data().description}<br><br><br>`;
            document.getElementById('descriptionBox').innerHTML+=`${doc.data().description}`;
        });
    });
    db.collection("educations").orderBy("year_start","asc").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('educschool').innerHTML = `${doc.data().school}`;
                document.getElementById('educlevel').innerHTML = `${doc.data().level.toUpperCase()}`;
                document.getElementById('educimglink').innerHTML = `<img src=${doc.data().imglink} style="border-radius: 50%;">`;
                document.getElementById('educyear').innerHTML = `${doc.data().year_start}-`;
                if (doc.data().year_end != null)
                    document.getElementById('educyear').innerHTML += `${doc.data().year_end}`;
                else document.getElementById('educyear').innerHTML += `present`;
                if(doc.data().degree!=null) {
                    document.getElementById('educdegree').innerHTML = `${doc.data().degree}`;
                    document.getElementById('deg').innerHTML = 'Degree';
                    document.getElementById('deg').style.borderBottom = '3px solid gray';
                }  
                else {
                    document.getElementById('deg').innerHTML = '';
                    document.getElementById('deg').style.borderBottom = 'none';
                    document.getElementById('educdegree').innerHTML = ``;  
                }
            }
            counter++;
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('educprev').style.display='none';
        else document.getElementById('educprev').style.display='block';    
        ;
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('educnext').style.display='none';
        else document.getElementById('educnext').style.display='block';    
    });
}
document.getElementById('educnext').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    getEducation();
}
document.getElementById('educprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    getEducation();
}
function showHobbyForm() {
    document.getElementById('addHobbyForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideHobbyForm() {
    document.getElementById('addHobbyForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function editDescription(x) {
    db.collection("others").doc(x).update({
        description: document.getElementById('descriptionBox').value
    }).then(function(docRef) {
        getIndex();
        console.log("Description updated!");
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}
function addHobby() {
    db.collection("hobbies").add({
        name: document.getElementById('hobbybox').value
    }).then(function(docRef) {
        getIndex();
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function removeHobby(x) {
    db.collection("hobbies").doc(x).delete().then(function() {
        console.log("Document successfully deleted!");
        getIndex();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function showDescForm() {
    document.getElementById('editDescriptionForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideDescForm() {
    document.getElementById('editDescriptionForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function editContact() {
    console.log(document.getElementById('contactidbox').value);
    db.collection("links").doc(document.getElementById('contactidbox').value).update({
        link: document.getElementById('contactbox').value
    }).then(function(docRef) {
        hideContactForm();
        getIndex();
        console.log("Description updated!");
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}
function showContactForm(x) {
    db.collection("links").doc(x).get().then((doc) => {
        document.getElementById('contacticon').innerHTML = `<img src="${doc.data().imglink}" style="width: 50; height: 30; display: inline-block;">`
        document.getElementById('contactbox').value=doc.data().link;
        document.getElementById('contactidbox').value=doc.id;
    });
    document.getElementById('editContactLinks').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideContactForm() {
    document.getElementById('editContactLinks').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}