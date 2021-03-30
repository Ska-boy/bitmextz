// const crypto = require("crypto");
// const request = require("request");

// import { devServer } from "../vue.config";

// const API_URL = "https://testnet.bitmex.com";
// const API_KEY = "48GphC_MTWN_0ntW4V1osU4S";
// const API_SECRET = "-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV";

// const expires = Math.round(new Date().getTime() / 1000) + 60;
// const verb = "GET";
// const path = "/api/v1/instrument/active";
// const postBody = "";

// const signature = crypto
//   .createHmac("sha256", API_SECRET)
//   .update(verb + path + expires + postBody)
//   .digest("hex");

// const headers = {
//   "content-type": "application/json",
//   Accept: "application/json",
//   "X-Requested-With": "XMLHttpRequest",
//   // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
//   // https://www.bitmex.com/app/apiKeysUsage for more details.
//   "api-expires": expires,
//   "api-key": API_KEY,
//   "api-signature": signature
// };

// const requestOptions = {
//   headers: headers,
//   // Notice we are using testnet here. Switch to www to query the production site.
//   url: API_URL + path,
//   method: verb,
//   body: postBody
// };

// export const getData = () => {
// request(requestOptions, function(error, response, body) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(body);
// });
// };

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
