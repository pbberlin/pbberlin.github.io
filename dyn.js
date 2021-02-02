
var itemCounter = 0;

var lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam ipsam distinctio reprehenderit maxime aperiam blanditiis doloremque dicta sunt tempora dolores? Laborum inventore placeat distinctio doloribus rerum veniam voluptatibus quos repudiandae, nobis consequatur cumque facere, dolor nihil excepturi numquam. Asperiores soluta quibusdam sapiente ad dolorum, dolore in error necessitatibus blanditiis vel officia minus porro quas consequuntur incidunt commodi itaque laboriosam ipsam nobis velit consequatur sint iusto voluptas aliquam. Minima dolorum maiores temporibus in ab magni, ex, molestiae natus iure atque explicabo, accusantium beatae saepe! Sint, ex, accusamus, ea blanditiis cumque harum voluptate neque molestiae sit maiores deserunt dolorum nesciunt corporis perferendis! Optio quisquam labore doloremque cumque, porro in. Molestias, alias totam reprehenderit atque ea maiores quo. Laboriosam suscipit fugiat, tenetur accusantium sint unde totam illo. Eius fuga sit, provident, corporis est eaque dignissimos aut fugit error id adipisci voluptatum aspernatur praesentium tempore nobis necessitatibus magni? Doloribus non iure, saepe quaerat maiores, inventore in, reprehenderit tempore deserunt est earum sapiente. Iure nam sapiente ullam qui, libero rerum odio dolorum perspiciatis facilis distinctio ipsam doloribus dolores sit. Asperiores quia esse sed! Repellat, sit repellendus hic quam eius molestias optio repudiandae modi reprehenderit et vero libero dolores ullam assumenda mollitia eum magni magnam, amet ipsa. Cumque quaerat corrupti deserunt quam tenetur repudiandae, hic quod, ipsum quia illo natus quae maxime nobis vero. Veritatis deserunt provident error culpa repellat in odio, architecto ab quia a obcaecati eos esse quod quidem? Repellat sed aliquid enim labore magnam dolorem minima exercitationem perferendis totam blanditiis, corrupti impedit sunt nemo! Maxime unde voluptatem non. Consequatur, id. Eligendi commodi amet, accusantium accusamus doloribus sunt aspernatur cupiditate aperiam rem tempora ipsum quia facilis ducimus molestiae. Non neque in iusto deserunt dolores maiores nisi ratione fugit. Cum dolorem ad eius rerum omnis, eligendi explicabo odit praesentium fuga, veritatis maiores officia consequuntur ut repudiandae. Iste dolores saepe, necessitatibus doloremque, nisi inventore praesentium soluta fugiat esse asperiores veritatis debitis molestias quam ducimus molestiae totam quisquam a corporis facilis. Itaque voluptatibus dolor perferendis nam eveniet molestias ea sint.";

/* inserting a div under 'grid-container',
    containing the CSS grid item level controls,
    containing random text of three size classes
*/
function addItem(delta) {

    if (delta === undefined ) {
        delta = 1;
    }

    var el = document.getElementsByClassName("grid-container")[0];

    for (let index = 0; index < delta; index++) {
        itemCounter++;

        var itm = document.createElement('div');
        itm.id = `item-${itemCounter}`;
        itm.className = `item  item-${itemCounter}`;
        var chunkSize = Math.ceil(Math.random() * 10);
        var textLen = "xxx";
        if (chunkSize <= 5) {
            textLen = 5 + Math.ceil(Math.random() * 20);
        } else if (chunkSize <= 8) {
            textLen = 80 + Math.ceil(Math.random() * 120);
        } else {
            textLen = 240 + Math.ceil(Math.random() * 280);
        }


        var itmMnu = document.createElement('div');
        itmMnu.className = "item-menu";


        itmMnu.innerHTML += `<a href="" title="inc row span" onclick="incRowColSpan(this,'row');return false;">+R</a> `;
        itmMnu.innerHTML += ` &nbsp; `;
        itmMnu.innerHTML += `<a href="" title="inc col span" onclick="incRowColSpan(this,'col');return false;">+C</a> `;
        itmMnu.innerHTML += ` &nbsp;&nbsp; `;
        itmMnu.innerHTML += `<a href="" title="delete item"  onclick="this.parentNode.parentNode.remove(); return false;">X</a> `;
        itmMnu.innerHTML += `<br>`;

        itmMnu.innerHTML += `<span style='display:inline-block;width: 1.6rem;'>main</span>`;
        itmMnu.innerHTML += `<a href="" title="start"    onclick="this.parentNode.parentNode.style['justify-self']='start';   return false;"> <</a> `;
        itmMnu.innerHTML += `<a href="" title="center"   onclick="this.parentNode.parentNode.style['justify-self']='center';  return false;">&ndash;</a> `;
        itmMnu.innerHTML += `<a href="" title="stretch"  onclick="this.parentNode.parentNode.style['justify-self']='stretch'; return false;">&#9744;</a> `;
        itmMnu.innerHTML += `<a href="" title="end"      onclick="this.parentNode.parentNode.style['justify-self']='end';     return false;">> </a> `;
        itmMnu.innerHTML += `<br>`;

        itmMnu.innerHTML += `<span style='display:inline-block;width: 1.6rem;'>cross</span>`;
        itmMnu.innerHTML += `<a href="" title="start"    onclick="this.parentNode.parentNode.style['align-self']='start';   return false;"> <</a> `;
        itmMnu.innerHTML += `<a href="" title="center"   onclick="this.parentNode.parentNode.style['align-self']='center';  return false;">&ndash;</a> `;
        itmMnu.innerHTML += `<a href="" title="stretch"  onclick="this.parentNode.parentNode.style['align-self']='stretch'; return false;">&#9744;</a> `;
        itmMnu.innerHTML += `<a href="" title="end"      onclick="this.parentNode.parentNode.style['align-self']='end';     return false;">> </a> `;
        itmMnu.innerHTML += `<br>`;

        itm.appendChild(itmMnu);


        itm.innerHTML += `${itemCounter}. `;

        var txt = lorem.substring(0, textLen);
        for (; ;) {
            var a = txt.substring(textLen - 1, textLen) == ",";
            var b = txt.substring(textLen - 1, textLen) == " ";
            var c = txt.substring(textLen - 2, textLen - 1) == " ";
            var d = txt.substring(textLen - 3, textLen - 2) == " ";
            if (!a && !b && !c && !d) {
                break;
            }
            textLen--
            txt = lorem.substring(0, textLen);
        }
        itm.innerHTML += txt;
        // &#1792;
        itm.innerHTML += ` <span style="font-weight: bold;"> &#9220;</span>`;
        itm.innerHTML += ` <span class="extender" onclick="extend(this,'width'); return false;" style="padding-bottom: 0.14rem;" >  -  </span>`;
        itm.innerHTML += ` <span class="extender" onclick="extend(this,'height');return false;" style="padding-bottom: 0.10rem;padding-top: 0.04rem;" >  I  </span>`;

        el.appendChild(itm);

        console.log("added", itm.className);

    }

}



