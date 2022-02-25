// var video = document.querySelector("#videoElement");
 
// if (navigator.mediaDevices.getUserMedia) {
//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function (stream) {
//       video.srcObject = stream;
//     })
//     .catch(function (err0r) {
//       console.log("Something went wrong!");
//     });
// }  //video

// const video = document.getElementById("video");
const uri_navi = "ws://localhost:9998"
const uri_video = "ws://localhost:9999"
var webSocket_navi = new WebSocket(uri_navi);
var webSocket_video = new WebSocket(uri_video);
const canvas_resolution_width = 310
const canvas_resolution_height = 600
var img = new Image();
// let pre_gX=0;
// let pre_gY=0;
// 소켓 접속이 되면 호출되는 함수
webSocket_navi.onopen = function(message){
    console.log("Server connect...\n");
    document.getElementById('constatus').innerHTML = 'webSocket_navi server connected';
    };
 // 소켓 접속이 끝나면 호출되는 함수
 webSocket_navi.onclose = function(message){
  console.log("Server Disconnect...\n")
  document.getElementById('constatus').innerHTML = 'webSocket_navi server disconnected';
};
// 소켓 통신 중에 에러가 발생되면 호출되는 함수
webSocket_navi.onerror = function(message){
  console.log("error...\n");
};
// 소켓 서버로 부터 메시지가 오면 호출되는 함수.
webSocket_navi.onmessage = function(message){
  // 출력 area에 메시지를 표시한다.
    // console.log("Recieve From Server => "+message.data+"\n");
    let xy = jsonfunc(message.data);
        
    let gX = xy.x;
    let gY = xy.y;

    // gX = gX* 2.52;//for test
    // gY= gY * 5.04;//for test

    // const amount=5

    // x = valueX*3.1/100;// for sending
    // y = valueY*6/100; //for sending
    
    // gX = gX*100/3.1; // for receiving
    // gY = gY*100/6; //for receiving
    gX = gX*100; // for receiving
    gY = gY*100; //for receiving
    let temp=0;
    temp = gX
    gX = gY
    gY = temp

    const xmax = 305
    const ymax = 595
    const xymin = 5
    if(gX>xmax)
        gX  = xmax;
    else if(gX <xymin)
        gX  = xymin;

    if(gY>ymax)
        gY  = ymax;
    else if(gY <xymin)
        gY  = xymin;
    

    let ctx;
    const restNum = 10;
    // messageTextArea.value += "before gX => "+ gX +", before gY=> "+ gY +"\n";
    // gX = Math.round((gX*81.6)-10)
    // gY = Math.round((gY*96)-10)
    console.log("gX => "+ gX +", gY=> "+ gY +"\n");
    const canvas = document.getElementById("canvas_map");
    // if (canvas.getContext && (pre_gX != gX || pre_gY != gY) && (gX % restNum == 0|| gY % restNum == 0)) {
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(178,34,34)";
        ctx.fillRect(gX,gY, 10, 10);
        // ctx.fillRect(gY,gX, 10, 10);
    }
    // pre_gX = gX;
    // pre_gY = gY;
    
    
} 

