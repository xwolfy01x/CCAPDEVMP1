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
document.getElementsByClassName('form')[0].addEventListener('click', (event) => {
    event.preventDefault();
});
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
    for (let x=1; x<=4; x++) {
        document.getElementsByClassName(`right-col${x}`)[0].style.display ='none';
        document.getElementById(buttons[x-1]).style.borderBottom='3px solid #444444';
        document.getElementById(buttons[x-1]).style.color='white';
        document.getElementById(buttons[x-1]).style.backgroundColor='#222222';
    }
    document.getElementById('addHobbyForm').style.display='none';
    document.getElementById('editDescriptionForm').style.display='none';
    document.getElementById('editContactLinks').style.display='none';
    document.getElementById('removeEducPrompt').style.display='none';
    document.getElementById('addEducForm').style.display='none';
    document.getElementById('removeWorkPrompt').style.display='none';
    document.getElementById('addWorkForm').style.display='none';
    document.getElementById('addOrgForm').style.display='none';
    document.getElementById('removeOrgPrompt').style.display='none';
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
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    db.collection("hobbies").orderBy('name','asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('hobbies').innerHTML+=`<img src="public/images/removehobby.png" height="15" width="15" style="cursor: pointer" onclick="removeHobby('${doc.id}');"> ${doc.data().name}<br><br>`;
        });
    });
    db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('links').innerHTML+=`<img src="${doc.data().imglink}" id="contactimg"></div>`;
            if (doc.data().name==='call' || doc.data().name==='email')
                document.getElementById('links').innerHTML+=`<span id="contactlink">${doc.data().link}</span>`;
            else document.getElementById('links').innerHTML+=`<a id="contactlink" href=${doc.data().link}>${doc.data().link}</a>`;
            document.getElementById('links').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick='showContactForm("${doc.id}");'>`;
        });
    });
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
        getEducation();
        getWorks();
        getOrgs();
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
        document.getElementById('hobbybox').value='';
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
function getEducation() {
    document.getElementById('educdescription').innerHTML='';
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('educdescription').innerHTML=`${doc.data().description}`;
            document.getElementById('educdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right; display: inline-block" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    db.collection("educations").orderBy("year_start","asc").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('educschool').innerHTML = `${doc.data().school}`;
                document.getElementById('educlevel').innerHTML = `${doc.data().level.toUpperCase()}`;
                document.getElementById('educimglink').innerHTML = `<img src=${doc.data().imglink} height="200" width="200" style="border-radius: 50%;">`;
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
                document.getElementById('remEducButton').setAttribute("onclick", `showWarning(); document.getElementById('educdocid').value='${doc.id}'`);
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
function showWarning() {
    document.getElementById('removeEducPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideWarning() {
    document.getElementById('removeEducPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function removeEduc() {
    var x=document.getElementById('educdocid').value;
    db.collection("educations").doc(`${x}`).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById('number').value=1;
        getEducation();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function showAddEduc() {
    document.getElementById('addEducForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideAddEduc() {
    document.getElementById('addEducForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function addEduc() {
    db.collection("educations").add({
        school: document.getElementById('educschoolbox').value,
        level: document.getElementById('educlevelbox').value,
        imglink: document.getElementById('educschoollogo').value,
        degree: document.getElementById('educdegreebox').value,
        year_start: parseInt(document.getElementById('educyearstartbox').value,10),
        year_end: parseInt(document.getElementById('educyearendbox').value,10)
    }).then(function(docRef) {
        getEducation();
        document.getElementById('educschoolbox').value='';
        document.getElementById('educlevelbox').value='';
        document.getElementById('educschoollogo').value='';
        document.getElementById('educdegreebox').value='';
        document.getElementById('educyearstartbox').value='';
        document.getElementById('educyearendbox').value='';
        document.getElementById('number').value=1;
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function getWorks() {
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('workdescription').innerHTML=`${doc.data().description}`;
            document.getElementById('workdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right; display: inline-block" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    db.collection("works").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('workname').innerHTML = doc.data().name.toUpperCase();
                document.getElementById('workdescription2').innerHTML = `${doc.data().description}`;
                document.getElementById('workyear').innerHTML = `${doc.data().year_created}`;
                document.getElementById('worklink').innerHTML = `${doc.data().link}`;
                link=doc.data().link;
            }
            counter++;
            document.getElementById('remWorkButton').setAttribute("onclick", `showWarning2(); document.getElementById('workdocid').value='${doc.id}'`);
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('workprev').style.display='none';
        else document.getElementById('workprev').style.display='block';    
        ;
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('worknext').style.display='none';
        else document.getElementById('worknext').style.display='block';    
    });
}
document.getElementById('worknext').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    getWorks();
}
document.getElementById('workprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    getWorks();
}
document.getElementById('worklink').onclick = () => {
    window.location=link;
}
function showWarning2() {
    document.getElementById('removeWorkPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideWarning2() {
    document.getElementById('removeWorkPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function removeWork() {
    var x=document.getElementById('workdocid').value;
    db.collection("works").doc(`${x}`).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById('number').value=1;
        getWorks();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function showAddWork() {
    document.getElementById('addWorkForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideAddWork() {
    document.getElementById('addWorkForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function addWork() {
    db.collection("works").add({
        description: document.getElementById('workdescbox').value,
        link: document.getElementById('worklinkbox').value,
        name: document.getElementById('worknamebox').value,
        year_created: parseInt(document.getElementById('workyearcreatedbox').value,10)
    }).then(function(docRef) {
        getWorks();
        document.getElementById('workdescbox').value='';
        document.getElementById('worklinkbox').value='';
        document.getElementById('worknamebox').value='';
        document.getElementById('workyearcreatedbox').value='';
        document.getElementById('number').value=1;
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function getOrgs() {
    document.getElementById('orgdescription').innerHTML = '';
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('orgdescription').innerHTML+=`${doc.data().description}`;
            document.getElementById('orgdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right; display: inline-block" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    db.collection("organizations").orderBy("year_start", "asc").get().then(snapshot => {
        counter=1;
        size=snapshot.size;
        snapshot.forEach(doc => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('orgname').innerHTML = doc.data().name.toUpperCase();
                document.getElementById('orgimglink').innerHTML = `<img src=${doc.data().imglink} height="200" width="200" style="border-radius: 50%;">`;
                document.getElementById('orgyear').innerHTML = `${doc.data().year_start}`;
                document.getElementById('orgposition').innerHTML = `${doc.data().position}`;
                link=doc.data().link;
            }
            counter++;
            document.getElementById('remOrgButton').setAttribute("onclick", `showWarning3(); document.getElementById('orgdocid').value='${doc.id}'`);
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('orgprev').style.display='none';
        else document.getElementById('orgprev').style.display='block';    
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('orgnext').style.display='none';
        else document.getElementById('orgnext').style.display='block';    
    });
}
document.getElementById('orgnext').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    getOrgs();
}
document.getElementById('orgprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    getOrgs();
}
function showAddOrg() {
    document.getElementById('addOrgForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideAddOrg() {
    document.getElementById('addOrgForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function addOrg() {
    db.collection("organizations").add({
        name: document.getElementById('orgnamebox').value,
        imglink: document.getElementById('orgimglinkbox').value,
        position: document.getElementById('orgpositionbox').value,
        year_start: parseInt(document.getElementById('orgyearjoinedbox').value,10)
    }).then(function(docRef) {
        getOrgs();
        document.getElementById('orgnamebox').value='';
        document.getElementById('orgpositionbox').value='';
        document.getElementById('orgyearjoinedbox').value='';
        document.getElementById('orgimglinkbox').value='';
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function showWarning3() {
    document.getElementById('removeOrgPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
function hideWarning3() {
    document.getElementById('removeOrgPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
function removeOrg() {
    var x=document.getElementById('orgdocid').value;
    console.log(x);
    db.collection("organizations").doc(`${x}`).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById('number').value=1;
        getOrgs();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}