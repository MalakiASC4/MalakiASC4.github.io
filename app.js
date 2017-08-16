$(document).ready(function(){
$.ajax({
url: 'https://opentdb.com/api.php?amount=10&category=15&type=multiple',
dataType: 'json',
success: function(data){
    var questiontype1 =(data.results[0].question)
    var incorrectanswers1pt1=(data.results[0].incorrect_answers[0])
    var incorrectanswers1pt2=(data.results[0].incorrect_answers[1])
    var incorrectanswers1pt3=(data.results[0].incorrect_answers[2])
    var correctanswers1pt4=(data.results[0].correct_answer)
    console.log(data.results[0])
    console.log(data.results[0].question)
    console.log(data.results[0].incorrect_answers)  
    $("h6").append(questiontype1)
    $("h7").append(" "+ incorrectanswers1pt1 +" || "+incorrectanswers1pt2+" || "+incorrectanswers1pt3+" || "+correctanswers1pt4)
}
 })
})
    var database = firebase.database().ref();


function save(){
    var email = $('#email').val();
    var name = $("#name").val();
    console.log(email + " "+name);

    var value={
        EMAIL: email,
        NAME: name
    }
    database.push(value);
}
database.on("child_added",function(rowData){
     var row = rowData.val();
    var email = row.EMAIL;
    var name = row.NAME;
    console.log(email+name)
    $('h4').empty();
$('h4').append(name +" and their email: "+ email +" has been saved in my Database. Hope To Talk To You Soon 🙌🏽");
$("h11").append(correctanswers1pt4)
});

function results(){
    $("h11").show(correctanswers1pt4)
}


$(document).ready(function() {
    $('#ghsubmitbtn').on('click', function (e) {
        e.preventDefault();
        $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

       var username = "MalakiASC4";
        var requri = 'https://api.github.com/users/' + username;
        var repouri = 'https://api.github.com/users/' + username + '/repos';

       requestJSON(requri, function (json) {
            if (json.message == "Not Found" || username == '') {
                $('#ghapidata').html("<h2>No User Info Found</h2>");
            }

           else {
                // else we have a user and we display their info
                var fullname = json.name;
                var username = json.login;
                var aviurl = json.avatar_url;
                var profileurl = json.html_url;
                var location = json.location;
                var followersnum = json.followers;
                var followingnum = json.following;
                var reposnum = json.public_repos;

               if (fullname == undefined) { fullname = username; }

               var outhtml = '<h2>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';
                outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="' + profileurl + '" target="_blank"><img src="' + aviurl + '" width="80" height="80" alt="' + username + '"></a></div>';
                outhtml = outhtml + '<p>Followers: ' + followersnum + ' - Following: ' + followingnum + '<br>Repos: ' + reposnum + '</p></div>';
                outhtml = outhtml + '<div class="repolist clearfix">';

               var repositories;
                $.getJSON(repouri, function (json) {
                    repositories = json;
                    outputPageContent();
                });

               function outputPageContent() {
                    if (repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
                    else {
                        outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
                        $.each(repositories, function (index) {
                            outhtml = outhtml + '<li><button href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</button></li>';
                        });
                        outhtml = outhtml + '</ul></div>';
                    }
                    $('#ghapidata').html(outhtml);
                } // end outputPageContent()
            } // end else statement
        }); // end requestJSON Ajax call
    }); // end click event handler

   function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function (xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});