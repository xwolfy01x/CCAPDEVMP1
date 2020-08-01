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
function educData() {
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
    educData();
}
document.getElementById('educprev').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    educData();
}