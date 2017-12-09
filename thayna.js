/*
MIT License

Copyright (c) 2017 Kayky de Brito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
 * Thayna :)
 */
var Thayna = {};

// Thayna Components
Thayna.Component = function(name, htmlTag, template){        
    this.name = name;
    this.htmlTag = htmlTag;
    this.template = template;
}

/*
 * Thayna App
 */
Thayna.App = function(){
    console.log("[Thayna] V 0.0.1 :)");

    this.components = [];
    this.templateReserves = [];
    this.ids = [];

    /*
     * Instantiate Components
     */
    this.defineComponent = function(name, template, htmlTag){
        var newComponent = new Thayna.Component(name, htmlTag, template);
        this.components.push(newComponent);
            
        document.createElement(htmlTag);

        return newComponent;
    }

    /*
     * Parse document
     */
    this.parse = function(){
        console.log("[thayna] Parsing...");
            
        for (var i = 0; i < this.components.length; i++) {
            var element = this.components[i];
                
            var seenOn = document.getElementsByTagName(element.htmlTag);

            for (var i2 = 0; i2 < seenOn.length; i2++) {
                var apparition = seenOn[i2];
                    
                apparition.setAttribute("m:uid", this.ids.length);
                this.ids[this.ids.length] = this.ids.length;

                apparition.innerHTML = element.template.replace("<content-dropper/>", apparition.innerHTML);
            }
        }

        this.parseConditionals();
        this.parseBindings();
    }

        
    this.parseConditionals = function(){
        document.createElement("m-if");

        var seenOn = document.getElementsByTagName("m-if");

        for (var i2 = 0; i2 < seenOn.length; i2++) {
            var apparition = seenOn[i2];
                
            apparition.setAttribute("m:uid", this.ids.length);
            this.ids[this.ids.length] = this.ids.length;
        }

        this.evalConditions();
    }

    /*
     * Parse Bindings
     */
    this.parseBindings = function(){
        document.createElement("m-bind");

        var seenOn = document.getElementsByTagName("m-bind");

        for (var i = 0; i < seenOn.length; i++) {
            var apparition = seenOn[i];
                
            apparition.setAttribute("m:uid", this.ids.length);
            this.ids[this.ids.length] = this.ids.length;

            apparition.setAttribute("m:original", apparition.innerHTML);
        }

        this.evalBindings();
    }

    /*
     * Evaluate <m-bind>
     */
    this.evalBindings = function(){
        var bindings = document.getElementsByTagName("m-bind");

        for (var i = 0; i < bindings.length; i++) {
            var element = bindings[i];
            
            element.innerHTML = eval(element.getAttribute("m:original"));
        }
    }

    /*
     * Evaluate <m-if>
     */
    this.evalConditions = function(){
        var seenOn = document.getElementsByTagName("m-if");

        for (var i2 = 0; i2 < seenOn.length; i2++) {
            var apparition = seenOn[i2];
            
            if(eval(apparition.getAttribute("condition"))){
                apparition.innerHTML = this.templateReserves[
                    apparition.getAttribute("m:uid")
                ]
            }else{
                apparition.innerHTML = "";
            }
        }
    }

    this.evalVariables = function(){
        this.evalBindings();
        this.evalConditions();
    }
}

module.exports = Thayna;