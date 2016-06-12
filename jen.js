(function($) {
	function _jenplementation(fn, obj, add_func) {
		if (obj === undefined) {
			return fn;
		} else if (obj instanceof Array) {
			for (var o of obj)
				fn._jenplementation(o, add_func);
			return fn;
		} else if (typeof(obj) !== 'object') { 
			fn[add_func](obj);
			return fn;
		}
		var elem = $("<" + obj.tag + ">");
		for (var prop in obj) {
			if (prop.substring(0, 3) === "on_")
				elem.on(prop.substring(3), obj[prop]);
			else if (prop != "children" && prop != "tag" && obj[prop] !== null)
				elem.prop(prop, obj[prop]);
		}
		fn[add_func](elem);
		_jenplementation(elem, obj.children, "append");
		return fn;
	}
	$.fn.extend({
		jen: function(obj) {
			return _jenplementation(this, obj, "append");
		},
		rejen: function(obj) {
			this.html("");
			return this._jenplementation(this, obj, "append");
		},
		prejen: function(obj) {
			if (obj instanceof Array)
				obj = obj.reverse();
			return _jenplementation(this, obj, "prepend");
		},
		jenbefore: function(obj) {
			return _jenplementation(this, obj, "before");
		},
		jenafter: function(obj) {
			if (obj instanceof Array)
				obj = obj.reverse();
			return _jenplementation(this, obj, "after");
		},
		unjen: function() {
			if (this === undefined)
				return undefined;
			var arr = [];
			this.each(function() {
				if (this.nodeType === 3) {
					arr.push(this.data.trim());
				} else if (this.nodeType === 1) {
					var obj = {tag:$(this).prop("tagName").toLowerCase()};
					$.each(this.attributes, function() {
						obj[this.name] = this.value;
					});
					obj.children = $(this).contents().unjen();
					arr.push(obj);
				}
			});
			return arr.length == 1 ? arr[0] : arr;
		}
	});
})(jQuery);