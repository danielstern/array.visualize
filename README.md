<h2>
  <a href="http://danielstern.github.io/array.visualize/#/">Array Visualize</a>
</h2>

# Quick Start Instructions
1. Run `npm install && npm run postinstall`
2. Run `npm start`


<h3>
  A practical library
</h3>
<p>
    Array visualize is a simple d3.js-based library with one purpose: to illustrate arrays.
</p>
<p>
  It was made for the purpose of visualizing array functions for tutorials.
</p>
<p>
  You can use this library for your demos, presentations and tutorials.
</p>
<p>
  It is possible to set a few variables in options. However you can also use CSS and it is compatible, and usually better.
</p>

<h2>
<a href="http://danielstern.github.io/array.visualize/#/">Visit the project page</a>
</h2>

<h3>
  How to Use
</h3>

<h4>
  <pre>illustrateArray(data,svg,options):ArrayVisualizer</pre>
</h4>

<p>
  This is the main function of the library. Creates an svg visualization based upon the data provided. 
</p>
<p>
  Also return an object you can use to manipulate the array visualization, much like manipulating an array itself.
</p>
<p>
  
</p>
<h5>
  Example
</h5>
<pre>
  var data = ['stark','lannister','targeryen'];
  var svg = d3.select('document').append('svg');
  var options = {fontsize:12}
  illustrateArray(data,svg,options)</pre>
<div id="_filter">
   
</div>


<h4>
  <pre>ArrayVisualizer.push(entry)</pre>
</h4>

<p>
  Pushes another entry to the end of the array with an animation. If an index is provided, pushes the item to that index.
</p>
<p>
  Useful for teaching someone what "push" does.
</p>
<p>
  
</p>
<h5>
  Example
</h5>
<pre>
  var v = illustrateArray( ['stark','lannister','targeryen'],svg)

  v.push('baratheon');
  v.push('tyrell',2);

</pre>
<div id="_push">
   
</div>


<h4>
  <pre>ArrayVisualizer.splice(index,entry)</pre>
</h4>

<p>
  Removes an entry from the specified index. If a new entry is provided, puts that entry in the index.
</p>
<p>
  Useful for teaching someone what "splice" does.
</p>
<p>
  
</p>
<h5>
  Example
</h5>
<pre>
  var v = illustrateArray( ['stark','lannister','targeryen'],svg)
  v.splice(2);
  v.splice(0,'bolton');

</pre>
<div id="_splice">
   
</div>


<h4>
  <pre>ArrayVisualizer.highlight(index):Highlight</pre>
</h4>

<p>
  Creates a highlight at the selected index. Can change colors and move. 
</p>
<p>
  Be sure to hold on to the reference. You can create multiple highlights and control them independently.
</p>
<p>
  Good for highlighting stuff.
</p>
<p>
  
</p>
<h5>
  Example
</h5>
<pre>
  var v = illustrateArray( ["robb","rickon","bran"],svg)
  var highlight = v.highlight(0);
  var highlight2 = v.highlight(2);
</pre>
<div id="_highlight">
   
</div>

 <h4>
  <pre>highlight.goto(index)</pre>
</h4>

<p>
  Moves the highlight to the selected index, automatically resizing it.
</p>

<h5>
  Example
</h5>
<pre>
  var v = illustrateArray( ["cersei","tyrion","jaime"],svg)
  var highlight = v.highlight(0);
  highlight.goto(2);
</pre>
<div id="_goto">
   
</div>

<h4>
  <pre>highlight.color(color)</pre>
</h4>

<p>
  Changes the color of the referenced highlight.
</p>

<h5>
  Example
</h5>
<pre>
  var v = illustrateArray( ["drogon","rhaegal","viserion"],svg)
  var highlight = v.highlight(2);
  highlight.color('green');
</pre>
<div id="_color">
   
</div>