// below video
webSocket_video.onopen = function(message){
    console.log("Server connect...\n");
    document.getElementById('constatus').innerHTML = 'webSocket_video server connected';
    };
 // 소켓 접속이 끝나면 호출되는 함수
 webSocket_video.onclose = function(message){
  console.log("Server Disconnect...\n")
  document.getElementById('constatus').innerHTML = 'webSocket_video server disconnected';
};
// 소켓 통신 중에 에러가 발생되면 호출되는 함수
webSocket_video.onerror = function(message){
  console.log("error...\n");
};
// 소켓 서버로 부터 메시지가 오면 호출되는 함수.
webSocket_video.onmessage = function(message){
  // 출력 area에 메시지를 표시한다.
    // console.log("Recieve From Server => "+message.data+"\n");
    let parsed_result = jsonfuncimage(message.data); 
    

     let ctx;
   
    if(parsed_result.datatype == "image")
    {
        const canvas = document.getElementById("canvas_video");            
        ctx = canvas.getContext("2d");



        canvas.width = parsed_result.shape[0]
        canvas.height = parsed_result.shape[1]
        console.log("shape_w :" + canvas.width + " shape_h : " + canvas.height);
        
        // if (canvas.getContext && (pre_gX != gX || pre_gY != gY) && (gX % restNum == 0|| gY % restNum == 0)) {
        if (canvas.getContext) {
            
            $().ready (function(){ 
            
            //console.log(str);
            // img.src = "data:image/jpg;base64," + window.atob(parsed_result.content);
            img.src = "data:image/jpg;base64, " +parsed_result.content;
            // img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oMCRUiMrIBQVkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12NgoC4AAABQAAEiE+h1AAAAAElFTkSuQmCC";
            // img.src = "./green.jpeg"
            // img.src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
            img.onload = function () {
                ctx.drawImage(img,10,10);
                };

            });
        };
        // pre_gX = gX;
        // pre_gY = gY;
        // src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
        // src = parsed_result.content
        // cv.imshow('canvas', src);
    }


    
    
}  
//mouse event below
// function printMousePos(event) {
// messageTextArea.value +=
// "clientX: " + event.clientX +
// " - clientY: " + event.clientY+"\n");
// }
// document.addEventListener("click", printMousePos);

$(function () {
    draw();
    // document.getElementById('constatus').innerHTML = 'label';
    // if (webSocket.readyState === WebSocket.OPEN) {
    //     document.getElementById('constatus').innerHTML = 'connected';
    // }
    // else if(webSocket.readyState === WebSocket.CLOSED)
    // {
    //     document.getElementById('lbltipAddedComment').innerHTML = 'disconneted';
    // }
    $('#apply').click(() => {
        let x = $('#x').val()
        let y = $('#y').val()
    
        if (x.length === 0 || y.length === 0) {
            alert('Invalid input X, Y');
            return;
        }
    
        const valueX = Number(x)
        const valueY = Number(y)
        if (0 > valueX || 100 < valueX || 0 > valueY || 100 < valueY) {
            alert('Invalid Value X, Y');
            return;
        }
    
        x = x * 2.52;
        y = y * 5.04;
    
        x = x - 10;
        y = y - 10;
    
        
    
        let ctx;
        const canvas = document.getElementById("canvas_map");
        if (canvas.getContext) {
            ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgb(178,34,34)";
            ctx.fillRect(x, y, 20, 20);
        }
    
        
    
    
    })
    
    
    
    $('#apply_clear').click(() => {
        $('#destination_x').val(0);
        $('#destination_y').val(0);
        // x = x * 3.1;
        // y = y * 6;
    
        // x = x - 10;
        // y = y - 10;
        // // x = x - 5;
        // // y = y - 5;
    
        const x = 0;
        const y = 0;
    
        drawMap(x, y);
        
    })
    $('#apply_goto100').click(() => {
        $('#destination_x').val(100);
        $('#destination_y').val(100);       
        // x = x * 3.1;
        // y = y * 6;
    
        // x = x - 10;
        // y = y - 10;
        // // x = x - 5;
        // // y = y - 5;
        const x = 310-10;
        const y = 600-10;
        
    
        drawMap(x, y);
        
    })
    
    $('#apply_random').click(() => {
        let x = Math.floor(Math.random() * 101);
        let y = Math.floor(Math.random() * 101);
        $('#destination_x').val(x);
        $('#destination_y').val(y);
    
        x =x*3.1-10;
        y = y*6-10
       
        // x = x * 3.1;
        // y = y * 6;
    
        // x = x - 10;
        // y = y - 10;
        // // x = x - 5;
        // // y = y - 5;
    
        drawMap(x, y);
        
    })
    
    
    $('#apply_destination').click(() => {
        let x = $('#destination_x').val()
        let y = $('#destination_y').val()
        // messageTextArea.value="");
    
        console.log("input => "+"x : "+x+", y : "+y+"\n");
    
    
        if (x.length === 0) {
            // alert('Invalid input X, Y');
            // return;
            x =0;
             
        }
        if (y.length === 0) {
            // alert('Invalid input X, Y');
            // return;
            
            y =0;
        }
    
        const valueX = Number(x)
        const valueY = Number(y)
        if (0 > valueX || 100 < valueX || 0 > valueY || 100 < valueY) {
            alert('Invalid Value X, Y');
            return;
        }
    
        
        // x = x * 3.1;
        // y = y * 6;
    
        // x = x - 10;
        // y = y - 10;
        // // x = x - 5;
        // // y = y - 5;
    
        // drawMap(x, y);
        // drawPoint(x, y);
    
        // x = (x + 10)/81.6;
        // y = (y + 10)/96;
        // x = valueX*3.1/100;
        // y = valueY*6/100;
        x = valueX*3.1/100;
        y = valueY*6/100;
        
        // var float64 = new Float64Array(2);
        // float64[0] = x;
        // float64[1] = y;
        // float64[0] = y;
        // float64[1] = x;
        console.log("Send to Server => "+"x : "+x+", y : "+y+"\n")
        
        //웹소켓으로 textMessage객체의 value을 보낸다.

        let webSockData_navi = {
            // xGoalPose: x,
            // yGoalPose: y
            xGoalPose: y,
            yGoalPose: x
        }
        
        webSocket_navi.send(JSON.stringify(webSockData_navi));
        
        let webSockData_video = {
            // xGoalPose: x,
            // yGoalPose: y
            // xGoalPose: y,
            // yGoalPose: x
            datatype : "string",
            content : "send me image"
        }
        console.log("Send to Server => "+"datatype : "+webSockData_video.datatype+", content: "+webSockData_video.content+"\n");
        
        webSocket_video.send(JSON.stringify(webSockData_video));
         
        
    })
    // pose_data = webSocket_video.recv()

    const canvas = document.querySelector('#canvas_map')
    canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

    
    
});




