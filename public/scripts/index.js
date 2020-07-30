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
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('description').innerHTML+=`${doc.data().description}<br><br><br>`;
    });
});
db.collection("hobbies").orderBy('name','asc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('hobbies').innerHTML+=`<li>${doc.data().name}</li><br>`;
    });
});

db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('links').innerHTML+=`<img src="${doc.data().imglink}" id="contactimg"></div>`;
        if (doc.data().name==='call' || doc.data().name==='email')
            document.getElementById('links').innerHTML+=`<span id="contactlink">${doc.data().link}</span>`;
        else document.getElementById('links').innerHTML+=`<a id="contactlink" href=${doc.data().link}>${doc.data().link}</a>`;
    });
});
