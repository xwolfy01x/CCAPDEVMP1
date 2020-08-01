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
var counter;
var size;
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('description').innerHTML+=`${doc.data().description}<br><br><br>`;
    });
});
function orgData() {
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
    orgData();
}
document.getElementById('orgprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    orgData();
}