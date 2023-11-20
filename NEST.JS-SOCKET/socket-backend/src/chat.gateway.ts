import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

//ChatGateway 클래스를 WebSocket 게이트웨이로 표시, 클라이언트간 통신
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server;

  //handleMessage 메서드에 적용되어 해당 메서드가 클라이언트에서
  //전송한 'message' 이벤트에 대한 메세지를 수신함
  @SubscribeMessage('message')
  //@MessageBody데코레이터는 WebSocket 메시지 페이로드에서
  //메세지 내용을 추출
  handleMessage(@MessageBody() message: string): void {
    //emit 메서드는 전달받은 메세지를 모든 클라이언트에게 전송함\
    //emit 메서드의 첫번째 인자는 수신한 이벤트이름, 두번째 인자는 실제로 전송됨 메세지 입력값
    this.server.emit('message', message);
  }
}
