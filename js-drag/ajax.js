/*
ajax.js brings easy asynchroneous server communication

call from your page
    asyncUpdateReadResponse("POST","https://www.mydomain.com/my-endpoint", { firstname: "Malcom", lastname: "Reynolds" }, { json: 1})

overload updateWebsite(responseMap) to change your page

include 
    <div id="console-log"></div>
on your page to directly the see log
 */
logFunc = function () {
    var line = "";
    for (var i = 0; i < arguments.length; i++) {
        if ((typeof arguments[i]) == "string") {
            if (arguments[i].length > 400) {
                arguments[i] = arguments[i].substr(0,400)
            }
        }
        line += String(arguments[i]) + ", ";
    }
    line += "\n"
    console.log(line);
    var out = document.getElementById("console-log"); // some visible div - to watch errors
    if (out !== null) {
        out.innerHTML += line
        out.scrollTop = out.scrollHeight;
    }
};

// overload in app
function hookRequestStart() {
    // hook for visual cues in page
    // override in page
}

// overload in app
function hookRequestStop() {
    // hook for visual cues in page
    // override in page
}

// overload in app
function hookTimeOut(e) {
    // hook for visual cues in page
    // override in page
    // for instance
    // document.getElementById('img02').setAttribute('src', '/{{AppPrefix}}/img/ui/4walls-no-img-in-response.png');
}

// overload in app
function updateWebsite(responseMap) {
    // hook for doing something with responseMap
    // override in page
}


// ajax request without jQuery
// method GET or POST
// mapOfParams should be javascript map/dictionary - or object
// stackoverflow.com/questions/18541940/map-vs-object-in-javascript
// urlParamsForPost always appended as URL query string for POST requests
// 
// for POST method: Check whether POST works at server.
//     curl -X POST updateURL --output out.html
// otherwise misleading CORS error message
function asyncUpdateReadResponse(method, updateURL, mapOfParams, urlParamsForPOST) {
    if (method != "GET" && method != "POST") {
        logFunc('XMLHttpRequest: method must be GET or POST ', method);
        return
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xhr.status == 200) {
                logFunc('XMLHttpRequest: Response ', xhr.responseText);
                try {
                    var responseMap = JSON.parse(xhr.responseText);
                    updateWebsite(responseMap);
                } catch (error) {
                    logFunc("response json parse error", error);
                }
            } else {
                logFunc('XMLHttpRequest: status != 200 returned', xhr.status);
            }
            hookRequestStop();
        }
    };
    // if no network connection => xhr.send() fails; if server does not respond => timeout
    xhr.timeout = 8000;
    xhr.ontimeout = function (e) {
        logFunc('XMLHttpRequest: timeout', e);
        hookTimeOut(e);
    }
    if (method == "GET") {
        // var queryString = 'key1=val1&key2=val2&'; // example
        var queryString = Object.keys(mapOfParams).map(key => key + '=' + mapOfParams[key]).join('&');
        updateURL += "?" + queryString
    } else if (method == "POST") {
        if (urlParamsForPOST && typeof urlParamsForPOST !== 'undefined') {          
            var queryString = Object.keys(urlParamsForPOST).map(key => key + '=' + urlParamsForPOST[key]).join('&');
            updateURL += "?" + queryString
        }
    }
    xhr.open(method, updateURL, true);

    // CORS requirements: According to https://www.w3.org/TR/cors, simple request header must be: application/x-www-form-urlencoded, multipart/form-data, or text/plain
    // xhr.setRequestHeader('Content-type', 'application/json'); // cannot use
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    hookRequestStart();
    logFunc('XMLHttpRequest: Sending ', updateURL, JSON.stringify(mapOfParams));
    if (method == "POST") {
        var exampleParams = {
            name: 'John Smith',
            age: 34
        };

        // xhr.send(JSON.stringify(mapOfParams));  // does not work for POST x-www-form-urlencoded
        // xhr.send(mapOfParams);                  // does not work for POST x-www-form-urlencoded
        // xhr.send(encodeURI(queryString));       // not applicable

        // make it x-www-form-urlencoded
        // plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
        encodedParams = Object.keys(mapOfParams).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(mapOfParams[k]) }
        ).join('&');

        // first failure if browser has not network connection
        xhr.send(encodedParams);
    } else {
        xhr.send();
    }

}



