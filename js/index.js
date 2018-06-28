$(document).ready(function() {
  // Please change APP_ID and APP_KEY to those provided by WiiHey Customer Service
  var APP_ID = "demo";
  var APP_KEY = "demo123";

  var PORT = 8884;
  var HOST = "iot.wiihey.com";

  var options = {
    port: PORT,
    host: HOST,
    username: APP_ID,
    password: APP_KEY,
    protocol: "wss",
    rejectUnauthorized: true
  };

  var client = mqtt.connect(options);

  client.subscribe("apps/" + APP_ID + "/inbox");

  var first_message = true;

  client.on("connect", function() {
    console.log("Connection Established");

    $("#state").text("Connected. Receiving Messages");
  });

  client.on("message", function(topic, message) {
    if (first_message) {
      first_message = false;

      $("#no-messages").remove();
    }

    msg_obj = JSON.parse(message);
    msg_str = JSON.stringify(msg_obj, null, 2);

    t = new Date(msg_obj.Timestamp * 1000);

    console.log("Received: " + msg_str);
    console.log(msg_obj.Timestamp);

    $("#messages").append(
      "<tr>" +
        "<td>" +
        t.toLocaleTimeString() +
        "</td>" +
        "<td>" +
        msg_obj.DeviceID +
        "</td>" +
        "<td><pre>" +
        msg_str +
        "</pre></td>" +
        "</tr>"
    );

    // Process Received Message
  });
});
