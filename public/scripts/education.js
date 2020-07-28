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
db.collection("educations").orderBy("year_start", "asc").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('data').innerHTML+=`School: ${doc.data().school}<br>`;
        document.getElementById('data').innerHTML+=`Year: ${doc.data().year_start}`;
        if (doc.data().year_end!=null)
            document.getElementById('data').innerHTML+=`-${doc.data().year_end}<br><br>`;
    });
});