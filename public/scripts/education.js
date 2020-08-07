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
var educationHistory = [];
var Education = function(school, level, imglink, year_start, year_end, degree) {
    this.school = school;
    this.level = level;
    this.imglink = imglink;
    this.year_start = year_start;
    this.year_end = year_end;
    this.degree = degree;
}
counter=0;
function educData() {
    db.collection("educations").orderBy("year_start","asc").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var educdata = new Education(doc.data().school, doc.data().level.toUpperCase(), doc.data().imglink, doc.data().year_start, doc.data().year_end, doc.data().degree);
            educationHistory.push(educdata);
        });
        showEducData(0);
    }); 
}

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
};
document.getElementById('educnext').onclick = () => {
    counter++;
    showEducData(counter);
}
document.getElementById('educprev').onclick = () => {
    counter--;
    showEducData(counter);
}