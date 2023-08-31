import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class FleteGateway {
  @WebSocketServer()
  server: Server;

  private frontendConnections: Map<string, Socket[]> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    const frontendId = client.handshake.query.frontendId as string;
    if (!this.frontendConnections.has(frontendId)) {
      this.frontendConnections.set(frontendId, []);
    }
    this.frontendConnections.get(frontendId).push(client);
  }

  handleDisconnect(client: Socket) {
    const frontendId = client.handshake.query.frontendId as string;
    const frontendClients = this.frontendConnections.get(frontendId);
    if (frontendClients) {
      this.frontendConnections.set(
        frontendId,
        frontendClients.filter((c) => c !== client),
      );
    }
  }

  sendToAllFrontends(data: any) {
    this.frontendConnections.forEach((clients, frontendId) => {
      clients.forEach((client) => {
        client.emit('to-all-frontend', data);
      });
    });
  }

  sendToFrontend(frontendId: string, data: any) {
    const clients = this.frontendConnections.get(frontendId);
    if (clients) {
      clients.forEach((client) => {
        client.emit('to-a-frontend', data);
      });
    }
  }

  @SubscribeMessage('recepción-fex')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
