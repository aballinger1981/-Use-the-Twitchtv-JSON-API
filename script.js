$(document).ready(function () {


  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];

  function getData(type, username) {
    return Promise.resolve($.ajax({
      type: "GET",
      url: 'https://api.twitch.tv/kraken/' + type + '/' + username,
      headers: { "Client-ID": "axvswxkjdpn8rjtoquaju69117f3sky" }
    }));
  }

  function getChannelData() {
    users.forEach(function (username, index) {
      var channelData = getData("channels", username);
      var streamData = getData("streams", username);
      var logo = "";
      var name = "";
      var html = "";
      var status = "";
      var nowPlaying = "";

      Promise.all([channelData, streamData]).then(function addData(values) {
        if (values[1].stream === null) {
          status = "Offline";
        } else if (values[1].stream === undefined) {
          status = "Offline";
        } else {
          status = "Online";
          nowPlaying = values[1].stream.channel.status;
        }

        logo = values[0].logo != null ? values[0].logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
        name = values[0].display_name != null ? values[0].display_name : username;
        html += "<div class='row channelsRow'><div class='col-xs-12 channelsColumn'>";
        html += "<img src='" + logo + "' class='img-responsive img-circle'>" + "<div class='nameAndStatus'><span class='channelName'>" + name + "</span>" + "<span class='status'>";
        html += status + "</span></div><span class='currentlyPlaying'>" + nowPlaying + "</span></div></div>";
        $("#channelsSection").append(html);
        html = "";
      }).catch(function (reason) {
        errorGettingData(reason.responseJSON.message);
      }).then(function () {
        setStatus(index, users);
      });
    });
  }

  function setStatus(index, users) {
    if (index === users.length - 1) {
      $(".status").each(function (value) {
        if ($(this).text() === "Offline") {
          $(this).addClass("offline");
        } else if ($(this).text() === "Online") {
          $(this).addClass("online");
        }
      });
    }
  }

  function errorGettingData(username) {
    var html = "";
    var logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
    var name = username;
    var status = "Offline";

    html += "<div class='row channelsRow'><div class='col-xs-12 channelsColumn'>";
    html += "<img src='" + logo + "' class='img-responsive img-circle'>" + "<div><span class='channelName'>" + name + "</span>" + "<span class='status'>";
    html += status + "</span></div></div></div>";
    $("#channelsSection").append(html);
  }


  getChannelData();


  function setStatusVisibility() {
    $("#onlineClicked").attr("style", "visibility: hidden;");
    $("#offlineClicked").attr("style", "visibility: hidden;");
    $("#allClicked").attr("style", "visibility: hidden;");
    $("#online").removeClass("clicked");
    $("#offline").removeClass("clicked"); '/'
    $("#all").removeClass("clicked");
    $("#online").addClass("unclicked");
    $("#offline").addClass("unclicked");
    $("#all").addClass("unclicked");
  }

  $(".statusSelection").on("click", function () {
    setStatusVisibility();
    $(".channelsRow").removeClass("hidden");
    $(this).children().attr("style", "visibility: visible;");
    $(this).removeClass("unclicked");
    $(this).addClass("clicked");
    var str = $(this).text();
    if (str.indexOf("Online") >= 0) {
      $(".offline").parent().parent().parent().addClass("hidden");
    } else if (str.indexOf("Offline") >= 0) {
      $(".online").parent().parent().parent().addClass("hidden");
    }
  });

  $(document).on("click", ".img-circle", function () {
    var name = $(this).siblings().children(".channelName").text();
    if (name.indexOf("does not exist") < 0) {
      var pageURL = "https://www.twitch.tv/" + name;
      window.open(pageURL);
    }
  });

  $(document).on("click", ".channelName", function () {
    var name = $(this).text();
    if (name.indexOf("does not exist") < 0) {
      var pageURL = "https://www.twitch.tv/" + name;
      window.open(pageURL);
    }
  });

  $(document).on("click", ".currentlyPlaying", function () {
    var name = $(this).siblings(".nameAndStatus").children(".channelName").text();
    if (name.indexOf("does not exist") < 0) {
      var pageURL = "https://www.twitch.tv/" + name;
      window.open(pageURL);
    }
  });

  $(document).on("click", ".status", function () {
    var name = $(this).siblings(".channelName").text();
    if (name.indexOf("does not exist") < 0) {
      var pageURL = "https://www.twitch.tv/" + name;
      window.open(pageURL);
    }
  });

});