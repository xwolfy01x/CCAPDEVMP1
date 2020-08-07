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
var Description = function(description) {this.description = description};
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var desc = new Description(doc.data().description);
        document.getElementById('description').innerHTML+=`${desc.description}<br><br><br>`;
    });
});
var Hobby = function(name) {
    this.name = name;
}
var hobbyList = [];
db.collection("hobbies").orderBy('name','asc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var hobby = new Hobby(doc.data().name);
        hobbyList.push(hobby);
    });
    showHobbies();
});
function showHobbies() {
    for (let x = 0; x < hobbyList.length; x++)
        document.getElementById('hobbies').innerHTML+=`<li>${hobbyList[x].name}</li><br>`;
}
var Contacts = function(imglink, link, name) {
    this.imglink = imglink;
    this.link = link;
    this.name = name;
}
var contactList = [];
db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var contact = new Contacts(doc.data().imglink, doc.data().link, doc.data().name);
        contactList.push(contact);
    });
    console.log(contactList);
    showContactList();
});
function showContactList() {
    for (let x = 0; x < contactList.length; x++) {
        document.getElementById('links').innerHTML+=`<img src="${contactList[x].imglink}" id="contactimg"></div>`;
        if (contactList[x].name==='call' || contactList[x].name==='email')
            document.getElementById('links').innerHTML+=`<span id="contactlink">${contactList[x].link}</span>`;
        else document.getElementById('links').innerHTML+=`<a id="contactlink" href=${contactList[x].link}>${contactList[x].link}</a>`;
    }
}
