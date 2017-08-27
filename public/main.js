/*
* (C) 2017 💩💩💩
*/

function backgroundAnimation() {
  Particles.init({
    selector: '.background-particles',
    color: '#ffffff',
    speed: 0.25,
    connectParticles: true,
    maxParticles: 125,
    minDistance: 125
  });
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status === 200) {
      success(xhr.responseText);
    }
  };

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  return xhr;
}

function app() {
  // Get OAuth code
  var code = getParameterByName('code');

  // Invalid code?
  if (typeof code === 'undefined') {
    return;
  }

  // Invalid code?
  if (code === null) {
    return;
  }

  // Invalid code?
  if (code.length === 0) {
    return;
  }

  // Ajax call
  postAjax('https://slack-bot.talkingcrypto.party/slack/link', { code: code }, function(response) {
    alert('Succesfully added Price Bot to Slack!');
  });
}

function tracking() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-57637936-4', 'auto');
  ga('send', 'pageview');
}


window.onload = function() {
  // Init JS
  app();

  // Tracking
  tracking();

  // Background animation
  backgroundAnimation();
};