function addGridTemplateBuilderArg(srcA, argB) {
    var i1 = document.getElementById("uiGTB1").value;
    var i2 = document.getElementById("uiGTB2").value;
    var i3 = document.getElementById("uiGTB3").value;
    var o  = document.getElementById("uiGTB5");

    if (i2 != i3) {
        if (i2.substring(i2.length-2,i2.length) == "fr") {
            alert("first argument of minmax cannot be 'fr'");
            return;
        }
    }

    if (i1 == "") {

        if (i2 == i3) {
            o.value +=                      `${i3}  `;
        } else {
            o.value +=       `minmax(${i2}, ${i3})  `;
        }

    } else {
        o.value += `${i1} minmax(${i2}, ${i3})  )`;
    }

    console.log("grid template arg added", o);

}


/* incrementing an argument to CSS 'grid-[row,column]-end'
    'span 2' becomes 'span 3' ...
*/
function incSpan(arg) {
    if (arg == "") {
        return "span 2";
    }

    var arr1 = arg.split(` `);
    if (arr1.length != 2) {
        return "span 2";
    }

    argStr = arr1[1];
    var argInt = parseInt(argStr);
    argInt++
    return `span ${argInt}`;
}

/* incrementing the row/column span
    of a CSS grid item
*/
function incRowColSpan(srcA,rowCol) {
    var par = srcA.parentNode.parentNode;
    if (rowCol == 'row') {
        par.style["grid-row-end"]    = incSpan(par.style["grid-row-end"]);
    }
    if (rowCol == 'col') {
        par.style["grid-column-end"] = incSpan(par.style["grid-column-end"]);
    }
}
/*
    prop is either width or height
*/
function extend(srcA, prop) {

    if (srcA.style[prop] == "") {
        srcA.style[prop] = "10rem";
        srcA.style["background-color"] = "var(--clr-item-border)";
    } else {
        var prev = srcA.style[prop];
        prev = prev.substring(0,prev.length-3); // cut off "rem"
        var prevInt = parseInt(prev);
        prevInt = 1.4 * prevInt;
        srcA.style[prop] = `${prevInt}rem`;
    }
    console.log("extended  ", srcA.style[prop]);

}



/*
    createCSSClass modifies the CSS grid properties of the grid-container;
    we could directly change elGridContainer.style["css-property"];
    we thought it would be nicer to change the CSS class for grid-container;
    but this is not possible;
    thus we create/update classes for each CSS grid property
    dynamically changed
*/
function createCSSClass(srcInp, cssProperty) {
    var newClass = `.${cssProperty} {  ${cssProperty}: ${srcInp.value};  }`;
    addReplaceCSSClass(`.${cssProperty}`, newClass);
    var el = document.getElementsByClassName("grid-container")[0];
    el.classList.add(`${cssProperty}`);  // add, remove, toggle, contains, replace
}


/* a dynamically created <style> element for dynamic CSS grid classes */
var dynStyleEl       = document.createElement('style');
dynStyleEl.innerHTML = "";


/*
    addReplaceCSSClass is based on a dynamically created <style> element;
    it contains one-liner CSS classes - one for each
    CSS grid property;
    on update, the innerHTML is parsed line by line,
    and the new class is inserted/replaced.
*/
function addReplaceCSSClass(prefix, newClass) {
    var arr1 = dynStyleEl.innerHTML.split(`\n`);
    var found = false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].startsWith(prefix)) {
            found = true;
            arr1[i] = newClass;
            console.log("replaced", i, newClass);
            break;
        }
    }
    var newInner = arr1.join(`\n`)
    if (!found) {
        newInner += newClass + `\n`;
        console.log("appended  ", newClass);
    }
    dynStyleEl.innerHTML = newInner;
}


function onBodyLoad() {
    console.log("on body load start");

    document.getElementById("ui01a").focus();

    document.body.appendChild(dynStyleEl);  // append dynamic <style> element


    console.log("on body load end");
}