function draw() {
    let ctx;
    const canvas = document.getElementById("canvas_map");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//lsc
    }

    let img = new Image();
        img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas_resolution_width, canvas_resolution_height)
    }
    img.src = 'image/map_rect_310_600.png';
}

// below distionation related code 
function drawPoint(x, y) {
    let ctx;
    const canvas = document.getElementById("canvas_map");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        //ctx.fillStyle = "rgb(178,34,34)";
        //ctx.fillRect(x, y, 20, 20);

        let img = new Image();
        img.src = 'image/point.png';
        img.onload = function () {
            ctx.drawImage(img, x, y, 24, 24);
        }
        
    }
}

function drawMap(x, y) {
    let ctx;
    const canvas = document.getElementById("canvas_map");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//lsc
    }

    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas_resolution_width, canvas_resolution_height);

        if (x !== -1 && y !== -1) {
            drawPoint(x, y);
            // drawPoint(y, x);
        }
    }
    img.src = 'image/map_rect_310_600.png';
}


function getCursorPosition(canvas, event) {
const rect = canvas.getBoundingClientRect()
console.log("event.clientX: " + event.clientX + " event.clientY: " + event.clientY);
console.log("rect.left: " + rect.left + " rect.top: " + rect.top);
let x = event.clientX - rect.left;
let y = event.clientY - rect.top;
console.log("x: " + x + " y: " + y);
console.log("canvasX: " + x + " - canvasY: " + y+"\n");
$('#destination_x').val(100*x/canvas_resolution_width)
$('#destination_y').val(100*y/canvas_resolution_height)

x =x-10;
y = y-10

// x = x * 3.1;
// y = y * 6;

// x = x - 10;
// y = y - 10;
// // x = x - 5;
// // y = y - 5;

drawMap(x, y);




}



//socket connect
function disconnect(){
    if (webSocket_video.readyState === webSocket_video.OPEN) {
        webSocket_video.close();
        // webSocket_video = null;
        console.log('disconnected');
    }
}
function connect(){
    if (webSocket_video.readyState === webSocket_video.CLOSED) {
        
        ws2 = new webSocket_video(uri_video);
        ws2.onopen=webSocket_video.onopen;
        ws2.onmessage = webSocket_video.onmessage;
        ws2.onclose = webSocket_video.onclose;
        ws2.onerror = webSocket_video.onerror;
        webSocket_video = ws2
        console.log('connected');
    }
   
}

