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
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        document.getElementById('econtainer').style.display = 'none';
        document.getElementById('container').style.display = 'grid';
        document.getElementById('hbutton').style.borderColor='#FFCA08';
        document.getElementsByClassName('right-col1')[0].style.display= 'block';
    }).catch(function(error) {
        console.log(email);
        if(error.code == 'auth/wrong-password')
            alert('wrong password');
        else alert(error.message);
    });
}
function hideAll() {
    let buttons = ['hbutton', 'abutton', 'hbutton2', 'ebutton', 'obutton', 'wbutton'];
    for (let x=0; x<=5; x++)
        document.getElementById(buttons[x]).style.borderColor='#32526E';
    for (let x=1; x<=6; x++) 
        document.getElementsByClassName(`right-col${x}`)[0].style.display='none';
}
function showcontent(x) {
    hideAll();
    let buttons = ['hbutton', 'abutton', 'hbutton2', 'ebutton', 'obutton', 'wbutton'];
    document.getElementById(buttons[x-1]).style.borderColor='#FFCA08';
    document.getElementsByClassName(`right-col${x}`)[0].style.display='block'; 
}
function getDescription() {
    var db = firebase.firestore();
    document.getElementById('data').innerHTML='';
    db.collection("others").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('data').innerHTML+=`${doc.data().description}<br><br><br>`;
        });
    });
}
function getLinks() {
    var db = firebase.firestore();
    document.getElementsByClassName('links')[0].innerHTML='';
    db.collection("links").orderBy('order', 'asc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementsByClassName('links')[0].innerHTML+=`<img src="${doc.data().imglink}" id="aboutimg"></div>`;
            document.getElementsByClassName('links')[0].innerHTML+=`<div class="center"><a id="aboutlink" href=${doc.data().link}>${doc.data().link}</a></div>`;
        });
    });
}
function resetData() {
    document.getElementById('number').value=1;
    document.getElementById('school').innerHTML = '';
    document.getElementById('level').innerHTML = '';
    document.getElementById('imglink').innerHTML = '';
    document.getElementById('year').innerHTML = '';
    document.getElementById('degree').innerHTML ='';  
    document.getElementById('workname').innerHTML = ''
    document.getElementById('workdata').innerHTML = '';
    document.getElementById('workyear').innerHTML = '';
    document.getElementById('worklink').innerHTML = '';
    document.getElementById('number').value=1;
}
function changeData() {
    var db = firebase.firestore();                  
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
function changeData2() {
    db.collection("works").get().then((snapshot) => {
        size=snapshot.size;
        counter=1;
        snapshot.forEach((doc) => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('workname').innerHTML = doc.data().name;
                document.getElementById('workdata').innerHTML = `${doc.data().description}<br><br><br>`;
                document.getElementById('workyear').innerHTML = `${doc.data().year_created}<br><br>`;
                document.getElementById('worklink').innerHTML = `${doc.data().link}`;
                link=doc.data().link;
            }
            counter++;
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('prev2').style.display='none';
        else document.getElementById('prev2').style.display='block';    
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('next2').style.display='none';
        else document.getElementById('next2').style.display='block';    
    });
}
function changeData3() {
    db.collection("organizations").orderBy("name", "asc").get().then(snapshot => {
        counter=1;
        size=snapshot.size;
        snapshot.forEach(doc => {
            if (counter === parseInt(document.getElementById('number').value, 10)) {
                document.getElementById('orgname').innerHTML = doc.data().name;
                document.getElementById('orgimglink').innerHTML = `<img src=${doc.data().imglink} style="border-radius: 50%;">`;
                document.getElementById('orgyear').innerHTML = `Year Joined: ${doc.data().year_start}`;
                document.getElementById('orgposition').innerHTML = `Position: ${doc.data().position}`;
                link=doc.data().link;
            }
            counter++;
        });
        if (parseInt(document.getElementById('number').value,10)==1)
            document.getElementById('prev3').style.display='none';
        else document.getElementById('prev3').style.display='block';    
        if (parseInt(document.getElementById('number').value,10)==size)
            document.getElementById('next3').style.display='none';
        else document.getElementById('next3').style.display='block';    
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
document.getElementById('next2').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    changeData2();
}
document.getElementById('prev2').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    changeData2();
}
document.getElementById('next3').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)+1;
    changeData3();
}
document.getElementById('prev3').onclick = () => {
    document.getElementById('number').value=parseInt(document.getElementById('number').value, 10)-1;
    changeData3();
}
function getHobbies() {
    var db = firebase.firestore();
    document.getElementById('hobbies').innerHTML='';
    db.collection("hobbies").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var data = doc.data().name.toUpperCase();
            document.getElementById('hobbies').innerHTML+=`<li style="font-weight: 1000; margin-left: 10%;">${data}</li><br>`;
        });
    });
}