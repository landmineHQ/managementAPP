import RouterSendMessage from "@utils/routerSendMessage";
import express, { Request, Response, NextFunction } from "express";
import monitorController from "@controllers/monitorController";

function createMonitorRouter() {
  const router = express.Router();

  router.get("/system", getSystemHandler);
  router.get("/devices", getDevicesHandler);
  router.get("/cpuline", getCpuLineHandler);
  router.get("/devicesline", getDevicesLineHandler);

  return router;
}

function getSystemHandler(req: Request, res: Response, next: NextFunction) {
  monitorController.getSystemInfo((data) => {
    RouterSendMessage.sendData(res, data);
  });
}

function getDevicesHandler(req: Request, res: Response, next: NextFunction) {
  monitorController.getDevicesInfo((data) => {
    RouterSendMessage.sendData(res, data);
  });
}

function getCpuLineHandler(req: Request, res: Response, next: NextFunction) {
  monitorController.getCpuLine((data) => {
    RouterSendMessage.sendData(res, data);
  });
}

function getDevicesLineHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  monitorController.getDevicesLine((data) => {
    RouterSendMessage.sendData(res, data);
  });
}

export default createMonitorRouter;
