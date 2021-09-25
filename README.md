<!-- headline will be auto-inserted  -->

<img  src="bg-02.jpg" style="display: block; margin: 0; padding: 0; width: 100%">

## 2021

### Package `struc2frm`

* People want changes to their email forms

* Tedious and error-prone

* Solution:  
[Golang structure into HTML form](https://github.com/pbberlin/struc2frm)
  * Input groups
  * Dropdowns
  * Multiselection by wildcards
  * File uploads
  * CSRF defense
  * Request parsing
  * HTML rendering
  * CSV rendering

All derived from a single data structure

### CSS grid inspiration

* `CSS grid` gives slimmer and more flexible HTML  
for our [questionnaire software](https://github.com/zew/go-questionnaire)

* For getting familiar with the concepts of `CSS grid`  
I created a `test case`

* Check out my resulting [CSS grid simulator](css-grid-simulator.html)

* For comparison: [Michal's simulator](https://michalgrochowski.github.io/grid-playground/dist/)

### `SVN` to `GIT` migration

* In March 2021, I concluded the migration from svn to git in our institute

* Our [gitea](https://gitea.io/en-us/) server works roughly similar to github.com

* LDAP login removes most of the tedious administration.  
Thanks to Andreas for setting up the AD access rights.

* Converting 20 GB svn repositories to git was successful,  
after the underlying `Pearl` script  
was allocated 16 GB of RAM to store the helper structures.

### Case study: Pure Javascript validation

* Our [questionnaire software](https://github.com/zew/go-questionnaire)
needs instant feedback for user input

* Feedback is dependent on multiple other input fields

* Error messages must come in multiple languages

* Do you know a JS libary or existing solution?

* I created a `case study` solution using pure JS

* [Docs](https://survey2.zew.de/doc/html5-form-validation/validation.md)

* [Playground](https://survey2.zew.de/doc/html5-form-validation/playground-03.html)

* [Presentation on youtube - in German](https://youtu.be/BaV0ebrcepY)  
use `caption (auto-generated)` and then `auto translate ... English`  
to view English subtitling

### `go-questionnaire` version 2.0

* [go-questionnaire](https://github.com/zew/go-questionnaire/releases/tag/v2.0.0)  based on CSS grid is released

* Work began in February 2021

* Since May 2021 [ZEW index](https://de.wikipedia.org/wiki/ZEW-Index) is using go-questionnaire 2.0

* September 2021 saw the successful conclusion of the  
four `paternalism` research questionnaires.  
Unpublished; based on [this paper](https://kups.ub.uni-koeln.de/46303/1/%5B2021%5D%20Ambuehl%20Bernheim%20Ockenfels_What%20Motivates%20Paternalism_AER_final%20WP.pdf);  
also using `go-questionnaire 2.0`.

* `go-questionnaire 2.0` based on CSS grid is considered stable

<!-- * Check out my [CSS grid simulator](https://github.com/pbberlin/css-grid-playground) -->
