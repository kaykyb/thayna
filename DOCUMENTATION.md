# thayna.js documentation

[Components](#components)
[The content-dropper tag](#the-content-dropper-tag)
[Conditions](#conditions)
[Databinding](#databinding)
[App class](#app-class)
[Define Component](#define-component)
[Parse](#parse)
[Re-evaluate variables](#re-evaluate-variables)
 

## HTML

#### Components

You can call a component by it's defined `<tag>`. Components act like placeholders in thayna.js. When thayna.js parses the document, the innerHTML of the component's tag is thaynad by the template defined in javascript.

#### The content-dropper tag

When parsing a document, thayna.js thaynas `"<content-dropper/>"` in a component template with the innerHTML of the component's tag.

Example: a component with the following template
```html
<h1>
	<content-dropper/>
</h1>
```

When instantiated by
```html
<component-tag>
	Hello!
</component-tag>
```

WIll generate the following HTML:

```html
<h1>
	Hello!
</h1>
```

#### Conditions

You can use conditions to render or not render some parts of the document based in a javascript boolean value.

To declare conditions, you need to use the `<m-if condition="expression">` tag and insert the javascript expression to evaluate in the "condition" attribute.

Example:

```html
<script>
	var thayna = new Thayna.App();
	
	var i = 1;
</script>

<m-if condition="i === 1">
	i is 1!
</m-if>

<m-if condition="i === 0">
	i is 2!
</m-if>

<script>
	thayna.parse();
</script>
```
Will generate: "i is 1!"

#### Databinding

You can create bindings in thayna.js with the `<m-bind>`tag. When creating an binding with `<m-bind>` you must insert a javascript expression inside the m-bind tag to be evaluated.

Example:

```html
<script>
	var thayna = new Thayna.App();

	var helloText = "Hello World!";
</script>

<h1>
	<m-bind>
		window.helloText
	</m-bind>
</h1>

<script>
	thayna.parse();
</script>
```

Will generate: `<h1>Hello World</h1>`

## Javascript

#### App Class
`Thayna.App()` instatiate a new thayna renderer. At the moment, you **should** only have one App object instantiated at a time on your page.

```javascript
var thayna = new Thayna.App();
```

#### Define Component
`Thayna.App.defineComponent(name, template, htmlTag)` is used to define a new component.

 - `name` (string) is the name that you want for your component
 - `template` (string) is the template of your component
 - `htmlTag` (string) is the tag you'll use in your html to refer to this component

**Usage:**
```javascript
var thayna = new Thayna.App();

...

thayna.defineComponent(
	"hello-guy",
	'<h1>Hello world</h1>',
	"hello"
);
```


**NOTE**: You'll need to call `thayna.parse()` to see the rendered content. Ensure that you call `thayna.parse()` after the DOM is ready.

After defining your component, you can now use `<hello>` in your HTML:

```html
<body>

	<hello>
	</hello>
	
	<!-- Remember to call Thayna.App.parse()
	     AFTER THE DOM IS READY! -->
	<script>
		thayna.parse();
	</script>
</body>
```

The output will be this:

![Output](/screenshots/Screenshot-2017-12-8%20Sample.png?raw=true)

#### Parse

The method `Thayna.App.parse()` renders the components and evaluate bindings and conditions on the document.

This method **should** always be called at least one time (after the DOM is ready) to render the **thayna.js** components.

REMEMBER: If you don't call `Thayna.App.parse()`, the **thayna.js** components presents in your page **will not be rendered**

```javascript
var thayna = new Thayna.App();

...

thayna.defineComponent(
	"hello-guy",
	'<h1>Hello world</h1>',
	"hello"
);

...            

// Only call parse() after DOM is ready.
thayna.parse();

```

As you need to call `parse()` only after DOM is ready, you can:

 - Use an library, like jQuery, to detect when DOM is ready: 
 `$(document).ready(function(){ thayna.parse(); });`
 
 - Call `parse()`right before `</body>`.

#### Re-evaluate variables

When you define a condition with `<m-if>`or a binding with `<m-bind>`, everytime you change the value of one of the variables involved in this condition or binding, you need to call `Thayna.App.evalVariables()`, so thayna.js can update the renderization.

**Example:**
```javascript
var helloText = "Hello world!";

var thayna = new Thayna.App();

// helloText is being used in this binding.
thayna.defineComponent(
	"hello-guy",
	"<h1>
		<m-bind>
			window.helloText
		</m-bind>
	</h1>",
	"hello"
);  

//Changes the value of helloText
helloText = "Hello!";

// Now you need to call evalVariables() to update the renderization
thayna.evalVariables();
```

*That's all!*

---
_**Made with love in São Paulo**_
