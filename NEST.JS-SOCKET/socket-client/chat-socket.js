const socket = io("http://localhost:3000/chat")

const message = document.getElementById('message');
const messages = document.getElementById('messages');

//메세지를 전송하는 함수 socket.emit 메서드를 이용해 'message' 라는 이벤트를 서버로 전송
const handleSubmitNewMessage = () => {
  socket.emit('message', { data: message.value })
}

//서버에서 'message' 이벤트가 발생하면 클라이언트에서 message를 수신하고
//메세지를 처리함 handleNewMessage 함수에서 전달받은 메세지를 처리함
socket.on('message', ({ data }) => {
  handleNewMessage(data);
})

//새로운 메세지를 받았을때 호출되는 함수
//새로운 메세지를 처리하고 DOM에 추가하는 역할
const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}