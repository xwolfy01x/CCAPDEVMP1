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
var counter = 0;
var Description = function(description) {this.description = description};
db.collection("others").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var desc = new Description(doc.data().description);
        document.getElementById('description').innerHTML+=`${desc.description}<br><br><br>`;
    });
});
var Organization = function(orgname, orgimglink, orgyearstart, orgposition) {
    this.orgname = orgname;
    this.orgimglink = orgimglink;
    this.orgyear = orgyearstart;
    this.orgposition = orgposition;
}
var orgList = [];
function orgData() {
    db.collection("organizations").orderBy("year_start", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
            var org = new Organization(doc.data().name, doc.data().imglink, doc.data().year_start, doc.data().position);
            orgList.push(org);
        });
        showOrgs(0);  
    });
}
function showOrgs(x) {
    document.getElementById('orgname').innerHTML = orgList[x].orgname.toUpperCase();
    document.getElementById('orgimglink').innerHTML = `<img src=${orgList[x].orgimglink} height="200" width="200" style="border-radius: 50%;">`;
    document.getElementById('orgyear').innerHTML = `${orgList[x].orgyear}`;
    document.getElementById('orgposition').innerHTML = `${orgList[x].orgposition}`;
    link=orgList[x].link;
    if (counter==0)
        document.getElementById('orgprev').style.display='none';
    else document.getElementById('orgprev').style.display='block';    
    if (counter==orgList.length-1)
        document.getElementById('orgnext').style.display='none';
    else document.getElementById('orgnext').style.display='block';    
}
document.getElementById('orgnext').onclick = () => {
    counter++;
    showOrgs(counter);
}
document.getElementById('orgprev').onclick = () => {
    counter--;
    showOrgs(counter);
}