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
function changeData() {
    db.collection("works").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('worknumber').value, 10)) {
                document.getElementById('name').innerHTML = doc.data().name;
                document.getElementById('data').innerHTML = `${doc.data().description}<br><br><br>`;
                document.getElementById('year').innerHTML = `${doc.data().year_created}<br><br>`;
                document.getElementById('link').innerHTML = `${doc.data().link}`;
                link=doc.data().link;
            }
            counter++;
        });
        if (parseInt(document.getElementById('worknumber').value,10)==1)
            document.getElementById('prev').style.display='none';
        else document.getElementById('prev').style.display='block';    
        ;
        if (parseInt(document.getElementById('worknumber').value,10)==size)
            document.getElementById('next').style.display='none';
        else document.getElementById('next').style.display='block';    
    });
}
document.getElementById('next').onclick = () => {
    document.getElementById('worknumber').value=parseInt(document.getElementById('worknumber').value, 10)+1;
    changeData();
}
document.getElementById('prev').onclick = () => {
    document.getElementById('worknumber').value=parseInt(document.getElementById('worknumber').value, 10)-1;
    changeData();
}
document.getElementById('link').onclick = () => {
    window.location=link;
}