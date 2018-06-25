/*document.getElementById("login").addEventListener("click", login);*/
/*document.getElementById("create-post").addEventListener("click", writeNewPost);*/

/*firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $(".advice").hide();
        $(".chatBox").show();

    } else {
        $(".advice").show();
        $(".chatBox").hide();
        // No user is signed in.
    }
});*/

/*getPosts();*/

function login(x) {

    // https://firebase.google.com/docs/auth/web/google-signin

    // Provider

    var provider = new firebase.auth.GoogleAuthProvider();

    // How to Log In

    firebase.auth().signInWithPopup(provider)
        .then(function () {
            getPosts(x);
        })
        .catch(function () {
            alert("Something went wrong");
        });

}


function writeNewPost(x) {
    
    var chat = x.target.getAttribute("data-value");

    /*if (!$("#textInput").val()) {
        
    }*/

    // https://firebase.google.com/docs/database/web/read-and-write

    // Values

    var text = document.getElementById("textInput").value;
    var userName = firebase.auth().currentUser.displayName;
    var timeString = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var time = (weekday[timeString.getDay()] + ' ' + timeString.getHours()) + ':' + (timeString.getMinutes() < 10 ? '0' : '') + (timeString.getMinutes());

    // A post entry.

    var post = {
        name: userName,
        body: text,
        time: time
    };

    // Get a key for a new Post.

    var newPostKey = firebase.database().ref().child(chat).push().key;

    //Write data

    var updates = {};
    updates[newPostKey] = post;

    $("#textInput").val("");

    return firebase.database().ref(chat).update(updates);

}


function getPosts(x) {
    
    var target = x.target.getAttribute("data-value");
    
    console.log(target);
    console.log("test");

    firebase.database().ref(target).on('value', function (data) {

        var posts = document.getElementById(target);
        posts.innerHTML = "";

        var messages = data.val();

        var template = "";

        for (var key in messages) {
            if (messages[key].name == firebase.auth().currentUser.displayName) {
                template += `
          <div class="myText">
            <p class="name">${messages[key].name}</p>
            <p>${messages[key].body}</p>
            <p class="timePoint">${messages[key].time}</p>
          </div>
        `;
            } else {
                template += `
          <div class="otherText">
            <p class="name">${messages[key].name}</p>
            <p>${messages[key].body}</p>
            <p class="timePoint">${messages[key].time}</p>
          </div>
        `;
            }

        }

        posts.innerHTML = template;

        $(".chatBox").animate({
            scrollTop: $(".chatBox").prop("scrollHeight")
        }, 300);

    })

}
