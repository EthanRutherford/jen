# jen
jen is an extension to jQuery which adds a family of functions to generate html from objects

The object spec:
	tag - the name of the tag, i.e. div.
	children - objects which represent child nodes which will also be jenned.
		can be an object or an array of objects
	on_* - an event handler to be registered,i.e. on_click.
	all other properties will be added as DOM elememt properties, i.e. class.
	
	if the var passed into the function is an array, each object is jenned and added using the desired method.
	if the var is neither an array nor an object, then a text node will be jenned using the string representation of the var.

The functions:
	jen - vanilla jen, appends the jenned element(s) to the end of the selected element(s).
	rejen - replaces the html content of the selected element(s) with the jenned element.
	prejen - prepends jenned element(s).
	jenbefore - adds jenned elements(s) outside and before the selected element(s).
	jenafter - adds jenned element(s) outside and after the selected element(s).
	unjen - turns the selected element(s) into an object (matching the object spec above).

Example:
	$("body").jen({tag:"div", id:"jendiv", class:"someclass", on_click: function() {console.log("you clicked me!");}, children:"hello there"});
