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
var counter = 0;
var Description = function(description) {this.description = description};
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var desc = new Description(doc.data().description);
        document.getElementById('description').innerHTML+=`${desc.description}<br><br><br>`;
    });
});
var Work = function(name, description, year_created, link) {
    this.workname = name;
    this.workdescription = description;
    this.workyearcreated = year_created;
    this.worklink = link;
}
var workList = [];
function workData() {
    db.collection("works").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            var work = new Work(doc.data().name, doc.data().description, doc.data().year_created, doc.data().link);
            workList.push(work);
        });
        showWorkData(0);
    });
}
function showWorkData(x) {
    document.getElementById('workname').innerHTML = workList[x].workname.toUpperCase();
    document.getElementById('workdescription').innerHTML = workList[x].workdescription;
    document.getElementById('workyear').innerHTML = workList[x].workyearcreated;
    document.getElementById('worklink').innerHTML = workList[x].worklink;
    if (counter==0)
        document.getElementById('workprev').style.display='none';
    else document.getElementById('workprev').style.display='block';    
    if (counter==workList.length-1)
        document.getElementById('worknext').style.display='none';
    else document.getElementById('worknext').style.display='block';  
}  
document.getElementById('worknext').onclick = () => {
    counter++;
    showWorkData(counter);
}
document.getElementById('workprev').onclick = () => {
    counter--;
    showWorkData(counter);
}
document.getElementById('worklink').onclick = () => {
    window.location=link;
}