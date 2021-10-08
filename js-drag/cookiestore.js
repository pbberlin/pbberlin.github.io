// stackoverflow.com/questions/2257631/how-to-create-a-session-using-javascript
// 

function exampleUsage() {
    var ttl = 3; // days
    writeToCookie('key1', 'val1', 3);
    var val = readFromCookie('key1')
}

/* 
    secure   - cookie will be sent in HTTPS transmission only.
    httpOnly - Don't allow scripts to access cookie. You can set both of the Secure and HttpOnly.
    domain   - specify the hosts to which the cookie will be sent.
    path     - create scopes, cookie will be sent only if the path matches.
    expires  - indicates maximum lifetime of cookie.
    samesite - for instance samesite=lax
*/
function writeToCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/ ; samesite=lax";
}

function readFromCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

function writeArrayToCookie(name, value, days) {
    writeToCookie(name, JSON.stringify(value), days);
}

function readArrayFromCookie(name) {
    strVal = readFromCookie(name);
    if (strVal == '') {
        return [];
    }
    return JSON.parse(strVal);
}

// no size, no entry order, slow to iterate
function writeObjectToCookie(name, value, days) {
    writeToCookie(name, JSON.stringify(value), days);
}

function readObjectFromCookie(name) {
    strVal = readFromCookie(name);
    if (strVal == '') {
        return {}; 
    }
    return JSON.parse(strVal);
}


// with size, with entry order, good to iterate
function writeMapToCookie(name, value, days) {
    // stackoverflow.com/questions/50153172
    writeToCookie(name, JSON.stringify([...value.entries()]), days);
}

function readMapFromCookie(name) {
    strVal = readFromCookie(name);
    if (strVal == '') {
        return new Map(); // dont use {}
    }
    // stackoverflow.com/questions/50153172
    return JSON.parse(strVal).reduce((m, [key, val]) => m.set(key, val), new Map());
}