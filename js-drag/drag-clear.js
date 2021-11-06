/* 
drag.js brings mouse dragging and touch swiping support
for svg elements

it requires ajax.js for logging and asynchroneous server communication
*/


// overload in app
// px - params X - contains variable meta data
// 
// extended example demonstrating usage of drop meta data;
// derive relative position within svg
// or change adjacent polygon points
function onEndDragUpdate(svg, el, px) {

  // upload user changes
  var postChanges = {
    name: px.planName,
    points: {}
  };

  var postChangesExample = {
    name: px.planName,
    points: {
      111: { x: 2, y: 3 },
    }
  };

  try {
    // 
    // get new polygon point position - and post it to server
    var isDirty = false;
    // logFunc("polygon drag 01", el.id, el.id.substring(2), parseInt(el.id.substring(2)) );
    var xId = parseInt(el.id.substring(2));
    var numAreas = 3;
    for (var i1 = 0; i1 < numAreas; i1++) {
      // var poly = document.getElementById(px.graphID + " area" + String(i));
      var cssClass = px.graphID + " area" + String(i1);
      var elements = document.getElementsByClassName(cssClass);
      for (i2 = 0; i2 < elements.length; i2++) {
        var poly = elements[i2];
        if (poly) {
          var newY = el.getBBox().y + el.getBBox().height / 2
          newY += transform.matrix.f;
          if (poly.points) {
            var pointIdx = Math.floor(xId / 10); // float to integer
            // logFunc("polygon and polygon.points exist; pointIdx - length", pointIdx, poly.points.length, typeof (poly.points), poly.points[pointIdx] );
            // poly.points[pointIdx].y = newY  // this fails on safari-mobile - instead see code below
            // var point1 = svg.createSVGPoint();
            // point1.y = 170;
            // poly.points.appendItem(point1);
            var pointOfChange = null;
            try {
              pointOfChange = poly.points.getItem(pointIdx);
            } catch (error) {
              // document.getElementById("console-log").style.display = "block";
              // logFunc("polygon.points index problem", error);
              logFunc("polygon.points index problem: area-, css-idx, len: ", i1, i2, poly.points.length);
              continue;
            }
            pointOfChange.y = newY;

            // only for first area: post changes
            if (i1 === 0) {
              var tfY = (newY - px.boundaryY1) / (px.boundaryY2 - px.boundaryY1);
              var newX = el.getBBox().x + el.getBBox().width / 2
              var tfX = (newX - px.boundaryX1) / (px.boundaryX2 - px.boundaryX1);
              postChanges.points[pointIdx] = { x: tfX, y: tfY };
              isDirty = true;
            }

          } else {
            logFunc("polygon.points does not exist; area-, css-idx: ", i1, i2);
          }
        } // if poly
      }  // for elements
    } // for areas


    // 
    // get new element position - and post it to server
    // values range from -0.5 to +0.5  -  0.0 is neutral
    if (el.id === "ctrl1" || el.id === "ctrl2" || el.id === "ctrl3" || el.id === "img02") {

      isDirty = true;

      postChanges.Control = el.id;

      var transform = getTransform(svg, el);

      postChanges.X = el.getBBox().x + el.getBBox().width / 2;
      postChanges.X += transform.matrix.e;
      postChanges.X -= px.boundaryX1
      postChanges.X /= px.boundaryX2 - px.boundaryX1
      postChanges.X -= 0.5 // -0.5 ... +0.5
      postChanges.X *= 2   // -1...+1
      postChanges.X = postChanges.X.toFixed(3);

      postChanges.Y = el.getBBox().y + el.getBBox().height / 2;
      postChanges.Y += transform.matrix.f;
      postChanges.Y -= px.boundaryY1
      postChanges.Y /= px.boundaryY2 - px.boundaryY1
      postChanges.Y -= 1
      postChanges.Y *= -2 //  0...2
      postChanges.Y -= 1  // -1...+1
      postChanges.Y = postChanges.Y.toFixed(3);
    }

    /*
    // dump changes
    var val;
    Object.keys(postChanges.y).forEach(function (key) {
      val = postChanges.y[key];
      logFunc("postChanges.y", key, val);
    });
    */

    if (isDirty) {
      asyncUpdateReadResponse("POST", px.postUpdateURL, postChanges);
    }

  } catch (error) {
    var caller_line = error.stack.split("<br>\n");
    logFunc("end onEndDragUpdate error", caller_line);
    hookRequestStop();    
  }

}

