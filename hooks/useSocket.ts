import { useEffect, useState } from'react';
import io, { Socket } from 'socket.io-client';

interface ISocketErrorParams {
  attemptNumber?: number;
  timeout?: number;
}

interface ISocketSuccessParams {
  attemptNumber: number;
}

const SERVER_URL = `ws://${process.env.EXPO_PUBLIC_HOST_IP}:${process.env.EXPO_PUBLIC_HOST_PORT}`;
const testPropertyId = '66e03fa47b0629a80fb56f43'; // same as test_mqtt_client.py for testing purposes
const testUtility = 'electricity';

const testUsageEvent = testPropertyId + '/' + testUtility;

let socket: Socket | null = null;

export function useSocket({
  connectSuccess = () => {},
  reConnectSuccess = (opt: ISocketSuccessParams) => {},
  connectError = (opt: any) => {},
  connectTimeout = (timeout: number) => {},
  disconnect = (reason: string) => {},
  reconnectFailed = () => {},
}) {
  if (!socket) {
    socket = io(SERVER_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,  
    });

    socket.on('connect', () => {
      connectSuccess();
      console.log('Connected to WebSocket server');
    });

    socket.on('reconnect', (attemptNumber) => {
      reConnectSuccess({
        attemptNumber,
      });
      console.log('Reconnected successfully on attempt:', attemptNumber);
    });

    // 监听连接错误
    socket.on('connect_error', (err) => {
      connectError(err);
    });

    // 监听连接超时
    socket.on('connect_timeout', (timeout) => {
      connectTimeout(timeout);
      console.error('Connection timeout:', timeout);
    });

    // 监听断开连接
    socket.on('disconnect', (reason) => {
      disconnect(reason);
      console.log('Disconnected:', reason);
    });

    // 监听重连尝试
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Reconnecting attempt:', attemptNumber);
    });

    // 监听重连失败
    socket.on('reconnect_failed', () => {
      reconnectFailed();
      console.log('Reconnection failed after maximum attempts');
    });
  }

  return socket;
}