function stringToJson(input) {
          var result = [];

          //replace leading and trailing [], if present
          input = input.replace(/^\[/,'');
          input = input.replace(/\]$/,'');

          //change the delimiter to 
          input = input.replace(/},{/g,'};;;{');

          // preserve newlines, etc - use valid JSON
          //https://stackoverflow.com/questions/14432165/uncaught-syntaxerror-unexpected-token-with-json-parse
        input = input.replace(/\\n/g, "\\n")  
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        // remove non-printable and other non-valid JSON chars
        input = input.replace(/[\u0000-\u0019]+/g,""); 

        //   input = input.split(';;;');

        //   input.forEach(function(element) {
        //     // console.log(JSON.stringify(element));

        //     result.push(JSON.parse(element));
        //   }, this);

        //   return result;
        return input;
        }


function jsonfunc( jsonText ) {
    // console.log(typeof(jsonText));
    // console.log(jsonText);
    console.log("jsonText=> "+jsonText+"\n");
    // let jload = JSON.loads(jsonText);
    // console.log("jload=> "+jload+"\n")
    // jsonText = jsonText.replace(/^\s+|\s+$/g, "");

    // jsonText = "'"+jsonText+"'")
    // console.log(jsonText)
    // jsonText = stringToJson(jsonText);
    // console.log("-----------------------");
    // console.log(jsonText);
    let json = jQuery.parseJSON(jsonText); // String -> json으로 변환
    // let json = JSON.parse(JSON.stringify(jsonText)); // String -> json으로 변환
    // let json = jsonText;
    
    console.log("json.xNowPose=> "+json.xNowPose+"\n");
    console.log("json.yNowPose=> "+json.yNowPose+"\n");
    // gX = json.xNowPose;
    // gX = json.yNowPose;

    // let txt = "")
    // // 접근법 1
    // console.log("json.length=> "+json.length+"\n")
    // for(i=0; i<json.length; i++){
       
    //     for(key in json[i]){ // key값 가져오기
    //         txt += key + ":" + json[i][key];
    //         console.log("key=> "+key+" ,json[i][key]=> "+json[i][key]+"\n") 
    //     }
    //     txt += "<br>")
    // } 
    // // document.getElementById('demo').innerHTML = txt;
    // console.log("json parse => "+txt+"\n")

        return {
        x: json.xNowPose,
        y: json.yNowPose
    };
}

function jsonfuncimage( jsondata ) {
    // console.log(typeof(jsonText))
    // console.log(jsondata);
    // console.log("jsonText=> "+jsondata+"\n")
    // let jload = JSON.loads(jsonText)
    // console.log("jload=> "+jload+"\n")
    // jsonText = jsonText.replace(/^\s+|\s+$/g, "");

    // jsonText = "'"+jsonText+"'")
    // console.log(jsonText)
    // jsonText = stringToJson(jsonText);
    // console.log("-----------------------");
    // console.log(jsonText);
    let json = jQuery.parseJSON(jsondata); // String -> json으로 변환
    // let json = JSON.parse(JSON.stringify(jsonText)); // String -> json으로 변환
    // let json = jsonText;
    
    // console.log("json.datatype=> "+json.datatype+"\n")
    // console.log("json.content=> "+json.content+"\n")
    // console.log("json.shape=> "+json.shape+"\n")
    // gX = json.xNowPose;
    // gX = json.yNowPose;

    // let txt = "")
    // // 접근법 1
    // console.log("json.length=> "+json.length+"\n")
    // for(i=0; i<json.length; i++){
       
    //     for(key in json[i]){ // key값 가져오기
    //         txt += key + ":" + json[i][key];
    //         console.log("key=> "+key+" ,json[i][key]=> "+json[i][key]+"\n") 
    //     }
    //     txt += "<br>")
    // } 
    // // document.getElementById('demo').innerHTML = txt;
    // console.log("json parse => "+txt+"\n")

        return {
        datatype: json.datatype,
        content: json.content,
        shape : json.shape
    };
}