/*
  Transformation matrix
  a   b   e
  c   d   f
  0   0   1

  Only six values are used in the above 3x3 matrix.
  A transformation matrix is also expressed as a vector: [a b c d e f].

  a and d responsible for scaling in x and y respectively,
  e and f gives you the translated axis in the x and y respectively.

*/
function getTransform(svg, domEl) {

  // Make sure the first transform on the element is a translate transform
  var base = domEl.transform.baseVal;

  var validBase = false;
  if (typeof (base) != 'undefined' && base != null) {
    var validBase = true;
    // logFunc("baseTf defined && not null / type / length ", base, typeof base, base.length);
  }

  // stackoverflow.com/questions/35120590
  var numberOfTransformations = -1;
  if (typeof (base) != 'undefined' && base != null) {
    if (typeof base.length !== 'undefined') {
      numberOfTransformations = base.length;
    } else if (typeof base.numberOfItems !== 'undefined') {
      numberOfTransformations = base.numberOfItems;
    }
  }

  var cond2 = numberOfTransformations < 1;

  var cond3 = false;
  if (!cond2) {
    var tf = base.getItem(0);
    if (tf) {
      cond3 = tf.type !== SVGTransform.SVG_TRANSFORM_TRANSLATE;
    }
  }

  if (cond2 || cond3) {
    // Create a dummy translation by (0, 0)
    var translateDummy = svg.createSVGTransform();
    translateDummy.setTranslate(0, 0);
    domEl.transform.baseVal.insertItemBefore(translateDummy, 0);
    // logFunc("base tf added; base: ", base, "base.length:", numberOfTransformations );
  }
  // logFunc("base.length:", numberOfTransformations );

  var tf;
  try {
    tf = base.getItem(0);
  } catch (error) {
    logFunc("getTransform error", error);
    var translateDummy = svg.createSVGTransform();
    translateDummy.setTranslate(0, 0);
    tf = translateDummy;
  }

  return tf;
}




