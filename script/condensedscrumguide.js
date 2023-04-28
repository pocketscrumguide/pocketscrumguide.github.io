function paint() {
	var lines = txt.split('\n');
	var HTML = '';
	var multilineQuote = false;

	for(var line = 1; line < lines.length - 1; line++){
		function fnStr(ll) {
			var tabs = lines[ll].split('\t');
			var str = tabs[tabs.length-1];
			str = str.replace(/([^#]*#[^#]*)#/gm, '$1</strong>');
			str = str.replaceAll('#', "<strong>");
			str = str.replace("• ", String.fromCharCode(9673) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			str = str.replaceAll(". ", ".<br>");
			str = str.replaceAll("~", " <br class='mob'>");
			str = str.replaceAll("  ", "&nbsp;&nbsp;");
			return str;
		}
		function fnIndent(ll) {
			return lines[ll].split('\t').length;
		}
		var indent = fnIndent(line);
		var str = fnStr(line);
		var debug = line + ': ' + indent + ',' + fnIndent(line+1) + ' '; debug = '';
		
		if (fnIndent(line+1) > indent) { // start list
			if (str[0] === '"')
				HTML += '<li><span class="caret quote">' + debug + str.substring(1).replace('"', '</span>') + '</span><ul class="nested">';
			else
				HTML += '<li><span class="caret">&nbsp;' + debug + str + '</span><ul class="nested">';
		}
		if (fnIndent(line+1) <= indent || line === lines.length - 2) { // continue list
			if (str === '')
				HTML += '<li>' + debug + '<br></li>';
			else if (str[0] === '"') {
				HTML += '<li><p class="quote">' + debug + str.substring(1) + '<br>';
				multilineQuote = true;
				}
			else if (str.slice(-1) === '"') {
				HTML += debug + str.substring(0, str.length-1) + '</p></li>';
				multilineQuote = false;
				}
			else if (multilineQuote)
				HTML += debug + str + '<br>';
			else
				HTML += '<li>' + debug + str + '</li>';
		}
		if (fnIndent(line+1) < indent) { // end list
			for(ii=0; ii< indent - fnIndent(line+1); ii++)
				HTML += '</ul></li>';
		}
	}

	document.getElementById("list").innerHTML = HTML;

	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function() {
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
	  });
	}
}
