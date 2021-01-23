var Sender_user;
var Reciever_user;
var cnt_rec_message=0;
var cnt_rec_message_new=0;
var animation_flag = 1;
function edit_flag(){
    animation_flag = 0;
    //console.log(animation_flag);
}
function init() {
    ///chrome notice request first
    Notification.requestPermission(function(permission) {
        //console.log("Permission to display: "+permission);
    });

    ///auth user 
    var user_email = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //Sender_user = user.email;
            user_email = user.email;
            document.getElementById('username').innerHTML=" Sizijaxer";
            document.getElementById('account').innerHTML=" "+user_email+"   ";
        } 
        else {
            alert("Sign in first");
            window.location.href="index.html";
        }
    });
        ///get all users
    var usersRef = firebase.database().ref('users');
    total_users = [];
    usersRef.once('value').then(function(snapshot){
        document.getElementById('user_list').innerHTML = total_users.join('');
        usersRef.on('child_added',function(data){
            var childData = data.val();
            if(user_email!=childData.user_id){
                total_users[total_users.length] = "<button id="+childData.user_id+" value="+childData.user_name +" onclick='Reciever_user=value;get_message();'>"+childData.user_name+"</button>";
                document.getElementById('user_list').innerHTML = total_users.join('');
            }
            else{
                document.getElementById('login_user').innerHTML="Hi! "+childData.user_name;
                document.getElementById('username').innerHTML = " "+childData.user_name+" ";
                Sender_user = childData.user_name;
            }
        })
    })

    ///listen all message send to user
    var postsRef = firebase.database().ref('send_message');
    //console.log("listen message");
    postsRef.once('value',function(snapshot) {
        //console.log(snapshot.val());
        postsRef.on('child_added', function(data) {
            var d = new Date();
            var hour = d.getHours();
            if(hour<10) hour = "0"+hour;
            var minute = d.getMinutes();
            if(minute<10) minute = "0"+minute;
            var second = d.getSeconds();
            if(second<10) second = "0"+second;
            var sending_time = hour+":"+minute+":"+second;
            ///notice!!
            if(data.val().Reciever==Sender_user && data.val().time==sending_time){
                var n =new Notification(data.val().Sender+" send the message to you:\n"+data.val().Message);
                setTimeout(n.close, 2000);
            } 
            if(data.val().Sender!=Sender_user && data.val().Reciever=="PUBLIC" && data.val().time==sending_time){
                var n = new Notification(data.val().Sender+":\n"+data.val().Message+"\n\nIn "+data.val().Reciever);
                setTimeout(n.close, 2000);
            }
        });
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    post_btn.addEventListener('click', function() {
        if (post_txt.value != "") {
            var d = new Date();
            var hour = d.getHours();
            if(hour<10) hour = "0"+hour;
            var minute = d.getMinutes();
            if(minute<10) minute = "0"+minute;
            var second = d.getSeconds();
            if(second<10) second = "0"+second;
            var sending_time = hour+":"+minute+":"+second;
            firebase.database().ref('send_message').push({
                "Sender": Sender_user,
                "Message": post_txt.value,
                "Reciever": Reciever_user,
                "time": sending_time
            });
            post_txt.value = "";
        }
    });
}

function get_message(){
    var pre_Reciever_user = Reciever_user;
    //console.log(pre_Reciever_user);
    var postsRef = firebase.database().ref('send_message');
    var total_post = [];
    var first_count = 0;
    var second_count = 0;
    var Mes = [];
    var public_sender = [];
    var index = 0;
    animation_flag=1;
    setTimeout(edit_flag,2000);
    postsRef.once('value').then(function(snapshot) {//console.log("once");
        document.getElementById('post_list').innerHTML = total_post.join('');
        postsRef.on('child_added', function(data) {
            if(pre_Reciever_user!=Reciever_user){
                //console.log("bye "+ pre_Reciever_user);
                return;
            }
            second_count += 1;
            if (second_count > first_count) {
                var childData = data.val();
                ///prevent html code
                var k = childData.Message.length;
                for(var i = 0;i<k;i++){
                    if(childData.Message[i]=="<"){
                        if(i==0)childData.Message = "&lt" + childData.Message.slice(i+1,childData.Message.length);
                        else if(i==childData.Message.length-1) childData.Message = childData.Message.slice(0,i)+"&lt";
                        else childData.Message = childData.Message.slice(0,i) + "&lt" + childData.Message.slice(i+1,childData.Message.length);
                        k +=2;
                        //console.log(childData.Message,k);
                    }
                    else if(childData.Message[i]==">"){
                        if(i==0)childData.Message = "&gt" + childData.Message.slice(i+1,childData.Message.length-1);
                        else if(i==childData.Message.length-1) childData.Message = childData.Message.slice(0,i)+"&gt";
                        else childData.Message = childData.Message.slice(0,i) + "&gt" + childData.Message.slice(i+1,childData.Message.length);
                        k +=2;
                        //console.log(childData.Message,k);
                    }
                }
                

                if(data.val().Reciever=="PUBLIC"&&Reciever_user=="PUBLIC"){
                    if(data.val().Sender!=Sender_user) total_post[total_post.length] = "<i id='public_i1' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div id='public_message' class='box1 sb1' style='text-align:left;animation: bounceIn 1.5s 1'>"+ childData.Sender+":<br>---------------------<br>"+childData.Message +"</div>" + "<br>";
                    else total_post[total_post.length] = "<i id='i2' class='fas fa-poo hide_big_big bounce_in' style='font-size:36px'></i><div class='box2 sb2' style='animation: bounceIn 1.5s 1'>"+childData.Message+"</div>" + "<br>";
                    Mes[index] = childData.Message;
                    public_sender[index] = childData.Sender;
                    index++;
                }
                else if(Sender_user==data.val().Sender && Reciever_user==data.val().Reciever){
                    total_post[total_post.length] = "<i id='i2' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div class='box2 sb2' style='animation: bounceIn 1.5s 1'>"+childData.Message+"</div>" + "<br>";
                    Mes[index] = childData.Message;
                    public_sender[index] = childData.Sender;
                    index++;
                }
                else if(Sender_user==data.val().Reciever && Reciever_user==data.val().Sender){
                    total_post[total_post.length] = "<i id='i1' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div class='box1 sb1' style='animation: bounceIn 1.5s 1'>"+ childData.Message +"</div>" + "<br>";
                    Mes[index] = childData.Message;
                    public_sender[index] = childData.Sender;
                    index++;
                }
                ////prevent multi animation
                if(animation_flag==0){
                    for(i=0;i<index-1;i++){
                        if(total_post[i][8]==2)total_post[i] = "<i id='i2' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div class='box2 sb2' style='animation: bounceIn_default 1s 1'>"+Mes[i]+"</div>" + "<br>";
                        else if(total_post[i][8]==1)total_post[i] = "<i id='i1' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div class='box1 sb1' style='animation: bounceIn_default 1s 1'>"+ Mes[i] +"</div>" + "<br>";
                        else total_post[i] = "<i id='public_i1' class='fas fa-poo hide_big_big' style='font-size:36px'></i><div id='public_message' class='box1 sb1' style='text-align:left;animation: bounceIn_default 1s 1'>"+ public_sender[i]+":<br>---------------------<br>"+Mes[i] +"</div>" + "<br>";
                    }
                }
                document.getElementById('post_list').innerHTML = total_post.join('');
                document.getElementById('post_list').scrollTop = document.getElementById('post_list').scrollHeight - document.getElementById('post_list').clientHeight;
                first_count += 1;
            }
        });
    }).catch(e => console.log(e.message));
}

function set_public(){
    Reciever_user = "PUBLIC";
    get_message();
}

function logout(){
    firebase.auth().signOut().then(function(){
        alert("Success to logout");
        window.location.href="index.html";
    }).catch(function(error){
        alert("Fail to log out");
    });
}
function profile_bounceIn(){
    document.getElementById('profile_2').style.animation="bounceIn 1.2s 1";
}

window.onload = function() {
    init();
};