// Based on www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
// Contains closures for isolation.
// SVG main canvas is stored into variable 'svg' via onload event.
// Added vertical/horizontal constrains.
// Added dynamic constraint limits as argument.
// https://obfuscator.io/
function activateDrag(evt, graphID, constrainerID, planName, postUpdateURL, gridDivisions=10) {
 
  if (typeof planName === "undefined") {
    planName = "default-plan-1"
  }

  if (typeof postUpdateURL === "undefined") {
    postUpdateURL = "/rentomat/plan-update";
  }

  if (typeof gridDivisions === "undefined") {
    gridDivisions = 10;  // set to gridDivisions >> viewBox width in order to disable grid snap


    // gridDivisions = gridDivisions || 0;  // for ES5 - stackoverflow.com/questions/12797118/
  }

  var svg = evt.target; // main svg document or container

  // the dragged element; el may be set to the *parent* of the originall clicked event for group <g> tags
  var el;
  // elOrig always contains the element clicked on
  var elOrig;

  var pt0;          // original x;y coordinates of element
  var elTransform;  // existing transformation  of element
  var bbox;
  var minX, maxX, minY, maxY;

  var constrain;
  var constrainVert;
  var constrainHori;
  var gridify;
  var any3;

  // default coords for the inner plot area - acting as dragging constraints - should always get overridden below
  var boundaryX1 = 0;
  var boundaryX2 = 320;
  var boundaryY1 = 0;
  var boundaryY2 = 240;

  var gridWidth  = 10; // gets computed via gridDivisions 
  var gridHeight = 10;

  var bboxC = svg.getBBox();  // default - without constrainer - viewBox="0 0 40 30" must be equal to pixel width and height
  if (typeof constrainerID !== "undefined") {
    var constrainer = document.getElementById(constrainerID);
    if (constrainer) {
      bboxC = constrainer.getBBox();
    } else {
      constrainerID = "constrainerID --" + constrainerID + "-- not found; fallback to svg element; ";
    }
  }

  // boundaryX1 = parseFloat(constrainer.getAttributeNS(null, "x"));
  // boundaryX2 = parseFloat(constrainer.getAttributeNS(null, "width")) + boundaryX1;
  // ...
  boundaryX1 = bboxC.x;
  boundaryX2 = bboxC.x + bboxC.width;
  boundaryY1 = bboxC.y;
  boundaryY2 = bboxC.y + bboxC.height;
  gridWidth  = (boundaryX2 - boundaryX1) / gridDivisions;
  gridHeight = (boundaryY2 - boundaryY1) / gridDivisions;
  logFunc("constraining to '" + constrainerID + "'", bboxC.x, bboxC.x + bboxC.width, bboxC.y, bboxC.y + bboxC.height);


  // Mapping SVG container units to screen coordinates.
  // Current transformation matrix for the screen
  // is an object with six keys: a, b, c, d, e, f.
  function mouseAsLocal(evt) {
    var CTM = svg.getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; } // only the first touch
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }


  function startDrag(evt) {

    if (evt.target.classList.contains('draggable')) {

      el = evt.target;
      elOrig = el;
      // SVG <g> group elements do not capture mouse events,
      // so we need to get the group element from the child element.
      if (evt.target.parentNode.tagName == "g") {
        el = evt.target.parentNode;

        // firefox-repeat-problem-with-groups
        elOrig.classList.add("noevents");

        // firefox-repeat-problem-with-groups
        window.setTimeout(function () {
          // we re-activate event handling at the end of dragging
          // elOrig.classList.remove("noevents");
          // logFunc("removed again");
        }, 1500);


      }

      pt0 = mouseAsLocal(evt);

      // failed trials to achieve z-index change of dragged element
      if (false) {
        // el.style.zIndex = 100; // useless in SVG 1.1
        // el.setAttributeNS(null, "z", "100"); // useless in SVG 1.1
        var paragraph = document.createElement("P");
        var txt = document.createTextNode("a par - dragged " + el.id);
        paragraph.appendChild(txt);
        document.body.appendChild(paragraph);
        // <use xlink:href='#" + el.id + "'  />
        var use = document.createElement("USE");
        use.setAttributeNS("xlink", "xlink:href", "#" + el.id)
        svg.appendChild(use);
      }

      // Correct for existing translation
      elTransform = getTransform(svg, el);
      pt0.x -= elTransform.matrix.e;
      pt0.y -= elTransform.matrix.f;


      gridify       = evt.target.classList.contains('draggable');
      gridify       = gridWidth > 1 && gridHeight > 1

      constrain     = evt.target.classList.contains('constrain');
      constrainVert = evt.target.classList.contains('constrain-vert');
      constrainHori = evt.target.classList.contains('constrain-hori');
      any3 = constrain || constrainVert || constrainHori
      if (any3) {
        bbox = el.getBBox();
        minX = boundaryX1 - bbox.x - bbox.width  / 2;
        maxX = boundaryX2 - bbox.x - bbox.width  / 2;
        minY = boundaryY1 - bbox.y - bbox.height / 2;
        maxY = boundaryY2 - bbox.y - bbox.height / 2;
        // logFunc("constr both", minX, maxX, minY, maxY);
      }


      if (constrainVert) {
        minX = 0.000;
        maxX = 0.000;
        // minX = -0.02;
        // maxX = +0.02;
        minX += elTransform.matrix.e;
        maxX += elTransform.matrix.e;
        // logFunc("constr verti", minX, maxX, minY, maxY);
      } else if (constrainHori) {
        minY = 0.000;
        maxY = 0.000;
        // minY = -0.02;
        // maxY = +0.02;
        minY += elTransform.matrix.f;
        maxY += elTransform.matrix.f;
        // logFunc("constr horiz", minX, maxX, minY, maxY);
      }




    }
  }


  function drag(evt) {

    if (typeof el === "undefined") {
      el = false;
      return
    }

    if (!el) {
      el = false;
      return;
    }

    evt.preventDefault();
    // evt.stopPropagation(); // did not stop the firefox-repeat-problem
    var pt1 = mouseAsLocal(evt);
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    if (any3) {
      if (dx < minX) { dx = minX; }
      else if (dx > maxX) { dx = maxX; }
      if (dy < minY) { dy = minY; }
      else if (dy > maxY) { dy = maxY; }
    }
    // logFunc("dragging to", dx, dy);
    elTransform.setTranslate(dx, dy);

  }


  function endDrag(evt) {

    try {

      if (typeof el === "undefined") {
        el = false;
        return
      }

      if (!el) {
        el = false;
        return;
      }

      if (typeof el.id === "undefined") {
        el = false;
        return;
      }

      if (typeof el.id === "") {
        el = false;
        return;
      }

      // snap dragged object to grid
      //     we cannot gridify unconstrained elements, 
      //     since minX, minY, maxX, maxY require a constraining container
      if (gridify && any3) {
        var graW = gridWidth; // shortcut to granularity; for example 25
        var graH = gridHeight; 

        var gridX = elTransform.matrix.e
        gridX = Math.round((gridX - minX) / graW) * graW   + minX
        if      (gridX < minX + graW) { gridX = minX; } // off limit...
        else if (gridX > maxX - graW) { gridX = maxX; }

        var gridY = elTransform.matrix.f
        gridY = Math.round((gridY - minY) / graH) * graH   + minY
        if      (gridY < minY + graH) { gridY = minY; } // off limit...
        else if (gridY > maxY - graH) { gridY = maxY; }

        elTransform.setTranslate(gridX, gridY);
      }

      var metaData = { 
        graphID:         graphID, 
        planName:        planName, 
        postUpdateURL:   postUpdateURL, 
        boundaryX1:      boundaryX1, 
        boundaryX2:      boundaryX2, 
        boundaryY1:      boundaryY1, 
        boundaryY2:      boundaryY2, 
        pt0:             pt0, 
        elTransform:     elTransform, 
        lastMember:      "dummy-value" 
      };

      onEndDragUpdate(svg, el, metaData);


    } catch (error) {
      // logFunc("end drag error", error);
      var caller_line = error.stack.split("<br>\n");
      logFunc("end drag error", caller_line);
      hookRequestStop();
    }

    // firefox-repeat-problem-with-groups
    // reactivate event handling
    elOrig.classList.remove("noevents");
    elOrig = false;
    el = false;


    logFunc("end drag");

  }

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);

  svg.addEventListener('touchstart', startDrag);
  svg.addEventListener('touchmove', drag);
  svg.addEventListener('touchend', endDrag);
  svg.addEventListener('touchleave', endDrag);
  svg.addEventListener('touchcancel', endDrag);



  logFunc("dragging activated")

}
