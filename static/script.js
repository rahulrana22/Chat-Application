//here we are storing the io object inside socket 
//or we can say that we are instantiating the io object
const socket = io();

setTimeout(()=>{

    console.log(socket.id);
},1000);

//we are using jquery for dom manipulation

//hiding the chat section first ,and just showing the login section so that the user first enters the name
$('#chat').hide();




//this is for the logging in part
$('#login-btn').click(()=>{

    socket.emit('login',{
        name: $('#login-inp').val()
    })
       
    // once login is done we will hide the login tab
     $('#login').hide();
    //and then show the chat section
    $('#chat').show();
})






$('#send-btn').click(()=>{
    //emmiting an event on button click
    socket.emit('send-msg',{

        msg:$('#inp').val()
    })
     
    //now after writing the message in the input 
    //it will be cleared after you send the message 
    $('#inp').val("");

})

socket.on('received-msg', (data) => {
    $('#list').append(`<li> ${data.name} : ${data.msg}</li>`);
})
   