<!-- headline will be auto-inserted  -->

Peter Buchmann, application developer at [ZEW Institute](https://www.zew.de/en/team/pbu)

<!-- <img  src="bg-03.jpg" style="display: block; margin: 0; padding: 0; width: 100%">
 -->
<img  src="iche.jpg" 
  style="display: block; 
    margin: 0; padding: 0; 
    width: 20%; min-width: 160px; max-width: 320px; 
    float: left; margin-right: 2rem;
    ">
<!-- https://www.w3schools.com/charsets/ref_utf_geometric.asp -->
<!-- &#9635; -->

<br>

&nbsp;  
[...2019](lte2019.md) &nbsp;  &#9679; &nbsp;  [2020](2020.md)  

## Projects&nbsp;2021

<div style='clear: both; height: 0px;'></div>

### <span style='font-size:75%'>January</span><br>CSS grid simulator

* `CSS grid` enables lean and flexible HTML layouts

* Inspired by [Michal's simulator](https://michalgrochowski.github.io/grid-playground/dist/)

* My resulting [CSS grid simulator](./css-grid-simulator/index.html)  
is uglier but has more [features](https://dilbert.com/strip/2001-02-05)

### <span style='font-size:75%'>March</span><br>From `SVN` to `GIT`

* Setting up a [gitserver](https://git.zew.de/) for the [ZEW institute](https://www.zew.de/)

* Using open source [gitea](https://gitea.io/en-us/) - similar to github.com

* LDAP login removes most of the tedious administration.  
Thanks to Andreas for setting up the AD access rights.

* Converting svn repositories up to 20 GB succeeded,  
after the underlying `Pearl` script  
was allocated 16 GB of RAM to store the helper structures.

### <span style='font-size:75%'>April</span><br>Release of [go-questionnaire 2.0](https://github.com/zew/go-questionnaire/releases/tag/v2.0.0)

* Migration to `CSS grid` layout

* May:  
[ZEW index](https://de.wikipedia.org/wiki/ZEW-Index) migrated to [go-questionnaire 2.0](https://github.com/zew/go-questionnaire)

* September:  
The [paternalism project](https://kups.ub.uni-koeln.de/46303/1/%5B2021%5D%20Ambuehl%20Bernheim%20Ockenfels_What%20Motivates%20Paternalism_AER_final%20WP.pdf) is using [go-questionnaire 2.0](https://github.com/zew/go-questionnaire)

<!-- * Check out my [CSS grid simulator](https://github.com/pbberlin/css-grid-playground) -->

### <span style='font-size:75%'>May</span><br>Pure Javascript validation

* Our [questionnaire software](https://github.com/zew/go-questionnaire)
needs instant feedback for user input

* Dependent on multiple other input fields

* Error messages in multiple languages

* [Case study](https://survey2.zew.de/doc/html5-form-validation/playground-03.html) using pure Javascript
  * [Presentation on youtube - in German](https://youtu.be/BaV0ebrcepY)  
use `caption (auto-generated)` and then `auto translate ... English`  
to view English subtitling
  * [Playground](https://survey2.zew.de/doc/html5-form-validation/playground-03.html)
  * [Docs](https://survey2.zew.de/doc/html5-form-validation/validation.md)

### <span style='font-size:75%'>October</span><br>Software library `struc2frm`

* Changing email forms is tedious and error-prone

* Solution: [Golang structure into HTML form](https://github.com/pbberlin/struc2frm)
  * HTML input form and card view
  * Input groups
  * Dropdowns
  * Multiselection by wildcards
  * CSRF defense
  * Request parsing
  * File uploads
  * CSV rendering
  * Default CSS

