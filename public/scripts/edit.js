var Description = function(description) {this.description = description};
var Hobby = function(name, id) {
    this.name = name;
    this.id = id;
}
var Contacts = function(imglink, link, name, id) {
    this.imglink = imglink;
    this.link = link;
    this.name = name;
    this.id = id;
}
var Education = function(school, level, imglink, year_start, year_end, degree, id) {
    this.school = school;
    this.level = level;
    this.imglink = imglink;
    this.year_start = year_start;
    this.year_end = year_end;
    this.degree = degree;
    this.id = id;
}
var Work = function(name, description, year_created, link, id) {
    this.workname = name;
    this.workdescription = description;
    this.workyearcreated = year_created;
    this.worklink = link;
    this.id = id;
}
var Organization = function(orgname, orgimglink, orgyearstart, orgposition, id) {
    this.orgname = orgname;
    this.orgimglink = orgimglink;
    this.orgyear = orgyearstart;
    this.orgposition = orgposition;
    this.id = id;
}
var counter = 0;
var hobbyList = [];
var contactList = [];
var educationHistory = [];
var workList = [];
var orgList = [];
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
//All the things in index tab
function getIndex() {
    //Clearing all values
    hobbyList = [];
    contactList = [];
    document.getElementById('description').innerHTML='';
    document.getElementById('hobbies').innerHTML='';
    document.getElementById('links').innerHTML='';
    //getting Index Description
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var desc = new Description(doc.data().description);
            document.getElementById('description').innerHTML+=desc.description;
            document.getElementById('description').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    //Getting Hobbies list
    db.collection("hobbies").orderBy('name','asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var hobby = new Hobby(doc.data().name, doc.id);
            hobbyList.push(hobby);
        });
        showHobbies();
    });
    //Getting Contact List
    db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var contact = new Contacts(doc.data().imglink, doc.data().link, doc.data().name, doc.id);
            contactList.push(contact);
        });
        showContactList();
    });
}
//Displaying of Hobbies
function showHobbies() {
    for (let x = 0; x < hobbyList.length; x++)
        document.getElementById('hobbies').innerHTML+=`<img src="public/images/removehobby.png" height="15" width="15" style="cursor: pointer" onclick="removeHobby('${hobbyList[x].id}');"> ${hobbyList[x].name}<br><br>`;;
}
//Displaying of Contact List
function showContactList() {
    for (let x = 0; x < contactList.length; x++) {
        document.getElementById('links').innerHTML+=`<img src="${contactList[x].imglink}" id="contactimg"></div>`;
        if (contactList[x].name==='call' || contactList[x].name==='email')
            document.getElementById('links').innerHTML+=`<span id="contactlink">${contactList[x].link}</span>`;
        else document.getElementById('links').innerHTML+=`<a id="contactlink" href=${contactList[x].link}>${contactList[x].link}</a>`;
        document.getElementById('links').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick='showContactForm("${contactList[x].id}");'>`;
    }
}
//Showing the form when adding
function showHobbyForm() {
    document.getElementById('addHobbyForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hiding the hobby form after clicking buttons
function hideHobbyForm() {
    document.getElementById('addHobbyForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Editing description of everything
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
//Adding a hobby to the firebase
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
//Removing a hobby from the firebase
function removeHobby(x) {
    db.collection("hobbies").doc(x).delete().then(function() {
        console.log("Document successfully deleted!");
        getIndex();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
//Showing the description form of everything
function showDescForm() {
    document.getElementById('editDescriptionForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hiding the description form when button is clicked
function hideDescForm() {
    document.getElementById('editDescriptionForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Updating the content of the contacts
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
//Showing of contact Form when editing
function showContactForm(x) {
    db.collection("links").doc(x).get().then((doc) => {
        document.getElementById('contacticon').innerHTML = `<img src="${doc.data().imglink}" style="width: 50; height: 30; display: inline-block;">`
        document.getElementById('contactbox').value=doc.data().link;
        document.getElementById('contactidbox').value=doc.id;
    });
    document.getElementById('editContactLinks').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hiding contact form after editing is done
function hideContactForm() {
    document.getElementById('editContactLinks').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//All the things in education tab
function getEducation() {
    educationHistory = [];
    counter = 0;
    document.getElementById('educdescription').innerHTML='';
    //Getting description for education page
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var desc = new Description(doc.data().description);
            document.getElementById('educdescription').innerHTML+=desc.description;
            document.getElementById('educdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    //Getting Education Data
    db.collection("educations").orderBy("year_start","asc").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var educdata = new Education(doc.data().school, doc.data().level.toUpperCase(), doc.data().imglink, doc.data().year_start, doc.data().year_end, doc.data().degree, doc.id);
            educationHistory.push(educdata);
        });
        showEducData(0);
    }); 
}
//Showing of Education Data
function showEducData(x) {
    document.getElementById('educschool').innerHTML = educationHistory[x].school;
    document.getElementById('educlevel').innerHTML = educationHistory[x].level.toUpperCase();
    document.getElementById('educimglink').innerHTML = `<img src=${educationHistory[x].imglink} height="200" width="200" style="border-radius: 50%;">`;
    document.getElementById('educyear').innerHTML = `${educationHistory[x].year_start}-`;
    if (educationHistory[x].year_end != null)
        document.getElementById('educyear').innerHTML += educationHistory[x].year_end;
    else document.getElementById('educyear').innerHTML += `present`;
    if(educationHistory[x].degree!=null) {
        document.getElementById('educdegree').innerHTML = educationHistory[x].degree;
        document.getElementById('deg').innerHTML = 'Degree';
        document.getElementById('deg').style.borderBottom = '3px solid gray';
    }  
    else {
        document.getElementById('deg').innerHTML = '';
        document.getElementById('deg').style.borderBottom = 'none';
        document.getElementById('educdegree').innerHTML = ``;  
    }
    if (counter==0)
        document.getElementById('educprev').style.display='none';
    else document.getElementById('educprev').style.display='block';    
    if (counter==educationHistory.length-1)
    document.getElementById('educnext').style.display='none';
    else document.getElementById('educnext').style.display='block';
    document.getElementById('remEducButton').setAttribute("onclick", `showWarning(); document.getElementById('educdocid').value='${educationHistory[x].id}'`);    
};
//When user clicks next button on education page
document.getElementById('educnext').onclick = () => {
    counter++;
    showEducData(counter);
}
//When user clicks previous button on education page
document.getElementById('educprev').onclick = () => {
    counter--;
    showEducData(counter);
}
//Shows warning if deleting data from education
function showWarning() {
    document.getElementById('removeEducPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hides warning when clicked on any button
function hideWarning() {
    document.getElementById('removeEducPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Removing education data from firebase
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
//Showing the add education form
function showAddEduc() {
    document.getElementById('addEducForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hiding the add education form
function hideAddEduc() {
    document.getElementById('addEducForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Adding the actual education form
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
//Works form
function getWorks() {
    workList = [];
    counter = 0;
    document.getElementById('workdescription').innerHTML='';
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var desc = new Description(doc.data().description);
            document.getElementById('workdescription').innerHTML+=desc.description;
            document.getElementById('workdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right;" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    db.collection("works").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var work = new Work(doc.data().name, doc.data().description, doc.data().year_created, doc.data().link, doc.id);
            workList.push(work);
        });
        showWorkData(0);
    });
}
function showWorkData(x) {
    document.getElementById('workname').innerHTML = workList[x].workname.toUpperCase();
    document.getElementById('workdescription2').innerHTML = workList[x].workdescription;
    document.getElementById('workyear').innerHTML = workList[x].workyearcreated;
    document.getElementById('worklink').innerHTML = workList[x].worklink;
    if (counter==0)
        document.getElementById('workprev').style.display='none';
    else document.getElementById('workprev').style.display='block';    
    if (counter==workList.length-1)
        document.getElementById('worknext').style.display='none';
    else document.getElementById('worknext').style.display='block';  
    document.getElementById('remWorkButton').setAttribute("onclick", `showWarning2(); document.getElementById('workdocid').value='${workList[x].id}'`);
}  
//Next button if the user clicks on the works page
document.getElementById('worknext').onclick = () => {
    counter++;
    showWorkData(counter);
}
//Previous button if the user clicks on the work page
document.getElementById('workprev').onclick = () => {
    counter--;
    showWorkData(counter);
}
//Redirects the user to the link of the project
document.getElementById('worklink').onclick = () => {
    window.location=link;
}
//Shows warning if u want to delete from the works page
function showWarning2() {
    document.getElementById('removeWorkPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hides warning if the user clicks any of the buttons in the show warning2
function hideWarning2() {
    document.getElementById('removeWorkPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Removes work data from firebase
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
//Shows the add work data form
function showAddWork() {
    document.getElementById('addWorkForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hides the add work data form when user clicks on any button
function hideAddWork() {
    document.getElementById('addWorkForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Adds work data to the form
function addWork() {
    db.collection("works").add({
        description: document.getElementById('workdescbox').value,
        link: document.getElementById('worklinkbox').value,
        name: document.getElementById('worknamebox').value,
        year_created: parseInt(document.getElementById('workyearcreatedbox').value,10)
    }).then(function(docRef) {
        document.getElementById('number').value=1;
        getWorks();
        document.getElementById('workdescbox').value='';
        document.getElementById('worklinkbox').value='';
        document.getElementById('worknamebox').value='';
        document.getElementById('workyearcreatedbox').value='';
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
//Gets Organization data
function getOrgs() {
    counter = 0;
    document.getElementById('orgdescription').innerHTML = '';
    orgList = [];
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('orgdescription').innerHTML+=`${doc.data().description}`;
            document.getElementById('orgdescription').innerHTML+=`<img src="public/images/editButton.png" height="30" width="30" style="cursor: pointer; float: right; display: inline-block" onclick="showDescForm();"><br><br><br>`
            document.getElementById('descriptionBox').innerHTML=`${doc.data().description}`;
        });
    });
    //Gets the list of org data
    db.collection("organizations").orderBy("year_start", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
            var org = new Organization(doc.data().name, doc.data().imglink, doc.data().year_start, doc.data().position, doc.id);
            orgList.push(org);
        });
        showOrgs(0);  
    });
}
//Shows the list of organizations 
function showOrgs(x) {
    document.getElementById('orgname').innerHTML = orgList[x].orgname.toUpperCase();
    document.getElementById('orgimglink').innerHTML = `<img src=${orgList[x].orgimglink} height="200" width="200" style="border-radius: 50%;">`;
    document.getElementById('orgyear').innerHTML = `${orgList[x].orgyear}`;
    document.getElementById('orgposition').innerHTML = `${orgList[x].orgposition}`;
    link=orgList[x].link;
    if (counter==0)
        document.getElementById('orgprev').style.display='none';
    else document.getElementById('orgprev').style.display='block';    
    if (counter==orgList.length-1)
        document.getElementById('orgnext').style.display='none';
    else document.getElementById('orgnext').style.display='block';  
    document.getElementById('remOrgButton').setAttribute("onclick", `showWarning3(); document.getElementById('orgdocid').value='${orgList[x].id}'`);  
}
//Shows the next org data
document.getElementById('orgnext').onclick = () => {
    counter++;
    showOrgs(counter);
}
//Shows the prev org data
document.getElementById('orgprev').onclick = () => {
    counter--;
    showOrgs(counter);
}
//Shows the add organization data form
function showAddOrg() {
    document.getElementById('addOrgForm').style.display='block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hides the add organization form when user clicks on any button
function hideAddOrg() {
    document.getElementById('addOrgForm').style.display='none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Adds Organization to the firebase
function addOrg() {
    db.collection("organizations").add({
        name: document.getElementById('orgnamebox').value,
        imglink: document.getElementById('orgimglinkbox').value,
        position: document.getElementById('orgpositionbox').value,
        year_start: parseInt(document.getElementById('orgyearjoinedbox').value,10)
    }).then(function(docRef) {
        document.getElementById('number').value=1;
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
//Shows organization warning if user wants to delete
function showWarning3() {
    document.getElementById('removeOrgPrompt').style.display = 'block';
    document.getElementsByClassName('container')[0].style.opacity='0.3';
}
//Hides the show organization warning if user clicks on any button
function hideWarning3() {
    document.getElementById('removeOrgPrompt').style.display = 'none';
    document.getElementsByClassName('container')[0].style.opacity='1';
}
//Removes the organization from firebase
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