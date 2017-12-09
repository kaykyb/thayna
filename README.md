# thayna.js
**Simplicity for simple projects.**

---
Hello! I'm happy that you want to use **thayna.js** for your next project!

The first thing you need to know is that **thayna.js** is directed to simple projects. It provides an componentization system, databinding and conditional rendering with an easy syntax.

**thayna.js** is developed with pure javascript. You don't need to use any other frameworks to start developing with **thayna.js**.

---

To starting using **thayna.js**, download the file _thayna.min.js_ and reference it in your html file with:

```html
<script type="text/javascript" src="path/to/thayna.min.js"></script>
```
---
### Hello, world!

Lets create a very simple page with **thayna.js**:

Inside the <body> tag of your html file, write:

```html
<m-bind>
    window.helloText
</m-bind>
```

and in your JavaScript:

```javascript
var helloText = "Hello world!";

window.onload = function(){
    var thayna = new Thayna.App();
    thayna.parse();
}
```

**Don't forget to include thayna.js:**
```html
<script type="text/javascript" src="path/to/thayna.min.js"></script>
```

And that's all! Your final html file should look like this:

```html
<html>
    <head>
        <title>Sample</title>
        
        <!-- Remember to substitute "path/to" 
        with the path to your thayna.min.js file -->
        <script type="text/javascript" src="../thayna.js"></script>

        <!-- Your script! -->
        <script type="text/javascript">
            var helloText = "Hello world!";

            window.onload = function(){
                var thayna = new Thayna.App();
                thayna.parse();
            }
        </script>
    </head>
    <body>
        <m-bind>
            window.helloText
        </m-bind>
    </body>
</html>
```
---
### Documentation

[Click here to see the documentation](/DOCUMENTATION.md)

---
_**Made with love in São Paulo**_
