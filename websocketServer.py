import asyncio;
# 웹 소켓 모듈을 선언한다.
import websockets, os;

# import struct
import json


# 클라이언트 접속이 되면 호출된다.
async def accept(websocket, path):
    while True:
        # 클라이언트로부터 메시지를 대기한다.
        data = await websocket.recv()

        print('received data : ', data)
        
        jsonData = json.loads(data)
        xGoalPose = jsonData["xGoalPose"]
        yGoalPose = jsonData["yGoalPose"]
        print("x : ", xGoalPose)
        print("y : ", yGoalPose)
        
        command = 'ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose' + \
         " \"{pose: {header: {}, pose: {position: {x: "+ str(xGoalPose)+","+ "y: "+str(yGoalPose)+"," + 'z: 0.0}}}}\"'
        
        print(command)
        os.system(command) 
        #data = json.dumps(data).encode()
        
        #print('json data : ', data)


        # data = struct.unpack('d',data)

        # print('unpacked data : ', data)

        # hexadecimal_string = data. hex()
        # print(hexadecimal_string)




        # print("receive : " , str(data, 'utf-8'));
        # # 클라인언트로 echo를 붙여서 재 전송한다.
        # # await websocket.send("echo : " + data);
        # await websocket.send(str(data, 'utf-8'));

        # binAnswer = await websocket.recv_frame()  
        # print(websocket.ABNF.OPCODE_MAP[binAnswer.opcode])
        
        # for byte in bytearray(binAnswer.data):
        #     print(byte)
 
# 웹 소켓 서버 생성.호스트는 localhost에 port는 9998로 생성한다. 
start_server = websockets.serve(accept, "localhost", 9998);
# 비동기로 서버를 대기한다.
asyncio.get_event_loop().run_until_complete(start_server);
asyncio.get_event_loop().run_forever();

