const crypto = require("crypto");

// const API_URL = "https://testnet.bitmex.com";
const API_KEY = "48GphC_MTWN_0ntW4V1osU4S";
const API_SECRET = "-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV";

function expires() {
  return Math.round(new Date().getTime() / 1000) + 60;
}

function signature(verb, path, expires, postBody) {
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(verb + path + expires + postBody)
    .digest("hex");
}

function postBody(data) {
  return JSON.stringify(data);
}

export const historyOrders = () => {
  const path = "/api/v1/order";
  const verb = "GET";
  const expire = expires();
  const signa = signature(verb, path, expire, "");

  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
    "api-expires": expire,
    "api-key": API_KEY,
    "api-signature": signa
  };

  const requestOptions = {
    headers: headers,
    method: verb
  };

  return fetch(path, requestOptions)
    .then((r) => r.json())
    .then((data) => data)
    .catch(() => {
      return "Loading error";
    });
};

export const sendOrder = (data) => {
  const path = "/api/v1/order";
  const verb = "POST";

  const expire = expires();
  const body = postBody(data);
  const signa = signature(verb, path, expire, body);

  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
    "api-expires": expire,
    "api-key": API_KEY,
    "api-signature": signa
  };

  const requestOptions = {
    headers: headers,
    method: verb,
    body: body
  };

  return fetch(path, requestOptions)
    .then(function(response) {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Not enough money, check you balance");
      }
      return response.json();
    })
    .then((data) => data);
};

function startSocket({ cb, subscribeInfo, unsubscribeInfo }) {
  let socket = new WebSocket("wss://testnet.bitmex.com/realtime");

  socket.onopen = function() {
    socket.send(subscribeInfo);
  };

  socket.onmessage = function(e) {
    const parsedData = JSON.parse(e.data).data || [];
    cb(parsedData);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      console.log("[close] Соединение прервано");
    }
  };

  socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
    console.log(error);
  };

  return function() {
    if (unsubscribeInfo) {
      socket.send(unsubscribeInfo);
    }
  };
}

export const subscribeToUpdatePrice = (cb) => {
  const socketData = {
    cb: cb,
    subscribeInfo: `{"op": "subscribe", "args": "instrument"}`,
    unsubscribeInfo: false
  };
  startSocket(socketData);
};

export const subscribeToUpdateQuote = (cb, symbol) => {
  const socketData = {
    cb: cb,
    subscribeInfo: `{"op": "subscribe", "args": "tradeBin1m:${symbol}"}`,
    unsubscribeInfo: `{"op": "unsubscribe", "args": "tradeBin1m:${symbol}"}`
  };

  return startSocket(socketData);
};

export const loadActiveInstruments = () =>
  fetch("/api/v1/instrument/active/", {
    method: "GET"
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch(() => {
      return "Loading error";
    });

export const loadQuoteByTicker = (symbol) =>
  fetch("/api/v1/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=" + symbol, {
    method: "GET"
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch(() => {
      return "Loading error";
    });
