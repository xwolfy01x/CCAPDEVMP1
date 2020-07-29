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
function changeData() {
    db.collection("educations").orderBy("year_start","asc").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('school').innerHTML = `School: ${doc.data().school}`;
                document.getElementById('level').innerHTML = `${doc.data().level}`;
                document.getElementById('imglink').innerHTML = `<img src=${doc.data().imglink} style="border-radius: 50%;">`;
                document.getElementById('year').innerHTML = `Year: ${doc.data().year_start}-`;
                if (doc.data().year_end != null)
                    document.getElementById('year').innerHTML += `${doc.data().year_end}`;
                else document.getElementById('year').innerHTML += `present`;
                if(doc.data().degree!=null)
                    document.getElementById('degree').innerHTML = `Degree: ${doc.data().degree}`;  
                else document.getElementById('degree').innerHTML = ``;  
            }
            counter++;
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('prev').style.display='none';
        else document.getElementById('prev').style.display='block';    
        ;
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('next').style.display='none';
        else document.getElementById('next').style.display='block';    
    });
}
document.getElementById('next').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    changeData();
}
document.getElementById('prev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    changeData();
}