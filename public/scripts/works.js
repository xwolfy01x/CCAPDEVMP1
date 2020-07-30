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
var link;
var counter;
var size;
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        document.getElementById('description').innerHTML+=`${doc.data().description}<br><br><br>`;
    });
});
function workData() {
    db.collection("works").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('workname').innerHTML = doc.data().name.toUpperCase();
                document.getElementById('workdescription').innerHTML = `${doc.data().description}`;
                document.getElementById('workyear').innerHTML = `${doc.data().year_created}`;
                document.getElementById('worklink').innerHTML = `${doc.data().link}`;
                link=doc.data().link;
            }
            counter++;
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
    workData();
}
document.getElementById('workprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    workData();
}
document.getElementById('worklink').onclick = () => {
    window.location=link;
}