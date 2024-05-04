import { ServerOptions, Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import setupSocketEvent from "./events/connection";
import initMiddleware from "@sockets/middleware";

enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
  MESSAGE = "message",
}

let io: SocketIOServer;

const options = {
  cors: {
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
    exposedHeaders: ["Content-Disposition"],
  },
  allowRequest(req, fn) {
    if (process.env.NODE_ENV === "development") {
      // 在开发环境中允许所有跨域请求
      fn(null, true);
    } else {
      // 在生产环境中，您可以添加更多的逻辑来决定是否允许请求
      // 例如，基于请求的来源或其他安全考虑
      // 这里只是一个简单的示例
      fn(null, false); // 不允许跨域请求
    }
  },
} as ServerOptions;

function setupSocket(server: HTTPServer) {
  io = new SocketIOServer(server, options);
  initMiddleware(io);

  io.on("connection", (socket) => {
    setupSocketEvent(socket);
  });
}

export default setupSocket;
export { SOCKET_EVENT };
export { io };
