import LoggerModel from '../models/logger.js';
import { v4 as uuidv4 } from 'uuid';
export const logger = async ({ req, dataResponse, isError }) => {
  try {
    const path = req.path;
    const headers = req.headers;
    const body = req.body;
    const params = req.params;
    const query = req.query;
    const method = req.method;
    const originalUrl = req.originalUrl;
    const ip = req.ip;
    const hostname = req.hostname;

    const DataRequest = {
      body: body,
      params: params,
      query: query,
    };
    const dataAdditional = {
      headers: headers,
      method: method,
      originalUrl: originalUrl,
      ip: ip,
      hostname: hostname,
    };
    const loggerDoc = new LoggerModel({
      uuid: uuidv4(),
      path,
      DataRequest,
      dataResponse,
      dataAdditional,
      isError,
    });

    await loggerDoc.save();
  } catch (e) {
    console.error(e);
  }
};
