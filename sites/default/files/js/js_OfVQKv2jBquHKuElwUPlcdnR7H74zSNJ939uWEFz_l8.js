H5P.AdvancedText = (function ($, EventDispatcher) {

  /**
   * A simple library for displaying text with advanced styling.
   *
   * @class H5P.AdvancedText
   * @param {Object} parameters
   * @param {Object} [parameters.text='New text']
   * @param {number} id
   */
  function AdvancedText(parameters, id) {
    var self = this;
    EventDispatcher.call(this);

    var html = (parameters.text === undefined ? '<em>New text</em>' : parameters.text);

    /**
     * Wipe container and add text html.
     *
     * @alias H5P.AdvancedText#attach
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      $container.addClass('h5p-advanced-text').html(html);
    };
  }

  AdvancedText.prototype = Object.create(EventDispatcher.prototype);
  AdvancedText.prototype.constructor = AdvancedText;

  return AdvancedText;

})(H5P.jQuery, H5P.EventDispatcher);
;
(function(){var rsplit=function(string,regex){var result=regex.exec(string),retArr=new Array(),first_idx,last_idx,first_bit;while(result!=null){first_idx=result.index;last_idx=regex.lastIndex;if((first_idx)!=0){first_bit=string.substring(0,first_idx);retArr.push(string.substring(0,first_idx));string=string.slice(first_idx)}retArr.push(result[0]);string=string.slice(result[0].length);result=regex.exec(string)}if(!string==""){retArr.push(string)}return retArr},chop=function(string){return string.substr(0,string.length-1)},extend=function(d,s){for(var n in s){if(s.hasOwnProperty(n)){d[n]=s[n]}}};EJS=function(options){options=typeof options=="string"?{view:options}:options;this.set_options(options);if(options.precompiled){this.template={};this.template.process=options.precompiled;EJS.update(this.name,this);return }if(options.element){if(typeof options.element=="string"){var name=options.element;options.element=document.getElementById(options.element);if(options.element==null){throw name+"does not exist!"}}if(options.element.value){this.text=options.element.value}else{this.text=options.element.innerHTML}this.name=options.element.id;this.type="["}else{if(options.url){options.url=EJS.endExt(options.url,this.extMatch);this.name=this.name?this.name:options.url;var url=options.url;var template=EJS.get(this.name,this.cache);if(template){return template}if(template==EJS.INVALID_PATH){return null}try{this.text=EJS.request(url+(this.cache?"":"?"+Math.random()))}catch(e){}if(this.text==null){throw ({type:"EJS",message:"There is no template at "+url})}}}var template=new EJS.Compiler(this.text,this.type);template.compile(options,this.name);EJS.update(this.name,this);this.template=template};EJS.prototype={render:function(object,extra_helpers){object=object||{};this._extra_helpers=extra_helpers;var v=new EJS.Helpers(object,extra_helpers||{});return this.template.process.call(object,object,v)},update:function(element,options){if(typeof element=="string"){element=document.getElementById(element)}if(options==null){_template=this;return function(object){EJS.prototype.update.call(_template,element,object)}}if(typeof options=="string"){params={};params.url=options;_template=this;params.onComplete=function(request){var object=eval(request.responseText);EJS.prototype.update.call(_template,element,object)};EJS.ajax_request(params)}else{element.innerHTML=this.render(options)}},out:function(){return this.template.out},set_options:function(options){this.type=options.type||EJS.type;this.cache=options.cache!=null?options.cache:EJS.cache;this.text=options.text||null;this.name=options.name||null;this.ext=options.ext||EJS.ext;this.extMatch=new RegExp(this.ext.replace(/\./,"."))}};EJS.endExt=function(path,match){if(!path){return null}match.lastIndex=0;return path+(match.test(path)?"":this.ext)};EJS.Scanner=function(source,left,right){extend(this,{left_delimiter:left+"%",right_delimiter:"%"+right,double_left:left+"%%",double_right:"%%"+right,left_equal:left+"%=",left_comment:left+"%#"});this.SplitRegexp=left=="["?/(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/:new RegExp("("+this.double_left+")|(%%"+this.double_right+")|("+this.left_equal+")|("+this.left_comment+")|("+this.left_delimiter+")|("+this.right_delimiter+"\n)|("+this.right_delimiter+")|(\n)");this.source=source;this.stag=null;this.lines=0};EJS.Scanner.to_text=function(input){if(input==null||input===undefined){return""}if(input instanceof Date){return input.toDateString()}if(input.toString){return input.toString()}return""};EJS.Scanner.prototype={scan:function(block){scanline=this.scanline;regex=this.SplitRegexp;if(!this.source==""){var source_split=rsplit(this.source,/\n/);for(var i=0;i<source_split.length;i++){var item=source_split[i];this.scanline(item,regex,block)}}},scanline:function(line,regex,block){this.lines++;var line_split=rsplit(line,regex);for(var i=0;i<line_split.length;i++){var token=line_split[i];if(token!=null){try{block(token,this)}catch(e){throw {type:"EJS.Scanner",line:this.lines}}}}}};EJS.Buffer=function(pre_cmd,post_cmd){this.line=new Array();this.script="";this.pre_cmd=pre_cmd;this.post_cmd=post_cmd;for(var i=0;i<this.pre_cmd.length;i++){this.push(pre_cmd[i])}};EJS.Buffer.prototype={push:function(cmd){this.line.push(cmd)},cr:function(){this.script=this.script+this.line.join("; ");this.line=new Array();this.script=this.script+"\n"},close:function(){if(this.line.length>0){for(var i=0;i<this.post_cmd.length;i++){this.push(pre_cmd[i])}this.script=this.script+this.line.join("; ");line=null}}};EJS.Compiler=function(source,left){this.pre_cmd=["var ___ViewO = [];"];this.post_cmd=new Array();this.source=" ";if(source!=null){if(typeof source=="string"){source=source.replace(/\r\n/g,"\n");source=source.replace(/\r/g,"\n");this.source=source}else{if(source.innerHTML){this.source=source.innerHTML}}if(typeof this.source!="string"){this.source=""}}left=left||"<";var right=">";switch(left){case"[":right="]";break;case"<":break;default:throw left+" is not a supported deliminator";break}this.scanner=new EJS.Scanner(this.source,left,right);this.out=""};EJS.Compiler.prototype={compile:function(options,name){options=options||{};this.out="";var put_cmd="___ViewO.push(";var insert_cmd=put_cmd;var buff=new EJS.Buffer(this.pre_cmd,this.post_cmd);var content="";var clean=function(content){content=content.replace(/\\/g,"\\\\");content=content.replace(/\n/g,"\\n");content=content.replace(/"/g,'\\"');return content};this.scanner.scan(function(token,scanner){if(scanner.stag==null){switch(token){case"\n":content=content+"\n";buff.push(put_cmd+'"'+clean(content)+'");');buff.cr();content="";break;case scanner.left_delimiter:case scanner.left_equal:case scanner.left_comment:scanner.stag=token;if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'")')}content="";break;case scanner.double_left:content=content+scanner.left_delimiter;break;default:content=content+token;break}}else{switch(token){case scanner.right_delimiter:switch(scanner.stag){case scanner.left_delimiter:if(content[content.length-1]=="\n"){content=chop(content);buff.push(content);buff.cr()}else{buff.push(content)}break;case scanner.left_equal:buff.push(insert_cmd+"(EJS.Scanner.to_text("+content+")))");break}scanner.stag=null;content="";break;case scanner.double_right:content=content+scanner.right_delimiter;break;default:content=content+token;break}}});if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'")')}buff.close();this.out=buff.script+";";var to_be_evaled="/*"+name+"*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {"+this.out+" return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";try{eval(to_be_evaled)}catch(e){if(typeof JSLINT!="undefined"){JSLINT(this.out);for(var i=0;i<JSLINT.errors.length;i++){var error=JSLINT.errors[i];if(error.reason!="Unnecessary semicolon."){error.line++;var e=new Error();e.lineNumber=error.line;e.message=error.reason;if(options.view){e.fileName=options.view}throw e}}}else{throw e}}}};EJS.config=function(options){EJS.cache=options.cache!=null?options.cache:EJS.cache;EJS.type=options.type!=null?options.type:EJS.type;EJS.ext=options.ext!=null?options.ext:EJS.ext;var templates_directory=EJS.templates_directory||{};EJS.templates_directory=templates_directory;EJS.get=function(path,cache){if(cache==false){return null}if(templates_directory[path]){return templates_directory[path]}return null};EJS.update=function(path,template){if(path==null){return }templates_directory[path]=template};EJS.INVALID_PATH=-1};EJS.config({cache:true,type:"<",ext:".ejs"});EJS.Helpers=function(data,extras){this._data=data;this._extras=extras;extend(this,extras)};EJS.Helpers.prototype={view:function(options,data,helpers){if(!helpers){helpers=this._extras}if(!data){data=this._data}return new EJS(options).render(data,helpers)},to_text:function(input,null_text){if(input==null||input===undefined){return null_text||""}if(input instanceof Date){return input.toDateString()}if(input.toString){return input.toString().replace(/\n/g,"<br />").replace(/''/g,"'")}return""}};EJS.newRequest=function(){var factories=[function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var i=0;i<factories.length;i++){try{var request=factories[i]();if(request!=null){return request}}catch(e){continue}}};EJS.request=function(path){var request=new EJS.newRequest();request.open("GET",path,false);try{request.send(null)}catch(e){return null}if(request.status==404||request.status==2||(request.status==0&&request.responseText=="")){return null}return request.responseText};EJS.ajax_request=function(params){params.method=(params.method?params.method:"GET");var request=new EJS.newRequest();request.onreadystatechange=function(){if(request.readyState==4){if(request.status==200){params.onComplete(request)}else{params.onComplete(request)}}};request.open(params.method,params.url);request.send(null)}})();EJS.Helpers.prototype.date_tag=function(C,O,A){if(!(O instanceof Date)){O=new Date()}var B=["January","February","March","April","May","June","July","August","September","October","November","December"];var G=[],D=[],P=[];var J=O.getFullYear();var H=O.getMonth();var N=O.getDate();for(var M=J-15;M<J+15;M++){G.push({value:M,text:M})}for(var E=0;E<12;E++){D.push({value:(E),text:B[E]})}for(var I=0;I<31;I++){P.push({value:(I+1),text:(I+1)})}var L=this.select_tag(C+"[year]",J,G,{id:C+"[year]"});var F=this.select_tag(C+"[month]",H,D,{id:C+"[month]"});var K=this.select_tag(C+"[day]",N,P,{id:C+"[day]"});return L+F+K};EJS.Helpers.prototype.form_tag=function(B,A){A=A||{};A.action=B;if(A.multipart==true){A.method="post";A.enctype="multipart/form-data"}return this.start_tag_for("form",A)};EJS.Helpers.prototype.form_tag_end=function(){return this.tag_end("form")};EJS.Helpers.prototype.hidden_field_tag=function(A,C,B){return this.input_field_tag(A,C,"hidden",B)};EJS.Helpers.prototype.input_field_tag=function(A,D,C,B){B=B||{};B.id=B.id||A;B.value=D||"";B.type=C||"text";B.name=A;return this.single_tag_for("input",B)};EJS.Helpers.prototype.is_current_page=function(A){return(window.location.href==A||window.location.pathname==A?true:false)};EJS.Helpers.prototype.link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.href=A;return this.start_tag_for("a",C)+B+this.tag_end("a")};EJS.Helpers.prototype.submit_link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}C.onclick=C.onclick||"";if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.value=B;C.type="submit";C.onclick=C.onclick+(A?this.url_for(A):"")+"return false;";return this.start_tag_for("input",C)};EJS.Helpers.prototype.link_to_if=function(F,B,A,D,C,E){return this.link_to_unless((F==false),B,A,D,C,E)};EJS.Helpers.prototype.link_to_unless=function(E,B,A,C,D){C=C||{};if(E){if(D&&typeof D=="function"){return D(B,A,C,D)}else{return B}}else{return this.link_to(B,A,C)}};EJS.Helpers.prototype.link_to_unless_current=function(B,A,C,D){C=C||{};return this.link_to_unless(this.is_current_page(A),B,A,C,D)};EJS.Helpers.prototype.password_field_tag=function(A,C,B){return this.input_field_tag(A,C,"password",B)};EJS.Helpers.prototype.select_tag=function(D,G,H,F){F=F||{};F.id=F.id||D;F.value=G;F.name=D;var B="";B+=this.start_tag_for("select",F);for(var E=0;E<H.length;E++){var C=H[E];var A={value:C.value};if(C.value==G){A.selected="selected"}B+=this.start_tag_for("option",A)+C.text+this.tag_end("option")}B+=this.tag_end("select");return B};EJS.Helpers.prototype.single_tag_for=function(A,B){return this.tag(A,B,"/>")};EJS.Helpers.prototype.start_tag_for=function(A,B){return this.tag(A,B)};EJS.Helpers.prototype.submit_tag=function(A,B){B=B||{};B.type=B.type||"submit";B.value=A||"Submit";return this.single_tag_for("input",B)};EJS.Helpers.prototype.tag=function(C,E,D){if(!D){var D=">"}var B=" ";for(var A in E){if(E[A]!=null){var F=E[A].toString()}else{var F=""}if(A=="Class"){A="class"}if(F.indexOf("'")!=-1){B+=A+'="'+F+'" '}else{B+=A+"='"+F+"' "}}return"<"+C+B+D};EJS.Helpers.prototype.tag_end=function(A){return"</"+A+">"};EJS.Helpers.prototype.text_area_tag=function(A,C,B){B=B||{};B.id=B.id||A;B.name=B.name||A;C=C||"";if(B.size){B.cols=B.size.split("x")[0];B.rows=B.size.split("x")[1];delete B.size}B.cols=B.cols||50;B.rows=B.rows||4;return this.start_tag_for("textarea",B)+C+this.tag_end("textarea")};EJS.Helpers.prototype.text_tag=EJS.Helpers.prototype.text_area_tag;EJS.Helpers.prototype.text_field_tag=function(A,C,B){return this.input_field_tag(A,C,"text",B)};EJS.Helpers.prototype.url_for=function(A){return'window.location="'+A+'";'};EJS.Helpers.prototype.img_tag=function(B,C,A){A=A||{};A.src=B;A.alt=C;return this.single_tag_for("img",A)};
EJS.Helpers.prototype.date_tag = function(name, value , html_options) {
    if(! (value instanceof Date))
		value = new Date()
	
	var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var years = [], months = [], days =[];
	var year = value.getFullYear();
	var month = value.getMonth();
	var day = value.getDate();
	for(var y = year - 15; y < year+15 ; y++)
	{
		years.push({value: y, text: y})
	}
	for(var m = 0; m < 12; m++)
	{
		months.push({value: (m), text: month_names[m]})
	}
	for(var d = 0; d < 31; d++)
	{
		days.push({value: (d+1), text: (d+1)})
	}
	var year_select = this.select_tag(name+'[year]', year, years, {id: name+'[year]'} )
	var month_select = this.select_tag(name+'[month]', month, months, {id: name+'[month]'})
	var day_select = this.select_tag(name+'[day]', day, days, {id: name+'[day]'})
	
    return year_select+month_select+day_select;
}

EJS.Helpers.prototype.form_tag = function(action, html_options) {
                 
    
    html_options     = html_options                     || {};
	html_options.action = action
    if(html_options.multipart == true) {
        html_options.method = 'post';
        html_options.enctype = 'multipart/form-data';
    }
    
    return this.start_tag_for('form', html_options)
}

EJS.Helpers.prototype.form_tag_end = function() { return this.tag_end('form'); }

EJS.Helpers.prototype.hidden_field_tag   = function(name, value, html_options) { 
    return this.input_field_tag(name, value, 'hidden', html_options); 
}

EJS.Helpers.prototype.input_field_tag = function(name, value , inputType, html_options) {
    
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.value = value || '';
    html_options.type = inputType || 'text';
    html_options.name = name;
    
    return this.single_tag_for('input', html_options)
}

EJS.Helpers.prototype.is_current_page = function(url) {
	return (window.location.href == url || window.location.pathname == url ? true : false);
}

EJS.Helpers.prototype.link_to = function(name, url, html_options) {
    if(!name) var name = 'null';
    if(!html_options) var html_options = {}
	
	if(html_options.confirm){
		html_options.onclick = 
		" var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} "
		html_options.confirm = null;
	}
    html_options.href=url
    return this.start_tag_for('a', html_options)+name+ this.tag_end('a');
}

EJS.Helpers.prototype.submit_link_to = function(name, url, html_options){
	if(!name) var name = 'null';
    if(!html_options) var html_options = {}
    html_options.onclick = html_options.onclick  || '' ;
	
	if(html_options.confirm){
		html_options.onclick = 
		" var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} "
		html_options.confirm = null;
	}
	
    html_options.value = name;
	html_options.type = 'submit'
    html_options.onclick=html_options.onclick+
		(url ? this.url_for(url) : '')+'return false;';
    //html_options.href='#'+(options ? Routes.url_for(options) : '')
	return this.start_tag_for('input', html_options)
}

EJS.Helpers.prototype.link_to_if = function(condition, name, url, html_options, post, block) {
	return this.link_to_unless((condition == false), name, url, html_options, post, block);
}

EJS.Helpers.prototype.link_to_unless = function(condition, name, url, html_options, block) {
	html_options = html_options || {};
	if(condition) {
		if(block && typeof block == 'function') {
			return block(name, url, html_options, block);
		} else {
			return name;
		}
	} else
		return this.link_to(name, url, html_options);
}

EJS.Helpers.prototype.link_to_unless_current = function(name, url, html_options, block) {
	html_options = html_options || {};
	return this.link_to_unless(this.is_current_page(url), name, url, html_options, block)
}


EJS.Helpers.prototype.password_field_tag = function(name, value, html_options) { return this.input_field_tag(name, value, 'password', html_options); }

EJS.Helpers.prototype.select_tag = function(name, value, choices, html_options) {     
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.value = value;
	html_options.name = name;
    
    var txt = ''
    txt += this.start_tag_for('select', html_options)
    
    for(var i = 0; i < choices.length; i++)
    {
        var choice = choices[i];
        var optionOptions = {value: choice.value}
        if(choice.value == value)
            optionOptions.selected ='selected'
        txt += this.start_tag_for('option', optionOptions )+choice.text+this.tag_end('option')
    }
    txt += this.tag_end('select');
    return txt;
}

EJS.Helpers.prototype.single_tag_for = function(tag, html_options) { return this.tag(tag, html_options, '/>');}

EJS.Helpers.prototype.start_tag_for = function(tag, html_options)  { return this.tag(tag, html_options); }

EJS.Helpers.prototype.submit_tag = function(name, html_options) {  
    html_options = html_options || {};
    //html_options.name  = html_options.id  || 'commit';
    html_options.type = html_options.type  || 'submit';
    html_options.value = name || 'Submit';
    return this.single_tag_for('input', html_options);
}

EJS.Helpers.prototype.tag = function(tag, html_options, end) {
    if(!end) var end = '>'
    var txt = ' '
    for(var attr in html_options) { 
	   if(html_options[attr] != null)
        var value = html_options[attr].toString();
       else
        var value=''
       if(attr == "Class") // special case because "class" is a reserved word in IE
        attr = "class";
       if( value.indexOf("'") != -1 )
            txt += attr+'=\"'+value+'\" ' 
       else
            txt += attr+"='"+value+"' " 
    }
    return '<'+tag+txt+end;
}

EJS.Helpers.prototype.tag_end = function(tag)             { return '</'+tag+'>'; }

EJS.Helpers.prototype.text_area_tag = function(name, value, html_options) { 
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.name  = html_options.name  || name;
	value = value || ''
    if(html_options.size) {
        html_options.cols = html_options.size.split('x')[0]
        html_options.rows = html_options.size.split('x')[1];
        delete html_options.size
    }
    
    html_options.cols = html_options.cols  || 50;
    html_options.rows = html_options.rows  || 4;
    
    return  this.start_tag_for('textarea', html_options)+value+this.tag_end('textarea')
}
EJS.Helpers.prototype.text_tag = EJS.Helpers.prototype.text_area_tag

EJS.Helpers.prototype.text_field_tag     = function(name, value, html_options) { return this.input_field_tag(name, value, 'text', html_options); }

EJS.Helpers.prototype.url_for = function(url) {
        return 'window.location="'+url+'";'
}
EJS.Helpers.prototype.img_tag = function(image_location, alt, options){
	options = options || {};
	options.src = image_location
	options.alt = alt
	return this.single_tag_for('img', options)
}
;
var H5P = H5P || {};
/**
 * Transition contains helper function relevant for transitioning
 */
H5P.Transition = (function ($) {

  /**
   * @class
   * @namespace H5P
   */
  Transition = {};

  /**
   * @private
   */
  Transition.transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'transition':       'transitionend',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  /**
   * @private
   */
  Transition.cache = [];

  /**
   * Get the vendor property name for an event
   *
   * @function H5P.Transition.getVendorPropertyName
   * @static
   * @private
   * @param  {string} prop Generic property name
   * @return {string}      Vendor specific property name
   */
  Transition.getVendorPropertyName = function (prop) {

    if (Transition.cache[prop] !== undefined) {
      return Transition.cache[prop];
    }

    var div = document.createElement('div');

    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) {
      Transition.cache[prop] = prop;
    }
    else {
      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

      if (prop in div.style) {
        Transition.cache[prop] = prop;
      }
      else {
        for (var i = 0; i < prefixes.length; ++i) {
          var vendorProp = prefixes[i] + prop_;
          if (vendorProp in div.style) {
            Transition.cache[prop] = vendorProp;
            break;
          }
        }
      }
    }

    return Transition.cache[prop];
  };

  /**
   * Get the name of the transition end event
   *
   * @static
   * @private
   * @return {string}  description
   */
  Transition.getTransitionEndEventName = function () {
    return Transition.transitionEndEventNames[Transition.getVendorPropertyName('transition')] || undefined;
  };

  /**
   * Helper function for listening on transition end events
   *
   * @function H5P.Transition.onTransitionEnd
   * @static
   * @param  {domElement} $element The element which is transitioned
   * @param  {function} callback The callback to be invoked when transition is finished
   * @param  {number} timeout  Timeout in milliseconds. Fallback if transition event is never fired
   */
  Transition.onTransitionEnd = function ($element, callback, timeout) {
    // Fallback on 1 second if transition event is not supported/triggered
    timeout = timeout || 1000;
    Transition.transitionEndEventName = Transition.transitionEndEventName || Transition.getTransitionEndEventName();
    var callbackCalled = false;

    var doCallback = function () {
      if (callbackCalled) {
        return;
      }
      $element.off(Transition.transitionEndEventName, callback);
      callbackCalled = true;
      clearTimeout(timer);
      callback();
    };

    var timer = setTimeout(function () {
      doCallback();
    }, timeout);

    $element.on(Transition.transitionEndEventName, function () {
      doCallback();
    });
  };

  /**
   * Wait for a transition - when finished, invokes next in line
   *
   * @private
   *
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   * @param {number}      index                   The index for current transition
   */
  var runSequence = function (transitions, index) {
    if (index >= transitions.length) {
      return;
    }

    var transition = transitions[index];
    H5P.Transition.onTransitionEnd(transition.$element, function () {
      if (transition.end) {
        transition.end();
      }
      if (transition.break !== true) {
        runSequence(transitions, index+1);
      }
    }, transition.timeout || undefined);
  };

  /**
   * Run a sequence of transitions
   *
   * @function H5P.Transition.sequence
   * @static
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   */
  Transition.sequence = function (transitions) {
    runSequence(transitions, 0);
  };

  return Transition;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a help text dialog
 */
H5P.JoubelHelpTextDialog = (function ($) {

  var numInstances = 0;
  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery}  $container  The container which message dialog will be appended to
   * @param {string}      message     The message
   * @param {string}      closeButtonTitle The title for the close button
   * @return {H5P.jQuery}
   */
  function JoubelHelpTextDialog(header, message, closeButtonTitle) {
    H5P.EventDispatcher.call(this);

    var self = this;

    numInstances++;
    var headerId = 'joubel-help-text-header-' + numInstances;
    var helpTextId = 'joubel-help-text-body-' + numInstances;

    var $helpTextDialogBox = $('<div>', {
      'class': 'joubel-help-text-dialog-box',
      'role': 'dialog',
      'aria-labelledby': headerId,
      'aria-describedby': helpTextId
    });

    $('<div>', {
      'class': 'joubel-help-text-dialog-background'
    }).appendTo($helpTextDialogBox);

    var $helpTextDialogContainer = $('<div>', {
      'class': 'joubel-help-text-dialog-container'
    }).appendTo($helpTextDialogBox);

    $('<div>', {
      'class': 'joubel-help-text-header',
      'id': headerId,
      'role': 'header',
      'html': header
    }).appendTo($helpTextDialogContainer);

    $('<div>', {
      'class': 'joubel-help-text-body',
      'id': helpTextId,
      'html': message,
      'role': 'document',
      'tabindex': 0
    }).appendTo($helpTextDialogContainer);

    var handleClose = function () {
      $helpTextDialogBox.remove();
      self.trigger('closed');
    };

    var $closeButton = $('<div>', {
      'class': 'joubel-help-text-remove',
      'role': 'button',
      'title': closeButtonTitle,
      'tabindex': 1,
      'click': handleClose,
      'keydown': function (event) {
        // 32 - space, 13 - enter
        if ([32, 13].indexOf(event.which) !== -1) {
          event.preventDefault();
          handleClose();
        }
      }
    }).appendTo($helpTextDialogContainer);

    /**
     * Get the DOM element
     * @return {HTMLElement}
     */
    self.getElement = function () {
      return $helpTextDialogBox;
    };

    self.focus = function () {
      $closeButton.focus();
    };
  }

  JoubelHelpTextDialog.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelHelpTextDialog.prototype.constructor = JoubelHelpTextDialog;

  return JoubelHelpTextDialog;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating auto-disappearing dialogs
 */
H5P.JoubelMessageDialog = (function ($) {

  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery} $container The container which message dialog will be appended to
   * @param {string} message The message
   * @return {H5P.jQuery}
   */
  function JoubelMessageDialog ($container, message) {
    var timeout;

    var removeDialog = function () {
      $warning.remove();
      clearTimeout(timeout);
      $container.off('click.messageDialog');
    };

    // Create warning popup:
    var $warning = $('<div/>', {
      'class': 'joubel-message-dialog',
      text: message
    }).appendTo($container);

    // Remove after 3 seconds or if user clicks anywhere in $container:
    timeout = setTimeout(removeDialog, 3000);
    $container.on('click.messageDialog', removeDialog);

    return $warning;
  }

  return JoubelMessageDialog;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a circular progress bar
 */

H5P.JoubelProgressCircle = (function ($) {

  /**
   * Constructor for the Progress Circle
   *
   * @param {Number} number The amount of progress to display
   * @param {string} progressColor Color for the progress meter
   * @param {string} backgroundColor Color behind the progress meter
   */
  function ProgressCircle(number, progressColor, fillColor, backgroundColor) {
    progressColor = progressColor || '#1a73d9';
    fillColor = fillColor || '#f0f0f0';
    backgroundColor = backgroundColor || '#ffffff';
    var progressColorRGB = this.hexToRgb(progressColor);

    //Verify number
    try {
      number = Number(number);
      if (number === '') {
        throw 'is empty';
      }
      if (isNaN(number)) {
        throw 'is not a number';
      }
    } catch (e) {
      number = 'err';
    }

    //Draw circle
    if (number > 100) {
      number = 100;
    }

    // We can not use rgba, since they will stack on top of each other.
    // Instead we create the equivalent of the rgba color
    // and applies this to the activeborder and background color.
    var progressColorString = 'rgb(' + parseInt(progressColorRGB.r, 10) +
      ',' + parseInt(progressColorRGB.g, 10) +
      ',' + parseInt(progressColorRGB.b, 10) + ')';

    // Circle wrapper
    var $wrapper = $('<div/>', {
      'class': "joubel-progress-circle-wrapper"
    });

    //Active border indicates progress
    var $activeBorder = $('<div/>', {
      'class': "joubel-progress-circle-active-border"
    }).appendTo($wrapper);

    //Background circle
    var $backgroundCircle = $('<div/>', {
      'class': "joubel-progress-circle-circle"
    }).appendTo($activeBorder);

    //Progress text/number
    $('<span/>', {
      'text': number + '%',
      'class': "joubel-progress-circle-percentage"
    }).appendTo($backgroundCircle);

    var deg = number * 3.6;
    if (deg <= 180) {
      $activeBorder.css('background-image',
        'linear-gradient(' + (90 + deg) + 'deg, transparent 50%, ' + fillColor + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    } else {
      $activeBorder.css('background-image',
        'linear-gradient(' + (deg - 90) + 'deg, transparent 50%, ' + progressColorString + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    }

    this.$activeBorder = $activeBorder;
    this.$backgroundCircle = $backgroundCircle;
    this.$wrapper = $wrapper;

    this.initResizeFunctionality();

    return $wrapper;
  }

  /**
   * Initializes resize functionality for the progress circle
   */
  ProgressCircle.prototype.initResizeFunctionality = function () {
    var self = this;

    $(window).resize(function () {
      // Queue resize
      setTimeout(function () {
        self.resize();
      });
    });

    // First resize
    setTimeout(function () {
      self.resize();
    }, 0);
  };

  /**
   * Resize function makes progress circle grow or shrink relative to parent container
   */
  ProgressCircle.prototype.resize = function () {
    var $parent = this.$wrapper.parent();

    if ($parent !== undefined && $parent) {

      // Measurements
      var fontSize = parseInt($parent.css('font-size'), 10);

      // Static sizes
      var fontSizeMultiplum = 3.75;
      var progressCircleWidthPx = parseInt((fontSize / 4.5), 10) % 2 === 0 ? parseInt((fontSize / 4.5), 10) + 4 : parseInt((fontSize / 4.5), 10) + 5;
      var progressCircleOffset = progressCircleWidthPx / 2;

      var width = fontSize * fontSizeMultiplum;
      var height = fontSize * fontSizeMultiplum;
      this.$activeBorder.css({
        'width': width,
        'height': height
      });

      this.$backgroundCircle.css({
        'width': width - progressCircleWidthPx,
        'height': height - progressCircleWidthPx,
        'top': progressCircleOffset,
        'left': progressCircleOffset
      });
    }
  };

  /**
   * Hex to RGB conversion
   * @param hex
   * @returns {{r: Number, g: Number, b: Number}}
   */
  ProgressCircle.prototype.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return ProgressCircle;

}(H5P.jQuery));
;
var H5P = H5P || {};

H5P.SimpleRoundedButton = (function ($) {

  /**
   * Creates a new tip
   */
  function SimpleRoundedButton(text) {

    var $simpleRoundedButton = $('<div>', {
      'class': 'joubel-simple-rounded-button',
      'title': text,
      'role': 'button',
      'tabindex': '0'
    }).keydown(function (e) {
      // 32 - space, 13 - enter
      if ([32, 13].indexOf(e.which) !== -1) {
        $(this).click();
        e.preventDefault();
      }
    });

    $('<span>', {
      'class': 'joubel-simple-rounded-button-text',
      'html': text
    }).appendTo($simpleRoundedButton);

    return $simpleRoundedButton;
  }

  return SimpleRoundedButton;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating speech bubbles
 */
H5P.JoubelSpeechBubble = (function ($) {

  var $currentSpeechBubble;
  var $currentContainer;  
  var $tail;
  var $innerTail;
  var removeSpeechBubbleTimeout;
  var currentMaxWidth;

  var DEFAULT_MAX_WIDTH = 400;

  var iDevice = navigator.userAgent.match(/iPod|iPhone|iPad/g) ? true : false;

  /**
   * Creates a new speech bubble
   *
   * @param {H5P.jQuery} $container The speaking object
   * @param {string} text The text to display
   * @param {number} maxWidth The maximum width of the bubble
   * @return {H5P.JoubelSpeechBubble}
   */
  function JoubelSpeechBubble($container, text, maxWidth) {
    maxWidth = maxWidth || DEFAULT_MAX_WIDTH;
    currentMaxWidth = maxWidth;
    $currentContainer = $container;

    this.isCurrent = function ($tip) {
      return $tip.is($currentContainer);
    };

    this.remove = function () {
      remove();
    };

    var fadeOutSpeechBubble = function ($speechBubble) {
      if (!$speechBubble) {
        return;
      }

      // Stop removing bubble
      clearTimeout(removeSpeechBubbleTimeout);

      $speechBubble.removeClass('show');
      setTimeout(function () {
        if ($speechBubble) {
          $speechBubble.remove();
          $speechBubble = undefined;
        }
      }, 500);
    };

    if ($currentSpeechBubble !== undefined) {
      remove();
    }

    var $h5pContainer = getH5PContainer($container);

    // Make sure we fade out old speech bubble
    fadeOutSpeechBubble($currentSpeechBubble);

    // Create bubble
    $tail = $('<div class="joubel-speech-bubble-tail"></div>');
    $innerTail = $('<div class="joubel-speech-bubble-inner-tail"></div>');
    var $innerBubble = $(
      '<div class="joubel-speech-bubble-inner">' +
      '<div class="joubel-speech-bubble-text">' + text + '</div>' +
      '</div>'
    ).prepend($innerTail);

    $currentSpeechBubble = $(
      '<div class="joubel-speech-bubble" aria-live="assertive">'
    ).append([$tail, $innerBubble])
      .appendTo($h5pContainer);

    // Show speech bubble with transition
    setTimeout(function () {
      $currentSpeechBubble.addClass('show');
    }, 0);

    position($currentSpeechBubble, $currentContainer, maxWidth, $tail, $innerTail);

    // Handle click to close
    H5P.$body.on('mousedown.speechBubble', handleOutsideClick);

    // Handle window resizing
    H5P.$window.on('resize', '', handleResize);

    // Handle clicks when inside IV which blocks bubbling.
    $container.parents('.h5p-dialog')
      .on('mousedown.speechBubble', handleOutsideClick);

    if (iDevice) {
      H5P.$body.css('cursor', 'pointer');
    }

    return this;
  }

  // Remove speechbubble if it belongs to a dom element that is about to be hidden
  H5P.externalDispatcher.on('domHidden', function (event) {
    if ($currentSpeechBubble !== undefined && event.data.$dom.find($currentContainer).length !== 0) {
      remove();
    }
  });

  /**
   * Returns the closest h5p container for the given DOM element.
   * 
   * @param {object} $container jquery element
   * @return {object} the h5p container (jquery element)
   */
  function getH5PContainer($container) {
    var $h5pContainer = $container.closest('.h5p-frame');

    // Check closest h5p frame first, then check for container in case there is no frame.
    if (!$h5pContainer.length) {
      $h5pContainer = $container.closest('.h5p-container');
    }

    return $h5pContainer;
  }

  /**
   * Event handler that is called when the window is resized.
   */
  function handleResize() {
    position($currentSpeechBubble, $currentContainer, currentMaxWidth, $tail, $innerTail);
  }

  /**
   * Repositions the speech bubble according to the position of the container.
   * 
   * @param {object} $currentSpeechbubble the speech bubble that should be positioned   
   * @param {object} $container the container to which the speech bubble should point 
   * @param {number} maxWidth the maximum width of the speech bubble
   * @param {object} $tail the tail (the triangle that points to the referenced container)
   * @param {object} $innerTail the inner tail (the triangle that points to the referenced container)
   */
  function position($currentSpeechBubble, $container, maxWidth, $tail, $innerTail) {
    var $h5pContainer = getH5PContainer($container);

    // Calculate offset between the button and the h5p frame
    var offset = getOffsetBetween($h5pContainer, $container);

    var direction = (offset.bottom > offset.top ? 'bottom' : 'top');
    var tipWidth = offset.outerWidth * 0.9; // Var needs to be renamed to make sense
    var bubbleWidth = tipWidth > maxWidth ? maxWidth : tipWidth;

    var bubblePosition = getBubblePosition(bubbleWidth, offset);
    var tailPosition = getTailPosition(bubbleWidth, bubblePosition, offset, $container.width());
    // Need to set font-size, since element is appended to body.
    // Using same font-size as parent. In that way it will grow accordingly
    // when resizing
    var fontSize = 16;//parseFloat($parent.css('font-size'));

    // Set width and position of speech bubble
    $currentSpeechBubble.css(bubbleCSS(
      direction,
      bubbleWidth,
      bubblePosition,
      fontSize
    ));

    var preparedTailCSS = tailCSS(direction, tailPosition);
    $tail.css(preparedTailCSS);
    $innerTail.css(preparedTailCSS);
  }

  /**
   * Static function for removing the speechbubble
   */
  var remove = function () {
    H5P.$body.off('mousedown.speechBubble');
    H5P.$window.off('resize', '', handleResize);
    $currentContainer.parents('.h5p-dialog').off('mousedown.speechBubble');
    if (iDevice) {
      H5P.$body.css('cursor', '');
    }
    if ($currentSpeechBubble !== undefined) {
      // Apply transition, then remove speech bubble
      $currentSpeechBubble.removeClass('show');

      // Make sure we remove any old timeout before reassignment
      clearTimeout(removeSpeechBubbleTimeout);
      removeSpeechBubbleTimeout = setTimeout(function () {
        $currentSpeechBubble.remove();
        $currentSpeechBubble = undefined;
      }, 500);
    }
    // Don't return false here. If the user e.g. clicks a button when the bubble is visible,
    // we want the bubble to disapear AND the button to receive the event
  };

  /**
   * Remove the speech bubble and container reference
   */
  function handleOutsideClick(event) {
    if (event.target === $currentContainer[0]) {
      return; // Button clicks are not outside clicks
    }

    remove();
    // There is no current container when a container isn't clicked
    $currentContainer = undefined;
  }

  /**
   * Calculate position for speech bubble
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} offset
   * @return {object} Return position for the speech bubble
   */
  function getBubblePosition(bubbleWidth, offset) {
    var bubblePosition = {};

    var tailOffset = 9;
    var widthOffset = bubbleWidth / 2;

    // Calculate top position
    bubblePosition.top = offset.top + offset.innerHeight;

    // Calculate bottom position
    bubblePosition.bottom = offset.bottom + offset.innerHeight + tailOffset;

    // Calculate left position
    if (offset.left < widthOffset) {
      bubblePosition.left = 3;
    }
    else if ((offset.left + widthOffset) > offset.outerWidth) {
      bubblePosition.left = offset.outerWidth - bubbleWidth - 3;
    }
    else {
      bubblePosition.left = offset.left - widthOffset + (offset.innerWidth / 2);
    }

    return bubblePosition;
  }

  /**
   * Calculate position for speech bubble tail
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} bubblePosition Speech bubble position
   * @param {object} offset
   * @param {number} iconWidth The width of the tip icon
   * @return {object} Return position for the tail
   */
  function getTailPosition(bubbleWidth, bubblePosition, offset, iconWidth) {
    var tailPosition = {};
    // Magic numbers. Tuned by hand so that the tail fits visually within
    // the bounds of the speech bubble.
    var leftBoundary = 9;
    var rightBoundary = bubbleWidth - 20;

    tailPosition.left = offset.left - bubblePosition.left + (iconWidth / 2) - 6;
    if (tailPosition.left < leftBoundary) {
      tailPosition.left = leftBoundary;
    }
    if (tailPosition.left > rightBoundary) {
      tailPosition.left = rightBoundary;
    }

    tailPosition.top = -6;
    tailPosition.bottom = -6;

    return tailPosition;
  }

  /**
   * Return bubble CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {number} width The width of the speech bubble
   * @param {object} position Speech bubble position
   * @param {number} fontSize The size of the bubbles font
   * @return {object} Return CSS
   */
  function bubbleCSS(direction, width, position, fontSize) {
    if (direction === 'top') {
      return {
        width: width + 'px',
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        top: ''
      };
    }
    else {
      return {
        width: width + 'px',
        top: position.top + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Return tail CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {object} position Tail position
   * @return {object} Return CSS
   */
  function tailCSS(direction, position) {
    if (direction === 'top') {
      return {
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        top: ''
      };
    }
    else {
      return {
        top: position.top + 'px',
        left: position.left + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Calculates the offset between an element inside a container and the
   * container. Only works if all the edges of the inner element are inside the
   * outer element.
   * Width/height of the elements is included as a convenience.
   *
   * @param {H5P.jQuery} $outer
   * @param {H5P.jQuery} $inner
   * @return {object} Position offset
   */
  function getOffsetBetween($outer, $inner) {
    var outer = $outer[0].getBoundingClientRect();
    var inner = $inner[0].getBoundingClientRect();

    return {
      top: inner.top - outer.top,
      right: outer.right - inner.right,
      bottom: outer.bottom - inner.bottom,
      left: inner.left - outer.left,
      innerWidth: inner.width,
      innerHeight: inner.height,
      outerWidth: outer.width,
      outerHeight: outer.height
    };
  }

  return JoubelSpeechBubble;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelThrobber = (function ($) {

  /**
   * Creates a new tip
   */
  function JoubelThrobber() {

    // h5p-throbber css is described in core
    var $throbber = $('<div/>', {
      'class': 'h5p-throbber'
    });

    return $throbber;
  }

  return JoubelThrobber;
}(H5P.jQuery));
;
H5P.JoubelTip = (function ($) {
  var $conv = $('<div/>');

  /**
   * Creates a new tip element.
   *
   * NOTE that this may look like a class but it doesn't behave like one.
   * It returns a jQuery object.
   *
   * @param {string} tipHtml The text to display in the popup
   * @param {Object} [behaviour] Options
   * @param {string} [behaviour.tipLabel] Set to use a custom label for the tip button (you want this for good A11Y)
   * @param {boolean} [behaviour.helpIcon] Set to 'true' to Add help-icon classname to Tip button (changes the icon)
   * @param {boolean} [behaviour.showSpeechBubble] Set to 'false' to disable functionality (you may this in the editor)
   * @param {boolean} [behaviour.tabcontrol] Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
   * @return {H5P.jQuery|undefined} Tip button jQuery element or 'undefined' if invalid tip
   */
  function JoubelTip(tipHtml, behaviour) {

    // Keep track of the popup that appears when you click the Tip button
    var speechBubble;

    // Parse tip html to determine text
    var tipText = $conv.html(tipHtml).text().trim();
    if (tipText === '') {
      return; // The tip has no textual content, i.e. it's invalid.
    }

    // Set default behaviour
    behaviour = $.extend({
      tipLabel: tipText,
      helpIcon: false,
      showSpeechBubble: true,
      tabcontrol: false
    }, behaviour);

    // Create Tip button
    var $tipButton = $('<div/>', {
      class: 'joubel-tip-container' + (behaviour.showSpeechBubble ? '' : ' be-quiet'),
      'aria-label': behaviour.tipLabel,
      'aria-expanded': false,
      role: 'button',
      tabindex: (behaviour.tabcontrol ? -1 : 0),
      click: function (event) {
        // Toggle show/hide popup
        toggleSpeechBubble();
        event.preventDefault();
      },
      keydown: function (event) {
        if (event.which === 32 || event.which === 13) { // Space & enter key
          // Toggle show/hide popup
          toggleSpeechBubble();
          event.stopPropagation();
          event.preventDefault();
        }
        else { // Any other key
          // Toggle hide popup
          toggleSpeechBubble(false);
        }
      },
      // Add markup to render icon
      html: '<span class="joubel-icon-tip-normal ' + (behaviour.helpIcon ? ' help-icon': '') + '">' +
              '<span class="h5p-icon-shadow"></span>' +
              '<span class="h5p-icon-speech-bubble"></span>' +
              '<span class="h5p-icon-info"></span>' +
            '</span>'
      // IMPORTANT: All of the markup elements must have 'pointer-events: none;'
    });

    const $tipAnnouncer = $('<div>', {
      'class': 'hidden-but-read',
      'aria-live': 'polite',
      appendTo: $tipButton,
    });

    /**
     * Tip button interaction handler.
     * Toggle show or hide the speech bubble popup when interacting with the
     * Tip button.
     *
     * @private
     * @param {boolean} [force] 'true' shows and 'false' hides.
     */
    var toggleSpeechBubble = function (force) {
      if (speechBubble !== undefined && speechBubble.isCurrent($tipButton)) {
        // Hide current popup
        speechBubble.remove();
        speechBubble = undefined;

        $tipButton.attr('aria-expanded', false);
        $tipAnnouncer.html('');
      }
      else if (force !== false && behaviour.showSpeechBubble) {
        // Create and show new popup
        speechBubble = H5P.JoubelSpeechBubble($tipButton, tipHtml);
        $tipButton.attr('aria-expanded', true);
        $tipAnnouncer.html(tipHtml);
      }
    };

    return $tipButton;
  }

  return JoubelTip;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelSlider = (function ($) {

  /**
   * Creates a new Slider
   *
   * @param {object} [params] Additional parameters
   */
  function JoubelSlider(params) {
    H5P.EventDispatcher.call(this);

    this.$slider = $('<div>', $.extend({
      'class': 'h5p-joubel-ui-slider'
    }, params));

    this.$slides = [];
    this.currentIndex = 0;
    this.numSlides = 0;
  }
  JoubelSlider.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelSlider.prototype.constructor = JoubelSlider;

  JoubelSlider.prototype.addSlide = function ($content) {
    $content.addClass('h5p-joubel-ui-slide').css({
      'left': (this.numSlides*100) + '%'
    });
    this.$slider.append($content);
    this.$slides.push($content);

    this.numSlides++;

    if(this.numSlides === 1) {
      $content.addClass('current');
    }
  };

  JoubelSlider.prototype.attach = function ($container) {
    $container.append(this.$slider);
  };

  JoubelSlider.prototype.move = function (index) {
    var self = this;

    if(index === 0) {
      self.trigger('first-slide');
    }
    if(index+1 === self.numSlides) {
      self.trigger('last-slide');
    }
    self.trigger('move');

    var $previousSlide = self.$slides[this.currentIndex];
    H5P.Transition.onTransitionEnd(this.$slider, function () {
      $previousSlide.removeClass('current');
      self.trigger('moved');
    });
    this.$slides[index].addClass('current');

    var translateX = 'translateX(' + (-index*100) + '%)';
    this.$slider.css({
      '-webkit-transform': translateX,
      '-moz-transform': translateX,
      '-ms-transform': translateX,
      'transform': translateX
    });

    this.currentIndex = index;
  };

  JoubelSlider.prototype.remove = function () {
    this.$slider.remove();
  };

  JoubelSlider.prototype.next = function () {
    if(this.currentIndex+1 >= this.numSlides) {
      return;
    }

    this.move(this.currentIndex+1);
  };

  JoubelSlider.prototype.previous = function () {
    this.move(this.currentIndex-1);
  };

  JoubelSlider.prototype.first = function () {
    this.move(0);
  };

  JoubelSlider.prototype.last = function () {
    this.move(this.numSlides-1);
  };

  return JoubelSlider;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * @module
 */
H5P.JoubelScoreBar = (function ($) {

  /* Need to use an id for the star SVG since that is the only way to reference
     SVG filters  */
  var idCounter = 0;

  /**
   * Creates a score bar
   * @class H5P.JoubelScoreBar
   * @param {number} maxScore  Maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @param {string} [helpText] Score explanation
   * @param {string} [scoreExplanationButtonLabel] Label for score explanation button
   */
  function JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel) {
    var self = this;

    self.maxScore = maxScore;
    self.score = 0;
    idCounter++;

    /**
     * @const {string}
     */
    self.STAR_MARKUP = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.77 53.87" aria-hidden="true" focusable="false">' +
        '<title>star</title>' +
        '<filter id="h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + '" x0="-50%" y0="-50%" width="200%" height="200%">' +
          '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>' +
          '<feOffset dy="2" dx="4"></feOffset>' +
          '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>' +
          '<feGaussianBlur in="firstfilter" stdDeviation="3" result="blur2"></feGaussianBlur>' +
          '<feOffset dy="-2" dx="-4"></feOffset>' +
          '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="firstfilter" operator="over"></feComposite>' +
        '</filter>' +
        '<path class="h5p-joubelui-score-bar-star-shadow" d="M35.08,43.41V9.16H20.91v0L9.51,10.85,9,10.93C2.8,12.18,0,17,0,21.25a11.22,11.22,0,0,0,3,7.48l8.73,8.53-1.07,6.16Z"/>' +
        '<g>' +
          '<path class="h5p-joubelui-score-bar-star-border" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path class="h5p-joubelui-score-bar-star-fill" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path filter="url(#h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + ')" class="h5p-joubelui-score-bar-star-fill-full-score" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
        '</g>' +
      '</svg>';

    /**
     * @function appendTo
     * @memberOf H5P.JoubelScoreBar#
     * @param {H5P.jQuery}  $wrapper  Dom container
     */
    self.appendTo = function ($wrapper) {
      self.$scoreBar.appendTo($wrapper);
    };

    /**
     * Create the text representation of the scorebar .
     *
     * @private
     * @return {string}
     */
    var createLabel = function (score) {
      if (!label) {
        return '';
      }

      return label.replace(':num', score).replace(':total', self.maxScore);
    };

    /**
     * Creates the html for this widget
     *
     * @method createHtml
     * @private
     */
    var createHtml = function () {
      // Container div
      self.$scoreBar = $('<div>', {
        'class': 'h5p-joubelui-score-bar',
      });

      var $visuals = $('<div>', {
        'class': 'h5p-joubelui-score-bar-visuals',
        appendTo: self.$scoreBar
      });

      // The progress bar wrapper
      self.$progressWrapper = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress-wrapper',
        appendTo: $visuals
      });

      self.$progress = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress',
        'html': createLabel(self.score),
        appendTo: self.$progressWrapper
      });

      // The star
      $('<div>', {
        'class': 'h5p-joubelui-score-bar-star',
        html: self.STAR_MARKUP
      }).appendTo($visuals);

      // The score container
      var $numerics = $('<div>', {
        'class': 'h5p-joubelui-score-numeric',
        appendTo: self.$scoreBar,
        'aria-hidden': true
      });

      // The current score
      self.$scoreCounter = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-number-counter',
        text: 0,
        appendTo: $numerics
      });

      // The separator
      $('<span>', {
        'class': 'h5p-joubelui-score-number-separator',
        text: '/',
        appendTo: $numerics
      });

      // Max score
      self.$maxScore = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-max',
        text: self.maxScore,
        appendTo: $numerics
      });

      if (helpText) {
        H5P.JoubelUI.createTip(helpText, {
          tipLabel: scoreExplanationButtonLabel ? scoreExplanationButtonLabel : helpText,
          helpIcon: true
        }).appendTo(self.$scoreBar);
        self.$scoreBar.addClass('h5p-score-bar-has-help');
      }
    };

    /**
     * Set the current score
     * @method setScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number} score
     */
    self.setScore = function (score) {
      // Do nothing if score hasn't changed
      if (score === self.score) {
        return;
      }
      self.score = score > self.maxScore ? self.maxScore : score;
      self.updateVisuals();
    };

    /**
     * Increment score
     * @method incrementScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number=}        incrementBy Optional parameter, defaults to 1
     */
    self.incrementScore = function (incrementBy) {
      self.setScore(self.score + (incrementBy || 1));
    };

    /**
     * Set the max score
     * @method setMaxScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number}    maxScore The max score
     */
    self.setMaxScore = function (maxScore) {
      self.maxScore = maxScore;
    };

    /**
     * Updates the progressbar visuals
     * @memberOf H5P.JoubelScoreBar#
     * @method updateVisuals
     */
    self.updateVisuals = function () {
      self.$progress.html(createLabel(self.score));
      self.$scoreCounter.text(self.score);
      self.$maxScore.text(self.maxScore);

      setTimeout(function () {
        // Start the progressbar animation
        self.$progress.css({
          width: ((self.score / self.maxScore) * 100) + '%'
        });

        H5P.Transition.onTransitionEnd(self.$progress, function () {
          // If fullscore fill the star and start the animation
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-full-score', self.score === self.maxScore);
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-animation-active', self.score === self.maxScore);

          // Only allow the star animation to run once
          self.$scoreBar.one("animationend", function() {
            self.$scoreBar.removeClass("h5p-joubelui-score-bar-animation-active");
          });
        }, 600);
      }, 300);
    };

    /**
     * Removes all classes
     * @method reset
     */
    self.reset = function () {
      self.$scoreBar.removeClass('h5p-joubelui-score-bar-full-score');
    };

    createHtml();
  }

  return JoubelScoreBar;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelProgressbar = (function ($) {

  /**
   * Joubel progressbar class
   * @method JoubelProgressbar
   * @constructor
   * @param  {number}          steps Number of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   */
  function JoubelProgressbar(steps, options) {
    H5P.EventDispatcher.call(this);
    var self = this;
    this.options = $.extend({
      progressText: 'Slide :num of :total'
    }, options);
    this.currentStep = 0;
    this.steps = steps;

    this.$progressbar = $('<div>', {
      'class': 'h5p-joubelui-progressbar'
    });
    this.$background = $('<div>', {
      'class': 'h5p-joubelui-progressbar-background'
    }).appendTo(this.$progressbar);
  }

  JoubelProgressbar.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelProgressbar.prototype.constructor = JoubelProgressbar;

  JoubelProgressbar.prototype.updateAria = function () {
    var self = this;
    if (this.options.disableAria) {
      return;
    }

    if (!this.$currentStatus) {
      this.$currentStatus = $('<div>', {
        'class': 'h5p-joubelui-progressbar-slide-status-text',
        'aria-live': 'assertive'
      }).appendTo(this.$progressbar);
    }
    var interpolatedProgressText = self.options.progressText
      .replace(':num', self.currentStep)
      .replace(':total', self.steps);
    this.$currentStatus.html(interpolatedProgressText);
  };

  /**
   * Appends to a container
   * @method appendTo
   * @param  {H5P.jquery} $container
   */
  JoubelProgressbar.prototype.appendTo = function ($container) {
    this.$progressbar.appendTo($container);
  };

  /**
   * Update progress
   * @method setProgress
   * @param  {number}    step
   */
  JoubelProgressbar.prototype.setProgress = function (step) {
    // Check for valid value:
    if (step > this.steps || step < 0) {
      return;
    }
    this.currentStep = step;
    this.$background.css({
      width: ((this.currentStep/this.steps)*100) + '%'
    });

    this.updateAria();
  };

  /**
   * Increment progress with 1
   * @method next
   */
  JoubelProgressbar.prototype.next = function () {
    this.setProgress(this.currentStep+1);
  };

  /**
   * Reset progressbar
   * @method reset
   */
  JoubelProgressbar.prototype.reset = function () {
    this.setProgress(0);
  };

  /**
   * Check if last step is reached
   * @method isLastStep
   * @return {Boolean}
   */
  JoubelProgressbar.prototype.isLastStep = function () {
    return this.steps === this.currentStep;
  };

  return JoubelProgressbar;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * H5P Joubel UI library.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
H5P.JoubelUI = (function ($) {

  /**
   * The internal object to return
   * @class H5P.JoubelUI
   * @static
   */
  function JoubelUI() {}

  /* Public static functions */

  /**
   * Create a tip icon
   * @method H5P.JoubelUI.createTip
   * @param  {string}  text   The textual tip
   * @param  {Object}  params Parameters
   * @return {H5P.JoubelTip}
   */
  JoubelUI.createTip = function (text, params) {
    return new H5P.JoubelTip(text, params);
  };

  /**
   * Create message dialog
   * @method H5P.JoubelUI.createMessageDialog
   * @param  {H5P.jQuery}               $container The dom container
   * @param  {string}                   message    The message
   * @return {H5P.JoubelMessageDialog}
   */
  JoubelUI.createMessageDialog = function ($container, message) {
    return new H5P.JoubelMessageDialog($container, message);
  };

  /**
   * Create help text dialog
   * @method H5P.JoubelUI.createHelpTextDialog
   * @param  {string}             header  The textual header
   * @param  {string}             message The textual message
   * @param  {string}             closeButtonTitle The title for the close button
   * @return {H5P.JoubelHelpTextDialog}
   */
  JoubelUI.createHelpTextDialog = function (header, message, closeButtonTitle) {
    return new H5P.JoubelHelpTextDialog(header, message, closeButtonTitle);
  };

  /**
   * Create progress circle
   * @method H5P.JoubelUI.createProgressCircle
   * @param  {number}             number          The progress (0 to 100)
   * @param  {string}             progressColor   The progress color in hex value
   * @param  {string}             fillColor       The fill color in hex value
   * @param  {string}             backgroundColor The background color in hex value
   * @return {H5P.JoubelProgressCircle}
   */
  JoubelUI.createProgressCircle = function (number, progressColor, fillColor, backgroundColor) {
    return new H5P.JoubelProgressCircle(number, progressColor, fillColor, backgroundColor);
  };

  /**
   * Create throbber for loading
   * @method H5P.JoubelUI.createThrobber
   * @return {H5P.JoubelThrobber}
   */
  JoubelUI.createThrobber = function () {
    return new H5P.JoubelThrobber();
  };

  /**
   * Create simple rounded button
   * @method H5P.JoubelUI.createSimpleRoundedButton
   * @param  {string}                  text The button label
   * @return {H5P.SimpleRoundedButton}
   */
  JoubelUI.createSimpleRoundedButton = function (text) {
    return new H5P.SimpleRoundedButton(text);
  };

  /**
   * Create Slider
   * @method H5P.JoubelUI.createSlider
   * @param  {Object} [params] Parameters
   * @return {H5P.JoubelSlider}
   */
  JoubelUI.createSlider = function (params) {
    return new H5P.JoubelSlider(params);
  };

  /**
   * Create Score Bar
   * @method H5P.JoubelUI.createScoreBar
   * @param  {number=}       maxScore The maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @return {H5P.JoubelScoreBar}
   */
  JoubelUI.createScoreBar = function (maxScore, label, helpText, scoreExplanationButtonLabel) {
    return new H5P.JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel);
  };

  /**
   * Create Progressbar
   * @method H5P.JoubelUI.createProgressbar
   * @param  {number=}       numSteps The total numer of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   * @return {H5P.JoubelProgressbar}
   */
  JoubelUI.createProgressbar = function (numSteps, options) {
    return new H5P.JoubelProgressbar(numSteps, options);
  };

  /**
   * Create standard Joubel button
   *
   * @method H5P.JoubelUI.createButton
   * @param {object} params
   *  May hold any properties allowed by jQuery. If href is set, an A tag
   *  is used, if not a button tag is used.
   * @return {H5P.jQuery} The jquery element created
   */
  JoubelUI.createButton = function(params) {
    var type = 'button';
    if (params.href) {
      type = 'a';
    }
    else {
      params.type = 'button';
    }
    if (params.class) {
      params.class += ' h5p-joubelui-button';
    }
    else {
      params.class = 'h5p-joubelui-button';
    }
    return $('<' + type + '/>', params);
  };

  /**
   * Fix for iframe scoll bug in IOS. When focusing an element that doesn't have
   * focus support by default the iframe will scroll the parent frame so that
   * the focused element is out of view. This varies dependening on the elements
   * of the parent frame.
   */
  if (H5P.isFramed && !H5P.hasiOSiframeScrollFix &&
      /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    H5P.hasiOSiframeScrollFix = true;

    // Keep track of original focus function
    var focus = HTMLElement.prototype.focus;

    // Override the original focus
    HTMLElement.prototype.focus = function () {
      // Only focus the element if it supports it natively
      if ( (this instanceof HTMLAnchorElement ||
            this instanceof HTMLInputElement ||
            this instanceof HTMLSelectElement ||
            this instanceof HTMLTextAreaElement ||
            this instanceof HTMLButtonElement ||
            this instanceof HTMLIFrameElement ||
            this instanceof HTMLAreaElement) && // HTMLAreaElement isn't supported by Safari yet.
          !this.getAttribute('role')) { // Focus breaks if a different role has been set
          // In theory this.isContentEditable should be able to recieve focus,
          // but it didn't work when tested.

        // Trigger the original focus with the proper context
        focus.call(this);
      }
    };
  }

  return JoubelUI;
})(H5P.jQuery);
;
H5P.Question = (function ($, EventDispatcher, JoubelUI) {

  /**
   * Extending this class make it alot easier to create tasks for other
   * content types.
   *
   * @class H5P.Question
   * @extends H5P.EventDispatcher
   * @param {string} type
   */
  function Question(type) {
    var self = this;

    // Inheritance
    EventDispatcher.call(self);

    // Register default section order
    self.order = ['video', 'image', 'audio', 'introduction', 'content', 'explanation', 'feedback', 'scorebar', 'buttons', 'read'];

    // Keep track of registered sections
    var sections = {};

    // Buttons
    var buttons = {};
    var buttonOrder = [];

    // Wrapper when attached
    var $wrapper;

    // Click element
    var clickElement;

    // ScoreBar
    var scoreBar;

    // Keep track of the feedback's visual status.
    var showFeedback;

    // Keep track of which buttons are scheduled for hiding.
    var buttonsToHide = [];

    // Keep track of which buttons are scheduled for showing.
    var buttonsToShow = [];

    // Keep track of the hiding and showing of buttons.
    var toggleButtonsTimer;
    var toggleButtonsTransitionTimer;
    var buttonTruncationTimer;

    // Keeps track of initialization of question
    var initialized = false;

    /**
     * @type {Object} behaviour Behaviour of Question
     * @property {Boolean} behaviour.disableFeedback Set to true to disable feedback section
     */
    var behaviour = {
      disableFeedback: false,
      disableReadSpeaker: false
    };

    // Keeps track of thumb state
    var imageThumb = true;

    // Keeps track of image transitions
    var imageTransitionTimer;

    // Keep track of whether sections is transitioning.
    var sectionsIsTransitioning = false;

    // Keep track of auto play state
    var disableAutoPlay = false;

    // Feedback transition timer
    var feedbackTransitionTimer;

    // Used when reading messages to the user
    var $read, readText;

    /**
     * Register section with given content.
     *
     * @private
     * @param {string} section ID of the section
     * @param {(string|H5P.jQuery)} [content]
     */
    var register = function (section, content) {
      sections[section] = {};
      var $e = sections[section].$element = $('<div/>', {
        'class': 'h5p-question-' + section,
      });
      if (content) {
        $e[content instanceof $ ? 'append' : 'html'](content);
      }
    };

    /**
     * Update registered section with content.
     *
     * @private
     * @param {string} section ID of the section
     * @param {(string|H5P.jQuery)} content
     */
    var update = function (section, content) {
      if (content instanceof $) {
        sections[section].$element.html('').append(content);
      }
      else {
        sections[section].$element.html(content);
      }
    };

    /**
     * Insert element with given ID into the DOM.
     *
     * @private
     * @param {array|Array|string[]} order
     * List with ordered element IDs
     * @param {string} id
     * ID of the element to be inserted
     * @param {Object} elements
     * Maps ID to the elements
     * @param {H5P.jQuery} $container
     * Parent container of the elements
     */
    var insert = function (order, id, elements, $container) {
      // Try to find an element id should be after
      for (var i = 0; i < order.length; i++) {
        if (order[i] === id) {
          // Found our pos
          while (i > 0 &&
          (elements[order[i - 1]] === undefined ||
          !elements[order[i - 1]].isVisible)) {
            i--;
          }
          if (i === 0) {
            // We are on top.
            elements[id].$element.prependTo($container);
          }
          else {
            // Add after element
            elements[id].$element.insertAfter(elements[order[i - 1]].$element);
          }
          elements[id].isVisible = true;
          break;
        }
      }
    };

    /**
     * Make feedback into a popup and position relative to click.
     *
     * @private
     * @param {string} [closeText] Text for the close button
     */
    var makeFeedbackPopup = function (closeText) {
      var $element = sections.feedback.$element;
      var $parent = sections.content.$element;
      var $click = (clickElement != null ? clickElement.$element : null);

      $element.appendTo($parent).addClass('h5p-question-popup');

      if (sections.scorebar) {
        sections.scorebar.$element.appendTo($element);
      }

      $parent.addClass('h5p-has-question-popup');

      // Draw the tail
      var $tail = $('<div/>', {
        'class': 'h5p-question-feedback-tail'
      }).hide()
        .appendTo($parent);

      // Draw the close button
      var $close = $('<div/>', {
        'class': 'h5p-question-feedback-close',
        'tabindex': 0,
        'title': closeText,
        on: {
          click: function (event) {
            $element.remove();
            $tail.remove();
            event.preventDefault();
          },
          keydown: function (event) {
            switch (event.which) {
              case 13: // Enter
              case 32: // Space
                $element.remove();
                $tail.remove();
                event.preventDefault();
            }
          }
        }
      }).hide().appendTo($element);

      if ($click != null) {
        if ($click.hasClass('correct')) {
          $element.addClass('h5p-question-feedback-correct');
          $close.show();
          sections.buttons.$element.hide();
        }
        else {
          sections.buttons.$element.appendTo(sections.feedback.$element);
        }
      }

      positionFeedbackPopup($element, $click);
    };

    /**
     * Position the feedback popup.
     *
     * @private
     * @param {H5P.jQuery} $element Feedback div
     * @param {H5P.jQuery} $click Visual click div
     */
    var positionFeedbackPopup = function ($element, $click) {
      var $container = $element.parent();
      var $tail = $element.siblings('.h5p-question-feedback-tail');
      var popupWidth = $element.outerWidth();
      var popupHeight = setElementHeight($element);
      var space = 15;
      var disableTail = false;
      var positionY = $container.height() / 2 - popupHeight / 2;
      var positionX = $container.width() / 2 - popupWidth / 2;
      var tailX = 0;
      var tailY = 0;
      var tailRotation = 0;

      if ($click != null) {
        // Edge detection for click, takes space into account
        var clickNearTop = ($click[0].offsetTop < space);
        var clickNearBottom = ($click[0].offsetTop + $click.height() > $container.height() - space);
        var clickNearLeft = ($click[0].offsetLeft < space);
        var clickNearRight = ($click[0].offsetLeft + $click.width() > $container.width() - space);

        // Click is not in a corner or close to edge, calculate position normally
        positionX = $click[0].offsetLeft - popupWidth / 2  + $click.width() / 2;
        positionY = $click[0].offsetTop - popupHeight - space;
        tailX = positionX + popupWidth / 2 - $tail.width() / 2;
        tailY = positionY + popupHeight - ($tail.height() / 2);
        tailRotation = 225;

        // If popup is outside top edge, position under click instead
        if (popupHeight + space > $click[0].offsetTop) {
          positionY = $click[0].offsetTop + $click.height() + space;
          tailY = positionY - $tail.height() / 2 ;
          tailRotation = 45;
        }

        // If popup is outside left edge, position left
        if (positionX < 0) {
          positionX = 0;
        }

        // If popup is outside right edge, position right
        if (positionX + popupWidth > $container.width()) {
          positionX = $container.width() - popupWidth;
        }

        // Special cases such as corner clicks, or close to an edge, they override X and Y positions if met
        if (clickNearTop && (clickNearLeft || clickNearRight)) {
          positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
          positionY = $click[0].offsetTop + $click.height();
          disableTail = true;
        }
        else if (clickNearBottom && (clickNearLeft || clickNearRight)) {
          positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
          positionY = $click[0].offsetTop - popupHeight;
          disableTail = true;
        }
        else if (!clickNearTop && !clickNearBottom) {
          if (clickNearLeft || clickNearRight) {
            positionY = $click[0].offsetTop - popupHeight / 2 + $click.width() / 2;
            positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() + space : -popupWidth + -space);
            // Make sure this does not position the popup off screen
            if (positionX < 0) {
              positionX = 0;
              disableTail = true;
            }
            else {
              tailX = positionX + (clickNearLeft ? - $tail.width() / 2 : popupWidth - $tail.width() / 2);
              tailY = positionY + popupHeight / 2 - $tail.height() / 2;
              tailRotation = (clickNearLeft ? 315 : 135);
            }
          }
        }

        // Contain popup from overflowing bottom edge
        if (positionY + popupHeight > $container.height()) {
          positionY = $container.height() - popupHeight;

          if (popupHeight > $container.height() - ($click[0].offsetTop + $click.height() + space)) {
            disableTail = true;
          }
        }
      }
      else {
        disableTail = true;
      }

      // Contain popup from ovreflowing top edge
      if (positionY < 0) {
        positionY = 0;
      }

      $element.css({top: positionY, left: positionX});
      $tail.css({top: tailY, left: tailX});

      if (!disableTail) {
        $tail.css({
          'left': tailX,
          'top': tailY,
          'transform': 'rotate(' + tailRotation + 'deg)'
        }).show();
      }
      else {
        $tail.hide();
      }
    };

    /**
     * Set element max height, used for animations.
     *
     * @param {H5P.jQuery} $element
     */
    var setElementHeight = function ($element) {
      if (!$element.is(':visible')) {
        // No animation
        $element.css('max-height', 'none');
        return;
      }

      // If this element is shown in the popup, we can't set width to 100%,
      // since it already has a width set in CSS
      var isFeedbackPopup = $element.hasClass('h5p-question-popup');

      // Get natural element height
      var $tmp = $element.clone()
        .css({
          'position': 'absolute',
          'max-height': 'none',
          'width': isFeedbackPopup ? '' : '100%'
        })
        .appendTo($element.parent());

      // Need to take margins into account when calculating available space
      var sideMargins = parseFloat($element.css('margin-left'))
        + parseFloat($element.css('margin-right'));
      var tmpElWidth = $tmp.css('width') ? $tmp.css('width') : '100%';
      $tmp.css('width', 'calc(' + tmpElWidth + ' - ' + sideMargins + 'px)');

      // Apply height to element
      var h = Math.round($tmp.get(0).getBoundingClientRect().height);
      var fontSize = parseFloat($element.css('fontSize'));
      var relativeH = h / fontSize;
      $element.css('max-height', relativeH + 'em');
      $tmp.remove();

      if (h > 0 && sections.buttons && sections.buttons.$element === $element) {
        // Make sure buttons section is visible
        showSection(sections.buttons);

        // Resize buttons after resizing button section
        setTimeout(resizeButtons, 150);
      }
      return h;
    };

    /**
     * Does the actual job of hiding the buttons scheduled for hiding.
     *
     * @private
     * @param {boolean} [relocateFocus] Find a new button to focus
     */
    var hideButtons = function (relocateFocus) {
      for (var i = 0; i < buttonsToHide.length; i++) {
        hideButton(buttonsToHide[i].id);
      }
      buttonsToHide = [];

      if (relocateFocus) {
        self.focusButton();
      }
    };

    /**
     * Does the actual hiding.
     * @private
     * @param {string} buttonId
     */
    var hideButton = function (buttonId) {
      // Using detach() vs hide() makes it harder to cheat.
      buttons[buttonId].$element.detach();
      buttons[buttonId].isVisible = false;
    };

    /**
     * Shows the buttons on the next tick. This is to avoid buttons flickering
     * If they're both added and removed on the same tick.
     *
     * @private
     */
    var toggleButtons = function () {
      // If no buttons section, return
      if (sections.buttons === undefined) {
        return;
      }

      // Clear transition timer, reevaluate if buttons will be detached
      clearTimeout(toggleButtonsTransitionTimer);

      // Show buttons
      for (var i = 0; i < buttonsToShow.length; i++) {
        insert(buttonOrder, buttonsToShow[i].id, buttons, sections.buttons.$element);
        buttons[buttonsToShow[i].id].isVisible = true;
      }
      buttonsToShow = [];

      // Hide buttons
      var numToHide = 0;
      var relocateFocus = false;
      for (var j = 0; j < buttonsToHide.length; j++) {
        var button = buttons[buttonsToHide[j].id];
        if (button.isVisible) {
          numToHide += 1;
        }
        if (button.$element.is(':focus')) {
          // Move focus to the first visible button.
          relocateFocus = true;
        }
      }

      var animationTimer = 150;
      if (sections.feedback && sections.feedback.$element.hasClass('h5p-question-popup')) {
        animationTimer = 0;
      }

      if (numToHide === sections.buttons.$element.children().length) {
        // All buttons are going to be hidden. Hide container using transition.
        hideSection(sections.buttons);
        // Detach buttons
        hideButtons(relocateFocus);
      }
      else {
        hideButtons(relocateFocus);

        // Show button section
        if (!sections.buttons.$element.is(':empty')) {
          showSection(sections.buttons);
          setElementHeight(sections.buttons.$element);

          // Trigger resize after animation
          toggleButtonsTransitionTimer = setTimeout(function () {
            self.trigger('resize');
          }, animationTimer);
        }

        // Resize buttons to fit container
        resizeButtons();
      }

      toggleButtonsTimer = undefined;
    };

    /**
     * Allows for scaling of the question image.
     */
    var scaleImage = function () {
      var $imgSection = sections.image.$element;
      clearTimeout(imageTransitionTimer);

      // Add this here to avoid initial transition of the image making
      // content overflow. Alternatively we need to trigger a resize.
      $imgSection.addClass('animatable');

      if (imageThumb) {

        // Expand image
        $(this).attr('aria-expanded', true);
        $imgSection.addClass('h5p-question-image-fill-width');
        imageThumb = false;

        imageTransitionTimer = setTimeout(function () {
          self.trigger('resize');
        }, 600);
      }
      else {

        // Scale down image
        $(this).attr('aria-expanded', false);
        $imgSection.removeClass('h5p-question-image-fill-width');
        imageThumb = true;

        imageTransitionTimer = setTimeout(function () {
          self.trigger('resize');
        }, 600);
      }
    };

    /**
     * Get scrollable ancestor of element
     *
     * @private
     * @param {H5P.jQuery} $element
     * @param {Number} [currDepth=0] Current recursive calls to ancestor, stop at maxDepth
     * @param {Number} [maxDepth=5] Maximum depth for finding ancestor.
     * @returns {H5P.jQuery} Parent element that is scrollable
     */
    var findScrollableAncestor = function ($element, currDepth, maxDepth) {
      if (!currDepth) {
        currDepth = 0;
      }
      if (!maxDepth) {
        maxDepth = 5;
      }
      // Check validation of element or if we have reached document root
      if (!$element || !($element instanceof $) || document === $element.get(0) || currDepth >= maxDepth) {
        return;
      }

      if ($element.css('overflow-y') === 'auto') {
        return $element;
      }
      else {
        return findScrollableAncestor($element.parent(), currDepth + 1, maxDepth);
      }
    };

    /**
     * Scroll to bottom of Question.
     *
     * @private
     */
    var scrollToBottom = function () {
      if (!$wrapper || ($wrapper.hasClass('h5p-standalone') && !H5P.isFullscreen)) {
        return; // No scroll
      }

      var scrollableAncestor = findScrollableAncestor($wrapper);

      // Scroll to bottom of scrollable ancestor
      if (scrollableAncestor) {
        scrollableAncestor.animate({
          scrollTop: $wrapper.css('height')
        }, "slow");
      }
    };

    /**
     * Resize buttons to fit container width
     *
     * @private
     */
    var resizeButtons = function () {
      if (!buttons || !sections.buttons) {
        return;
      }

      var go = function () {
        // Don't do anything if button elements are not visible yet
        if (!sections.buttons.$element.is(':visible')) {
          return;
        }

        // Width of all buttons
        var buttonsWidth = {
          max: 0,
          min: 0,
          current: 0
        };

        for (var i in buttons) {
          var button = buttons[i];
          if (button.isVisible) {
            setButtonWidth(buttons[i]);
            buttonsWidth.max += button.width.max;
            buttonsWidth.min += button.width.min;
            buttonsWidth.current += button.isTruncated ? button.width.min : button.width.max;
          }
        }

        var makeButtonsFit = function (availableWidth) {
          if (buttonsWidth.max < availableWidth) {
            // It is room for everyone on the right side of the score bar (without truncating)
            if (buttonsWidth.max !== buttonsWidth.current) {
              // Need to make everyone big
              restoreButtonLabels(buttonsWidth.current, availableWidth);
            }
            return true;
          }
          else if (buttonsWidth.min < availableWidth) {
            // Is it room for everyone on the right side of the score bar with truncating?
            if (buttonsWidth.current > availableWidth) {
              removeButtonLabels(buttonsWidth.current, availableWidth);
            }
            else {
              restoreButtonLabels(buttonsWidth.current, availableWidth);
            }
            return true;
          }
          return false;
        };

        toggleFullWidthScorebar(false);

        var buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;

        if (!makeButtonsFit(buttonSectionWidth)) {
          // If we get here we need to wrap:
          toggleFullWidthScorebar(true);
          buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;
          makeButtonsFit(buttonSectionWidth);
        }
      };

      // If visible, resize right away
      if (sections.buttons.$element.is(':visible')) {
        go();
      }
      else { // If not visible, try on the next tick
        // Clear button truncation timer if within a button truncation function
        if (buttonTruncationTimer) {
          clearTimeout(buttonTruncationTimer);
        }
        buttonTruncationTimer = setTimeout(function () {
          buttonTruncationTimer = undefined;
          go();
        }, 0);
      }
    };

    var toggleFullWidthScorebar = function (enabled) {
      if (sections.scorebar &&
          sections.scorebar.$element &&
          sections.scorebar.$element.hasClass('h5p-question-visible')) {
        sections.buttons.$element.addClass('has-scorebar');
        sections.buttons.$element.toggleClass('wrap', enabled);
        sections.scorebar.$element.toggleClass('full-width', enabled);
      }
      else {
        sections.buttons.$element.removeClass('has-scorebar');
      }
    };

    /**
     * Remove button labels until they use less than max width.
     *
     * @private
     * @param {Number} buttonsWidth Total width of all buttons
     * @param {Number} maxButtonsWidth Max width allowed for buttons
     */
    var removeButtonLabels = function (buttonsWidth, maxButtonsWidth) {
      // Reverse traversal
      for (var i = buttonOrder.length - 1; i >= 0; i--) {
        var buttonId = buttonOrder[i];
        var button = buttons[buttonId];
        if (!button.isTruncated && button.isVisible) {
          var $button = button.$element;
          buttonsWidth -= button.width.max - button.width.min;

          // Remove label
          button.$element.attr('aria-label', $button.text()).html('').addClass('truncated');
          button.isTruncated = true;
          if (buttonsWidth <= maxButtonsWidth) {
            // Buttons are small enough.
            return;
          }
        }
      }
    };

    /**
     * Restore button labels until it fills maximum possible width without exceeding the max width.
     *
     * @private
     * @param {Number} buttonsWidth Total width of all buttons
     * @param {Number} maxButtonsWidth Max width allowed for buttons
     */
    var restoreButtonLabels = function (buttonsWidth, maxButtonsWidth) {
      for (var i = 0; i < buttonOrder.length; i++) {
        var buttonId = buttonOrder[i];
        var button = buttons[buttonId];
        if (button.isTruncated && button.isVisible) {
          // Calculate new total width of buttons with a static pixel for consistency cross-browser
          buttonsWidth += button.width.max - button.width.min + 1;

          if (buttonsWidth > maxButtonsWidth) {
            return;
          }
          // Restore label
          button.$element.html(button.text);
          button.$element.removeClass('truncated');
          button.isTruncated = false;
        }
      }
    };

    /**
     * Helper function for finding index of keyValue in array
     *
     * @param {String} keyValue Value to be found
     * @param {String} key In key
     * @param {Array} array In array
     * @returns {number}
     */
    var existsInArray = function (keyValue, key, array) {
      var i;
      for (i = 0; i < array.length; i++) {
        if (array[i][key] === keyValue) {
          return i;
        }
      }
      return -1;
    };

    /**
     * Show a section
     * @param {Object} section
     */
    var showSection = function (section) {
      section.$element.addClass('h5p-question-visible');
      section.isVisible = true;
    };

    /**
     * Hide a section
     * @param {Object} section
     */
    var hideSection = function (section) {
      section.$element.css('max-height', '');
      section.isVisible = false;

      setTimeout(function () {
        // Only hide if section hasn't been set to visible in the meantime
        if (!section.isVisible) {
          section.$element.removeClass('h5p-question-visible');
        }
      }, 150);
    };

    /**
     * Set behaviour for question.
     *
     * @param {Object} options An object containing behaviour that will be extended by Question
     */
    self.setBehaviour = function (options) {
      $.extend(behaviour, options);
    };

    /**
     * A video to display above the task.
     *
     * @param {object} params
     */
    self.setVideo = function (params) {
      sections.video = {
        $element: $('<div/>', {
          'class': 'h5p-question-video'
        })
      };

      if (disableAutoPlay && params.params.playback) {
        params.params.playback.autoplay = false;
      }

      // Never fit to wrapper
      if (!params.params.visuals) {
        params.params.visuals = {};
      }
      params.params.visuals.fit = false;
      sections.video.instance = H5P.newRunnable(params, self.contentId, sections.video.$element, true);
      var fromVideo = false; // Hack to avoid never ending loop
      sections.video.instance.on('resize', function () {
        fromVideo = true;
        self.trigger('resize');
        fromVideo = false;
      });
      self.on('resize', function () {
        if (!fromVideo) {
          sections.video.instance.trigger('resize');
        }
      });

      return self;
    };

    /**
     * An audio player to display above the task.
     *
     * @param {object} params
     */
    self.setAudio = function (params) {
      params.params = params.params || {};

      sections.audio = {
        $element: $('<div/>', {
          'class': 'h5p-question-audio',
        })
      };

      if (disableAutoPlay) {
        params.params.autoplay = false;
      }
      else if (params.params.playerMode === 'transparent') {
        params.params.autoplay = true; // false doesn't make sense for transparent audio
      }

      sections.audio.instance = H5P.newRunnable(params, self.contentId, sections.audio.$element, true);
      // The height value that is set by H5P.Audio is counter-productive here.
      if (sections.audio.instance.audio) {
        sections.audio.instance.audio.style.height = '';
      }

      return self;
    };

    /**
     * Will stop any playback going on in the task.
     */
    self.pause = function () {
      if (sections.video && sections.video.isVisible) {
        sections.video.instance.pause();
      }
      if (sections.audio && sections.audio.isVisible) {
        sections.audio.instance.pause();
      }
    };

    /**
     * Start playback of video
     */
    self.play = function () {
      if (sections.video && sections.video.isVisible) {
        sections.video.instance.play();
      }
      if (sections.audio && sections.audio.isVisible) {
        sections.audio.instance.play();
      }
    };

    /**
     * Disable auto play, useful in editors.
     */
    self.disableAutoPlay = function () {
      disableAutoPlay = true;
    };

    /**
     * Add task image.
     *
     * @param {string} path Relative
     * @param {Object} [options] Options object
     * @param {string} [options.alt] Text representation
     * @param {string} [options.title] Hover text
     * @param {Boolean} [options.disableImageZooming] Set as true to disable image zooming
     */
    self.setImage = function (path, options) {
      options = options ? options : {};
      sections.image = {};
      // Image container
      sections.image.$element = $('<div/>', {
        'class': 'h5p-question-image h5p-question-image-fill-width'
      });

      // Inner wrap
      var $imgWrap = $('<div/>', {
        'class': 'h5p-question-image-wrap',
        appendTo: sections.image.$element
      });

      // Image element
      var $img = $('<img/>', {
        src: H5P.getPath(path, self.contentId),
        alt: (options.alt === undefined ? '' : options.alt),
        title: (options.title === undefined ? '' : options.title),
        on: {
          load: function () {
            self.trigger('imageLoaded', this);
            self.trigger('resize');
          }
        },
        appendTo: $imgWrap
      });

      // Disable image zooming
      if (options.disableImageZooming) {
        $img.css('maxHeight', 'none');

        // Make sure we are using the correct amount of width at all times
        var determineImgWidth = function () {

          // Remove margins if natural image width is bigger than section width
          var imageSectionWidth = sections.image.$element.get(0).getBoundingClientRect().width;

          // Do not transition, for instant measurements
          $imgWrap.css({
            '-webkit-transition': 'none',
            'transition': 'none'
          });

          // Margin as translateX on both sides of image.
          var diffX = 2 * ($imgWrap.get(0).getBoundingClientRect().left -
            sections.image.$element.get(0).getBoundingClientRect().left);

          if ($img.get(0).naturalWidth >= imageSectionWidth - diffX) {
            sections.image.$element.addClass('h5p-question-image-fill-width');
          }
          else { // Use margin for small res images
            sections.image.$element.removeClass('h5p-question-image-fill-width');
          }

          // Reset transition rules
          $imgWrap.css({
            '-webkit-transition': '',
            'transition': ''
          });
        };

        // Determine image width
        if ($img.is(':visible')) {
          determineImgWidth();
        }
        else {
          $img.on('load', determineImgWidth);
        }

        // Skip adding zoom functionality
        return;
      }

      var sizeDetermined = false;
      var determineSize = function () {
        if (sizeDetermined || !$img.is(':visible')) {
          return; // Try again next time.
        }

        $imgWrap.addClass('h5p-question-image-scalable')
          .attr('aria-expanded', false)
          .attr('role', 'button')
          .attr('tabIndex', '0')
          .on('click', function (event) {
            if (event.which === 1) {
              scaleImage.apply(this); // Left mouse button click
            }
          }).on('keypress', function (event) {
            if (event.which === 32) {
              event.preventDefault(); // Prevent default behaviour; page scroll down
              scaleImage.apply(this); // Space bar pressed
            }
          });
        sections.image.$element.removeClass('h5p-question-image-fill-width');

        sizeDetermined  = true; // Prevent any futher events
      };

      self.on('resize', determineSize);

      return self;
    };

    /**
     * Add the introduction section.
     *
     * @param {(string|H5P.jQuery)} content
     */
    self.setIntroduction = function (content) {
      register('introduction', content);

      return self;
    };

    /**
     * Add the content section.
     *
     * @param {(string|H5P.jQuery)} content
     * @param {Object} [options]
     * @param {string} [options.class]
     */
    self.setContent = function (content, options) {
      register('content', content);

      if (options && options.class) {
        sections.content.$element.addClass(options.class);
      }

      return self;
    };

    /**
     * Force readspeaker to read text. Useful when you have to use
     * setTimeout for animations.
     */
    self.read = function (content) {
      if (!$read) {
        return; // Not ready yet
      }

      if (readText) {
        // Combine texts if called multiple times
        readText += (readText.substr(-1, 1) === '.' ? ' ' : '. ') + content;
      }
      else {
        readText = content;
      }

      // Set text
      $read.html(readText);

      setTimeout(function () {
        // Stop combining when done reading
        readText = null;
        $read.html('');
      }, 100);
    };

    /**
     * Read feedback
     */
    self.readFeedback = function () {
      var invalidFeedback =
        behaviour.disableReadSpeaker ||
        !showFeedback ||
        !sections.feedback ||
        !sections.feedback.$element;

      if (invalidFeedback) {
        return;
      }

      var $feedbackText = $('.h5p-question-feedback-content-text', sections.feedback.$element);
      if ($feedbackText && $feedbackText.html() && $feedbackText.html().length) {
        self.read($feedbackText.html());
      }
    };

    /**
     * Remove feedback
     *
     * @return {H5P.Question}
     */
    self.removeFeedback = function () {

      clearTimeout(feedbackTransitionTimer);

      if (sections.feedback && showFeedback) {

        showFeedback = false;

        // Hide feedback & scorebar
        hideSection(sections.scorebar);
        hideSection(sections.feedback);

        sectionsIsTransitioning = true;

        // Detach after transition
        feedbackTransitionTimer = setTimeout(function () {
          // Avoiding Transition.onTransitionEnd since it will register multiple events, and there's no way to cancel it if the transition changes back to "show" while the animation is happening.
          if (!showFeedback) {
            sections.feedback.$element.children().detach();
            sections.scorebar.$element.children().detach();

            // Trigger resize after animation
            self.trigger('resize');
          }
          sectionsIsTransitioning = false;
          scoreBar.setScore(0);
        }, 150);

        if ($wrapper) {
          $wrapper.find('.h5p-question-feedback-tail').remove();
        }
      }

      return self;
    };

    /**
     * Set feedback message.
     *
     * @param {string} [content]
     * @param {number} score The score
     * @param {number} maxScore The maximum score for this question
     * @param {string} [scoreBarLabel] Makes it easier for readspeakers to identify the scorebar
     * @param {string} [helpText] Help text that describes the score inside a tip icon
     * @param {object} [popupSettings] Extra settings for popup feedback
     * @param {boolean} [popupSettings.showAsPopup] Should the feedback display as popup?
     * @param {string} [popupSettings.closeText] Translation for close button text
     * @param {object} [popupSettings.click] Element representing where user clicked on screen
     */
    self.setFeedback = function (content, score, maxScore, scoreBarLabel, helpText, popupSettings, scoreExplanationButtonLabel) {
      // Feedback is disabled
      if (behaviour.disableFeedback) {
        return self;
      }

      // Need to toggle buttons right away to avoid flickering/blinking
      // Note: This means content types should invoke hide/showButton before setFeedback
      toggleButtons();

      clickElement = (popupSettings != null && popupSettings.click != null ? popupSettings.click : null);
      clearTimeout(feedbackTransitionTimer);

      var $feedback = $('<div>', {
        'class': 'h5p-question-feedback-container'
      });

      var $feedbackContent = $('<div>', {
        'class': 'h5p-question-feedback-content'
      }).appendTo($feedback);

      // Feedback text
      $('<div>', {
        'class': 'h5p-question-feedback-content-text',
        'html': content
      }).appendTo($feedbackContent);

      var $scorebar = $('<div>', {
        'class': 'h5p-question-scorebar-container'
      });
      if (scoreBar === undefined) {
        scoreBar = JoubelUI.createScoreBar(maxScore, scoreBarLabel, helpText, scoreExplanationButtonLabel);
      }
      scoreBar.appendTo($scorebar);

      $feedbackContent.toggleClass('has-content', content !== undefined && content.length > 0);

      // Feedback for readspeakers
      if (!behaviour.disableReadSpeaker && scoreBarLabel) {
        self.read(scoreBarLabel.replace(':num', score).replace(':total', maxScore) + '. ' + (content ? content : ''));
      }

      showFeedback = true;
      if (sections.feedback) {
        // Update section
        update('feedback', $feedback);
        update('scorebar', $scorebar);
      }
      else {
        // Create section
        register('feedback', $feedback);
        register('scorebar', $scorebar);
        if (initialized && $wrapper) {
          insert(self.order, 'feedback', sections, $wrapper);
          insert(self.order, 'scorebar', sections, $wrapper);
        }
      }

      showSection(sections.feedback);
      showSection(sections.scorebar);

      resizeButtons();

      if (popupSettings != null && popupSettings.showAsPopup == true) {
        makeFeedbackPopup(popupSettings.closeText);
        scoreBar.setScore(score);
      }
      else {
        // Show feedback section
        feedbackTransitionTimer = setTimeout(function () {
          setElementHeight(sections.feedback.$element);
          setElementHeight(sections.scorebar.$element);
          sectionsIsTransitioning = true;

          // Scroll to bottom after showing feedback
          scrollToBottom();

          // Trigger resize after animation
          feedbackTransitionTimer = setTimeout(function () {
            sectionsIsTransitioning = false;
            self.trigger('resize');
            scoreBar.setScore(score);
          }, 150);
        }, 0);
      }

      return self;
    };

    /**
     * Set feedback content (no animation).
     *
     * @param {string} content
     * @param {boolean} [extendContent] True will extend content, instead of replacing it
     */
    self.updateFeedbackContent = function (content, extendContent) {
      if (sections.feedback && sections.feedback.$element) {

        if (extendContent) {
          content = $('.h5p-question-feedback-content', sections.feedback.$element).html() + ' ' + content;
        }

        // Update feedback content html
        $('.h5p-question-feedback-content', sections.feedback.$element).html(content).addClass('has-content');

        // Make sure the height is correct
        setElementHeight(sections.feedback.$element);

        // Need to trigger resize when feedback has finished transitioning
        setTimeout(self.trigger.bind(self, 'resize'), 150);
      }

      return self;
    };

    /**
     * Set the content of the explanation / feedback panel
     *
     * @param {Object} data
     * @param {string} data.correct
     * @param {string} data.wrong
     * @param {string} data.text
     * @param {string} title Title for explanation panel
     *
     * @return {H5P.Question}
     */
    self.setExplanation = function (data, title) {
      if (data) {
        var explainer = new H5P.Question.Explainer(title, data);

        if (sections.explanation) {
          // Update section
          update('explanation', explainer.getElement());
        }
        else {
          register('explanation', explainer.getElement());

          if (initialized && $wrapper) {
            insert(self.order, 'explanation', sections, $wrapper);
          }
        }
      }
      else if (sections.explanation) {
        // Hide explanation section
        sections.explanation.$element.children().detach();
      }

      return self;
    };

    /**
     * Checks to see if button is registered.
     *
     * @param {string} id
     * @returns {boolean}
     */
    self.hasButton = function (id) {
      return (buttons[id] !== undefined);
    };

    /**
     * @typedef {Object} ConfirmationDialog
     * @property {boolean} [enable] Must be true to show confirmation dialog
     * @property {Object} [instance] Instance that uses confirmation dialog
     * @property {jQuery} [$parentElement] Append to this element.
     * @property {Object} [l10n] Translatable fields
     * @property {string} [l10n.header] Header text
     * @property {string} [l10n.body] Body text
     * @property {string} [l10n.cancelLabel]
     * @property {string} [l10n.confirmLabel]
     */

    /**
     * Register buttons for the task.
     *
     * @param {string} id
     * @param {string} text label
     * @param {function} clicked
     * @param {boolean} [visible=true]
     * @param {Object} [options] Options for button
     * @param {Object} [extras] Extra options
     * @param {ConfirmationDialog} [extras.confirmationDialog] Confirmation dialog
     * @param {Object} [extras.contentData] Content data
     * @params {string} [extras.textIfSubmitting] Text to display if submitting
     */
    self.addButton = function (id, text, clicked, visible, options, extras) {
      if (buttons[id]) {
        return self; // Already registered
      }

      if (sections.buttons === undefined)  {
        // We have buttons, register wrapper
        register('buttons');
        if (initialized) {
          insert(self.order, 'buttons', sections, $wrapper);
        }
      }

      extras = extras || {};
      extras.confirmationDialog = extras.confirmationDialog || {};
      options = options || {};

      var confirmationDialog =
        self.addConfirmationDialogToButton(extras.confirmationDialog, clicked);

      /**
       * Handle button clicks through both mouse and keyboard
       * @private
       */
      var handleButtonClick = function () {
        if (extras.confirmationDialog.enable && confirmationDialog) {
          // Show popups section if used
          if (!extras.confirmationDialog.$parentElement) {
            sections.popups.$element.removeClass('hidden');
          }
          confirmationDialog.show($e.position().top);
        }
        else {
          clicked();
        }
      };

      const isSubmitting = extras.contentData && extras.contentData.standalone
        && (extras.contentData.isScoringEnabled || extras.contentData.isReportingEnabled);

      if (isSubmitting && extras.textIfSubmitting) {
        text = extras.textIfSubmitting;
      }

      buttons[id] = {
        isTruncated: false,
        text: text,
        isVisible: false
      };
      // The button might be <button> or <a>
      // (dependent on options.href set or not)
      var isAnchorTag = (options.href !== undefined);
      var $e = buttons[id].$element = JoubelUI.createButton($.extend({
        'class': 'h5p-question-' + id,
        html: text,
        title: text,
        on: {
          click: function (event) {
            handleButtonClick();
            if (isAnchorTag) {
              event.preventDefault();
            }
          }
        }
      }, options));
      buttonOrder.push(id);

      // The button might be <button> or <a>. If <a>, the space key is not
      // triggering the click event, must therefore handle this here:
      if (isAnchorTag) {
        $e.on('keypress', function (event) {
          if (event.which === 32) { // Space
            handleButtonClick();
            event.preventDefault();
          }
        });
      }

      if (visible === undefined || visible) {
        // Button should be visible
        $e.appendTo(sections.buttons.$element);
        buttons[id].isVisible = true;
        showSection(sections.buttons);
      }

      return self;
    };

    var setButtonWidth = function (button) {
      var $button = button.$element;
      var $tmp = $button.clone()
        .css({
          'position': 'absolute',
          'white-space': 'nowrap',
          'max-width': 'none'
        }).removeClass('truncated')
        .html(button.text)
        .appendTo($button.parent());

      // Calculate max width (button including text)
      button.width = {
        max: Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')))
      };

      // Calculate min width (truncated, icon only)
      $tmp.html('').addClass('truncated');
      button.width.min = Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')));
      $tmp.remove();
    };

    /**
     * Add confirmation dialog to button
     * @param {ConfirmationDialog} options
     *  A confirmation dialog that will be shown before click handler of button
     *  is triggered
     * @param {function} clicked
     *  Click handler of button
     * @return {H5P.ConfirmationDialog|undefined}
     *  Confirmation dialog if enabled
     */
    self.addConfirmationDialogToButton = function (options, clicked) {
      options = options || {};

      if (!options.enable) {
        return;
      }

      // Confirmation dialog
      var confirmationDialog = new H5P.ConfirmationDialog({
        instance: options.instance,
        headerText: options.l10n.header,
        dialogText: options.l10n.body,
        cancelText: options.l10n.cancelLabel,
        confirmText: options.l10n.confirmLabel
      });

      // Determine parent element
      if (options.$parentElement) {
        confirmationDialog.appendTo(options.$parentElement.get(0));
      }
      else {

        // Create popup section and append to that
        if (sections.popups === undefined) {
          register('popups');
          if (initialized) {
            insert(self.order, 'popups', sections, $wrapper);
          }
          sections.popups.$element.addClass('hidden');
          self.order.push('popups');
        }
        confirmationDialog.appendTo(sections.popups.$element.get(0));
      }

      // Add event listeners
      confirmationDialog.on('confirmed', function () {
        if (!options.$parentElement) {
          sections.popups.$element.addClass('hidden');
        }
        clicked();

        // Trigger to content type
        self.trigger('confirmed');
      });

      confirmationDialog.on('canceled', function () {
        if (!options.$parentElement) {
          sections.popups.$element.addClass('hidden');
        }
        // Trigger to content type
        self.trigger('canceled');
      });

      return confirmationDialog;
    };

    /**
     * Show registered button with given identifier.
     *
     * @param {string} id
     * @param {Number} [priority]
     */
    self.showButton = function (id, priority) {
      var aboutToBeHidden = existsInArray(id, 'id', buttonsToHide) !== -1;
      if (buttons[id] === undefined || (buttons[id].isVisible === true && !aboutToBeHidden)) {
        return self;
      }

      priority = priority || 0;

      // Skip if already being shown
      var indexToShow = existsInArray(id, 'id', buttonsToShow);
      if (indexToShow !== -1) {

        // Update priority
        if (buttonsToShow[indexToShow].priority < priority) {
          buttonsToShow[indexToShow].priority = priority;
        }

        return self;
      }

      // Check if button is going to be hidden on next tick
      var exists = existsInArray(id, 'id', buttonsToHide);
      if (exists !== -1) {

        // Skip hiding if higher priority
        if (buttonsToHide[exists].priority <= priority) {
          buttonsToHide.splice(exists, 1);
          buttonsToShow.push({id: id, priority: priority});
        }

      } // If button is not shown
      else if (!buttons[id].$element.is(':visible')) {

        // Show button on next tick
        buttonsToShow.push({id: id, priority: priority});
      }

      if (!toggleButtonsTimer) {
        toggleButtonsTimer = setTimeout(toggleButtons, 0);
      }

      return self;
    };

    /**
     * Hide registered button with given identifier.
     *
     * @param {string} id
     * @param {number} [priority]
     */
    self.hideButton = function (id, priority) {
      var aboutToBeShown = existsInArray(id, 'id', buttonsToShow) !== -1;
      if (buttons[id] === undefined || (buttons[id].isVisible === false && !aboutToBeShown)) {
        return self;
      }

      priority = priority || 0;

      // Skip if already being hidden
      var indexToHide = existsInArray(id, 'id', buttonsToHide);
      if (indexToHide !== -1) {

        // Update priority
        if (buttonsToHide[indexToHide].priority < priority) {
          buttonsToHide[indexToHide].priority = priority;
        }

        return self;
      }

      // Check if buttons is going to be shown on next tick
      var exists = existsInArray(id, 'id', buttonsToShow);
      if (exists !== -1) {

        // Skip showing if higher priority
        if (buttonsToShow[exists].priority <= priority) {
          buttonsToShow.splice(exists, 1);
          buttonsToHide.push({id: id, priority: priority});
        }
      }
      else if (!buttons[id].$element.is(':visible')) {

        // Make sure it is detached in case the container is hidden.
        hideButton(id);
      }
      else {

        // Hide button on next tick.
        buttonsToHide.push({id: id, priority: priority});
      }

      if (!toggleButtonsTimer) {
        toggleButtonsTimer = setTimeout(toggleButtons, 0);
      }

      return self;
    };

    /**
     * Set focus to the given button. If no button is given the first visible
     * button gets focused. This is useful if you lose focus.
     *
     * @param {string} [id]
     */
    self.focusButton = function (id) {
      if (id === undefined) {
        // Find first button that is visible.
        for (var i = 0; i < buttonOrder.length; i++) {
          var button = buttons[buttonOrder[i]];
          if (button && button.isVisible) {
            // Give that button focus
            button.$element.focus();
            break;
          }
        }
      }
      else if (buttons[id] && buttons[id].$element.is(':visible')) {
        // Set focus to requested button
        buttons[id].$element.focus();
      }

      return self;
    };

    /**
     * Toggle readspeaker functionality
     * @param {boolean} [disable] True to disable, false to enable.
     */
    self.toggleReadSpeaker = function (disable) {
      behaviour.disableReadSpeaker = disable || !behaviour.disableReadSpeaker;
    };

    /**
     * Set new element for section.
     *
     * @param {String} id
     * @param {H5P.jQuery} $element
     */
    self.insertSectionAtElement = function (id, $element) {
      if (sections[id] === undefined) {
        register(id);
      }
      sections[id].parent = $element;

      // Insert section if question is not initialized
      if (!initialized) {
        insert([id], id, sections, $element);
      }

      return self;
    };

    /**
     * Attach content to given container.
     *
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      if (self.isRoot()) {
        self.setActivityStarted();
      }

      // The first time we attach we also create our DOM elements.
      if ($wrapper === undefined) {
        if (self.registerDomElements !== undefined &&
           (self.registerDomElements instanceof Function ||
           typeof self.registerDomElements === 'function')) {

          // Give the question type a chance to register before attaching
          self.registerDomElements();
        }

        // Create section for reading messages
        $read = $('<div/>', {
          'aria-live': 'polite',
          'class': 'h5p-hidden-read'
        });
        register('read', $read);
        self.trigger('registerDomElements');
      }

      // Prepare container
      $wrapper = $container;
      $container.html('')
        .addClass('h5p-question h5p-' + type);

      // Add sections in given order
      var $sections = [];
      for (var i = 0; i < self.order.length; i++) {
        var section = self.order[i];
        if (sections[section]) {
          if (sections[section].parent) {
            // Section has a different parent
            sections[section].$element.appendTo(sections[section].parent);
          }
          else {
            $sections.push(sections[section].$element);
          }
          sections[section].isVisible = true;
        }
      }

      // Only append once to DOM for optimal performance
      $container.append($sections);

      // Let others react to dom changes
      self.trigger('domChanged', {
        '$target': $container,
        'library': self.libraryInfo.machineName,
        'contentId': self.contentId,
        'key': 'newLibrary'
      }, {'bubbles': true, 'external': true});

      // ??
      initialized = true;

      return self;
    };

    /**
     * Detach all sections from their parents
     */
    self.detachSections = function () {
      // Deinit Question
      initialized = false;

      // Detach sections
      for (var section in sections) {
        sections[section].$element.detach();
      }

      return self;
    };

    // Listen for resize
    self.on('resize', function () {
      // Allow elements to attach and set their height before resizing
      if (!sectionsIsTransitioning && sections.feedback && showFeedback) {
        // Resize feedback to fit
        setElementHeight(sections.feedback.$element);
      }

      // Re-position feedback popup if in use
      var $element = sections.feedback;
      var $click = clickElement;

      if ($element != null && $element.$element != null && $click != null && $click.$element != null) {
        setTimeout(function () {
          positionFeedbackPopup($element.$element, $click.$element);
        }, 10);
      }

      resizeButtons();
    });
  }

  // Inheritance
  Question.prototype = Object.create(EventDispatcher.prototype);
  Question.prototype.constructor = Question;

  /**
   * Determine the overall feedback to display for the question.
   * Returns empty string if no matching range is found.
   *
   * @param {Object[]} feedbacks
   * @param {number} scoreRatio
   * @return {string}
   */
  Question.determineOverallFeedback = function (feedbacks, scoreRatio) {
    scoreRatio = Math.floor(scoreRatio * 100);

    for (var i = 0; i < feedbacks.length; i++) {
      var feedback = feedbacks[i];
      var hasFeedback = (feedback.feedback !== undefined && feedback.feedback.trim().length !== 0);

      if (feedback.from <= scoreRatio && feedback.to >= scoreRatio && hasFeedback) {
        return feedback.feedback;
      }
    }

    return '';
  };

  return Question;
})(H5P.jQuery, H5P.EventDispatcher, H5P.JoubelUI);
;
H5P.Question.Explainer = (function ($) {
  /**
   * Constructor
   *
   * @class
   * @param {string} title
   * @param {array} explanations
   */
  function Explainer(title, explanations) {
    var self = this;

    /**
     * Create the DOM structure
     */
    var createHTML = function () {
      self.$explanation = $('<div>', {
        'class': 'h5p-question-explanation-container'
      });

      // Add title:
      $('<div>', {
        'class': 'h5p-question-explanation-title',
        role: 'heading',
        html: title,
        appendTo: self.$explanation
      });

      var $explanationList = $('<ul>', {
        'class': 'h5p-question-explanation-list',
        appendTo: self.$explanation
      });

      for (var i = 0; i < explanations.length; i++) {
        var feedback = explanations[i];
        var $explanationItem = $('<li>', {
          'class': 'h5p-question-explanation-item',
          appendTo: $explanationList
        });

        var $content = $('<div>', {
          'class': 'h5p-question-explanation-status'
        });

        if (feedback.correct) {
          $('<span>', {
            'class': 'h5p-question-explanation-correct',
            html: feedback.correct,
            appendTo: $content
          });
        }
        if (feedback.wrong) {
          $('<span>', {
            'class': 'h5p-question-explanation-wrong',
            html: feedback.wrong,
            appendTo: $content
          });
        }
        $content.appendTo($explanationItem);

        if (feedback.text) {
          $('<div>', {
            'class': 'h5p-question-explanation-text',
            html: feedback.text,
            appendTo: $explanationItem
          });
        }
      }
    };

    createHTML();

    /**
     * Return the container HTMLElement
     *
     * @return {HTMLElement}
     */
    self.getElement = function () {
      return self.$explanation;
    };
  }

  return Explainer;

})(H5P.jQuery);
;
(function (Question) {

  /**
   * Makes it easy to add animated score points for your question type.
   *
   * @class H5P.Question.ScorePoints
   */
  Question.ScorePoints = function () {
    var self = this;

    var elements = [];
    var showElementsTimer;

    /**
     * Create the element that displays the score point element for questions.
     *
     * @param {boolean} isCorrect
     * @return {HTMLElement}
     */
    self.getElement = function (isCorrect) {
      var element = document.createElement('div');
      element.classList.add(isCorrect ? 'h5p-question-plus-one' : 'h5p-question-minus-one');
      element.classList.add('h5p-question-hidden-one');
      elements.push(element);

      // Schedule display animation of all added elements
      if (showElementsTimer) {
        clearTimeout(showElementsTimer);
      }
      showElementsTimer = setTimeout(showElements, 0);

      return element;
    };

    /**
     * @private
     */
    var showElements = function () {
      // Determine delay between triggering animations
      var delay = 0;
      var increment = 150;
      var maxTime = 1000;

      if (elements.length && elements.length > Math.ceil(maxTime / increment)) {
        // Animations will run for more than ~1 second, reduce it.
        increment = maxTime / elements.length;
      }

      for (var i = 0; i < elements.length; i++) {
        // Use timer to trigger show
        setTimeout(showElement(elements[i]), delay);

        // Increse delay for next element
        delay += increment;
      }
    };

    /**
     * Trigger transition animation for the given element
     *
     * @private
     * @param {HTMLElement} element
     * @return {function}
     */
    var showElement = function (element) {
      return function () {
        element.classList.remove('h5p-question-hidden-one');
      };
    };
  };

})(H5P.Question);
;
/*global EJS*/
// Will render a Question with multiple choices for answers.

// Options format:
// {
//   title: "Optional title for question box",
//   question: "Question text",
//   answers: [{text: "Answer text", correct: false}, ...],
//   singleAnswer: true, // or false, will change rendered output slightly.
//   singlePoint: true,  // True if question give a single point score only
//                       // if all are correct, false to give 1 point per
//                       // correct answer. (Only for singleAnswer=false)
//   randomAnswers: false  // Whether to randomize the order of answers.
// }
//
// Events provided:
// - h5pQuestionAnswered: Triggered when a question has been answered.

var H5P = H5P || {};

/**
 * @typedef {Object} Options
 *   Options for multiple choice
 *
 * @property {Object} behaviour
 * @property {boolean} behaviour.confirmCheckDialog
 * @property {boolean} behaviour.confirmRetryDialog
 *
 * @property {Object} UI
 * @property {string} UI.tipsLabel
 *
 * @property {Object} [confirmRetry]
 * @property {string} [confirmRetry.header]
 * @property {string} [confirmRetry.body]
 * @property {string} [confirmRetry.cancelLabel]
 * @property {string} [confirmRetry.confirmLabel]
 *
 * @property {Object} [confirmCheck]
 * @property {string} [confirmCheck.header]
 * @property {string} [confirmCheck.body]
 * @property {string} [confirmCheck.cancelLabel]
 * @property {string} [confirmCheck.confirmLabel]
 */

/**
 * Module for creating a multiple choice question
 *
 * @param {Options} options
 * @param {number} contentId
 * @param {Object} contentData
 * @returns {H5P.MultiChoice}
 * @constructor
 */
H5P.MultiChoice = function (options, contentId, contentData) {
  if (!(this instanceof H5P.MultiChoice))
    return new H5P.MultiChoice(options, contentId, contentData);
  var self = this;
  this.contentId = contentId;
  this.contentData = contentData;
  H5P.Question.call(self, 'multichoice');
  var $ = H5P.jQuery;

  // checkbox or radiobutton
  var texttemplate =
    '<ul class="h5p-answers" role="<%= role %>" aria-labelledby="<%= label %>">' +
    '  <% for (var i=0; i < answers.length; i++) { %>' +
    '    <li class="h5p-answer" role="<%= answers[i].role %>" tabindex="<%= answers[i].tabindex %>" aria-checked="<%= answers[i].checked %>" data-id="<%= i %>">' +
    '      <div class="h5p-alternative-container">' +
    '        <span class="h5p-alternative-inner"><%= answers[i].text %></span>' +
    '      </div>' +
    '      <div class="h5p-clearfix"></div>' +
    '    </li>' +
    '  <% } %>' +
    '</ul>';

  var defaults = {
    image: null,
    question: "No question text provided",
    answers: [
      {
        tipsAndFeedback: {
          tip: '',
          chosenFeedback: '',
          notChosenFeedback: ''
        },
        text: "Answer 1",
        correct: true
      }
    ],
    overallFeedback: [],
    weight: 1,
    userAnswers: [],
    UI: {
      checkAnswerButton: 'Check',
      submitAnswerButton: 'Submit',
      showSolutionButton: 'Show solution',
      tryAgainButton: 'Try again',
      scoreBarLabel: 'You got :num out of :total points',
      tipAvailable: "Tip available",
      feedbackAvailable: "Feedback available",
      readFeedback: 'Read feedback',
      shouldCheck: "Should have been checked",
      shouldNotCheck: "Should not have been checked",
      noInput: 'Input is required before viewing the solution',
      a11yCheck: 'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
      a11yShowSolution: 'Show the solution. The task will be marked with its correct solution.',
      a11yRetry: 'Retry the task. Reset all responses and start the task over again.',
    },
    behaviour: {
      enableRetry: true,
      enableSolutionsButton: true,
      enableCheckButton: true,
      type: 'auto',
      singlePoint: true,
      randomAnswers: false,
      showSolutionsRequiresInput: true,
      autoCheck: false,
      passPercentage: 100,
      showScorePoints: true
    }
  };
  var template = new EJS({text: texttemplate});
  var params = $.extend(true, defaults, options);
  // Keep track of number of correct choices
  var numCorrect = 0;

  // Loop through choices
  for (var i = 0; i < params.answers.length; i++) {
    var answer = params.answers[i];

    // Make sure tips and feedback exists
    answer.tipsAndFeedback = answer.tipsAndFeedback || {};

    if (params.answers[i].correct) {
      // Update number of correct choices
      numCorrect++;
    }
  }

  // Determine if no choices is the correct
  var blankIsCorrect = (numCorrect === 0);

  // Determine task type
  if (params.behaviour.type === 'auto') {
    // Use single choice if only one choice is correct
    params.behaviour.singleAnswer = (numCorrect === 1);
  }
  else {
    params.behaviour.singleAnswer = (params.behaviour.type === 'single');
  }

  var getCheckboxOrRadioIcon = function (radio, selected) {
    var icon;
    if (radio) {
      icon = selected ? '&#xe603;' : '&#xe600;';
    }
    else {
      icon = selected ? '&#xe601;' : '&#xe602;';
    }
    return icon;
  };

  // Initialize buttons and elements.
  var $myDom;
  var $feedbackDialog;

  /**
   * Remove all feedback dialogs
   */
  var removeFeedbackDialog = function () {
    // Remove the open feedback dialogs.
    $myDom.unbind('click', removeFeedbackDialog);
    $myDom.find('.h5p-feedback-button, .h5p-feedback-dialog').remove();
    $myDom.find('.h5p-has-feedback').removeClass('h5p-has-feedback');
    if ($feedbackDialog) {
      $feedbackDialog.remove();
    }
  };

  var score = 0;
  var solutionsVisible = false;

  /**
   * Add feedback to element
   * @param {jQuery} $element Element that feedback will be added to
   * @param {string} feedback Feedback string
   */
  var addFeedback = function ($element, feedback) {
    $feedbackDialog = $('' +
    '<div class="h5p-feedback-dialog">' +
      '<div class="h5p-feedback-inner">' +
        '<div class="h5p-feedback-text">' + feedback + '</div>' +
      '</div>' +
    '</div>');

    //make sure feedback is only added once
    if (!$element.find($('.h5p-feedback-dialog')).length) {
      $feedbackDialog.appendTo($element.addClass('h5p-has-feedback'));
    }
  };

  /**
   * Register the different parts of the task with the H5P.Question structure.
   */
  self.registerDomElements = function () {
    var media = params.media;
    if (media && media.type && media.type.library) {
      media = media.type;
      var type = media.library.split(' ')[0];
      if (type === 'H5P.Image') {
        if (media.params.file) {
          // Register task image
          self.setImage(media.params.file.path, {
            disableImageZooming: params.media.disableImageZooming || false,
            alt: media.params.alt,
            title: media.params.title
          });
        }
      }
      else if (type === 'H5P.Video') {
        if (media.params.sources) {
          // Register task video
          self.setVideo(media);
        }
      }
      else if (type === 'H5P.Audio') {
        if (media.params.files) {
          // Register task audio
          self.setAudio(media);
        }
      }
    }

    // Determine if we're using checkboxes or radio buttons
    for (var i = 0; i < params.answers.length; i++) {
      params.answers[i].checkboxOrRadioIcon = getCheckboxOrRadioIcon(params.behaviour.singleAnswer, params.userAnswers.indexOf(i) > -1);
    }

    // Register Introduction
    self.setIntroduction('<div id="' + params.label + '">' + params.question + '</div>');

    // Register task content area
    $myDom = $(template.render(params));
    self.setContent($myDom, {
      'class': params.behaviour.singleAnswer ? 'h5p-radio' : 'h5p-check'
    });

    // Create tips:
    var $answers = $('.h5p-answer', $myDom).each(function (i) {

      var tip = params.answers[i].tipsAndFeedback.tip;
      if (tip === undefined) {
        return; // No tip
      }

      tip = tip.trim();
      var tipContent = tip
        .replace(/&nbsp;/g, '')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .trim();
      if (!tipContent.length) {
        return; // Empty tip
      }
      else {
        $(this).addClass('h5p-has-tip');
      }

      // Add tip
      var $wrap = $('<div/>', {
        'class': 'h5p-multichoice-tipwrap',
        'aria-label': params.UI.tipAvailable + '.'
      });

      var $multichoiceTip = $('<div>', {
        'role': 'button',
        'tabindex': 0,
        'title': params.UI.tipsLabel,
        'aria-label': params.UI.tipsLabel,
        'aria-expanded': false,
        'class': 'multichoice-tip',
        appendTo: $wrap
      });

      var tipIconHtml = '<span class="joubel-icon-tip-normal">' +
                          '<span class="h5p-icon-shadow"></span>' +
                          '<span class="h5p-icon-speech-bubble"></span>' +
                          '<span class="h5p-icon-info"></span>' +
                        '</span>';

      $multichoiceTip.append(tipIconHtml);

      $multichoiceTip.click(function () {
        var $tipContainer = $multichoiceTip.parents('.h5p-answer');
        var openFeedback = !$tipContainer.children('.h5p-feedback-dialog').is($feedbackDialog);
        removeFeedbackDialog();

        // Do not open feedback if it was open
        if (openFeedback) {
          $multichoiceTip.attr('aria-expanded', true);

          // Add tip dialog
          addFeedback($tipContainer, tip);
          $feedbackDialog.addClass('h5p-has-tip');

          // Tip for readspeaker
          self.read(tip);
        }
        else {
          $multichoiceTip.attr('aria-expanded', false);
        }

        self.trigger('resize');

        // Remove tip dialog on dom click
        setTimeout(function () {
          $myDom.click(removeFeedbackDialog);
        }, 100);

        // Do not propagate
        return false;
      }).keydown(function (e) {
        if (e.which === 32) {
          $(this).click();
          return false;
        }
      });

      $('.h5p-alternative-container', this).append($wrap);
    });

    // Set event listeners.
    var toggleCheck = function ($ans) {
      if ($ans.attr('aria-disabled') === 'true') {
        return;
      }
      self.answered = true;
      var num = parseInt($ans.data('id'));
      if (params.behaviour.singleAnswer) {
        // Store answer
        params.userAnswers = [num];

        // Calculate score
        score = (params.answers[num].correct ? 1 : 0);

        // De-select previous answer
        $answers.not($ans).removeClass('h5p-selected').attr('tabindex', '-1').attr('aria-checked', 'false');

        // Select new answer
        $ans.addClass('h5p-selected').attr('tabindex', '0').attr('aria-checked', 'true');
      }
      else {
        if ($ans.attr('aria-checked') === 'true') {
          const pos = params.userAnswers.indexOf(num);
          if (pos !== -1) {
            params.userAnswers.splice(pos, 1);
          }

          // Do not allow un-checking when retry disabled and auto check
          if (params.behaviour.autoCheck && !params.behaviour.enableRetry) {
            return;
          }

          // Remove check
          $ans.removeClass('h5p-selected').attr('aria-checked', 'false');
        }
        else {
          params.userAnswers.push(num);
          $ans.addClass('h5p-selected').attr('aria-checked', 'true');
        }

        // Calculate score
        calcScore();
      }

      self.triggerXAPI('interacted');
      hideSolution($ans);

      if (params.userAnswers.length) {
        self.showButton('check-answer');
        self.hideButton('try-again');
        self.hideButton('show-solution');

        if (params.behaviour.autoCheck) {
          if (params.behaviour.singleAnswer) {
            // Only a single answer allowed
            checkAnswer();
          }
          else {
            // Show feedback for selected alternatives
            self.showCheckSolution(true);

            // Always finish task if it was completed successfully
            if (score === self.getMaxScore()) {
              checkAnswer();
            }
          }
        }
      }
    };

    $answers.click(function () {
      toggleCheck($(this));
    }).keydown(function (e) {
      if (e.keyCode === 32) { // Space bar
        // Select current item
        toggleCheck($(this));
        return false;
      }

      if (params.behaviour.singleAnswer) {
        switch (e.keyCode) {
          case 38:   // Up
          case 37: { // Left
            // Try to select previous item
            var $prev = $(this).prev();
            if ($prev.length) {
              toggleCheck($prev.focus());
            }
            return false;
          }
          case 40:   // Down
          case 39: { // Right
            // Try to select next item
            var $next = $(this).next();
            if ($next.length) {
              toggleCheck($next.focus());
            }
            return false;
          }
        }
      }
    });

    if (params.behaviour.singleAnswer) {
      // Special focus handler for radio buttons
      $answers.focus(function () {
        if ($(this).attr('aria-disabled') !== 'true') {
          $answers.not(this).attr('tabindex', '-1');
        }
      }).blur(function () {
        if (!$answers.filter('.h5p-selected').length) {
          $answers.first().add($answers.last()).attr('tabindex', '0');
        }
      });
    }

    // Adds check and retry button
    addButtons();
    if (!params.behaviour.singleAnswer) {

      calcScore();
    }
    else {
      if (params.userAnswers.length && params.answers[params.userAnswers[0]].correct) {
        score = 1;
      }
      else {
        score = 0;
      }
    }

    // Has answered through auto-check in a previous session
    if (hasCheckedAnswer && params.behaviour.autoCheck) {

      // Check answers if answer has been given or max score reached
      if (params.behaviour.singleAnswer || score === self.getMaxScore()) {
        checkAnswer();
      }
      else {
        // Show feedback for checked checkboxes
        self.showCheckSolution(true);
      }
    }
  };

  this.showAllSolutions = function () {
    if (solutionsVisible) {
      return;
    }
    solutionsVisible = true;

    $myDom.find('.h5p-answer').each(function (i, e) {
      var $e = $(e);
      var a = params.answers[i];
      const className = 'h5p-solution-icon-' + (params.behaviour.singleAnswer ? 'radio' : 'checkbox');

      if (a.correct) {
        $e.addClass('h5p-should').append($('<span/>', {
          'class': className,
          html: params.UI.shouldCheck + '.'
        }));
      }
      else {
        $e.addClass('h5p-should-not').append($('<span/>', {
          'class': className,
          html: params.UI.shouldNotCheck + '.'
        }));
      }
    }).find('.h5p-question-plus-one, .h5p-question-minus-one').remove();

    // Make sure input is disabled in solution mode
    disableInput();

    // Move focus back to the first correct alternative so that the user becomes
    // aware that the solution is being shown.
    $myDom.find('.h5p-answer.h5p-should').first().focus();

    //Hide buttons and retry depending on settings.
    self.hideButton('check-answer');
    self.hideButton('show-solution');
    if (params.behaviour.enableRetry) {
      self.showButton('try-again');
    }
    self.trigger('resize');
  };

  /**
   * Used in contracts.
   * Shows the solution for the task and hides all buttons.
   */
  this.showSolutions = function () {
    removeFeedbackDialog();
    self.showCheckSolution();
    self.showAllSolutions();
    disableInput();
    self.hideButton('try-again');
  };

  /**
   * Hide solution for the given answer(s)
   *
   * @private
   * @param {H5P.jQuery} $answer
   */
  var hideSolution = function ($answer) {
    $answer
      .removeClass('h5p-correct')
      .removeClass('h5p-wrong')
      .removeClass('h5p-should')
      .removeClass('h5p-should-not')
      .removeClass('h5p-has-feedback')
      .find('.h5p-question-plus-one, ' + 
        '.h5p-question-minus-one, ' + 
        '.h5p-answer-icon, ' +
        '.h5p-solution-icon-radio, ' +
        '.h5p-solution-icon-checkbox, ' +
        '.h5p-feedback-dialog')
        .remove();
  };

  /**
   *
   */
  this.hideSolutions = function () {
    solutionsVisible = false;

    hideSolution($('.h5p-answer', $myDom));

    this.removeFeedback(); // Reset feedback

    self.trigger('resize');
  };

  /**
   * Resets the whole task.
   * Used in contracts with integrated content.
   * @private
   */
  this.resetTask = function () {
    self.answered = false;
    self.hideSolutions();
    params.userAnswers = [];
    removeSelections();
    self.showButton('check-answer');
    self.hideButton('try-again');
    self.hideButton('show-solution');
    enableInput();
    $myDom.find('.h5p-feedback-available').remove();
  };

  var calculateMaxScore = function () {
    if (blankIsCorrect) {
      return params.weight;
    }
    var maxScore = 0;
    for (var i = 0; i < params.answers.length; i++) {
      var choice = params.answers[i];
      if (choice.correct) {
        maxScore += (choice.weight !== undefined ? choice.weight : 1);
      }
    }
    return maxScore;
  };

  this.getMaxScore = function () {
    return (!params.behaviour.singleAnswer && !params.behaviour.singlePoint ? calculateMaxScore() : params.weight);
  };

  /**
   * Check answer
   */
  var checkAnswer = function () {
    // Unbind removal of feedback dialogs on click
    $myDom.unbind('click', removeFeedbackDialog);

    // Remove all tip dialogs
    removeFeedbackDialog();

    if (params.behaviour.enableSolutionsButton) {
      self.showButton('show-solution');
    }
    if (params.behaviour.enableRetry) {
      self.showButton('try-again');
    }
    self.hideButton('check-answer');

    self.showCheckSolution();
    disableInput();

    var xAPIEvent = self.createXAPIEventTemplate('answered');
    addQuestionToXAPI(xAPIEvent);
    addResponseToXAPI(xAPIEvent);
    self.trigger(xAPIEvent);
  };

  /**
   * Adds the ui buttons.
   * @private
   */
  var addButtons = function () {
    var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
    var $containerParents = $content.parents('.h5p-container');

    // select find container to attach dialogs to
    var $container;
    if($containerParents.length !== 0) {
      // use parent highest up if any
      $container = $containerParents.last();
    }
    else if($content.length !== 0){
      $container = $content;
    }
    else  {
      $container = $(document.body);
    }

    // Show solution button
    self.addButton('show-solution', params.UI.showSolutionButton, function () {
      if (params.behaviour.showSolutionsRequiresInput && !self.getAnswerGiven(true)) {
        // Require answer before solution can be viewed
        self.updateFeedbackContent(params.UI.noInput);
        self.read(params.UI.noInput);
      }
      else {
        calcScore();
        self.showAllSolutions();
      }

    }, false, {
      'aria-label': params.UI.a11yShowSolution,
    });

    // Check solution button
    if (params.behaviour.enableCheckButton && (!params.behaviour.autoCheck || !params.behaviour.singleAnswer)) {
      self.addButton('check-answer', params.UI.checkAnswerButton,
        function () {
          self.answered = true;
          checkAnswer();
        },
        true,
        {
          'aria-label': params.UI.a11yCheck,
        },
        {
          confirmationDialog: {
            enable: params.behaviour.confirmCheckDialog,
            l10n: params.confirmCheck,
            instance: self,
            $parentElement: $container
          },
          contentData: self.contentData,
          textIfSubmitting: params.UI.submitAnswerButton,
        }
      );
    }

    // Try Again button
    self.addButton('try-again', params.UI.tryAgainButton, function () {
      self.resetTask();

      if (params.behaviour.randomAnswers) {
        // reshuffle answers
       var oldIdMap = idMap;
       idMap = getShuffleMap();
       var answersDisplayed = $myDom.find('.h5p-answer');
       // remember tips
       var tip = [];
       for (i = 0; i < answersDisplayed.length; i++) {
         tip[i] = $(answersDisplayed[i]).find('.h5p-multichoice-tipwrap');
       }
       // Those two loops cannot be merged or you'll screw up your tips
       for (i = 0; i < answersDisplayed.length; i++) {
         // move tips and answers on display
         $(answersDisplayed[i]).find('.h5p-alternative-inner').html(params.answers[i].text);
         $(tip[i]).detach().appendTo($(answersDisplayed[idMap.indexOf(oldIdMap[i])]).find('.h5p-alternative-container'));
       }
     }
    }, false, {
      'aria-label': params.UI.a11yRetry,
    }, {
      confirmationDialog: {
        enable: params.behaviour.confirmRetryDialog,
        l10n: params.confirmRetry,
        instance: self,
        $parentElement: $container
      }
    });
  };

  /**
   * Determine which feedback text to display
   *
   * @param {number} score
   * @param {number} max
   * @return {string}
   */
  var getFeedbackText = function (score, max) {
    var ratio = (score / max);

    var feedback = H5P.Question.determineOverallFeedback(params.overallFeedback, ratio);

    return feedback.replace('@score', score).replace('@total', max);
  };

  /**
   * Shows feedback on the selected fields.
   * @public
   * @param {boolean} [skipFeedback] Skip showing feedback if true
   */
  this.showCheckSolution = function (skipFeedback) {
    var scorePoints;
    if (!(params.behaviour.singleAnswer || params.behaviour.singlePoint || !params.behaviour.showScorePoints)) {
      scorePoints = new H5P.Question.ScorePoints();
    }

    $myDom.find('.h5p-answer').each(function (i, e) {
      var $e = $(e);
      var a = params.answers[i];
      var chosen = ($e.attr('aria-checked') === 'true');
      if (chosen) {
        if (a.correct) {
          // May already have been applied by instant feedback
          if (!$e.hasClass('h5p-correct')) {
            $e.addClass('h5p-correct').append($('<span/>', {
              'class': 'h5p-answer-icon',
              html: params.UI.correctAnswer + '.'
            }));
          }
        }
        else {
          if (!$e.hasClass('h5p-wrong')) {
            $e.addClass('h5p-wrong').append($('<span/>', {
              'class': 'h5p-answer-icon',
              html: params.UI.wrongAnswer + '.'
            }));
          }
        }

        if (scorePoints) {
          var alternativeContainer = $e[0].querySelector('.h5p-alternative-container');

          if (!params.behaviour.autoCheck || alternativeContainer.querySelector('.h5p-question-plus-one, .h5p-question-minus-one') === null) {
            alternativeContainer.appendChild(scorePoints.getElement(a.correct));
          }
        }
      }

      if (!skipFeedback) {
        if (chosen && a.tipsAndFeedback.chosenFeedback !== undefined && a.tipsAndFeedback.chosenFeedback !== '') {
          addFeedback($e, a.tipsAndFeedback.chosenFeedback);
        }
        else if (!chosen && a.tipsAndFeedback.notChosenFeedback !== undefined && a.tipsAndFeedback.notChosenFeedback !== '') {
          addFeedback($e, a.tipsAndFeedback.notChosenFeedback);
        }
      }
    });

    // Determine feedback
    var max = self.getMaxScore();

    // Disable task if maxscore is achieved
    var fullScore = (score === max);

    if (fullScore) {
      self.hideButton('check-answer');
      self.hideButton('try-again');
      self.hideButton('show-solution');
    }

    // Show feedback
    if (!skipFeedback) {
      this.setFeedback(getFeedbackText(score, max), score, max, params.UI.scoreBarLabel);
    }

    self.trigger('resize');
  };

  /**
   * Disables choosing new input.
   */
  var disableInput = function () {
    $('.h5p-answer', $myDom).attr({
      'aria-disabled': 'true',
      'tabindex': '-1'
    }).removeAttr('role')
      .removeAttr('aria-checked');
    
    $('.h5p-answers').removeAttr('role');
  };

  /**
   * Enables new input.
   */
  var enableInput = function () {
    $('.h5p-answer', $myDom)
      .attr({
        'aria-disabled': 'false',
        'role': params.behaviour.singleAnswer ? 'radio' : 'checkbox',
      });

    $('.h5p-answers').attr('role', params.role);
  };

  var calcScore = function () {
    score = 0;
    for (const answer of params.userAnswers) {
      const choice = params.answers[answer];
      const weight = (choice.weight !== undefined ? choice.weight : 1);
      if (choice.correct) {
        score += weight;
      }
      else {
        score -= weight;
      }
    }
    if (score < 0) {
      score = 0;
    }
    if (!params.userAnswers.length && blankIsCorrect) {
      score = params.weight;
    }
    if (params.behaviour.singlePoint) {
      score = (100 * score / calculateMaxScore()) >= params.behaviour.passPercentage ? params.weight : 0;
    }
  };

  /**
   * Removes selections from task.
   */
  var removeSelections = function () {
    var $answers = $('.h5p-answer', $myDom)
      .removeClass('h5p-selected')
      .attr('aria-checked', 'false');

    if (!params.behaviour.singleAnswer) {
      $answers.attr('tabindex', '0');
    }
    else {
      $answers.first().attr('tabindex', '0');
    }

    // Set focus to first option
    $answers.first().focus();

    calcScore();
  };

  /**
   * Get xAPI data.
   * Contract used by report rendering engine.
   *
   * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
   */
  this.getXAPIData = function(){
    var xAPIEvent = this.createXAPIEventTemplate('answered');
    addQuestionToXAPI(xAPIEvent);
    addResponseToXAPI(xAPIEvent);
    return {
      statement: xAPIEvent.data.statement
    };
  };

  /**
   * Add the question itself to the definition part of an xAPIEvent
   */
  var addQuestionToXAPI = function (xAPIEvent) {
    var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    definition.description = {
      // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
      'en-US': $('<div>' + params.question + '</div>').text()
    };
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.interactionType = 'choice';
    definition.correctResponsesPattern = [];
    definition.choices = [];
    for (var i = 0; i < params.answers.length; i++) {
      definition.choices[i] = {
        'id': params.answers[i].originalOrder + '',
        'description': {
          // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
          'en-US': $('<div>' + params.answers[i].text + '</div>').text()
        }
      };
      if (params.answers[i].correct) {
        if (!params.singleAnswer) {
          if (definition.correctResponsesPattern.length) {
            definition.correctResponsesPattern[0] += '[,]';
            // This looks insane, but it's how you separate multiple answers
            // that must all be chosen to achieve perfect score...
          }
          else {
            definition.correctResponsesPattern.push('');
          }
          definition.correctResponsesPattern[0] += params.answers[i].originalOrder;
        }
        else {
          definition.correctResponsesPattern.push('' + params.answers[i].originalOrder);
        }
      }
    }
  };

  /**
   * Add the response part to an xAPI event
   *
   * @param {H5P.XAPIEvent} xAPIEvent
   *  The xAPI event we will add a response to
   */
  var addResponseToXAPI = function (xAPIEvent) {
    var maxScore = self.getMaxScore();
    var success = (100 * score / maxScore) >= params.behaviour.passPercentage;

    xAPIEvent.setScoredResult(score, maxScore, self, true, success);
    if (params.userAnswers === undefined) {
      calcScore();
    }

    // Add the response
    var response = '';
    for (var i = 0; i < params.userAnswers.length; i++) {
      if (response !== '') {
        response += '[,]';
      }
      response += idMap === undefined ? params.userAnswers[i] : idMap[params.userAnswers[i]];
    }
    xAPIEvent.data.statement.result.response = response;
  };

  /**
   * Create a map pointing from original answers to shuffled answers
   *
   * @return {number[]} map pointing from original answers to shuffled answers
   */
  var getShuffleMap = function() {
    params.answers = H5P.shuffleArray(params.answers);

    // Create a map from the new id to the old one
    var idMap = [];
    for (i = 0; i < params.answers.length; i++) {
      idMap[i] = params.answers[i].originalOrder;
    }
    return idMap;
  };

  // Initialization code
  // Randomize order, if requested
  var idMap;
  // Store original order in answers
  for (i = 0; i < params.answers.length; i++) {
    params.answers[i].originalOrder = i;
  }
  if (params.behaviour.randomAnswers) {
    idMap = getShuffleMap();
  }

  // Start with an empty set of user answers.
  params.userAnswers = [];

  // Restore previous state
  if (contentData && contentData.previousState !== undefined) {

    // Restore answers
    if (contentData.previousState.answers) {
      if (!idMap) {
        params.userAnswers = contentData.previousState.answers;
      }
      else {
        // The answers have been shuffled, and we must use the id mapping.
        for (i = 0; i < contentData.previousState.answers.length; i++) {
          for (var k = 0; k < idMap.length; k++) {
            if (idMap[k] === contentData.previousState.answers[i]) {
              params.userAnswers.push(k);
            }
          }
        }
      }
      calcScore();
    }
  }

  var hasCheckedAnswer = false;

  // Loop through choices
  for (var j = 0; j < params.answers.length; j++) {
    var ans = params.answers[j];

    if (!params.behaviour.singleAnswer) {
      // Set role
      ans.role = 'checkbox';
      ans.tabindex = '0';
      if (params.userAnswers.indexOf(j) !== -1) {
        ans.checked = 'true';
        hasCheckedAnswer = true;
      }
    }
    else {
      // Set role
      ans.role = 'radio';

      // Determine tabindex, checked and extra classes
      if (params.userAnswers.length === 0) {
        // No correct answers
        if (i === 0 || i === params.answers.length) {
          ans.tabindex = '0';
        }
      }
      else if (params.userAnswers.indexOf(j) !== -1) {
        // This is the correct choice
        ans.tabindex = '0';
        ans.checked = 'true';
        hasCheckedAnswer = true;
      }
    }

    // Set default
    if (ans.tabindex === undefined) {
      ans.tabindex = '-1';
    }
    if (ans.checked === undefined) {
      ans.checked = 'false';
    }
  }

  H5P.MultiChoice.counter = (H5P.MultiChoice.counter === undefined ? 0 : H5P.MultiChoice.counter + 1);
  params.role = (params.behaviour.singleAnswer ? 'radiogroup' : 'group');
  params.label = 'h5p-mcq' + H5P.MultiChoice.counter;

  /**
   * Pack the current state of the interactivity into a object that can be
   * serialized.
   *
   * @public
   */
  this.getCurrentState = function () {
    var state = {};
    if (!idMap) {
      state.answers = params.userAnswers;
    }
    else {
      // The answers have been shuffled and must be mapped back to their
      // original ID.
      state.answers = [];
      for (var i = 0; i < params.userAnswers.length; i++) {
        state.answers.push(idMap[params.userAnswers[i]]);
      }
    }
    return state;
  };

  /**
   * Check if user has given an answer.
   *
   * @param {boolean} [ignoreCheck] Ignore returning true from pressing "check-answer" button.
   * @return {boolean} True if answer is given
   */
  this.getAnswerGiven = function (ignoreCheck) {
    var answered = ignoreCheck ? false : this.answered;
    return answered || params.userAnswers.length > 0 || blankIsCorrect;
  };

  this.getScore = function () {
    return score;
  };

  this.getTitle = function () {
    return H5P.createTitle((this.contentData && this.contentData.metadata && this.contentData.metadata.title) ? this.contentData.metadata.title : 'Multiple Choice');
  };
};

H5P.MultiChoice.prototype = Object.create(H5P.Question.prototype);
H5P.MultiChoice.prototype.constructor = H5P.MultiChoice;
;
var H5P = H5P || {};

/**
 * H5P-Text Utilities
 *
 * Some functions that can be useful when dealing with texts in H5P.
 *
 * @param {H5P.jQuery} $
 */
H5P.TextUtilities = function () {
  'use strict';
  /**
   * Create Text Utilities.
   *
   * Might be needed later.
   *
   * @constructor
   */
  function TextUtilities () {
  }

  // Inheritance
  TextUtilities.prototype = Object.create(H5P.EventDispatcher.prototype);
  TextUtilities.prototype.constructor = TextUtilities;

  /** @constant {object} */
  TextUtilities.WORD_DELIMITER = /[\s.?!,\';\"]/g;

  /**
   * Check if a candidate string is considered isolated (in a larger string) by
   * checking the symbol before and after the candidate.
   *
   * @param {string} candidate - String to be looked for.
   * @param {string} text - (Larger) string that should contain candidate.
   * @param {object} params - Parameters.
   * @param {object} params.delimiter - Regular expression containing symbols used to isolate the candidate.
   * @return {boolean} True if string is isolated.
   */
  TextUtilities.isIsolated = function (candidate, text, params) {
    // Sanitization
    if (!candidate || !text) {
      return;
    }
    var delimiter = (!!params && !!params.delimiter) ? params.delimiter : TextUtilities.WORD_DELIMITER;

    var pos = (!!params && !!params.index && typeof params.index === 'number') ? params.index : text.indexOf(candidate);
    if (pos < 0 || pos > text.length-1) {
      return false;
    }

    var pred = (pos === 0 ? '' : text[pos - 1].replace(delimiter, ''));
    var succ = (pos + candidate.length === text.length ? '' : text[pos + candidate.length].replace(delimiter, ''));

    if (pred !== '' || succ !== '') {
      return false;
    }
    return true;
  };

  /**
   * Check whether two strings are considered to be similar.
   * The similarity is temporarily computed by word length and number of number of operations
   * required to change one word into the other (Damerau-Levenshtein). It's subject to
   * change, cmp. https://github.com/otacke/udacity-machine-learning-engineer/blob/master/submissions/capstone_proposals/h5p_fuzzy_blanks.md
   *
   * @param {String} string1 - String #1.
   * @param {String} string2 - String #2.
   * @param {object} params - Parameters.
   * @return {boolean} True, if strings are considered to be similar.
   */
  TextUtilities.areSimilar = function (string1, string2) {
    // Sanitization
    if (!string1 || typeof string1 !== 'string') {
      return;
    }
    if (!string2 || typeof string2 !== 'string') {
      return;
    }

    // Just temporariliy this unflexible. Will be configurable via params.
    var length = Math.min(string1.length, string2.length);
    var levenshtein = H5P.TextUtilities.computeLevenshteinDistance(string1, string2, true);
    if (levenshtein === 0) {
      return true;
    }
    if ((length > 9) && (levenshtein <= 2)) {
      return true;
    }
    if ((length > 3) && (levenshtein <= 1)) {
      return true;
    }
    return false;
  };

  /**
   * Compute the (Damerau-)Levenshtein distance for two strings.
   *
   * The (Damerau-)Levenshtein distance that is returned is equivalent to the
   * number of operations that are necessary to transform one string into the
   * other. Consequently, lower numbers indicate higher similarity between the
   * two strings.
   *
   * While the Levenshtein distance counts deletions, insertions and mismatches,
   * the Damerau-Levenshtein distance also counts swapping two characters as
   * only one operation (instead of two mismatches), because this seems to
   * happen quite often.
   *
   * See http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance for details
   *
   * @public
   * @param {string} str1 - String no. 1.
   * @param {string} str2 - String no. 2.
   * @param {boolean} [countSwapping=false] - If true, swapping chars will count as operation.
   * @returns {number} Distance.
   */
  TextUtilities.computeLevenshteinDistance = function(str1, str2, countSwapping) {
    // sanity checks
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
      return undefined;
    }
    if (countSwapping && typeof countSwapping !== 'boolean') {
      countSwapping = false;
    }

    // degenerate cases
    if (str1 === str2) {
      return 0;
    }
    if (str1.length === 0) {
      return str2.length;
    }
    if (str2.length === 0) {
      return str1.length;
    }

    // counter variables
    var i, j;

    // indicates characters that don't match
    var cost;

    // matrix for storing distances
    var distance = [];

    // initialization
    for (i = 0; i <= str1.length; i++) {
      distance[i] = [i];
    }
    for (j = 0; j <= str2.length; j++) {
      distance[0][j] = j;
    }

    // computation
    for (i = 1; i <= str1.length; i++) {
      for (j = 1; j <= str2.length; j++) {
        cost = (str1[i-1] === str2[j-1]) ? 0 : 1;
        distance[i][j] = Math.min(
          distance[i-1][j] + 1,     // deletion
          distance[i][j-1] + 1,     // insertion
          distance[i-1][j-1] + cost // mismatch
        );
        // in Damerau-Levenshtein distance, transpositions are operations
        if (countSwapping) {
          if (i > 1 && j > 1 && str1[i-1] === str2[j-2] && str1[i-2] === str2[j-1]) {
            distance[i][j] = Math.min(distance[i][j], distance[i-2][j-2] + cost);
          }
        }
      }
    }
    return distance[str1.length][str2.length];
  };

  /**
   * Compute the Jaro(-Winkler) distance for two strings.
   *
   * The Jaro(-Winkler) distance will return a value between 0 and 1 indicating
   * the similarity of two strings. The higher the value, the more similar the
   * strings are.
   *
   * See https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance for details
   *
   * It seems that a more generalized implementation of Winkler's modification
   * can improve the results. This might be implemented later.
   * http://disi.unitn.it/~p2p/RelatedWork/Matching/Hermans_bnaic-2012.pdf
   *
   * @public
   * @param {string} str1 - String no. 1.
   * @param {string} str2 - String no. 2.
   * @param {boolean} [favorSameStart=false] - If true, strings with same start get higher distance value.
   * @param {boolean} [longTolerance=false] - If true, Winkler's tolerance for long words will be used.
   * @returns {number} Distance.
   */
  TextUtilities.computeJaroDistance = function(str1, str2, favorSameStart, longTolerance) {
    // sanity checks
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
      return undefined;
    }
    if (favorSameStart && typeof favorSameStart !== 'boolean') {
      favorSameStart = false;
    }
    if (longTolerance && typeof longTolerance !== 'boolean') {
      longTolerance = false;
    }

    // degenerate cases
    if (str1.length === 0 || str2.length === 0) {
      return 0;
    }
    if (str1 === str2) {
      return 1;
    }

    // counter variables
    var i, j, k;

    // number of matches between both strings
    var matches = 0;

    // number of transpositions between both strings
    var transpositions = 0;

    // The Jaro-Winkler distance
    var distance = 0;

    // length of common prefix up to 4 chars
    var l = 0;

    // scaling factor, should not exceed 0.25 (Winkler default = 0.1)
    var p = 0.1;

    // will be used often
    var str1Len = str1.length;
    var str2Len = str2.length;

    // determines the distance that still counts as a match
    var matchWindow = Math.floor(Math.max(str1Len, str2Len) / 2)- 1;

    // will store matches
    var str1Flags = new Array(str1Len);
    var str2Flags = new Array(str2Len);

    // count matches
    for (i = 0; i < str1Len; i++) {
      var start  = (i >= matchWindow) ? i - matchWindow : 0;
      var end = (i + matchWindow <= (str2Len - 1)) ? (i + matchWindow) : (str2Len - 1);

      for (j = start; j <= end; j++) {
        if (str1Flags[i] !== true && str2Flags[j] !== true && str1[i] === str2[j]) {
          str1Flags[i] = str2Flags[j] = true;
          matches += 1;
          break;
        }
      }
    }
    if (matches === 0) {
      return 0;
    }

    // count transpositions
    k = 0;
    for (i = 0; i < str1Len; i++) {
      if (!str1Flags[i]) {
        continue;
      }
      while (!str2Flags[k]) {
        k += 1;
      }
      if (str1[i] !== str2[k]) {
        transpositions += 1;
      }
      k += 1;
    }
    transpositions = transpositions / 2;

    // compute Jaro distance
    distance = (matches/str1Len + matches/str2Len + (matches - transpositions) / matches) / 3;

    // modification used by Winkler
    if (favorSameStart) {
      if (distance > 0.7 && str1Len > 3 && str2Len > 3) {
        while (str1[l] === str2[l] && l < 4) {
          l += 1;
        }
        distance = distance + l * p * (1 - distance);

        // modification for long words
        if (longTolerance) {
          if (Math.max(str1Len, str2Len) > 4 && matches > l + 1 && 2 * matches >= Math.max(str1Len, str2Len) + l) {
            distance += ((1.0 - distance) * ((matches - l - 1) / (str1Len + str2Len - 2 * l + 2)));
          }
        }
      }
    }

    return distance;
  };


  /**
   * Check whether a text contains a string, but fuzzy.
   *
   * This function is naive. It moves a window of needle's length (+2)
   * over the haystack's text and each move compares for similarity using
   * a given string metric. This will be slow for long texts!!!
   *
   * TODO: You might want to look into the bitap algorithm or experiment
   *       with regexps
   *
   * @param {String} needle - String to look for.
   * @param {String} haystack - Text to look in.
   */
  TextUtilities.fuzzyContains = function (needle, haystack) {
    return this.fuzzyFind(needle, haystack).contains;
  };

  /**
   * Find the first position of a fuzzy string within a text
   * @param {String} needle - String to look for.
   * @param {String} haystack - Text to look in.
   */
  TextUtilities.fuzzyIndexOf = function (needle, haystack) {
    return this.fuzzyFind(needle, haystack).indexOf;
  };

  /**
   * Find the first fuzzy match of a string within a text
   * @param {String} needle - String to look for.
   * @param {String} haystack - Text to look in.
   */
  TextUtilities.fuzzyMatch = function (needle, haystack) {
    return this.fuzzyFind(needle, haystack).match;
  };

  /**
   * Find a fuzzy string with in a text.
   * TODO: This could be cleaned ...
   * @param {String} needle - String to look for.
   * @param {String} haystack - Text to look in.
   * @param {object} params - Parameters.
   */
  TextUtilities.fuzzyFind = function (needle, haystack, params) {
    // Sanitization
    if (!needle || typeof needle !== 'string') {
      return false;
    }
    if (!haystack || typeof haystack !== 'string') {
      return false;
    }
    if (params === undefined || params.windowSize === undefined || typeof params.windowSize !== 'number') {
      params = {'windowSize': 3};
    }

    var match;

    var found = haystack.split(' ').some(function(hay) {
      match = hay;
      return H5P.TextUtilities.areSimilar(needle, hay);
    });
    if (found) {
      return {'contains' : found, 'match': match, 'index': haystack.indexOf(match)};
    }

    // This is not used for single words but for phrases
    for (var i = 0; i < haystack.length - needle.length + 1; i++) {
      var hay = [];
      for (var j = 0; j < params.windowSize; j++) {
        hay[j] = haystack.substr(i, needle.length + j);
      }

      // Checking isIsolated will e.g. prevent finding beginnings of words
      for (var j = 0; j < hay.length; j++) {
        if (TextUtilities.isIsolated(hay[j], haystack) && TextUtilities.areSimilar(hay[j], needle)) {
          match = hay[j];
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (!found) {
      match = undefined;
    }
    return {'contains' : found, 'match': match, 'index': haystack.indexOf(match)};
  };

  return TextUtilities;
}();
;
/*global H5P*/
H5P.Blanks = (function ($, Question) {
  /**
   * @constant
   * @default
   */
  var STATE_ONGOING = 'ongoing';
  var STATE_CHECKING = 'checking';
  var STATE_SHOWING_SOLUTION = 'showing-solution';
  var STATE_FINISHED = 'finished';

  const XAPI_ALTERNATIVE_EXTENSION = 'https://h5p.org/x-api/alternatives';
  const XAPI_CASE_SENSITIVITY = 'https://h5p.org/x-api/case-sensitivity';
  const XAPI_REPORTING_VERSION_EXTENSION = 'https://h5p.org/x-api/h5p-reporting-version';

  /**
   * @typedef {Object} Params
   *  Parameters/configuration object for Blanks
   *
   * @property {Object} Params.behaviour
   * @property {string} Params.behaviour.confirmRetryDialog
   * @property {string} Params.behaviour.confirmCheckDialog
   *
   * @property {Object} Params.confirmRetry
   * @property {string} Params.confirmRetry.header
   * @property {string} Params.confirmRetry.body
   * @property {string} Params.confirmRetry.cancelLabel
   * @property {string} Params.confirmRetry.confirmLabel
   *
   * @property {Object} Params.confirmCheck
   * @property {string} Params.confirmCheck.header
   * @property {string} Params.confirmCheck.body
   * @property {string} Params.confirmCheck.cancelLabel
   * @property {string} Params.confirmCheck.confirmLabel
   */

  /**
   * Initialize module.
   *
   * @class H5P.Blanks
   * @extends H5P.Question
   * @param {Params} params
   * @param {number} id Content identification
   * @param {Object} contentData Task specific content data
   */
  function Blanks(params, id, contentData) {
    var self = this;

    // Inheritance
    Question.call(self, 'blanks');

    // IDs
    this.contentId = id;
    this.contentData = contentData;

    this.params = $.extend(true, {}, {
      text: "Fill in",
      questions: [
        "<p>Oslo is the capital of *Norway*.</p>"
      ],
      overallFeedback: [],
      userAnswers: [], // TODO This isn't in semantics?
      showSolutions: "Show solution",
      tryAgain: "Try again",
      checkAnswer: "Check",
      changeAnswer: "Change answer",
      notFilledOut: "Please fill in all blanks to view solution",
      answerIsCorrect: "':ans' is correct",
      answerIsWrong: "':ans' is wrong",
      answeredCorrectly: "Answered correctly",
      answeredIncorrectly: "Answered incorrectly",
      solutionLabel: "Correct answer:",
      inputLabel: "Blank input @num of @total",
      inputHasTipLabel: "Tip available",
      tipLabel: "Tip",
      scoreBarLabel: 'You got :num out of :total points',
      behaviour: {
        enableRetry: true,
        enableSolutionsButton: true,
        enableCheckButton: true,
        caseSensitive: true,
        showSolutionsRequiresInput: true,
        autoCheck: false,
        separateLines: false
      },
      a11yCheck: 'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
      a11yShowSolution: 'Show the solution. The task will be marked with its correct solution.',
      a11yRetry: 'Retry the task. Reset all responses and start the task over again.',
      a11yHeader: 'Checking mode',
      submitAnswer: 'Submit',
    }, params);

    // Delete empty questions
    for (var i = this.params.questions.length - 1; i >= 0; i--) {
      if (!this.params.questions[i]) {
        this.params.questions.splice(i, 1);
      }
    }

    // Previous state
    this.contentData = contentData;
    if (this.contentData !== undefined && this.contentData.previousState !== undefined) {
      this.previousState = this.contentData.previousState;
    }

    // Clozes
    this.clozes = [];

    // Keep track tabbing forward or backwards
    this.shiftPressed = false;

    H5P.$body.keydown(function (event) {
      if (event.keyCode === 16) {
        self.shiftPressed = true;
      }
    }).keyup(function (event) {
      if (event.keyCode === 16) {
        self.shiftPressed = false;
      }
    });

    // Using instructions as label for our text groups
    this.labelId = 'h5p-blanks-instructions-' + Blanks.idCounter;
    this.content = self.createQuestions();

    // Check for task media
    var media = self.params.media;
    if (media && media.type && media.type.library) {
      media = media.type;
      var type = media.library.split(' ')[0];
      if (type === 'H5P.Image') {
        if (media.params.file) {
          // Register task image
          self.setImage(media.params.file.path, {
            disableImageZooming: self.params.media.disableImageZooming || false,
            alt: media.params.alt,
            title: media.params.title
          });
        }
      }
      else if (type === 'H5P.Video') {
        if (media.params.sources) {
          // Register task video
          self.setVideo(media);
        }
      }
      else if (type === 'H5P.Audio') {
        if (media.params.files) {
          // Register task audio
          self.setAudio(media);
        }
      }
    }

    // Register task introduction text
    self.setIntroduction('<div id="' + this.labelId + '">' + self.params.text + '</div>');

    // Register task content area
    self.setContent(self.content, {
      'class': self.params.behaviour.separateLines ? 'h5p-separate-lines' : ''
    });

    // ... and buttons
    self.registerButtons();

    // Restore previous state
    self.setH5PUserState();
  }

  // Inheritance
  Blanks.prototype = Object.create(Question.prototype);
  Blanks.prototype.constructor = Blanks;

  /**
   * Create all the buttons for the task
   */
  Blanks.prototype.registerButtons = function () {
    var self = this;

    var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
    var $containerParents = $content.parents('.h5p-container');

    // select find container to attach dialogs to
    var $container;
    if ($containerParents.length !== 0) {
      // use parent highest up if any
      $container = $containerParents.last();
    }
    else if ($content.length !== 0) {
      $container = $content;
    }
    else  {
      $container = $(document.body);
    }

    if (!self.params.behaviour.autoCheck && this.params.behaviour.enableCheckButton) {
      // Check answer button
      self.addButton('check-answer', self.params.checkAnswer, function () {
        // Move focus to top of content
        self.a11yHeader.innerHTML = self.params.a11yHeader;
        self.a11yHeader.focus();

        self.toggleButtonVisibility(STATE_CHECKING);
        self.markResults();
        self.showEvaluation();
        self.triggerAnswered();
      }, true, {
        'aria-label': self.params.a11yCheck,
      }, {
        confirmationDialog: {
          enable: self.params.behaviour.confirmCheckDialog,
          l10n: self.params.confirmCheck,
          instance: self,
          $parentElement: $container
        },
        textIfSubmitting: self.params.submitAnswer,
        contentData: self.contentData,
      });
    }

    // Show solution button
    self.addButton('show-solution', self.params.showSolutions, function () {
      self.showCorrectAnswers(false);
    }, self.params.behaviour.enableSolutionsButton, {
      'aria-label': self.params.a11yShowSolution,
    });

    // Try again button
    if (self.params.behaviour.enableRetry === true) {
      self.addButton('try-again', self.params.tryAgain, function () {
        self.a11yHeader.innerHTML = '';
        self.resetTask();
        self.$questions.filter(':first').find('input:first').focus();
      }, true, {
        'aria-label': self.params.a11yRetry,
      }, {
        confirmationDialog: {
          enable: self.params.behaviour.confirmRetryDialog,
          l10n: self.params.confirmRetry,
          instance: self,
          $parentElement: $container
        }
      });
    }
    self.toggleButtonVisibility(STATE_ONGOING);
  };

  /**
   * Find blanks in a string and run a handler on those blanks
   *
   * @param {string} question
   *   Question text containing blanks enclosed in asterisks.
   * @param {function} handler
   *   Replaces the blanks text with an input field.
   * @returns {string}
   *   The question with blanks replaced by the given handler.
   */
  Blanks.prototype.handleBlanks = function (question, handler) {
    // Go through the text and run handler on all asterisk
    var clozeEnd, clozeStart = question.indexOf('*');
    var self = this;
    while (clozeStart !== -1 && clozeEnd !== -1) {
      clozeStart++;
      clozeEnd = question.indexOf('*', clozeStart);
      if (clozeEnd === -1) {
        continue; // No end
      }
      var clozeContent = question.substring(clozeStart, clozeEnd);
      var replacer = '';
      if (clozeContent.length) {
        replacer = handler(self.parseSolution(clozeContent));
        clozeEnd++;
      }
      else {
        clozeStart += 1;
      }
      question = question.slice(0, clozeStart - 1) + replacer + question.slice(clozeEnd);
      clozeEnd -= clozeEnd - clozeStart - replacer.length;

      // Find the next cloze
      clozeStart = question.indexOf('*', clozeEnd);
    }
    return question;
  };

  /**
   * Create questitons html for DOM
   */
  Blanks.prototype.createQuestions = function () {
    var self = this;

    var html = '';
    var clozeNumber = 0;
    for (var i = 0; i < self.params.questions.length; i++) {
      var question = self.params.questions[i];

      // Go through the question text and replace all the asterisks with input fields
      question = self.handleBlanks(question, function (solution) {
        // Create new cloze
        clozeNumber += 1;
        var defaultUserAnswer = (self.params.userAnswers.length > self.clozes.length ? self.params.userAnswers[self.clozes.length] : null);
        var cloze = new Blanks.Cloze(solution, self.params.behaviour, defaultUserAnswer, {
          answeredCorrectly: self.params.answeredCorrectly,
          answeredIncorrectly: self.params.answeredIncorrectly,
          solutionLabel: self.params.solutionLabel,
          inputLabel: self.params.inputLabel,
          inputHasTipLabel: self.params.inputHasTipLabel,
          tipLabel: self.params.tipLabel
        });

        self.clozes.push(cloze);
        return cloze;
      });

      html += '<div role="group" aria-labelledby="' + self.labelId + '">' + question + '</div>';
    }

    self.hasClozes = clozeNumber > 0;
    this.$questions = $(html);

    self.a11yHeader = document.createElement('div');
    self.a11yHeader.classList.add('hidden-but-read');
    self.a11yHeader.tabIndex = -1;
    self.$questions[0].insertBefore(self.a11yHeader, this.$questions[0].childNodes[0] || null);

    // Set input fields.
    this.$questions.find('input').each(function (i) {
      var afterCheck;
      if (self.params.behaviour.autoCheck) {
        afterCheck = function () {
          var answer = $("<div>").text(this.getUserAnswer()).html();
          self.read((this.correct() ? self.params.answerIsCorrect : self.params.answerIsWrong).replace(':ans', answer));
          if (self.done || self.allBlanksFilledOut()) {
            // All answers has been given. Show solutions button.
            self.toggleButtonVisibility(STATE_CHECKING);
            self.showEvaluation();
            self.triggerAnswered();
            self.done = true;
          }
        };
      }
      self.clozes[i].setInput($(this), afterCheck, function () {
        self.toggleButtonVisibility(STATE_ONGOING);
        if (!self.params.behaviour.autoCheck) {
          self.hideEvaluation();
        }
      }, i, self.clozes.length);
    }).keydown(function (event) {
      var $this = $(this);

      // Adjust width of text input field to match value
      self.autoGrowTextField($this);

      var $inputs, isLastInput;
      var enterPressed = (event.keyCode === 13);
      var tabPressedAutoCheck = (event.keyCode === 9 && self.params.behaviour.autoCheck);

      if (enterPressed || tabPressedAutoCheck) {
        // Figure out which inputs are left to answer
        $inputs = self.$questions.find('.h5p-input-wrapper:not(.h5p-correct) .h5p-text-input');

        // Figure out if this is the last input
        isLastInput = $this.is($inputs[$inputs.length - 1]);
      }

      if ((tabPressedAutoCheck && isLastInput && !self.shiftPressed) ||
          (enterPressed && isLastInput)) {
        // Focus first button on next tick
        setTimeout(function () {
          self.focusButton();
        }, 10);
      }

      if (enterPressed) {
        if (isLastInput) {
          // Check answers
          $this.trigger('blur');
        }
        else {
          // Find next input to focus
          $inputs.eq($inputs.index($this) + 1).focus();
        }

        return false; // Prevent form submission on enter key
      }
    }).on('change', function () {
      self.answered = true;
      self.triggerXAPI('interacted');
    });

    self.on('resize', function () {
      self.resetGrowTextField();
    });

    return this.$questions;
  };

  /**
   *
   */
  Blanks.prototype.autoGrowTextField = function ($input) {
    // Do not set text field size when separate lines is enabled
    if (this.params.behaviour.separateLines) {
      return;
    }

    var self = this;
    var fontSize = parseInt($input.css('font-size'), 10);
    var minEm = 3;
    var minPx = fontSize * minEm;
    var rightPadEm = 3.25;
    var rightPadPx = fontSize * rightPadEm;
    var static_min_pad = 0.5 * fontSize;

    setTimeout(function () {
      var tmp = $('<div>', {
        'text': $input.val()
      });
      tmp.css({
        'position': 'absolute',
        'white-space': 'nowrap',
        'font-size': $input.css('font-size'),
        'font-family': $input.css('font-family'),
        'padding': $input.css('padding'),
        'width': 'initial'
      });
      $input.parent().append(tmp);
      var width = tmp.width();
      var parentWidth = self.$questions.width();
      tmp.remove();
      if (width <= minPx) {
        // Apply min width
        $input.width(minPx + static_min_pad);
      }
      else if (width + rightPadPx >= parentWidth) {
        // Apply max width of parent
        $input.width(parentWidth - rightPadPx);
      }
      else {
        // Apply width that wraps input
        $input.width(width + static_min_pad);
      }
    }, 1);
  };

  /**
   * Resize all text field growth to current size.
   */
  Blanks.prototype.resetGrowTextField = function () {
    var self = this;

    this.$questions.find('input').each(function () {
      self.autoGrowTextField($(this));
    });
  };

  /**
   * Toggle buttons dependent of state.
   *
   * Using CSS-rules to conditionally show/hide using the data-attribute [data-state]
   */
  Blanks.prototype.toggleButtonVisibility = function (state) {
    // The show solutions button is hidden if all answers are correct
    var allCorrect = (this.getScore() === this.getMaxScore());
    if (this.params.behaviour.autoCheck && allCorrect) {
      // We are viewing the solutions
      state = STATE_FINISHED;
    }

    if (this.params.behaviour.enableSolutionsButton) {
      if (state === STATE_CHECKING && !allCorrect) {
        this.showButton('show-solution');
      }
      else {
        this.hideButton('show-solution');
      }
    }

    if (this.params.behaviour.enableRetry) {
      if ((state === STATE_CHECKING && !allCorrect) || state === STATE_SHOWING_SOLUTION) {
        this.showButton('try-again');
      }
      else {
        this.hideButton('try-again');
      }
    }

    if (state === STATE_ONGOING) {
      this.showButton('check-answer');
    }
    else {
      this.hideButton('check-answer');
    }

    this.trigger('resize');
  };

  /**
   * Check if solution is allowed. Warn user if not
   */
  Blanks.prototype.allowSolution = function () {
    if (this.params.behaviour.showSolutionsRequiresInput === true) {
      if (!this.allBlanksFilledOut()) {
        this.updateFeedbackContent(this.params.notFilledOut);
        this.read(this.params.notFilledOut);
        return false;
      }
    }
    return true;
  };

  /**
   * Check if all blanks are filled out
   *
   * @method allBlanksFilledOut
   * @return {boolean} Returns true if all blanks are filled out.
   */
  Blanks.prototype.allBlanksFilledOut = function () {
    return !this.clozes.some(function (cloze) {
      return !cloze.filledOut();
    });
  };

  /**
   * Mark which answers are correct and which are wrong and disable fields if retry is off.
   */
  Blanks.prototype.markResults = function () {
    var self = this;
    for (var i = 0; i < self.clozes.length; i++) {
      self.clozes[i].checkAnswer();
      if (!self.params.behaviour.enableRetry) {
        self.clozes[i].disableInput();
      }
    }
    this.trigger('resize');
  };

  /**
   * Removed marked results
   */
  Blanks.prototype.removeMarkedResults = function () {
    this.$questions.find('.h5p-input-wrapper').removeClass('h5p-correct h5p-wrong');
    this.$questions.find('.h5p-input-wrapper > input').attr('disabled', false);
    this.trigger('resize');
  };


  /**
   * Displays the correct answers
   * @param {boolean} [alwaysShowSolution]
   *  Will always show solution if true
   */
  Blanks.prototype.showCorrectAnswers = function (alwaysShowSolution) {
    if (!alwaysShowSolution && !this.allowSolution()) {
      return;
    }

    this.toggleButtonVisibility(STATE_SHOWING_SOLUTION);
    this.hideSolutions();

    for (var i = 0; i < this.clozes.length; i++) {
      this.clozes[i].showSolution();
    }
    this.trigger('resize');
  };

  /**
   * Toggle input allowed for all input fields
   *
   * @method function
   * @param  {boolean} enabled True if fields should allow input, otherwise false
   */
  Blanks.prototype.toggleAllInputs = function (enabled) {
    for (var i = 0; i < this.clozes.length; i++) {
      this.clozes[i].toggleInput(enabled);
    }
  };

  /**
   * Display the correct solution for the input boxes.
   *
   * This is invoked from CP and QS - be carefull!
   */
  Blanks.prototype.showSolutions = function () {
    this.params.behaviour.enableSolutionsButton = true;
    this.toggleButtonVisibility(STATE_FINISHED);
    this.markResults();
    this.showEvaluation();
    this.showCorrectAnswers(true);
    this.toggleAllInputs(false);
    //Hides all buttons in "show solution" mode.
    this.hideButtons();
  };

  /**
   * Resets the complete task.
   * Used in contracts.
   * @public
   */
  Blanks.prototype.resetTask = function () {
    this.answered = false;
    this.hideEvaluation();
    this.hideSolutions();
    this.clearAnswers();
    this.removeMarkedResults();
    this.toggleButtonVisibility(STATE_ONGOING);
    this.resetGrowTextField();
    this.toggleAllInputs(true);
    this.done = false;
  };

  /**
   * Hides all buttons.
   * @public
   */
  Blanks.prototype.hideButtons = function () {
    this.toggleButtonVisibility(STATE_FINISHED);
  };

  /**
   * Trigger xAPI answered event
   */
  Blanks.prototype.triggerAnswered = function () {
    this.answered = true;
    var xAPIEvent = this.createXAPIEventTemplate('answered');
    this.addQuestionToXAPI(xAPIEvent);
    this.addResponseToXAPI(xAPIEvent);
    this.trigger(xAPIEvent);
  };

  /**
   * Get xAPI data.
   * Contract used by report rendering engine.
   *
   * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
   */
  Blanks.prototype.getXAPIData = function () {
    var xAPIEvent = this.createXAPIEventTemplate('answered');
    this.addQuestionToXAPI(xAPIEvent);
    this.addResponseToXAPI(xAPIEvent);
    return {
      statement: xAPIEvent.data.statement
    };
  };

  /**
   * Generate xAPI object definition used in xAPI statements.
   * @return {Object}
   */
  Blanks.prototype.getxAPIDefinition = function () {
    var definition = {};
    definition.description = {
      'en-US': this.params.text
    };
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.interactionType = 'fill-in';

    const clozeSolutions = [];
    let crp = '';
    // xAPI forces us to create solution patterns for all possible solution combinations
    for (var i = 0; i < this.params.questions.length; i++) {
      var question = this.handleBlanks(this.params.questions[i], function (solution) {
        // Collect all solution combinations for the H5P Alternative extension
        clozeSolutions.push(solution.solutions);

        // Create a basic response pattern out of the first alternative for each blanks field
        crp += (!crp ? '' : '[,]') + solution.solutions[0];

        // We replace the solutions in the question with a "blank"
        return '__________';
      });
      definition.description['en-US'] += question;
    }

    // Set the basic response pattern (not supporting multiple alternatives for blanks)
    definition.correctResponsesPattern = [
      '{case_matters=' + this.params.behaviour.caseSensitive + '}' + crp,
    ];

    // Add the H5P Alternative extension which provides all the combinations of different answers
    // Reporting software will need to support this extension for alternatives to work.
    definition.extensions = definition.extensions || {};
    definition.extensions[XAPI_CASE_SENSITIVITY] = this.params.behaviour.caseSensitive;
    definition.extensions[XAPI_ALTERNATIVE_EXTENSION] = clozeSolutions;

    return definition;
  };

  /**
   * Add the question itselt to the definition part of an xAPIEvent
   */
  Blanks.prototype.addQuestionToXAPI = function (xAPIEvent) {
    var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    $.extend(true, definition, this.getxAPIDefinition());

    // Set reporting module version if alternative extension is used
    if (this.hasAlternatives) {
      const context = xAPIEvent.getVerifiedStatementValue(['context']);
      context.extensions = context.extensions || {};
      context.extensions[XAPI_REPORTING_VERSION_EXTENSION] = '1.1.0';
    }
  };

  /**
   * Parse the solution text (text between the asterisks)
   *
   * @param {string} solutionText
   * @returns {object} with the following properties
   *  - tip: the tip text for this solution, undefined if no tip
   *  - solutions: array of solution words
   */
  Blanks.prototype.parseSolution = function (solutionText) {
    var tip, solution;

    var tipStart = solutionText.indexOf(':');
    if (tipStart !== -1) {
      // Found tip, now extract
      tip = solutionText.slice(tipStart + 1);
      solution = solutionText.slice(0, tipStart);
    }
    else {
      solution = solutionText;
    }

    // Split up alternatives
    var solutions = solution.split('/');
    this.hasAlternatives = this.hasAlternatives || solutions.length > 1;

    // Trim solutions
    for (var i = 0; i < solutions.length; i++) {
      solutions[i] = H5P.trim(solutions[i]);

      //decodes html entities
      var elem = document.createElement('textarea');
      elem.innerHTML = solutions[i];
      solutions[i] = elem.value;
    }

    return {
      tip: tip,
      solutions: solutions
    };
  };

  /**
   * Add the response part to an xAPI event
   *
   * @param {H5P.XAPIEvent} xAPIEvent
   *  The xAPI event we will add a response to
   */
  Blanks.prototype.addResponseToXAPI = function (xAPIEvent) {
    xAPIEvent.setScoredResult(this.getScore(), this.getMaxScore(), this);
    xAPIEvent.data.statement.result.response = this.getxAPIResponse();
  };

  /**
   * Generate xAPI user response, used in xAPI statements.
   * @return {string} User answers separated by the "[,]" pattern
   */
  Blanks.prototype.getxAPIResponse = function () {
    var usersAnswers = this.getCurrentState();
    return usersAnswers.join('[,]');
  };

  /**
   * Show evaluation widget, i.e: 'You got x of y blanks correct'
   */
  Blanks.prototype.showEvaluation = function () {
    var maxScore = this.getMaxScore();
    var score = this.getScore();
    var scoreText = H5P.Question.determineOverallFeedback(this.params.overallFeedback, score / maxScore).replace('@score', score).replace('@total', maxScore);

    this.setFeedback(scoreText, score, maxScore, this.params.scoreBarLabel);

    if (score === maxScore) {
      this.toggleButtonVisibility(STATE_FINISHED);
    }
  };

  /**
   * Hide the evaluation widget
   */
  Blanks.prototype.hideEvaluation = function () {
    // Clear evaluation section.
    this.removeFeedback();
  };

  /**
   * Hide solutions. (/try again)
   */
  Blanks.prototype.hideSolutions = function () {
    // Clean solution from quiz
    this.$questions.find('.h5p-correct-answer').remove();
  };

  /**
   * Get maximum number of correct answers.
   *
   * @returns {Number} Max points
   */
  Blanks.prototype.getMaxScore = function () {
    var self = this;
    return self.clozes.length;
  };

  /**
   * Count the number of correct answers.
   *
   * @returns {Number} Points
   */
  Blanks.prototype.getScore = function () {
    var self = this;
    var correct = 0;
    for (var i = 0; i < self.clozes.length; i++) {
      if (self.clozes[i].correct()) {
        correct++;
      }
      self.params.userAnswers[i] = self.clozes[i].getUserAnswer();
    }

    return correct;
  };

  Blanks.prototype.getTitle = function () {
    return H5P.createTitle((this.contentData.metadata && this.contentData.metadata.title) ? this.contentData.metadata.title : 'Fill In');
  };

  /**
   * Clear the user's answers
   */
  Blanks.prototype.clearAnswers = function () {
    this.clozes.forEach(function (cloze) {
      cloze.setUserInput('');
      cloze.resetAriaLabel();
    });
  };

  /**
   * Checks if all has been answered.
   *
   * @returns {Boolean}
   */
  Blanks.prototype.getAnswerGiven = function () {
    return this.answered || !this.hasClozes;
  };

  /**
   * Helps set focus the given input field.
   * @param {jQuery} $input
   */
  Blanks.setFocus = function ($input) {
    setTimeout(function () {
      $input.focus();
    }, 1);
  };

  /**
   * Returns an object containing content of each cloze
   *
   * @returns {object} object containing content for each cloze
   */
  Blanks.prototype.getCurrentState = function () {
    var clozesContent = [];

    // Get user input for every cloze
    this.clozes.forEach(function (cloze) {
      clozesContent.push(cloze.getUserAnswer());
    });
    return clozesContent;
  };

  /**
   * Sets answers to current user state
   */
  Blanks.prototype.setH5PUserState = function () {
    var self = this;
    var isValidState = (this.previousState !== undefined &&
                        this.previousState.length &&
                        this.previousState.length === this.clozes.length);

    // Check that stored user state is valid
    if (!isValidState) {
      return;
    }

    // Set input from user state
    var hasAllClozesFilled = true;
    this.previousState.forEach(function (clozeContent, ccIndex) {

      // Register that an answer has been given
      if (clozeContent.length) {
        self.answered = true;
      }

      var cloze = self.clozes[ccIndex];
      cloze.setUserInput(clozeContent);

      // Handle instant feedback
      if (self.params.behaviour.autoCheck) {
        if (cloze.filledOut()) {
          cloze.checkAnswer();
        }
        else {
          hasAllClozesFilled = false;
        }
      }
    });

    if (self.params.behaviour.autoCheck && hasAllClozesFilled) {
      self.showEvaluation();
      self.toggleButtonVisibility(STATE_CHECKING);
    }
  };

  /**
   * Disables any active input. Useful for freezing the task and dis-allowing
   * modification of wrong answers.
   */
  Blanks.prototype.disableInput = function () {
    this.$questions.find('input').attr('disabled', true);
  };

  Blanks.idCounter = 0;

  return Blanks;
})(H5P.jQuery, H5P.Question);

/**
 * Static utility method for parsing H5P.Blanks qestion into a format useful
 * for creating reports.
 *
 * Example question: 'H5P content may be edited using a *browser/web-browser:something you use every day*.'
 *
 * Produces the following result:
 * [
 *   {
 *     type: 'text',
 *     content: 'H5P content may be edited using a '
 *   },
 *   {
 *     type: 'answer',
 *     correct: ['browser', 'web-browser']
 *   },
 *   {
 *     type: 'text',
 *     content: '.'
 *   }
 * ]
 *
 * @param {string} question
 */
H5P.Blanks.parseText = function (question) {
  var blank = new H5P.Blanks({ question: question });

  /**
   * Parses a text into an array where words starting and ending
   * with an asterisk are separated from other text.
   * e.g ["this", "*is*", " an ", "*example*"]
   *
   * @param {string} text
   *
   * @return {string[]}
   */
  function tokenizeQuestionText(text) {
    return text.split(/(\*.*?\*)/).filter(function (str) {
      return str.length > 0; }
    );
  }

  function startsAndEndsWithAnAsterisk(str) {
    return str.substr(0,1) === '*' && str.substr(-1) === '*';
  }

  function replaceHtmlTags(str, value) {
    return str.replace(/<[^>]*>/g, value);
  }

  return tokenizeQuestionText(replaceHtmlTags(question, '')).map(function (part) {
    return startsAndEndsWithAnAsterisk(part) ?
      ({
        type: 'answer',
        correct: blank.parseSolution(part.slice(1, -1)).solutions
      }) :
      ({
        type: 'text',
        content: part
      });
  });
};
;
(function ($, Blanks) {

  /**
   * Simple private class for keeping track of clozes.
   *
   * @class H5P.Blanks.Cloze
   * @param {string} answer
   * @param {Object} behaviour Behavioral settings for the task from semantics
   * @param {boolean} behaviour.acceptSpellingErrors - If true, answers will also count correct if they contain small spelling errors.
   * @param {string} defaultUserAnswer
   * @param {Object} l10n Localized texts
   * @param {string} l10n.solutionLabel Assistive technology label for cloze solution
   * @param {string} l10n.inputLabel Assistive technology label for cloze input
   * @param {string} l10n.inputHasTipLabel Assistive technology label for input with tip
   * @param {string} l10n.tipLabel Label for tip icon
   */
  Blanks.Cloze = function (solution, behaviour, defaultUserAnswer, l10n) {
    var self = this;
    var $input, $wrapper;
    var answers = solution.solutions;
    var answer = answers.join('/');
    var tip = solution.tip;
    var checkedAnswer = null;
    var inputLabel = l10n.inputLabel;

    if (behaviour.caseSensitive !== true) {
      // Convert possible solutions into lowercase
      for (var i = 0; i < answers.length; i++) {
        answers[i] = answers[i].toLowerCase();
      }
    }

    /**
     * Check if the answer is correct.
     *
     * @private
     * @param {string} answered
     */
    var correct = function (answered) {
      if (behaviour.caseSensitive !== true) {
        answered = answered.toLowerCase();
      }
      for (var i = 0; i < answers.length; i++) {
        // Damerau-Levenshtein comparison
        if (behaviour.acceptSpellingErrors === true) {
          var levenshtein = H5P.TextUtilities.computeLevenshteinDistance(answered, answers[i], true);
          /*
           * The correctness is temporarily computed by word length and number of number of operations
           * required to change one word into the other (Damerau-Levenshtein). It's subject to
           * change, cmp. https://github.com/otacke/udacity-machine-learning-engineer/blob/master/submissions/capstone_proposals/h5p_fuzzy_blanks.md
           */
          if ((answers[i].length > 9) && (levenshtein <= 2)) {
            return true;
          } else if ((answers[i].length > 3) && (levenshtein <= 1)) {
            return true;
          }
        }
        // regular comparison
        if (answered === answers[i]) {
          return true;
        }
      }
      return false;
    };

    /**
     * Check if filled out.
     *
     * @param {boolean}
     */
    this.filledOut = function () {
      var answered = this.getUserAnswer();
      // Blank can be correct and is interpreted as filled out.
      return (answered !== '' || correct(answered));
    };

    /**
     * Check the cloze and mark it as wrong or correct.
     */
    this.checkAnswer = function () {
      checkedAnswer = this.getUserAnswer();
      var isCorrect = correct(checkedAnswer);
      if (isCorrect) {
        $wrapper.addClass('h5p-correct');
        $input.attr('disabled', true)
          .attr('aria-label', inputLabel + '. ' + l10n.answeredCorrectly);
      }
      else {
        $wrapper.addClass('h5p-wrong');
        $input.attr('aria-label', inputLabel + '. ' + l10n.answeredIncorrectly);
      }
    };

    /**
     * Disables input.
     * @method disableInput
     */
    this.disableInput = function () {
      this.toggleInput(false);
    };

    /**
     * Enables input.
     * @method enableInput
     */
    this.enableInput = function () {
      this.toggleInput(true);
    };

    /**
     * Toggles input enable/disable
     * @method toggleInput
     * @param  {boolean}   enabled True if input should be enabled, otherwise false
     */
    this.toggleInput = function (enabled) {
      $input.attr('disabled', !enabled);
    };

    /**
     * Show the correct solution.
     */
    this.showSolution = function () {
      if (correct(this.getUserAnswer())) {
        return; // Only for the wrong ones
      }

      $('<span>', {
        'aria-hidden': true,
        'class': 'h5p-correct-answer',
        text: answer,
        insertAfter: $wrapper
      });
      $input.attr('disabled', true);
      var ariaLabel = inputLabel + '. ' +
        l10n.solutionLabel + ' ' + answer + '. ' +
        l10n.answeredIncorrectly;

      $input.attr('aria-label', ariaLabel);
    };

    /**
     * @returns {boolean}
     */
    this.correct = function () {
      return correct(this.getUserAnswer());
    };

    /**
     * Set input element.
     *
     * @param {H5P.jQuery} $element
     * @param {function} afterCheck
     * @param {function} afterFocus
     * @param {number} clozeIndex Index of cloze
     * @param {number} totalCloze Total amount of clozes in blanks
     */
    this.setInput = function ($element, afterCheck, afterFocus, clozeIndex, totalCloze) {
      $input = $element;
      $wrapper = $element.parent();
      inputLabel = inputLabel.replace('@num', (clozeIndex + 1))
        .replace('@total', totalCloze);

      // Add tip if tip is set
      if(tip !== undefined && tip.trim().length > 0) {
        $wrapper.addClass('has-tip')
          .append(H5P.JoubelUI.createTip(tip, {
            tipLabel: l10n.tipLabel
          }));
        inputLabel += '. ' + l10n.inputHasTipLabel;
      }

      $input.attr('aria-label', inputLabel);

      if (afterCheck !== undefined) {
        $input.blur(function () {
          if (self.filledOut()) {
            // Check answers
            if (!behaviour.enableRetry) {
              self.disableInput();
            }
            self.checkAnswer();
            afterCheck.apply(self);
          }
        });
      }
      $input.keyup(function () {
        if (checkedAnswer !== null && checkedAnswer !== self.getUserAnswer()) {
          // The Answer has changed since last check
          checkedAnswer = null;
          $wrapper.removeClass('h5p-wrong');
          $input.attr('aria-label', inputLabel);
          if (afterFocus !== undefined) {
            afterFocus();
          }
        }
      });
    };

    /**
     * @returns {string} Cloze html
     */
    this.toString = function () {
      var extra = defaultUserAnswer ? ' value="' + defaultUserAnswer + '"' : '';
      var result = '<span class="h5p-input-wrapper"><input type="text" class="h5p-text-input" autocomplete="off" autocapitalize="off" spellcheck="false"' + extra + '></span>';
      self.length = result.length;
      return result;
    };

    /**
     * @returns {string} Trimmed answer
     */
    this.getUserAnswer = function () {
      return H5P.trim($input.val());
    };

    /**
     * @param {string} text New input text
     */
    this.setUserInput = function (text) {
      $input.val(text);
    };

    /**
     * Resets aria label of input field
     */
    this.resetAriaLabel = function () {
      $input.attr('aria-label', inputLabel);
    };
  };

})(H5P.jQuery, H5P.Blanks);
;
/** @namespace H5P */
H5P.VideoVimeo = (function ($) {

  let numInstances = 0;

  /**
   * Vimeo video player for H5P.
   *
   * @class
   * @param {Array} sources Video files to use
   * @param {Object} options Settings for the player
   * @param {Object} l10n Localization strings
   */
  function VimeoPlayer(sources, options, l10n) {
    const self = this;

    let player;

    // Since all the methods of the Vimeo Player SDK are promise-based, we keep
    // track of all relevant state variables so that we can implement the
    // H5P.Video API where all methods return synchronously.
    let buffered = 0;
    let currentQuality;
    let currentTextTrack;
    let currentTime = 0;
    let duration = 0;
    let isMuted = 0;
    let volume = 0;
    let playbackRate = 1;
    let qualities = [];
    let loadingFailedTimeout;
    let failedLoading = false;
    let ratio = 9/16;

    const LOADING_TIMEOUT_IN_SECONDS = 8;

    const id = `h5p-vimeo-${++numInstances}`;
    const $wrapper = $('<div/>');
    const $placeholder = $('<div/>', {
      id: id,
      html: `<div class="h5p-video-loading" style="height: 100%; min-height: 200px; display: block; z-index: 100;" aria-label="${l10n.loading}"></div>`
    }).appendTo($wrapper);

    /**
     * Create a new player with the Vimeo Player SDK.
     *
     * @private
     */
    const createVimeoPlayer = async () => {
      if (!$placeholder.is(':visible') || player !== undefined) {
        return;
      }

      // Since the SDK is loaded asynchronously below, explicitly set player to
      // null (unlike undefined) which indicates that creation has begun. This
      // allows the guard statement above to be hit if this function is called
      // more than once.
      player = null;

      const Vimeo = await loadVimeoPlayerSDK();

      const MIN_WIDTH = 200;
      const width = Math.max($wrapper.width(), MIN_WIDTH);

      const embedOptions = {
        url: sources[0].path,
        controls: options.controls ? true : false,
        responsive: true,
        dnt: true,
        // Hardcoded autoplay to false to avoid playing videos on init
        autoplay: false,
        loop: options.loop ? true : false,
        playsinline: true,
        quality: 'auto',
        width: width
      };

      // Create a new player
      player = new Vimeo.Player(id, embedOptions);

      registerVimeoPlayerEventListeneners(player);

      // Failsafe timeout to handle failed loading of videos.
      // This seems to happen for private videos even though the SDK docs
      // suggests to catch PrivacyError when attempting play()
      loadingFailedTimeout = setTimeout(() => {
        failedLoading = true;
        removeLoadingIndicator();
        $wrapper.html(`<p class="vimeo-failed-loading">${l10n.vimeoLoadingError}</p>`);
        $wrapper.css({
          width: null,
          height: null
        });
        self.trigger('resize');
        self.trigger('error', l10n.vimeoLoadingError);
      }, LOADING_TIMEOUT_IN_SECONDS * 1000);
    }

    const removeLoadingIndicator = () => {
      $placeholder.find('div.h5p-video-loading').remove();
    };

    /**
     * Register event listeners on the given Vimeo player.
     *
     * @private
     * @param {Vimeo.Player} player
     */
    const registerVimeoPlayerEventListeneners = (player) => {
      player.on('loaded', async () => {

        clearTimeout(loadingFailedTimeout);

        const videoDetails = await getVimeoVideoMetadata(player);
        const { tracks } = videoDetails;
        currentTextTrack = tracks.current;
        duration = videoDetails.duration;
        qualities = videoDetails.qualities;
        currentQuality = 'auto';
        try {
          ratio = videoDetails.dimensions.height / videoDetails.dimensions.width;
        }
        catch (e) { /* Intentionally ignore this, and fallback on the default ratio */ }

        removeLoadingIndicator();

        if (options.startAt) {
          // Vimeo.Player doesn't have an option for setting start time upon
          // instantiation, so we instead perform an initial seek here.
          currentTime = await self.seek(options.startAt);
        }

        self.trigger('ready');
        self.trigger('loaded');
        self.trigger('captions', tracks.options);
        self.trigger('qualityChange', currentQuality);
        self.trigger('resize');
      });

      // Handle playback state changes.
      player.on('playing', () => self.trigger('stateChange', H5P.Video.PLAYING));
      player.on('pause', () => self.trigger('stateChange', H5P.Video.PAUSED));
      player.on('ended', () => self.trigger('stateChange', H5P.Video.ENDED));

      // Track the percentage of video that has finished loading (buffered).
      player.on('progress', (data) => {
        buffered = data.percent * 100;
      });

      // Track the current time. The update frequency may be browser-dependent,
      // according to the official docs:
      // https://developer.vimeo.com/player/sdk/reference#timeupdate
      player.on('timeupdate', (time) => {
        currentTime = time.seconds;
      });
    };

    /**
     * Get metadata about the video loaded in the given Vimeo player.
     *
     * Example resolved value:
     *
     * ```
     * {
     *   "duration": 39,
     *   "qualities": [
     *     {
     *       "name": "auto",
     *       "label": "Auto"
     *     },
     *     {
     *       "name": "1080p",
     *       "label": "1080p"
     *     },
     *     {
     *       "name": "720p",
     *       "label": "720p"
     *     }
     *   ],
     *   "dimensions": {
     *     "width": 1920,
     *     "height": 1080
     *   },
     *   "tracks": {
     *     "current": {
     *       "label": "English",
     *       "value": "en"
     *     },
     *     "options": [
     *       {
     *         "label": "English",
     *         "value": "en"
     *       },
     *       {
     *         "label": "Norsk bokmål",
     *         "value": "nb"
     *       }
     *     ]
     *   }
     * }
     * ```
     *
     * @private
     * @param {Vimeo.Player} player
     * @returns {Promise}
     */
    const getVimeoVideoMetadata = (player) => {
      // Create an object for easy lookup of relevant metadata
      const massageVideoMetadata = (data) => {
        const duration = data[0];
        const qualities = data[1].map(q => ({
          name: q.id,
          label: q.label
        }));
        const tracks = data[2].reduce((tracks, current) => {
          const h5pVideoTrack = new H5P.Video.LabelValue(current.label, current.language);
          tracks.options.push(h5pVideoTrack);
          if (current.mode === 'showing') {
            tracks.current = h5pVideoTrack;
          }
          return tracks;
        }, { current: undefined, options: [] });
        const dimensions = { width: data[3], height: data[4] };

        return {
          duration,
          qualities,
          tracks,
          dimensions
        };
      };

      return Promise.all([
        player.getDuration(),
        player.getQualities(),
        player.getTextTracks(),
        player.getVideoWidth(),
        player.getVideoHeight(),
      ]).then(data => massageVideoMetadata(data));
    }

    /**
     * Appends the video player to the DOM.
     *
     * @public
     * @param {jQuery} $container
     */
    self.appendTo = ($container) => {
      $container.addClass('h5p-vimeo').append($wrapper);
      createVimeoPlayer();
    };

    /**
     * Get list of available qualities.
     *
     * @public
     * @returns {Array}
     */
    self.getQualities = () => {
      return qualities;
    };

    /**
     * Get the current quality.
     *
     * @returns {String} Current quality identifier
     */
    self.getQuality = () => {
      return currentQuality;
    };

    /**
     * Set the playback quality.
     *
     * @public
     * @param {String} quality
     */
    self.setQuality = async (quality) => {
      currentQuality = await player.setQuality(quality);
      self.trigger('qualityChange', currentQuality);
    };

    /**
     * Start the video.
     *
     * @public
     */
    self.play = async () => {
      if (!player) {
        self.on('ready', self.play);
        return;
      }

      try {
        await player.play();
      }
      catch (error) {
        switch (error.name) {
          case 'PasswordError': // The video is password-protected
            self.trigger('error', l10n.vimeoPasswordError);
            break;

          case 'PrivacyError': // The video is private
            self.trigger('error', l10n.vimeoPrivacyError);
            break;

          default:
            self.trigger('error', l10n.unknownError);
            break;
        }
      }
    };

    /**
     * Pause the video.
     *
     * @public
     */
    self.pause = () => {
      if (player) {
        player.pause();
      }
    };

    /**
     * Seek video to given time.
     *
     * @public
     * @param {Number} time
     */
    self.seek = async (time) => {
      currentTime = await player.setCurrentTime(time);
    };

    /**
     * @public
     * @returns {Number} Seconds elapsed since beginning of video
     */
    self.getCurrentTime = () => {
      return currentTime;
    };

    /**
     * @public
     * @returns {Number} Video duration in seconds
     */
    self.getDuration = () => {
      return duration;
    };

    /**
     * Get percentage of video that is buffered.
     *
     * @public
     * @returns {Number} Between 0 and 100
     */
    self.getBuffered = () => {
      return buffered;
    };

    /**
     * Mute the video.
     *
     * @public
     */
    self.mute = async () => {
      isMuted = await player.setMuted(true);
    };

    /**
     * Unmute the video.
     *
     * @public
     */
    self.unMute = async () => {
      isMuted = await player.setMuted(false);
    };

    /**
     * Whether the video is muted.
     *
     * @public
     * @returns {Boolean} True if the video is muted, false otherwise
     */
    self.isMuted = () => {
      return isMuted;
    };

    /**
     * Get the video player's current sound volume.
     *
     * @public
     * @returns {Number} Between 0 and 100.
     */
    self.getVolume = () => {
      return volume;
    };

    /**
     * Set the video player's sound volume.
     *
     * @public
     * @param {Number} level
     */
    self.setVolume = async (level) => {
      volume = await player.setVolume(level);
    };

    /**
     * Get list of available playback rates.
     *
     * @public
     * @returns {Array} Available playback rates
     */
    self.getPlaybackRates = () => {
      return [0.5, 1, 1.5, 2];
    };

    /**
     * Get the current playback rate.
     *
     * @public
     * @returns {Number} e.g. 0.5, 1, 1.5 or 2
     */
    self.getPlaybackRate = () => {
      return playbackRate;
    };

    /**
     * Set the current playback rate.
     *
     * @public
     * @param {Number} rate Must be one of available rates from getPlaybackRates
     */
    self.setPlaybackRate = async (rate) => {
      playbackRate = await player.setPlaybackRate(rate);
      self.trigger('playbackRateChange', rate);
    };

    /**
     * Set current captions track.
     *
     * @public
     * @param {H5P.Video.LabelValue} track Captions to display
     */
    self.setCaptionsTrack = (track) => {
      if (!track) {
        return player.disableTextTrack().then(() => {
          currentTextTrack = null;
        });
      }

      player.enableTextTrack(track.value).then(() => {
        currentTextTrack = track;
      });
    };

    /**
     * Get current captions track.
     *
     * @public
     * @returns {H5P.Video.LabelValue}
     */
    self.getCaptionsTrack = () => {
      return currentTextTrack;
    };

    self.on('resize', () => {
      if (failedLoading || !$wrapper.is(':visible')) {
        return;
      }

      if (player === undefined) {
        // Player isn't created yet. Try again.
        createVimeoPlayer();
        return;
      }

      // Use as much space as possible
      $wrapper.css({
        width: '100%',
        height: 'auto'
      });

      const width = $wrapper[0].clientWidth;
      const height = options.fit ? $wrapper[0].clientHeight : (width * (ratio));

      // Validate height before setting
      if (height > 0) {
        // Set size
        $wrapper.css({
          width: width + 'px',
          height: height + 'px'
        });
      }
    });
  }

  /**
   * Check to see if we can play any of the given sources.
   *
   * @public
   * @static
   * @param {Array} sources
   * @returns {Boolean}
   */
  VimeoPlayer.canPlay = (sources) => {
    return getId(sources[0].path);
  };

  /**
   * Find id of Vimeo video from given URL.
   *
   * @private
   * @param {String} url
   * @returns {String} Vimeo video ID
   */
  const getId = (url) => {
    // https://stackoverflow.com/a/11660798
    const matches = url.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/);
    if (matches && matches[5]) {
      return matches[5];
    }
  };

  /**
   * Load the Vimeo Player SDK asynchronously.
   *
   * @private
   * @returns {Promise} Vimeo Player SDK object
   */
  const loadVimeoPlayerSDK = async () => {
    if (window.Vimeo) {
      return await Promise.resolve(window.Vimeo);
    }

    return await new Promise((resolve, reject) => {
      const tag = document.createElement('script');
      tag.src = 'https://player.vimeo.com/api/player.js';
      tag.onload = () => resolve(window.Vimeo);
      tag.onerror = reject;
      document.querySelector('script').before(tag);
    });
  };

  return VimeoPlayer;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoVimeo);
;
/** @namespace H5P */
H5P.VideoYouTube = (function ($) {

  /**
   * YouTube video player for H5P.
   *
   * @class
   * @param {Array} sources Video files to use
   * @param {Object} options Settings for the player
   * @param {Object} l10n Localization strings
   */
  function YouTube(sources, options, l10n) {
    var self = this;

    var player;
    var playbackRate = 1;
    var id = 'h5p-youtube-' + numInstances;
    numInstances++;

    var $wrapper = $('<div/>');
    var $placeholder = $('<div/>', {
      id: id,
      text: l10n.loading
    }).appendTo($wrapper);

    // Optional placeholder
    // var $placeholder = $('<iframe id="' + id + '" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/' + getId(sources[0].path) + '?enablejsapi=1&origin=' + encodeURIComponent(ORIGIN) + '&autoplay=' + (options.autoplay ? 1 : 0) + '&controls=' + (options.controls ? 1 : 0) + '&disabledkb=' + (options.controls ? 0 : 1) + '&fs=0&loop=' + (options.loop ? 1 : 0) + '&rel=0&showinfo=0&iv_load_policy=3" frameborder="0"></iframe>').appendTo($wrapper);

    /**
     * Use the YouTube API to create a new player
     *
     * @private
     */
    var create = function () {
      if (!$placeholder.is(':visible') || player !== undefined) {
        return;
      }

      if (window.YT === undefined) {
        // Load API first
        loadAPI(create);
        return;
      }
      if (YT.Player === undefined) {
        return;
      }

      var width = $wrapper.width();
      if (width < 200) {
        width = 200;
      }

      var loadCaptionsModule = true;

      var videoId = getId(sources[0].path);

      player = new YT.Player(id, {
        width: width,
        height: width * (9/16),
        videoId: videoId,
        playerVars: {
          origin: ORIGIN,
          // Hardcoded autoplay to false to avoid playing videos on init
          autoplay: 0,
          controls: options.controls ? 1 : 0,
          disablekb: options.controls ? 0 : 1,
          fs: 0,
          loop: options.loop ? 1 : 0,
          playlist: options.loop ? videoId : undefined,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          wmode: "opaque",
          start: options.startAt,
          playsinline: 1
        },
        events: {
          onReady: function () {
            self.trigger('ready');
            self.trigger('loaded');
          },
          onApiChange: function () {
            if (loadCaptionsModule) {
              loadCaptionsModule = false;

              // Always load captions
              player.loadModule('captions');
            }

            var trackList;
            try {
              // Grab tracklist from player
              trackList = player.getOption('captions', 'tracklist');
            }
            catch (err) {}
            if (trackList && trackList.length) {

              // Format track list into valid track options
              var trackOptions = [];
              for (var i = 0; i < trackList.length; i++) {
                trackOptions.push(new H5P.Video.LabelValue(trackList[i].displayName, trackList[i].languageCode));
              }

              // Captions are ready for loading
              self.trigger('captions', trackOptions);
            }
          },
          onStateChange: function (state) {
            if (state.data > -1 && state.data < 4) {

              // Fix for keeping playback rate in IE11
              if (H5P.Video.IE11_PLAYBACK_RATE_FIX && state.data === H5P.Video.PLAYING && playbackRate !== 1) {
                // YT doesn't know that IE11 changed the rate so it must be reset before it's set to the correct value
                player.setPlaybackRate(1);
                player.setPlaybackRate(playbackRate);
              }
              // End IE11 fix

              self.trigger('stateChange', state.data);
            }
          },
          onPlaybackQualityChange: function (quality) {
            self.trigger('qualityChange', quality.data);
          },
          onPlaybackRateChange: function (playbackRate) {
            self.trigger('playbackRateChange', playbackRate.data);
          },
          onError: function (error) {
            var message;
            switch (error.data) {
              case 2:
                message = l10n.invalidYtId;
                break;

              case 100:
                message = l10n.unknownYtId;
                break;

              case 101:
              case 150:
                message = l10n.restrictedYt;
                break;

              default:
                message = l10n.unknownError + ' ' + error.data;
                break;
            }
            self.trigger('error', message);
          }
        }
      });
    };

    /**
     * Indicates if the video must be clicked for it to start playing.
     * For instance YouTube videos on iPad must be pressed to start playing.
     *
     * @public
     */
    self.pressToPlay = navigator.userAgent.match(/iPad/i) ? true : false;

    /**
    * Appends the video player to the DOM.
    *
    * @public
    * @param {jQuery} $container
    */
    self.appendTo = function ($container) {
      $container.addClass('h5p-youtube').append($wrapper);
      create();
    };

    /**
     * Get list of available qualities. Not available until after play.
     *
     * @public
     * @returns {Array}
     */
    self.getQualities = function () {
      if (!player || !player.getAvailableQualityLevels) {
        return;
      }

      var qualities = player.getAvailableQualityLevels();
      if (!qualities.length) {
        return; // No qualities
      }

      // Add labels
      for (var i = 0; i < qualities.length; i++) {
        var quality = qualities[i];
        var label = (LABELS[quality] !== undefined ? LABELS[quality] : 'Unknown'); // TODO: l10n
        qualities[i] = {
          name: quality,
          label: LABELS[quality]
        };
      }

      return qualities;
    };

    /**
     * Get current playback quality. Not available until after play.
     *
     * @public
     * @returns {String}
     */
    self.getQuality = function () {
      if (!player || !player.getPlaybackQuality) {
        return;
      }

      var quality = player.getPlaybackQuality();
      return quality === 'unknown' ? undefined : quality;
    };

    /**
     * Set current playback quality. Not available until after play.
     * Listen to event "qualityChange" to check if successful.
     *
     * @public
     * @params {String} [quality]
     */
    self.setQuality = function (quality) {
      if (!player || !player.setPlaybackQuality) {
        return;
      }

      player.setPlaybackQuality(quality);
    };

    /**
     * Start the video.
     *
     * @public
     */
    self.play = function () {
      if (!player || !player.playVideo) {
        self.on('ready', self.play);
        return;
      }

      player.playVideo();
    };

    /**
     * Pause the video.
     *
     * @public
     */
    self.pause = function () {
      self.off('ready', self.play);
      if (!player || !player.pauseVideo) {
        return;
      }
      player.pauseVideo();
    };

    /**
     * Seek video to given time.
     *
     * @public
     * @param {Number} time
     */
    self.seek = function (time) {
      if (!player || !player.seekTo) {
        return;
      }

      player.seekTo(time, true);
    };

    /**
     * Get elapsed time since video beginning.
     *
     * @public
     * @returns {Number}
     */
    self.getCurrentTime = function () {
      if (!player || !player.getCurrentTime) {
        return;
      }

      return player.getCurrentTime();
    };

    /**
     * Get total video duration time.
     *
     * @public
     * @returns {Number}
     */
    self.getDuration = function () {
      if (!player || !player.getDuration) {
        return;
      }

      return player.getDuration();
    };

    /**
     * Get percentage of video that is buffered.
     *
     * @public
     * @returns {Number} Between 0 and 100
     */
    self.getBuffered = function () {
      if (!player || !player.getVideoLoadedFraction) {
        return;
      }

      return player.getVideoLoadedFraction() * 100;
    };

    /**
     * Turn off video sound.
     *
     * @public
     */
    self.mute = function () {
      if (!player || !player.mute) {
        return;
      }

      player.mute();
    };

    /**
     * Turn on video sound.
     *
     * @public
     */
    self.unMute = function () {
      if (!player || !player.unMute) {
        return;
      }

      player.unMute();
    };

    /**
     * Check if video sound is turned on or off.
     *
     * @public
     * @returns {Boolean}
     */
    self.isMuted = function () {
      if (!player || !player.isMuted) {
        return;
      }

      return player.isMuted();
    };

    /**
     * Return the video sound level.
     *
     * @public
     * @returns {Number} Between 0 and 100.
     */
    self.getVolume = function () {
      if (!player || !player.getVolume) {
        return;
      }

      return player.getVolume();
    };

    /**
     * Set video sound level.
     *
     * @public
     * @param {Number} level Between 0 and 100.
     */
    self.setVolume = function (level) {
      if (!player || !player.setVolume) {
        return;
      }

      player.setVolume(level);
    };

    /**
     * Get list of available playback rates.
     *
     * @public
     * @returns {Array} available playback rates
     */
    self.getPlaybackRates = function () {
      if (!player || !player.getAvailablePlaybackRates) {
        return;
      }

      var playbackRates = player.getAvailablePlaybackRates();
      if (!playbackRates.length) {
        return; // No rates, but the array should contain at least 1
      }

      return playbackRates;
    };

    /**
     * Get current playback rate.
     *
     * @public
     * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
     */
    self.getPlaybackRate = function () {
      if (!player || !player.getPlaybackRate) {
        return;
      }

      return player.getPlaybackRate();
    };

    /**
     * Set current playback rate.
     * Listen to event "playbackRateChange" to check if successful.
     *
     * @public
     * @params {Number} suggested rate that may be rounded to supported values
     */
    self.setPlaybackRate = function (newPlaybackRate) {
      if (!player || !player.setPlaybackRate) {
        return;
      }

      playbackRate = Number(newPlaybackRate);
      player.setPlaybackRate(playbackRate);
    };

    /**
     * Set current captions track.
     *
     * @param {H5P.Video.LabelValue} Captions track to show during playback
     */
    self.setCaptionsTrack = function (track) {
      player.setOption('captions', 'track', track ? {languageCode: track.value} : {});
    };

    /**
     * Figure out which captions track is currently used.
     *
     * @return {H5P.Video.LabelValue} Captions track
     */
    self.getCaptionsTrack = function () {
      var track = player.getOption('captions', 'track');
      return (track.languageCode ? new H5P.Video.LabelValue(track.displayName, track.languageCode) : null);
    };

    // Respond to resize events by setting the YT player size.
    self.on('resize', function () {
      if (!$wrapper.is(':visible')) {
        return;
      }

      if (!player) {
        // Player isn't created yet. Try again.
        create();
        return;
      }

      // Use as much space as possible
      $wrapper.css({
        width: '100%',
        height: '100%'
      });

      var width = $wrapper[0].clientWidth;
      var height = options.fit ? $wrapper[0].clientHeight : (width * (9/16));
      
      // Validate height before setting
      if (height > 0) {
        // Set size
        $wrapper.css({
          width: width + 'px',
          height: height + 'px'
        });

        player.setSize(width, height);
      }
    });
  }

  /**
   * Check to see if we can play any of the given sources.
   *
   * @public
   * @static
   * @param {Array} sources
   * @returns {Boolean}
   */
  YouTube.canPlay = function (sources) {
    return getId(sources[0].path);
  };

  /**
   * Find id of YouTube video from given URL.
   *
   * @private
   * @param {String} url
   * @returns {String} YouTube video identifier
   */

  var getId = function (url) {
    // Has some false positives, but should cover all regular URLs that people can find
    var matches = url.match(/(?:(?:youtube.com\/(?:attribution_link\?(?:\S+))?(?:v\/|embed\/|watch\/|(?:user\/(?:\S+)\/)?watch(?:\S+)v\=))|(?:youtu.be\/|y2u.be\/))([A-Za-z0-9_-]{11})/i);
    if (matches && matches[1]) {
      return matches[1];
    }
  };

  /**
   * Load the IFrame Player API asynchronously.
   */
  var loadAPI = function (loaded) {
    if (window.onYouTubeIframeAPIReady !== undefined) {
      // Someone else is loading, hook in
      var original = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function (id) {
        loaded(id);
        original(id);
      };
    }
    else {
      // Load the API our self
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loaded;
    }
  };

  /** @constant {Object} */
  var LABELS = {
    highres: '2160p', // Old API support
    hd2160: '2160p', // (New API)
    hd1440: '1440p',
    hd1080: '1080p',
    hd720: '720p',
    large: '480p',
    medium: '360p',
    small: '240p',
    tiny: '144p',
    auto: 'Auto'
  };

  /** @private */
  var numInstances = 0;

  // Extract the current origin (used for security)
  var ORIGIN = window.location.href.match(/http[s]?:\/\/[^\/]+/);
  ORIGIN = !ORIGIN || ORIGIN[0] === undefined ? undefined : ORIGIN[0];
  // ORIGIN = undefined is needed to support fetching file from device local storage

  return YouTube;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoYouTube);
;
/** @namespace H5P */
H5P.VideoPanopto = (function ($) {

  /**
   * Panopto video player for H5P.
   *
   * @class
   * @param {Array} sources Video files to use
   * @param {Object} options Settings for the player
   * @param {Object} l10n Localization strings
   */
  function Panopto(sources, options, l10n) {
    var self = this;

    self.volume = 100;

    var player;
    var playbackRate = 1;
    let canHasPlay;
    var id = 'h5p-panopto-' + numInstances;
    numInstances++;

    var $wrapper = $('<div/>');
    var $placeholder = $('<div/>', {
      id: id,
      html: '<div>' + l10n.loading + '</div>'
    }).appendTo($wrapper);

    /**
     * Use the Panopto API to create a new player
     *
     * @private
     */
    var create = function () {
      if (!$placeholder.is(':visible') || player !== undefined) {
        return;
      }

      if (window.EmbedApi === undefined) {
        // Load API first
        loadAPI(create);
        return;
      }

      var width = $wrapper.width();
      if (width < 200) {
        width = 200;
      }

      const videoId = getId(sources[0].path);
      player = new EmbedApi(id, {
        width: width,
        height: width * (9/16),
        serverName: videoId[0],
        sessionId: videoId[1],
        videoParams: { // Optional
          interactivity: 'none',
          showtitle: false,
          autohide: true,
          offerviewer: false,
          autoplay: false,
          showbrand: false,
          start: 0,
          hideoverlay: !options.controls,
        },
        events: {
          onIframeReady: function () {
            $placeholder.children(0).text('');
            player.loadVideo();
            self.trigger('containerLoaded');
            self.trigger('resize'); // Avoid black iframe if loading is slow
          },
          onReady: function () {
            self.trigger('loaded');
            if (player.hasCaptions()) {
              const captions = [];

              const captionTracks = player.getCaptionTracks();
              for (trackIndex in captionTracks) {
                captions.push(new H5P.Video.LabelValue(captionTracks[trackIndex], trackIndex));
              }

              // Select active track
              currentTrack = player.getSelectedCaptionTrack();
              currentTrack = captions[currentTrack] ? captions[currentTrack] : null;

              self.trigger('captions', captions);
            }

            if (!canHasPlay) {
              self.pause(); // Only autoplay if play() has been called before load
            }
          },
          onStateChange: function (state) {
            // TODO: Playback rate fix for IE11?
            if (state > -1 && state < 4) {
              self.trigger('stateChange', state);
            }
          },
          onPlaybackRateChange: function () {
            self.trigger('playbackRateChange', self.getPlaybackRate());
          },
          onError: function (error) {
            if (error === ApiError.PlayWithSoundNotAllowed) {
              setTimeout(function () {
                self.unMute();
              }, 10);
            }
            else {
              self.trigger('error', l10n.unknownError);
            }
          },
          onLoginShown: function () {
            $placeholder.children().first().remove(); // Remove loading message
            self.trigger('loaded'); // Resize parent
          }
        }
      });
    };

    /**
     * Indicates if the video must be clicked for it to start playing.
     * This is always true for Panopto since all videos auto play.
     *
     * @public
     */
    self.pressToPlay = true;

    /**
    * Appends the video player to the DOM.
    *
    * @public
    * @param {jQuery} $container
    */
    self.appendTo = function ($container) {
      $container.addClass('h5p-panopto').append($wrapper);
      create();
    };

    /**
     * Get list of available qualities. Not available until after play.
     *
     * @public
     * @returns {Array}
     */
    self.getQualities = function () {
      // Not available for Panopto
    };

    /**
     * Get current playback quality. Not available until after play.
     *
     * @public
     * @returns {String}
     */
    self.getQuality = function () {
      // Not available for Panopto
    };

    /**
     * Set current playback quality. Not available until after play.
     * Listen to event "qualityChange" to check if successful.
     *
     * @public
     * @params {String} [quality]
     */
    self.setQuality = function (quality) {
      // Not available for Panopto
    };

    /**
     * Start the video.
     *
     * @public
     */
    self.play = function () {
      canHasPlay = true;
      if (!player || !player.playVideo) {
        return;
      }
      player.playVideo();
    };

    /**
     * Pause the video.
     *
     * @public
     */
    self.pause = function () {
      canHasPlay = false;
      if (!player || !player.pauseVideo) {
        return;
      }
      try {
        player.pauseVideo();
      }
      catch (err) {
        // Swallow Panopto throwing an error. This has been seen in the authoring
        // tool if Panopto has been used inside Iv inside CP
      }
    };

    /**
     * Seek video to given time.
     *
     * @public
     * @param {Number} time
     */
    self.seek = function (time) {
      if (!player || !player.seekTo) {
        return;
      }

      player.seekTo(time);
    };

    /**
     * Get elapsed time since video beginning.
     *
     * @public
     * @returns {Number}
     */
    self.getCurrentTime = function () {
      if (!player || !player.getCurrentTime) {
        return;
      }

      return player.getCurrentTime();
    };

    /**
     * Get total video duration time.
     *
     * @public
     * @returns {Number}
     */
    self.getDuration = function () {
      if (!player || !player.getDuration) {
        return;
      }

      return player.getDuration();
    };

    /**
     * Get percentage of video that is buffered.
     *
     * @public
     * @returns {Number} Between 0 and 100
     */
    self.getBuffered = function () {
      // Not available for Panopto
    };

    /**
     * Turn off video sound.
     *
     * @public
     */
    self.mute = function () {
      if (!player || !player.muteVideo) {
        return;
      }

      player.muteVideo();
    };

    /**
     * Turn on video sound.
     *
     * @public
     */
    self.unMute = function () {
      if (!player || !player.unmuteVideo) {
        return;
      }

      player.unmuteVideo();

      // The volume is set to 0 when the browser prevents autoplay, 
      // causing there to be no sound despite unmuting
      self.setVolume(self.volume);
    };

    /**
     * Check if video sound is turned on or off.
     *
     * @public
     * @returns {Boolean}
     */
    self.isMuted = function () {
      if (!player || !player.isMuted) {
        return;
      }

      return player.isMuted();
    };

    /**
     * Return the video sound level.
     *
     * @public
     * @returns {Number} Between 0 and 100.
     */
    self.getVolume = function () {
      if (!player || !player.getVolume) {
        return;
      }

      return player.getVolume() * 100;
    };

    /**
     * Set video sound level.
     *
     * @public
     * @param {Number} level Between 0 and 100.
     */
    self.setVolume = function (level) {
      if (!player || !player.setVolume) {
        return;
      }

      player.setVolume(level/100);
      self.volume = level;
    };

    /**
     * Get list of available playback rates.
     *
     * @public
     * @returns {Array} available playback rates
     */
    self.getPlaybackRates = function () {
      return [0.25, 0.5, 1, 1.25, 1.5, 2];
    };

    /**
     * Get current playback rate.
     *
     * @public
     * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
     */
    self.getPlaybackRate = function () {
      if (!player || !player.getPlaybackRate) {
        return;
      }

      return player.getPlaybackRate();
    };

    /**
     * Set current playback rate.
     * Listen to event "playbackRateChange" to check if successful.
     *
     * @public
     * @params {Number} suggested rate that may be rounded to supported values
     */
    self.setPlaybackRate = function (newPlaybackRate) {
      if (!player || !player.setPlaybackRate) {
        return;
      }

      player.setPlaybackRate(newPlaybackRate);
    };

    /**
     * Set current captions track.
     *
     * @param {H5P.Video.LabelValue} Captions track to show during playback
     */
    self.setCaptionsTrack = function (track) {
      if (!track) {
        player.disableCaptions();
        currentTrack = null;
      }
      else {
        player.enableCaptions(track.value + '');
        currentTrack = track;
      }
    };

    /**
     * Figure out which captions track is currently used.
     *
     * @return {H5P.Video.LabelValue} Captions track
     */
    self.getCaptionsTrack = function () {
      return currentTrack; // No function for getting active caption track?
    };

    // Respond to resize events by setting the player size.
    self.on('resize', function () {
      if (!$wrapper.is(':visible')) {
        return;
      }

      if (!player) {
        // Player isn't created yet. Try again.
        create();
        return;
      }

      // Use as much space as possible
      $wrapper.css({
        width: '100%',
        height: '100%'
      });

      var width = $wrapper[0].clientWidth;
      var height = options.fit ? $wrapper[0].clientHeight : (width * (9/16));

      // Set size
      $wrapper.css({
        width: width + 'px',
        height: height + 'px'
      });

      const $iframe = $placeholder.children('iframe');
      if ($iframe.length) {
        $iframe.attr('width', width);
        $iframe.attr('height', height);
      }
    });

    let currentTrack;
  }

  /**
   * Check to see if we can play any of the given sources.
   *
   * @public
   * @static
   * @param {Array} sources
   * @returns {Boolean}
   */
  Panopto.canPlay = function (sources) {
    return getId(sources[0].path);
  };

  /**
   * Find id of YouTube video from given URL.
   *
   * @private
   * @param {String} url
   * @returns {String} Panopto video identifier
   */
  var getId = function (url) {
    const matches = url.match(/^[^\/]+:\/\/([^\/]*panopto\.[^\/]+)\/Panopto\/.+\?id=(.+)$/);
    if (matches && matches.length === 3) {
      return [matches[1], matches[2]];
    }
  };

  /**
   * Load the IFrame Player API asynchronously.
   */
  var loadAPI = function (loaded) {
    if (window.onPanoptoEmbedApiReady !== undefined) {
      // Someone else is loading, hook in
      var original = window.onPanoptoEmbedApiReady;
      window.onPanoptoEmbedApiReady = function (id) {
        loaded(id);
        original(id);
      };
    }
    else {
      // Load the API our self
      var tag = document.createElement('script');
      tag.src = 'https://developers.panopto.com/scripts/embedapi.min.js';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onPanoptoEmbedApiReady = loaded;
    }
  };

  /** @private */
  var numInstances = 0;

  return Panopto;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoPanopto);
;
/** @namespace H5P */
H5P.VideoHtml5 = (function ($) {

  /**
   * HTML5 video player for H5P.
   *
   * @class
   * @param {Array} sources Video files to use
   * @param {Object} options Settings for the player
   * @param {Object} l10n Localization strings
   */
  function Html5(sources, options, l10n) {
    var self = this;

    /**
     * Small helper to ensure all video sources get the same cache buster.
     *
     * @private
     * @param {Object} source
     * @return {string}
     */
    const getCrossOriginPath = function (source) {
      let path = H5P.getPath(source.path, self.contentId);
      if (video.crossOrigin !== null && H5P.addQueryParameter && H5PIntegration.crossoriginCacheBuster) {
        path = H5P.addQueryParameter(path, H5PIntegration.crossoriginCacheBuster);
      }
      return path
    };


    /**
     * Register track to video
     *
     * @param {Object} trackData Track object
     * @param {string} trackData.kind Kind of track
     * @param {Object} trackData.track Source path
     * @param {string} [trackData.label] Label of track
     * @param {string} [trackData.srcLang] Language code
     */
    const addTrack = function (trackData) {
      // Skip invalid tracks
      if (!trackData.kind || !trackData.track.path) {
        return;
      }

      var track = document.createElement('track');
      track.kind = trackData.kind;
      track.src = getCrossOriginPath(trackData.track); // Uses same crossOrigin as parent. You cannot mix.
      if (trackData.label) {
        track.label = trackData.label;
      }

      if (trackData.srcLang) {
        track.srcLang = trackData.srcLang;
      }

      return track;
    };

    /**
     * Small helper to set the inital video source.
     * Useful if some of the loading happens asynchronously.
     * NOTE: Setting the crossOrigin must happen before any of the
     * sources(poster, tracks etc.) are loaded
     *
     * @private
     */
    const setInitialSource = function () {
      if (qualities[currentQuality] === undefined) {
        return;
      }

      if (H5P.setSource !== undefined) {
        H5P.setSource(video, qualities[currentQuality].source, self.contentId)
      }
      else {
        // Backwards compatibility (H5P < v1.22)
        const srcPath = H5P.getPath(qualities[currentQuality].source.path, self.contentId);
        if (H5P.getCrossOrigin !== undefined) {
          var crossOrigin = H5P.getCrossOrigin(srcPath);
          video.setAttribute('crossorigin', crossOrigin !== null ? crossOrigin : 'anonymous');
        }
        video.src = srcPath;
      }

      // Add poster if provided
      if (options.poster) {
        video.poster = getCrossOriginPath(options.poster); // Uses same crossOrigin as parent. You cannot mix.
      }

      // Register tracks
      options.tracks.forEach(function (track, i) {
        var trackElement = addTrack(track);
        if (i === 0) {
          trackElement.default = true;
        }
        if (trackElement) {
          video.appendChild(trackElement);
        }
      });
    };

    /**
     * Displayed when the video is buffering
     * @private
     */
    var $throbber = $('<div/>', {
      'class': 'h5p-video-loading'
    });

    /**
     * Used to display error messages
     * @private
     */
    var $error = $('<div/>', {
      'class': 'h5p-video-error'
    });

    /**
     * Keep track of current state when changing quality.
     * @private
     */
    var stateBeforeChangingQuality;
    var currentTimeBeforeChangingQuality;

    /**
     * Avoids firing the same event twice.
     * @private
     */
    var lastState;

    /**
     * Keeps track whether or not the video has been loaded.
     * @private
     */
    var isLoaded = false;

    /**
     *
     * @private
     */
    var playbackRate = 1;
    var skipRateChange = false;

    // Create player
    var video = document.createElement('video');

    // Sort sources into qualities
    var qualities = getQualities(sources, video);
    var currentQuality;

    numQualities = 0;
    for (let quality in qualities) {
      numQualities++;
    }

    if (numQualities > 1 && H5P.VideoHtml5.getExternalQuality !== undefined) {
      H5P.VideoHtml5.getExternalQuality(sources, function (chosenQuality) {
        if (qualities[chosenQuality] !== undefined) {
          currentQuality = chosenQuality;
        }
        setInitialSource();
      });
    }
    else {
      // Select quality and source
      currentQuality = getPreferredQuality();
      if (currentQuality === undefined || qualities[currentQuality] === undefined) {
        // No preferred quality, pick the first.
        for (currentQuality in qualities) {
          if (qualities.hasOwnProperty(currentQuality)) {
            break;
          }
        }
      }
      setInitialSource();
    }

    // Setting webkit-playsinline, which makes iOS 10 beeing able to play video
    // inside browser.
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');

    // Remove buttons in Chrome's video player:
    let controlsList = 'nodownload';
    if (options.disableFullscreen) {
      controlsList += ' nofullscreen';
    }
    if (options.disableRemotePlayback) {
      controlsList += ' noremoteplayback';
    }
    video.setAttribute('controlsList', controlsList);

    // Remove picture in picture as it interfers with other video players
    video.disablePictureInPicture = true;

    // Set options
    video.disableRemotePlayback = (options.disableRemotePlayback ? true : false);
    video.controls = (options.controls ? true : false);
    // Hardcoded autoplay to false to avoid playing videos on init
    video.autoplay = false;
    video.loop = (options.loop ? true : false);
    video.className = 'h5p-video';
    video.style.display = 'block';

    if (options.fit) {
      // Style is used since attributes with relative sizes aren't supported by IE9.
      video.style.width = '100%';
      video.style.height = '100%';
    }

    /**
     * Helps registering events.
     *
     * @private
     * @param {String} native Event name
     * @param {String} h5p Event name
     * @param {String} [arg] Optional argument
     */
    var mapEvent = function (native, h5p, arg) {
      video.addEventListener(native, function () {
        switch (h5p) {
          case 'stateChange':
            if (lastState === arg) {
              return; // Avoid firing event twice.
            }

            var validStartTime = options.startAt && options.startAt > 0;
            if (arg === H5P.Video.PLAYING && validStartTime) {
              video.currentTime = options.startAt;
              delete options.startAt;
            }

            break;

          case 'loaded':
            isLoaded = true;

            if (stateBeforeChangingQuality !== undefined) {
              return; // Avoid loaded event when changing quality.
            }

            // Remove any errors
            if ($error.is(':visible')) {
              $error.remove();
            }

            if (OLD_ANDROID_FIX) {
              var andLoaded = function () {
                video.removeEventListener('durationchange', andLoaded, false);
                // On Android seeking isn't ready until after play.
                self.trigger(h5p);
              };
              video.addEventListener('durationchange', andLoaded, false);
              return;
            }
            break;

          case 'error':
            // Handle error and get message.
            arg = error(arguments[0], arguments[1]);
            break;

          case 'playbackRateChange':

            // Fix for keeping playback rate in IE11
            if (skipRateChange) {
              skipRateChange = false;
              return; // Avoid firing event when changing back
            }
            if (H5P.Video.IE11_PLAYBACK_RATE_FIX && playbackRate != video.playbackRate) { // Intentional
              // Prevent change in playback rate not triggered by the user
              video.playbackRate = playbackRate;
              skipRateChange = true;
              return;
            }
            // End IE11 fix

            arg = self.getPlaybackRate();
            break;
        }
        self.trigger(h5p, arg);
      }, false);
    };

    /**
     * Handle errors from the video player.
     *
     * @private
     * @param {Object} code Error
     * @param {String} [message]
     * @returns {String} Human readable error message.
     */
    var error = function (code, message) {
      if (code instanceof Event) {

        // No error code
        if (!code.target.error) {
          return '';
        }

        switch (code.target.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            message = l10n.aborted;
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            message = l10n.networkFailure;
            break;
          case MediaError.MEDIA_ERR_DECODE:
            message = l10n.cannotDecode;
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message = l10n.formatNotSupported;
            break;
          case MediaError.MEDIA_ERR_ENCRYPTED:
            message = l10n.mediaEncrypted;
            break;
        }
      }
      if (!message) {
        message = l10n.unknownError;
      }

      // Hide throbber
      $throbber.remove();

      // Display error message to user
      $error.text(message).insertAfter(video);

      // Pass message to our error event
      return message;
    };

    /**
     * Appends the video player to the DOM.
     *
     * @public
     * @param {jQuery} $container
     */
    self.appendTo = function ($container) {
      $container.append(video);
    };

    /**
     * Get list of available qualities. Not available until after play.
     *
     * @public
     * @returns {Array}
     */
    self.getQualities = function () {
      // Create reverse list
      var options = [];
      for (var q in qualities) {
        if (qualities.hasOwnProperty(q)) {
          options.splice(0, 0, {
            name: q,
            label: qualities[q].label
          });
        }
      }

      if (options.length < 2) {
        // Do not return if only one quality.
        return;
      }

      return options;
    };

    /**
     * Get current playback quality. Not available until after play.
     *
     * @public
     * @returns {String}
     */
    self.getQuality = function () {
      return currentQuality;
    };

    /**
     * Set current playback quality. Not available until after play.
     * Listen to event "qualityChange" to check if successful.
     *
     * @public
     * @params {String} [quality]
     */
    self.setQuality = function (quality) {
      if (qualities[quality] === undefined || quality === currentQuality) {
        return; // Invalid quality
      }

      // Keep track of last choice
      setPreferredQuality(quality);

      // Avoid multiple loaded events if changing quality multiple times.
      if (!stateBeforeChangingQuality) {
        // Keep track of last state
        stateBeforeChangingQuality = lastState;

        // Keep track of current time
        currentTimeBeforeChangingQuality = video.currentTime;

        // Seek and start video again after loading.
        var loaded = function () {
          video.removeEventListener('loadedmetadata', loaded, false);
          if (OLD_ANDROID_FIX) {
            var andLoaded = function () {
              video.removeEventListener('durationchange', andLoaded, false);
              // On Android seeking isn't ready until after play.
              self.seek(currentTimeBeforeChangingQuality);
            };
            video.addEventListener('durationchange', andLoaded, false);
          }
          else {
            // Seek to current time.
            self.seek(currentTimeBeforeChangingQuality);
          }

          // Always play to get image.
          video.play();

          if (stateBeforeChangingQuality !== H5P.Video.PLAYING) {
            // Do not resume playing
            video.pause();
          }

          // Done changing quality
          stateBeforeChangingQuality = undefined;

          // Remove any errors
          if ($error.is(':visible')) {
            $error.remove();
          }
        };
        video.addEventListener('loadedmetadata', loaded, false);
      }

      // Keep track of current quality
      currentQuality = quality;
      self.trigger('qualityChange', currentQuality);

      // Display throbber
      self.trigger('stateChange', H5P.Video.BUFFERING);

      // Change source
      video.src = getCrossOriginPath(qualities[quality].source); // (iPad does not support #t=).
      // Note: Optional tracks use same crossOrigin as the original. You cannot mix.

      // Remove poster so it will not show during quality change
      video.removeAttribute('poster');
    };

    /**
     * Starts the video.
     *
     * @public
     * @return {Promise|undefined} May return a Promise that resolves when
     * play has been processed.
     */
    self.play = function () {
      if ($error.is(':visible')) {
        return;
      }

      if (!isLoaded) {
        // Make sure video is loaded before playing
        video.load();
      }

      return video.play();
    };

    /**
     * Pauses the video.
     *
     * @public
     */
    self.pause = function () {
      video.pause();
    };

    /**
     * Seek video to given time.
     *
     * @public
     * @param {Number} time
     */
    self.seek = function (time) {
      if (lastState === undefined) {
        // Make sure we always play before we seek to get an image.
        // If not iOS devices will reset currentTime when pressing play.
        video.play();
        video.pause();
      }

      video.currentTime = time;
    };

    /**
     * Get elapsed time since video beginning.
     *
     * @public
     * @returns {Number}
     */
    self.getCurrentTime = function () {
      return video.currentTime;
    };

    /**
     * Get total video duration time.
     *
     * @public
     * @returns {Number}
     */
    self.getDuration = function () {
      if (isNaN(video.duration)) {
        return;
      }

      return video.duration;
    };

    /**
     * Get percentage of video that is buffered.
     *
     * @public
     * @returns {Number} Between 0 and 100
     */
    self.getBuffered = function () {
      // Find buffer currently playing from
      var buffered = 0;
      for (var i = 0; i < video.buffered.length; i++) {
        var from = video.buffered.start(i);
        var to = video.buffered.end(i);

        if (video.currentTime > from && video.currentTime < to) {
          buffered = to;
          break;
        }
      }

      // To percentage
      return buffered ? (buffered / video.duration) * 100 : 0;
    };

    /**
     * Turn off video sound.
     *
     * @public
     */
    self.mute = function () {
      video.muted = true;
    };

    /**
     * Turn on video sound.
     *
     * @public
     */
    self.unMute = function () {
      video.muted = false;
    };

    /**
     * Check if video sound is turned on or off.
     *
     * @public
     * @returns {Boolean}
     */
    self.isMuted = function () {
      return video.muted;
    };

    /**
     * Returns the video sound level.
     *
     * @public
     * @returns {Number} Between 0 and 100.
     */
    self.getVolume = function () {
      return video.volume * 100;
    };

    /**
     * Set video sound level.
     *
     * @public
     * @param {Number} level Between 0 and 100.
     */
    self.setVolume = function (level) {
      video.volume = level / 100;
    };

    /**
     * Get list of available playback rates.
     *
     * @public
     * @returns {Array} available playback rates
     */
    self.getPlaybackRates = function () {
      /*
       * not sure if there's a common rule about determining good speeds
       * using Google's standard options via a constant for setting
       */
      var playbackRates = PLAYBACK_RATES;

      return playbackRates;
    };

    /**
     * Get current playback rate.
     *
     * @public
     * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
     */
    self.getPlaybackRate = function () {
      return video.playbackRate;
    };

    /**
     * Set current playback rate.
     * Listen to event "playbackRateChange" to check if successful.
     *
     * @public
     * @params {Number} suggested rate that may be rounded to supported values
     */
    self.setPlaybackRate = function (newPlaybackRate) {
      playbackRate = newPlaybackRate;
      video.playbackRate = newPlaybackRate;
    };

    /**
     * Set current captions track.
     *
     * @param {H5P.Video.LabelValue} Captions track to show during playback
     */
    self.setCaptionsTrack = function (track) {
      for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = (track && track.value === i ? 'showing' : 'disabled');
      }
    };

    /**
     * Figure out which captions track is currently used.
     *
     * @return {H5P.Video.LabelValue} Captions track
     */
    self.getCaptionsTrack = function () {
      for (var i = 0; i < video.textTracks.length; i++) {
        if (video.textTracks[i].mode === 'showing') {
          return new H5P.Video.LabelValue(video.textTracks[i].label, i);
        }
      }

      return null;
    };

    // Register event listeners
    mapEvent('ended', 'stateChange', H5P.Video.ENDED);
    mapEvent('playing', 'stateChange', H5P.Video.PLAYING);
    mapEvent('pause', 'stateChange', H5P.Video.PAUSED);
    mapEvent('waiting', 'stateChange', H5P.Video.BUFFERING);
    mapEvent('loadedmetadata', 'loaded');
    mapEvent('canplay', 'canplay');
    mapEvent('error', 'error');
    mapEvent('ratechange', 'playbackRateChange');

    if (!video.controls) {
      // Disable context menu(right click) to prevent controls.
      video.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      }, false);
    }

    // Display throbber when buffering/loading video.
    self.on('stateChange', function (event) {
      var state = event.data;
      lastState = state;
      if (state === H5P.Video.BUFFERING) {
        $throbber.insertAfter(video);
      }
      else {
        $throbber.remove();
      }
    });

    // Load captions after the video is loaded
    self.on('loaded', function () {
      nextTick(function () {
        var textTracks = [];
        for (var i = 0; i < video.textTracks.length; i++) {
          textTracks.push(new H5P.Video.LabelValue(video.textTracks[i].label, i));
        }
        if (textTracks.length) {
          self.trigger('captions', textTracks);
        }
      });
    });

    // Alternative to 'canplay' event
    /*self.on('resize', function () {
      if (video.offsetParent === null) {
        return;
      }

      video.style.width = '100%';
      video.style.height = '100%';

      var width = video.clientWidth;
      var height = options.fit ? video.clientHeight : (width * (video.videoHeight / video.videoWidth));

      video.style.width = width + 'px';
      video.style.height = height + 'px';
    });*/

    // Video controls are ready
    nextTick(function () {
      self.trigger('ready');
    });
  }

  /**
   * Check to see if we can play any of the given sources.
   *
   * @public
   * @static
   * @param {Array} sources
   * @returns {Boolean}
   */
  Html5.canPlay = function (sources) {
    var video = document.createElement('video');
    if (video.canPlayType === undefined) {
      return false; // Not supported
    }

    // Cycle through sources
    for (var i = 0; i < sources.length; i++) {
      var type = getType(sources[i]);
      if (type && video.canPlayType(type) !== '') {
        // We should be able to play this
        return true;
      }
    }

    return false;
  };

  /**
   * Find source type.
   *
   * @private
   * @param {Object} source
   * @returns {String}
   */
  var getType = function (source) {
    var type = source.mime;
    if (!type) {
      // Try to get type from URL
      var matches = source.path.match(/\.(\w+)$/);
      if (matches && matches[1]) {
        type = 'video/' + matches[1];
      }
    }

    if (type && source.codecs) {
      // Add codecs
      type += '; codecs="' + source.codecs + '"';
    }

    return type;
  };

  /**
   * Sort sources into qualities.
   *
   * @private
   * @static
   * @param {Array} sources
   * @param {Object} video
   * @returns {Object} Quality mapping
   */
  var getQualities = function (sources, video) {
    var qualities = {};
    var qualityIndex = 1;
    var lastQuality;

    // Cycle through sources
    for (var i = 0; i < sources.length; i++) {
      var source = sources[i];

      // Find and update type.
      var type = source.type = getType(source);

      // Check if we support this type
      var isPlayable = type && (type === 'video/unknown' || video.canPlayType(type) !== '');
      if (!isPlayable) {
        continue; // We cannot play this source
      }

      if (source.quality === undefined) {
        /**
         * No quality metadata. Create a quality tag to separate multiple sources of the same type,
         * e.g. if two mp4 files with different quality has been uploaded
         */

        if (lastQuality === undefined || qualities[lastQuality].source.type === type) {
          // Create a new quality tag
          source.quality = {
            name: 'q' + qualityIndex,
            label: (source.metadata && source.metadata.qualityName) ? source.metadata.qualityName : 'Quality ' + qualityIndex // TODO: l10n
          };
          qualityIndex++;
        }
        else {
          /**
           * Assumes quality already exists in a different format.
           * Uses existing label for this quality.
           */
          source.quality = qualities[lastQuality].source.quality;
        }
      }

      // Log last quality
      lastQuality = source.quality.name;

      // Look to see if quality exists
      var quality = qualities[lastQuality];
      if (quality) {
        // We have a source with this quality. Check if we have a better format.
        if (source.mime.split('/')[1] === PREFERRED_FORMAT) {
          quality.source = source;
        }
      }
      else {
        // Add new source with quality.
        qualities[source.quality.name] = {
          label: source.quality.label,
          source: source
        };
      }
    }

    return qualities;
  };

  /**
   * Set preferred video quality.
   *
   * @private
   * @static
   * @param {String} quality Index of preferred quality
   */
  var setPreferredQuality = function (quality) {
    try {
      localStorage.setItem('h5pVideoQuality', quality);
    }
    catch (err) {
      console.warn('Unable to set preferred video quality, localStorage is not available.');
    }
  };

  /**
   * Get preferred video quality.
   *
   * @private
   * @static
   * @returns {String} Index of preferred quality
   */
  var getPreferredQuality = function () {
    // First check localStorage
    let quality;
    try {
      quality = localStorage.getItem('h5pVideoQuality');
    }
    catch (err) {
      console.warn('Unable to retrieve preferred video quality from localStorage.');
    }
    if (!quality) {
      try {
        // The fallback to old cookie solution
        var settings = document.cookie.split(';');
        for (var i = 0; i < settings.length; i++) {
          var setting = settings[i].split('=');
          if (setting[0] === 'H5PVideoQuality') {
            quality = setting[1];
            break;
          }
        }
      }
      catch (err) {
        console.warn('Unable to retrieve preferred video quality from cookie.');
      }
    }
    return quality;
  };

  /**
   * Helps schedule a task for the next tick.
   * @param {function} task
   */
  var nextTick = function (task) {
    setTimeout(task, 0);
  };

  /** @constant {Boolean} */
  var OLD_ANDROID_FIX = false;

  /** @constant {Boolean} */
  var PREFERRED_FORMAT = 'mp4';

  /** @constant {Object} */
  var PLAYBACK_RATES = [0.25, 0.5, 1, 1.25, 1.5, 2];

  if (navigator.userAgent.indexOf('Android') !== -1) {
    // We have Android, check version.
    var version = navigator.userAgent.match(/AppleWebKit\/(\d+\.?\d*)/);
    if (version && version[1] && Number(version[1]) <= 534.30) {
      // Include fix for devices running the native Android browser.
      // (We don't know when video was fixed, so the number is just the lastest
      // native android browser we found.)
      OLD_ANDROID_FIX = true;
    }
  }
  else {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      // If we're using chrome on a device that isn't Android, prefer the webm
      // format. This is because Chrome has trouble with some mp4 codecs.
      PREFERRED_FORMAT = 'webm';
    }
  }

  return Html5;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoHtml5);
;
/** @namespace H5P */
H5P.Video = (function ($, ContentCopyrights, MediaCopyright, handlers) {

  /**
   * The ultimate H5P video player!
   *
   * @class
   * @param {Object} parameters Options for this library.
   * @param {Object} parameters.visuals Visual options
   * @param {Object} parameters.playback Playback options
   * @param {Object} parameters.a11y Accessibility options
   * @param {Boolean} [parameters.startAt] Start time of video
   * @param {Number} id Content identifier
   */
  function Video(parameters, id) {
    var self = this;
    self.contentId = id;

    // Ref youtube.js - ipad & youtube - issue
    self.pressToPlay = false;

    // Reference to the handler
    var handlerName = '';

    // Initialize event inheritance
    H5P.EventDispatcher.call(self);

    // Default language localization
    parameters = $.extend(true, parameters, {
      l10n: {
        name: 'Video',
        loading: 'Video player loading...',
        noPlayers: 'Found no video players that supports the given video format.',
        noSources: 'Video source is missing.',
        aborted: 'Media playback has been aborted.',
        networkFailure: 'Network failure.',
        cannotDecode: 'Unable to decode media.',
        formatNotSupported: 'Video format not supported.',
        mediaEncrypted: 'Media encrypted.',
        unknownError: 'Unknown error.',
        vimeoPasswordError: 'Password-protected Vimeo videos are not supported.',
        vimeoPrivacyError: 'The Vimeo video cannot be used due to its privacy settings.',
        vimeoLoadingError: 'The Vimeo video could not be loaded.',
        invalidYtId: 'Invalid YouTube ID.',
        unknownYtId: 'Unable to find video with the given YouTube ID.',
        restrictedYt: 'The owner of this video does not allow it to be embedded.'
      }
    });

    parameters.a11y = parameters.a11y || [];
    parameters.playback = parameters.playback || {};
    parameters.visuals = $.extend(true, parameters.visuals, {
      disableFullscreen: false
    });

    /** @private */
    var sources = [];
    if (parameters.sources) {
      for (var i = 0; i < parameters.sources.length; i++) {
        // Clone to avoid changing of parameters.
        var source = $.extend(true, {}, parameters.sources[i]);

        // Create working URL without html entities.
        source.path = $cleaner.html(source.path).text();
        sources.push(source);
      }
    }

    /** @private */
    var tracks = [];
    parameters.a11y.forEach(function (track) {
      // Clone to avoid changing of parameters.
      var clone = $.extend(true, {}, track);

      // Create working URL without html entities
      if (clone.track && clone.track.path) {
        clone.track.path = $cleaner.html(clone.track.path).text();
        tracks.push(clone);
      }
    });

    /**
     * Handle autoplay. If autoplay is disabled, it will still autopause when
     * video is not visible.
     *
     * @param {*} $container
     */
    const handleAutoPlayPause = function ($container) {
      // Keep the current state
      let state;
      self.on('stateChange', function(event) {
        state = event.data;
      });

      // Keep record of autopauses.
      // I.e: we don't wanna autoplay if the user has excplicitly paused.
      self.autoPaused = true;

      new IntersectionObserver(function (entries) {
        const entry = entries[0];

        // This video element became visible
        if (entry.isIntersecting) {
          // Autoplay if autoplay is enabled and it was not explicitly
          // paused by a user
          if (parameters.playback.autoplay && self.autoPaused) {
            self.autoPaused = false;
            self.play();
          }
        }
        else if (state !== Video.PAUSED) {
          self.autoPaused = true;
          self.pause();
        }
      }, {
        root: null,
        threshold: [0, 1] // Get events when it is shown and hidden
      }).observe($container.get(0));
    };

    /**
     * Attaches the video handler to the given container.
     * Inserts text if no handler is found.
     *
     * @public
     * @param {jQuery} $container
     */
    self.attach = function ($container) {
      $container.addClass('h5p-video').html('');

      if (self.appendTo !== undefined) {
        self.appendTo($container);

        // Avoid autoplaying in authoring tool
        if (window.H5PEditor === undefined) {
          handleAutoPlayPause($container);
        }
      }
      else if (sources.length) {
        $container.text(parameters.l10n.noPlayers);
      }
      else {
        $container.text(parameters.l10n.noSources);
      }
    };

    /**
     * Get name of the video handler
     *
     * @public
     * @returns {string}
     */
    self.getHandlerName = function() {
      return handlerName;
    };

    // Resize the video when we know its aspect ratio
    self.on('loaded', function () {
      self.trigger('resize');
    });

    // Find player for video sources
    if (sources.length) {
      const options = {
        controls: parameters.visuals.controls,
        autoplay: false,
        loop: parameters.playback.loop,
        fit: parameters.visuals.fit,
        poster: parameters.visuals.poster === undefined ? undefined : parameters.visuals.poster,
        startAt: parameters.startAt || 0,
        tracks: tracks,
        disableRemotePlayback: parameters.visuals.disableRemotePlayback === true,
        disableFullscreen: parameters.visuals.disableFullscreen === true
      }

      var html5Handler;
      for (var i = 0; i < handlers.length; i++) {
        var handler = handlers[i];
        if (handler.canPlay !== undefined && handler.canPlay(sources)) {
          handler.call(self, sources, options, parameters.l10n);
          handlerName = handler.name;
          return;
        }

        if (handler === H5P.VideoHtml5) {
          html5Handler = handler;
          handlerName = handler.name;
        }
      }

      // Fallback to trying HTML5 player
      if (html5Handler) {
        html5Handler.call(self, sources, options, parameters.l10n);
      }
    }
  }

  // Extends the event dispatcher
  Video.prototype = Object.create(H5P.EventDispatcher.prototype);
  Video.prototype.constructor = Video;

  // Player states
  /** @constant {Number} */
  Video.ENDED = 0;
  /** @constant {Number} */
  Video.PLAYING = 1;
  /** @constant {Number} */
  Video.PAUSED = 2;
  /** @constant {Number} */
  Video.BUFFERING = 3;
  /**
   * When video is queued to start
   * @constant {Number}
   */
  Video.VIDEO_CUED = 5;

  // Used to convert between html and text, since URLs have html entities.
  var $cleaner = H5P.jQuery('<div/>');

  /**
   * Help keep track of key value pairs used by the UI.
   *
   * @class
   * @param {string} label
   * @param {string} value
   */
  Video.LabelValue = function (label, value) {
    this.label = label;
    this.value = value;
  };

  /** @constant {Boolean} */
  Video.IE11_PLAYBACK_RATE_FIX = (navigator.userAgent.match(/Trident.*rv[ :]*11\./) ? true : false);

  return Video;
})(H5P.jQuery, H5P.ContentCopyrights, H5P.MediaCopyright, H5P.videoHandlers || []);
;
(()=>{var e={596:e=>{e.exports=function(e,t){this.index=e,this.parent=t}},485:(e,t,i)=>{const n=i(596),s=H5P.EventDispatcher;function r(e,t){const i=this;s.call(i),i.children=[];var r=function(e){for(let t=e;t<i.children.length;t++)i.children[t].index=t};if(i.addChild=function(t,s){void 0===s&&(s=i.children.length);const o=new n(s,i);return s===i.children.length?i.children.push(o):(i.children.splice(s,0,o),r(s)),e.call(o,t),o},i.removeChild=function(e){i.children.splice(e,1),r(e)},i.moveChild=function(e,t){const n=i.children.splice(e,1)[0];i.children.splice(t,0,n),r(t<e?t:e)},t)for(let e=0;e<t.length;e++)i.addChild(t[e])}r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=i(485),t=i.n(e),n=H5P.jQuery,s=H5P.EventDispatcher,r=H5P.JoubelUI,o=function(e){return e.concat.apply([],e)},a=function(e){return"function"==typeof e},l=null!==navigator.userAgent.match(/iPad/i),d=null!==navigator.userAgent.match(/iPad|iPod|iPhone/i),c=function(e,t){return-1!==e.indexOf(t)},h=function(e,t){return void 0!==e?e:t},p=13,u=27,m=32,f=function(e,t,i){e.click((function(e){t.call(i||this,e)})),e.keydown((function(e){c([p,m],e.which)&&(e.preventDefault(),t.call(i||this,e))}))},v=n("<div>");const g=function(){function e(e,t){this.$summarySlide=t,this.cp=e}return e.prototype.updateSummarySlide=function(e,t){var i=this,s=void 0===this.cp.editor&&void 0!==this.$summarySlide&&e>=this.cp.slides.length-1,o=!this.cp.showSummarySlide&&this.cp.hasAnswerElements;if(s){i.cp.presentation.keywordListEnabled&&i.cp.presentation.keywordListAlwaysShow&&i.cp.hideKeywords(),this.$summarySlide.children().remove();var a=i.cp.getSlideScores(t),l=i.outputScoreStats(a);if(n(l).appendTo(i.$summarySlide),!o){var d=i.totalScores(a);if(!isNaN(d.totalPercentage)){var c=r.createScoreBar(d.totalMaxScore,"","","");c.setScore(d.totalScore);var h=n(".h5p-summary-total-score",i.$summarySlide);c.appendTo(h),setTimeout((function(){h.append(n("<div/>",{"aria-live":"polite",class:"hidden-but-read",html:i.cp.l10n.summary+". "+i.cp.l10n.accessibilityTotalScore.replace("@score",d.totalScore).replace("@maxScore",d.totalMaxScore)}))}),100)}if(1==i.cp.enableTwitterShare){var p=n(".h5p-summary-twitter-message",i.$summarySlide);this.addTwitterScoreLinkTo(p,d)}if(1==i.cp.enableFacebookShare){var u=n(".h5p-summary-facebook-message",i.$summarySlide);this.addFacebookScoreLinkTo(u,d)}if(1==i.cp.enableGoogleShare){var m=n(".h5p-summary-google-message",i.$summarySlide);this.addGoogleScoreLinkTo(m)}i.$summarySlide.find(".h5p-td > .h5p-slide-link").each((function(){var e=n(this);e.click((function(t){i.cp.jumpToSlide(parseInt(e.data("slide"),10)-1),t.preventDefault()}))}))}var f=n(".h5p-summary-footer",i.$summarySlide);this.cp.showSummarySlideSolutionButton&&r.createButton({class:"h5p-show-solutions",html:i.cp.l10n.showSolutions,on:{click:function(){i.toggleSolutionMode(!0)}},appendTo:f}),this.cp.showSummarySlideRetryButton&&r.createButton({class:"h5p-cp-retry-button",html:i.cp.l10n.retry,on:{click:function(){i.cp.resetTask()}},appendTo:f}),i.cp.hasAnswerElements&&r.createButton({class:"h5p-eta-export",html:i.cp.l10n.exportAnswers,on:{click:function(){H5P.ExportableTextArea.Exporter.run(i.cp.slides,i.cp.elementInstances)}},appendTo:f})}},e.prototype.outputScoreStats=function(e){if(void 0===e)return this.$summarySlide.addClass("h5p-summary-only-export"),'<div class="h5p-summary-footer"></div>';var t,i=this,n=0,s=0,r="",o=0,a="";for(t=0;t<e.length;t+=1)a=this.getSlideDescription(e[t]),o=Math.round(e[t].score/e[t].maxScore*100),isNaN(o)&&(o=0),r+='<tr><td class="h5p-td h5p-summary-task-title"><a href="#" class="h5p-slide-link"  aria-label=" '+i.cp.l10n.slide+" "+e[t].slide+": "+a.replace(/(<([^>]+)>)/gi,"")+" "+o+'%" data-slide="'+e[t].slide+'">'+i.cp.l10n.slide+" "+e[t].slide+": "+a.replace(/(<([^>]+)>)/gi,"")+'</a></td><td class="h5p-td h5p-summary-score-bar"><p class="hidden-but-read">'+o+"%</p><p>"+e[t].score+"<span>/</span>"+e[t].maxScore+"</p></td></tr>",n+=e[t].score,s+=e[t].maxScore;this.cp.isSolutionMode||i.cp.triggerXAPICompleted(n,s);var l=i.cp.enableTwitterShare||i.cp.enableFacebookShare||i.cp.enableGoogleShare?'<span class="h5p-show-results-text">'+i.cp.l10n.shareResult+"</span>":"",d=1==i.cp.enableTwitterShare?'<span class="h5p-summary-twitter-message" aria-label="'+i.cp.l10n.shareTwitter+'"></span>':"",c=1==i.cp.enableFacebookShare?'<span class="h5p-summary-facebook-message" aria-label="'+i.cp.l10n.shareFacebook+'"></span>':"",h=1==i.cp.enableGoogleShare?'<span class="h5p-summary-google-message" aria-label="'+i.cp.l10n.shareGoogle+'"></span>':"";return'<div class="h5p-summary-table-holder"><div class="h5p-summary-table-pages"><table class="h5p-score-table"><thead><tr><th class="h5p-summary-table-header slide">'+i.cp.l10n.slide+'</th><th class="h5p-summary-table-header score">'+i.cp.l10n.score+"<span>/</span>"+i.cp.l10n.total.toLowerCase()+"</th></tr></thead><tbody>"+r+'</tbody></table></div><div class="h5p-summary-total-table"><div class="h5p-summary-social">'+l+c+d+h+'</div><div class="h5p-summary-total-score"><p>'+i.cp.l10n.totalScore+'</p></div></div></div><div class="h5p-summary-footer"></div>'},e.prototype.getSlideDescription=function(e){var t,i,n=this,s=n.cp.slides[e.slide-1].elements;if(e.indexes.length>1)t=n.cp.l10n.summaryMultipleTaskText;else if(void 0!==s[e.indexes[0]]&&s[0])if(i=s[e.indexes[0]].action,"function"==typeof n.cp.elementInstances[e.slide-1][e.indexes[0]].getTitle)t=n.cp.elementInstances[e.slide-1][e.indexes[0]].getTitle();else if(void 0!==i.library&&i.library){var r=i.library.split(" ")[0].split(".")[1].split(/(?=[A-Z])/),o="";r.forEach((function(e,t){0!==t&&(e=e.toLowerCase()),o+=e,t<=r.length-1&&(o+=" ")})),t=o}return t},e.prototype.addTwitterScoreLinkTo=function(e,t){var i=this,n=i.cp.twitterShareStatement||"",s=i.cp.twitterShareHashtags||"",r=i.cp.twitterShareUrl||"";r=r.replace("@currentpageurl",window.location.href),n=n.replace("@score",t.totalScore).replace("@maxScore",t.totalMaxScore).replace("@percentage",t.totalPercentage+"%").replace("@currentpageurl",window.location.href),s=s.trim().replace(" ",""),n=encodeURIComponent(n),s=encodeURIComponent(s),r=encodeURIComponent(r);var o="https://twitter.com/intent/tweet?";o+=n.length>0?"text="+n+"&":"",o+=r.length>0?"url="+r+"&":"",o+=s.length>0?"hashtags="+s:"";var a=window.innerWidth/2,l=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),f(e,(function(){return window.open(o,i.cp.l10n.shareTwitter,"width=800,height=300,left="+a+",top="+l),!1}))},e.prototype.addFacebookScoreLinkTo=function(e,t){var i=this,n=i.cp.facebookShareUrl||"",s=i.cp.facebookShareQuote||"";n=n.replace("@currentpageurl",window.location.href),s=s.replace("@currentpageurl",window.location.href).replace("@percentage",t.totalPercentage+"%").replace("@score",t.totalScore).replace("@maxScore",t.totalMaxScore),n=encodeURIComponent(n),s=encodeURIComponent(s);var r="https://www.facebook.com/sharer/sharer.php?";r+=n.length>0?"u="+n+"&":"",r+=s.length>0?"quote="+s:"";var o=window.innerWidth/2,a=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),f(e,(function(){return window.open(r,i.cp.l10n.shareFacebook,"width=800,height=300,left="+o+",top="+a),!1}))},e.prototype.addGoogleScoreLinkTo=function(e){var t=this,i=t.cp.googleShareUrl||"";i=i.replace("@currentpageurl",window.location.href),i=encodeURIComponent(i);var n="https://plus.google.com/share?";n+=i.length>0?"url="+i:"";var s=window.innerWidth/2,r=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),f(e,(function(){return window.open(n,t.cp.l10n.shareGoogle,"width=401,height=437,left="+s+",top="+r),!1}))},e.prototype.totalScores=function(e){if(void 0===e)return{totalScore:0,totalMaxScore:0,totalPercentage:0};var t,i=0,n=0;for(t=0;t<e.length;t+=1)i+=e[t].score,n+=e[t].maxScore;var s=Math.round(i/n*100);return isNaN(s)&&(s=0),{totalScore:i,totalMaxScore:n,totalPercentage:s}},e.prototype.toggleSolutionMode=function(e){if(this.cp.isSolutionMode=e,e){var t=this.cp.showSolutions();this.cp.setProgressBarFeedback(t),this.cp.$footer.addClass("h5p-footer-solution-mode"),this.setFooterSolutionModeText(this.cp.l10n.solutionModeText)}else this.cp.$footer.removeClass("h5p-footer-solution-mode"),this.setFooterSolutionModeText(),this.cp.setProgressBarFeedback()},e.prototype.setFooterSolutionModeText=function(e){void 0!==e&&e?this.cp.$exitSolutionModeText.html(e):this.cp.$exitSolutionModeText&&this.cp.$exitSolutionModeText.html("")},e}();var y=function(e){var t=0;function i(){}return i.supported=function(){return"function"==typeof window.print},i.print=function(t,i,n){t.trigger("printing",{finished:!1,allSlides:n});var s=e(".h5p-slide.h5p-current"),r=s.height(),o=s.width()/670,a=e(".h5p-slide");a.css({height:r/o+"px",width:"670px",fontSize:Math.floor(100/o)+"%"});var l=i.height();i.css("height","auto"),a.toggleClass("doprint",!0===n),s.addClass("doprint"),setTimeout((function(){window.print(),a.css({height:"",width:"",fontSize:""}),i.css("height",l+"px"),t.trigger("printing",{finished:!0})}),500)},i.showDialog=function(i,n,s){var r=this,o=t++,a="h5p-cp-print-dialog-".concat(o,"-title"),l="h5p-cp-print-dialog-".concat(o,"-ingress"),d=e('<div class="h5p-popup-dialog h5p-print-dialog">\n                      <div role="dialog" aria-labelledby="'.concat(a,'" aria-describedby="').concat(l,'" tabindex="-1" class="h5p-inner">\n                        <h2 id="').concat(a,'">').concat(i.printTitle,'</h2>\n                        <div class="h5p-scroll-content"></div>\n                        <div class="h5p-close" role="button" tabindex="0" title="').concat(H5P.t("close"),'">\n                      </div>\n                    </div>')).insertAfter(n).click((function(){r.close()})).children(".h5p-inner").click((function(){return!1})).end();f(d.find(".h5p-close"),(function(){return r.close()}));var c=d.find(".h5p-scroll-content");return c.append(e("<div>",{class:"h5p-cp-print-ingress",id:l,html:i.printIngress})),H5P.JoubelUI.createButton({html:i.printAllSlides,class:"h5p-cp-print-all-slides",click:function(){r.close(),s(!0)}}).appendTo(c),H5P.JoubelUI.createButton({html:i.printCurrentSlide,class:"h5p-cp-print-current-slide",click:function(){r.close(),s(!1)}}).appendTo(c),this.open=function(){setTimeout((function(){d.addClass("h5p-open"),H5P.jQuery(r).trigger("dialog-opened",[d])}),1)},this.close=function(){d.removeClass("h5p-open"),setTimeout((function(){d.remove()}),200)},this.open(),d},i}(H5P.jQuery);const b=y,S=function(e){const t=e.length;return function i(){const n=Array.prototype.slice.call(arguments,0);return n.length>=t?e.apply(null,n):function(){const e=Array.prototype.slice.call(arguments,0);return i.apply(null,n.concat(e))}}},w=S((function(e,t){t.forEach(e)})),x=(S((function(e,t){return t.map(e)})),S((function(e,t){return t.filter(e)}))),k=(S((function(e,t){return t.some(e)})),S((function(e,t){return-1!=t.indexOf(e)}))),T=S((function(e,t){return x((t=>!k(t,e)),t)})),E=S(((e,t)=>t.getAttribute(e))),C=S(((e,t,i)=>i.setAttribute(e,t))),$=S(((e,t)=>t.removeAttribute(e))),P=S(((e,t)=>t.hasAttribute(e))),I=(S(((e,t,i)=>i.getAttribute(e)===t)),S(((e,t)=>{const i=E(e,t);C(e,("true"!==i).toString(),t)})),S(((e,t)=>e.appendChild(t))),S(((e,t)=>t.querySelector(e))),S(((e,t)=>{return i=t.querySelectorAll(e),Array.prototype.slice.call(i);var i})),S(((e,t)=>e.removeChild(t))),S(((e,t)=>t.classList.contains(e))),S(((e,t)=>t.classList.add(e)))),A=S(((e,t)=>t.classList.remove(e))),B=I("hidden"),M=A("hidden"),H=(S(((e,t)=>(e?M:B)(t))),S(((e,t,i)=>{i.classList[t?"add":"remove"](e)})),$("tabindex")),L=(w(H),C("tabindex","0")),K=C("tabindex","-1"),D=P("tabindex");class W{constructor(e){Object.assign(this,{listeners:{},on:function(e,t,i){const n={listener:t,scope:i};return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(n),this},fire:function(e,t){return(this.listeners[e]||[]).every((function(e){return!1!==e.listener.call(e.scope||this,t)}))},propagate:function(e,t){let i=this;e.forEach((e=>t.on(e,(t=>i.fire(e,t)))))}}),this.plugins=e||[],this.elements=[],this.negativeTabIndexAllowed=!1,this.on("nextElement",this.nextElement,this),this.on("previousElement",this.previousElement,this),this.on("firstElement",this.firstElement,this),this.on("lastElement",this.lastElement,this),this.initPlugins()}addElement(e){this.elements.push(e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}insertElementAt(e,t){this.elements.splice(t,0,e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}removeElement(e){this.elements=T([e],this.elements),D(e)&&(this.setUntabbable(e),this.elements[0]&&this.setTabbable(this.elements[0])),this.firesEvent("removeElement",e)}count(){return this.elements.length}firesEvent(e,t){const i=this.elements.indexOf(t);return this.fire(e,{element:t,index:i,elements:this.elements,oldElement:this.tabbableElement})}nextElement({index:e}){const t=e===this.elements.length-1,i=this.elements[t?0:e+1];this.setTabbable(i),i.focus()}firstElement(){const e=this.elements[0];this.setTabbable(e),e.focus()}lastElement(){const e=this.elements[this.elements.length-1];this.setTabbable(e),e.focus()}setTabbableByIndex(e){const t=this.elements[e];t&&this.setTabbable(t)}setTabbable(e){w(this.setUntabbable.bind(this),this.elements),L(e),this.tabbableElement=e}setUntabbable(e){e!==document.activeElement&&(this.negativeTabIndexAllowed?K(e):H(e))}previousElement({index:e}){const t=0===e,i=this.elements[t?this.elements.length-1:e-1];this.setTabbable(i),i.focus()}useNegativeTabIndex(){this.negativeTabIndexAllowed=!0,this.elements.forEach((e=>{e.hasAttribute("tabindex")||K(e)}))}initPlugins(){this.plugins.forEach((function(e){void 0!==e.init&&e.init(this)}),this)}}class j{constructor(){this.selectability=!0}init(e){this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.removeKeyDownListener,this)}listenForKeyDown({element:e}){e.addEventListener("keydown",this.boundHandleKeyDown)}removeKeyDownListener({element:e}){e.removeEventListener("keydown",this.boundHandleKeyDown)}handleKeyDown(e){switch(e.which){case 27:this.close(e.target),e.preventDefault(),e.stopPropagation();break;case 35:this.lastElement(e.target),e.preventDefault(),e.stopPropagation();break;case 36:this.firstElement(e.target),e.preventDefault(),e.stopPropagation();break;case 13:case 32:this.select(e.target),e.preventDefault(),e.stopPropagation();break;case 37:case 38:this.hasChromevoxModifiers(e)||(this.previousElement(e.target),e.preventDefault(),e.stopPropagation());break;case 39:case 40:this.hasChromevoxModifiers(e)||(this.nextElement(e.target),e.preventDefault(),e.stopPropagation())}}hasChromevoxModifiers(e){return e.shiftKey||e.ctrlKey}previousElement(e){!1!==this.controls.firesEvent("beforePreviousElement",e)&&(this.controls.firesEvent("previousElement",e),this.controls.firesEvent("afterPreviousElement",e))}nextElement(e){!1!==this.controls.firesEvent("beforeNextElement",e)&&(this.controls.firesEvent("nextElement",e),this.controls.firesEvent("afterNextElement",e))}select(e){this.selectability&&!1!==this.controls.firesEvent("before-select",e)&&(this.controls.firesEvent("select",e),this.controls.firesEvent("after-select",e))}firstElement(e){!1!==this.controls.firesEvent("beforeFirstElement",e)&&(this.controls.firesEvent("firstElement",e),this.controls.firesEvent("afterFirstElement",e))}lastElement(e){!1!==this.controls.firesEvent("beforeLastElement",e)&&(this.controls.firesEvent("lastElement",e),this.controls.firesEvent("afterLastElement",e))}disableSelectability(){this.selectability=!1}enableSelectability(){this.selectability=!0}close(e){!1!==this.controls.firesEvent("before-close",e)&&(this.controls.firesEvent("close",e),this.controls.firesEvent("after-close",e))}}function F(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var O="none",N="not-answered",z="answered",R="has-only-correct",Q="has-incorrect",U=function(e){function t(e){var t;this.cp=e,this.answeredLabels=(F(t={},N,this.cp.l10n.containsNotCompleted),F(t,z,this.cp.l10n.containsCompleted),F(t,R,this.cp.l10n.containsOnlyCorrect),F(t,Q,this.cp.l10n.containsIncorrectAnswers),F(t,O,"@slideName"),t),this.initProgressbar(this.cp.slidesWithSolutions),this.initFooter(),this.initTaskAnsweredListener(),this.toggleNextAndPreviousButtonDisabled(this.cp.getCurrentSlideIndex())}return t.prototype.initTaskAnsweredListener=function(){var e=this;this.cp.elementInstances.forEach((function(t,i){t.filter((function(e){return a(e.on)})).forEach((function(t){t.on("xAPI",(function(t){var n=t.getVerb();if(c(["interacted","answered","attempted"],n)){var s=e.cp.slideHasAnsweredTask(i);e.setTaskAnswered(i,s)}else"completed"===n&&t.setVerb("answered");void 0===t.data.statement.context.extensions&&(t.data.statement.context.extensions={}),t.data.statement.context.extensions["http://id.tincanapi.com/extension/ending-point"]=i+1}))}))}))},t.prototype.initProgressbar=function(t){var i=this,n=this,s=n.cp.previousState&&n.cp.previousState.progress||0;this.progresbarKeyboardControls=new W([new j]),this.progresbarKeyboardControls.negativeTabIndexAllowed=!0,this.progresbarKeyboardControls.on("select",(function(t){n.displaySlide(e(t.element).data("slideNumber"))})),this.progresbarKeyboardControls.on("beforeNextElement",(function(e){return e.index!==e.elements.length-1})),this.progresbarKeyboardControls.on("beforePreviousElement",(function(e){return 0!==e.index})),void 0!==this.cp.progressbarParts&&this.cp.progressbarParts&&this.cp.progressbarParts.forEach((function(e){n.progresbarKeyboardControls.removeElement(e.children("a").get(0)),e.remove()})),n.cp.progressbarParts=[];for(var r=function(t){t.preventDefault();var i=e(this).data("slideNumber");n.progresbarKeyboardControls.setTabbableByIndex(i),n.displaySlide(i),n.cp.focus()},o=0;o<this.cp.slides.length;o+=1){var a=this.cp.slides[o],l=this.createSlideTitle(o),c=e("<li>",{class:"h5p-progressbar-part"}).appendTo(n.cp.$progressbar),h=e("<a>",{href:"#",html:'<span class="h5p-progressbar-part-title hidden-but-read">'+l+"</span>",tabindex:"-1"}).data("slideNumber",o).click(r).appendTo(c);if(this.progresbarKeyboardControls.addElement(h.get(0)),d||function(){var t=e("<div/>",{class:"h5p-progressbar-popup",html:l,"aria-hidden":"true"}).appendTo(c);c.mouseenter((function(){return i.ensurePopupVisible(t)}))}(),this.isSummarySlide(o)&&c.addClass("progressbar-part-summary-slide"),0===o&&c.addClass("h5p-progressbar-part-show"),o===s&&c.addClass("h5p-progressbar-part-selected"),n.cp.progressbarParts.push(c),this.updateSlideTitle(o),this.cp.slides.length<=60&&a.elements&&a.elements.length>0){var p=t[o]&&t[o].length>0,u=!!(n.cp.previousState&&n.cp.previousState.answered&&n.cp.previousState.answered[o]);p&&(e("<div>",{class:"h5p-progressbar-part-has-task"}).appendTo(h),this.setTaskAnswered(o,u))}}},t.prototype.ensurePopupVisible=function(e){var t=this.cp.$container.width(),i=e.outerWidth(),n=e.offset().left;n<0?(e.css("left",0),e.css("transform","translateX(0)")):n+i>t&&(e.css("left","auto"),e.css("right",0),e.css("transform","translateX(0)"))},t.prototype.displaySlide=function(e){var t=this;this.cp.jumpToSlide(e,!1,(function(){var i=t.cp.getCurrentSlideIndex();t.updateSlideTitle(e,{isCurrent:!0}),t.updateSlideTitle(i,{isCurrent:!1}),t.toggleNextAndPreviousButtonDisabled(e)}))},t.prototype.createSlideTitle=function(e){var t=this.cp.slides[e];return t.keywords&&t.keywords.length>0?t.keywords[0].main:this.isSummarySlide(e)?this.cp.l10n.summary:this.cp.l10n.slide+" "+(e+1)},t.prototype.isSummarySlide=function(e){return!(void 0!==this.cp.editor||e!==this.cp.slides.length-1||!this.cp.showSummarySlide)},t.prototype.initFooter=function(){var t=this,i=this,n=this.cp.$footer,s=e("<div/>",{class:"h5p-footer-left-adjusted"}).appendTo(n),r=e("<div/>",{class:"h5p-footer-center-adjusted"}).appendTo(n),o=e("<div/>",{role:"toolbar",class:"h5p-footer-right-adjusted"}).appendTo(n);this.cp.$keywordsButton=e("<div/>",{class:"h5p-footer-button h5p-footer-toggle-keywords","aria-expanded":"false","aria-label":this.cp.l10n.showKeywords,title:this.cp.l10n.showKeywords,role:"button",tabindex:"0",html:'<span class="h5p-icon-menu"></span><span class="current-slide-title"></span>'}).appendTo(s),f(this.cp.$keywordsButton,(function(e){i.cp.presentation.keywordListAlwaysShow||(i.cp.toggleKeywords(),e.stopPropagation())})),!this.cp.presentation.keywordListAlwaysShow&&this.cp.initKeywords||this.cp.$keywordsButton.hide(),this.cp.presentation.keywordListEnabled||this.cp.$keywordsWrapper.add(this.$keywordsButton).hide(),this.updateFooterKeyword(0),this.cp.$prevSlideButton=e("<div/>",{class:"h5p-footer-button h5p-footer-previous-slide","aria-label":this.cp.l10n.prevSlide,title:this.cp.l10n.prevSlide,role:"button",tabindex:"-1","aria-disabled":"true"}).appendTo(r),f(this.cp.$prevSlideButton,(function(){return t.cp.previousSlide(void 0,!1)}));var a=e("<div/>",{class:"h5p-footer-slide-count"}).appendTo(r);this.cp.$footerCurrentSlide=e("<div/>",{html:"1",class:"h5p-footer-slide-count-current",title:this.cp.l10n.currentSlide,"aria-hidden":"true"}).appendTo(a),this.cp.$footerCounter=e("<div/>",{class:"hidden-but-read",html:this.cp.l10n.slideCount.replace("@index","1").replace("@total",this.cp.slides.length.toString())}).appendTo(r),e("<div/>",{html:"/",class:"h5p-footer-slide-count-delimiter","aria-hidden":"true"}).appendTo(a),this.cp.$footerMaxSlide=e("<div/>",{html:this.cp.slides.length,class:"h5p-footer-slide-count-max",title:this.cp.l10n.lastSlide,"aria-hidden":"true"}).appendTo(a),this.cp.$nextSlideButton=e("<div/>",{class:"h5p-footer-button h5p-footer-next-slide","aria-label":this.cp.l10n.nextSlide,title:this.cp.l10n.nextSlide,role:"button",tabindex:"0"}).appendTo(r),f(this.cp.$nextSlideButton,(function(){return t.cp.nextSlide(void 0,!1)})),void 0===this.cp.editor&&(this.cp.$exitSolutionModeButton=e("<div/>",{role:"button",class:"h5p-footer-exit-solution-mode","aria-label":this.cp.l10n.solutionModeTitle,title:this.cp.l10n.solutionModeTitle,tabindex:"0"}).appendTo(o),f(this.cp.$exitSolutionModeButton,(function(){return i.cp.jumpToSlide(i.cp.slides.length-1)})),this.cp.enablePrintButton&&b.supported()&&(this.cp.$printButton=e("<div/>",{class:"h5p-footer-button h5p-footer-print","aria-label":this.cp.l10n.printTitle,title:this.cp.l10n.printTitle,role:"button",tabindex:"0"}).appendTo(o),f(this.cp.$printButton,(function(){return i.openPrintDialog()}))),H5P.fullscreenSupported&&(this.cp.$fullScreenButton=e("<div/>",{class:"h5p-footer-button h5p-footer-toggle-full-screen","aria-label":this.cp.l10n.fullscreen,title:this.cp.l10n.fullscreen,role:"button",tabindex:"0"}),f(this.cp.$fullScreenButton,(function(){return i.cp.toggleFullScreen()})),this.cp.$fullScreenButton.appendTo(o))),this.cp.$exitSolutionModeText=e("<div/>",{html:"",class:"h5p-footer-exit-solution-mode-text"}).appendTo(this.cp.$exitSolutionModeButton)},t.prototype.openPrintDialog=function(){var t=this,i=e(".h5p-wrapper");b.showDialog(this.cp.l10n,i,(function(e){b.print(t.cp,i,e)})).children('[role="dialog"]').focus()},t.prototype.updateProgressBar=function(e,t,i){var n,s=this;for(n=0;n<s.cp.progressbarParts.length;n+=1)e+1>n?s.cp.progressbarParts[n].addClass("h5p-progressbar-part-show"):s.cp.progressbarParts[n].removeClass("h5p-progressbar-part-show");s.progresbarKeyboardControls.setTabbableByIndex(e),s.cp.progressbarParts[e].addClass("h5p-progressbar-part-selected").siblings().removeClass("h5p-progressbar-part-selected"),void 0!==t?!i&&s.cp.editor:s.cp.progressbarParts.forEach((function(e,t){s.setTaskAnswered(t,!1)}))},t.prototype.setTaskAnswered=function(e,t){this.cp.progressbarParts[e].find(".h5p-progressbar-part-has-task").toggleClass("h5p-answered",t),this.updateSlideTitle(e,{state:t?z:N})},t.prototype.updateSlideTitle=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.state,n=t.isCurrent;this.setSlideTitle(e,{state:h(i,this.getAnsweredState(e)),isCurrent:h(n,this.cp.isCurrentSlide(e))})},t.prototype.setSlideTitle=function(e,t){var i=t.state,n=void 0===i?O:i,s=t.isCurrent,r=void 0!==s&&s,o=this.cp.slides.length,a=this.cp.progressbarParts[e].find(".h5p-progressbar-part-title"),l=this.cp.l10n.slideCount.replace("@index",e+1).replace("@total",o),d=this.answeredLabels[n].replace("@slideName",this.createSlideTitle(e)),c=r?this.cp.l10n.currentSlide:"";a.html("".concat(l,": ").concat(d,". ").concat(c))},t.prototype.getAnsweredState=function(e){var t=this.cp.progressbarParts[e],i=this.slideHasInteraction(e),n=this.cp.slideHasAnsweredTask(e);return i?t.find(".h5p-is-correct").length>0?R:t.find(".h5p-is-wrong").length>0?Q:n?z:N:O},t.prototype.slideHasInteraction=function(e){return this.cp.progressbarParts[e].find(".h5p-progressbar-part-has-task").length>0},t.prototype.updateFooter=function(e){this.cp.$footerCurrentSlide.html(e+1),this.cp.$footerMaxSlide.html(this.cp.slides.length),this.cp.$footerCounter.html(this.cp.l10n.slideCount.replace("@index",(e+1).toString()).replace("@total",this.cp.slides.length.toString())),this.cp.isSolutionMode&&e===this.cp.slides.length-1?this.cp.$footer.addClass("summary-slide"):this.cp.$footer.removeClass("summary-slide"),this.toggleNextAndPreviousButtonDisabled(e),this.updateFooterKeyword(e)},t.prototype.toggleNextAndPreviousButtonDisabled=function(e){var t=this.cp.slides.length-1;this.cp.$prevSlideButton.attr("aria-disabled",(0===e).toString()),this.cp.$nextSlideButton.attr("aria-disabled",(e===t).toString()),this.cp.$prevSlideButton.attr("tabindex",0===e?"-1":"0"),this.cp.$nextSlideButton.attr("tabindex",e===t?"-1":"0")},t.prototype.updateFooterKeyword=function(e){var t=this.cp.slides[e],i="";t&&t.keywords&&t.keywords[0]&&(i=t.keywords[0].main),!this.cp.isEditor()&&this.cp.showSummarySlide&&e>=this.cp.slides.length-1&&(i=this.cp.l10n.summary),this.cp.$keywordsButton.children(".current-slide-title").html(h(i,""))},t}(H5P.jQuery);const G=U;var q=function(e){var t=e.presentation;t=n.extend(!0,{globalBackgroundSelector:{fillGlobalBackground:"",imageGlobalBackground:{}},slides:[{slideBackgroundSelector:{fillSlideBackground:"",imageSlideBackground:{}}}]},t);var i,s=function(t,i,n){var s=e.$slidesWrapper.children().filter(":not(.h5p-summary-slide)");void 0!==n&&(s=s.eq(n)),t&&""!==t?s.addClass("has-background").css("background-image","").css("background-color",t):i&&i.path&&s.addClass("has-background").css("background-color","").css("background-image","url("+H5P.getPath(i.path,e.contentId)+")")};i=t.globalBackgroundSelector,s(i.fillGlobalBackground,i.imageGlobalBackground),t.slides.forEach((function(e,t){var i=e.slideBackgroundSelector;i&&s(i.fillSlideBackground,i.imageSlideBackground,t)}))},X=function(e){return parseInt(e.dataset.index)},J=function(){function e(e){var t=this,i=e.l10n,n=e.currentIndex;this.l10n=i,this.state={currentIndex:h(n,0)},this.eventDispatcher=new s,this.controls=new W([new j]),this.controls.on("select",(function(e){t.onMenuItemSelect(X(e.element))})),this.controls.on("close",(function(){return t.eventDispatcher.trigger("close")})),this.menuElement=this.createMenuElement(),this.currentSlideMarkerElement=this.createCurrentSlideMarkerElement()}var t=e.prototype;return t.init=function(e){var t=this;return this.menuItemElements=e.map((function(e){return t.createMenuItemElement(e)})),this.menuItemElements.forEach((function(e){return t.menuElement.appendChild(e)})),this.menuItemElements.forEach((function(e){return t.controls.addElement(e)})),this.setCurrentSlideIndex(this.state.currentIndex),this.menuItemElements},t.on=function(e,t){this.eventDispatcher.on(e,t)},t.getElement=function(){return this.menuElement},t.removeAllMenuItemElements=function(){var e=this;this.menuItemElements.forEach((function(t){e.controls.removeElement(t),e.menuElement.removeChild(t)})),this.menuItemElements=[]},t.createMenuElement=function(){var e=this.menuElement=document.createElement("ol");return e.setAttribute("role","menu"),e.classList.add("list-unstyled"),e},t.createMenuItemElement=function(e){var t=this,i=document.createElement("li");return i.setAttribute("role","menuitem"),i.addEventListener("click",(function(e){t.onMenuItemSelect(X(e.currentTarget))})),this.applyConfigToMenuItemElement(i,e),i},t.applyConfigToMenuItemElement=function(e,t){e.innerHTML='<div class="h5p-keyword-subtitle">'.concat(t.subtitle,'</div><span class="h5p-keyword-title">').concat(t.title,"</span>"),e.dataset.index=t.index},t.onMenuItemSelect=function(e){this.setCurrentSlideIndex(e),this.eventDispatcher.trigger("select",{index:e})},t.setCurrentSlideIndex=function(e){var t=this.getElementByIndex(this.menuItemElements,e);t&&(this.state.currentIndex=e,this.updateCurrentlySelected(this.menuItemElements,this.state),this.controls.setTabbable(t))},t.updateCurrentlySelected=function(e,t){var i=this;e.forEach((function(e){var n=t.currentIndex===X(e);e.classList.toggle("h5p-current",n),n&&e.appendChild(i.currentSlideMarkerElement)}))},t.scrollToKeywords=function(e){var t=this.getFirstElementAfter(e);if(t){var i=n(this.menuElement),s=i.scrollTop()+n(t).position().top-8;l?i.scrollTop(s):i.stop().animate({scrollTop:s},250)}},t.getFirstElementAfter=function(e){return this.menuItemElements.filter((function(t){return X(t)>=e}))[0]},t.getElementByIndex=function(e,t){return e.filter((function(e){return X(e)===t}))[0]},t.createCurrentSlideMarkerElement=function(){var e=document.createElement("div");return e.classList.add("hidden-but-read"),e.innerHTML=this.l10n.currentSlide,e},e}(),V="specified",Y="next",_="previous",Z=function(){function e(e,t){var i=this,r=e.title,o=e.goToSlide,a=void 0===o?1:o,l=e.invisible,d=e.goToSlideType,c=void 0===d?V:d,h=t.l10n,p=t.currentIndex;this.eventDispatcher=new s;var u="h5p-press-to-go",m=0;if(l)r=void 0,m=-1;else{if(!r)switch(c){case V:r=h.goToSlide.replace(":num",a.toString());break;case Y:r=h.goToSlide.replace(":num",h.nextSlide);break;case _:r=h.goToSlide.replace(":num",h.prevSlide)}u+=" h5p-visible"}var v=a-1;c===Y?v=p+1:c===_&&(v=p-1),this.$element=n("<a/>",{href:"#",class:u,tabindex:m,title:r}),f(this.$element,(function(e){i.eventDispatcher.trigger("navigate",v),e.preventDefault()}))}var t=e.prototype;return t.attach=function(e){e.html("").addClass("h5p-go-to-slide").append(this.$element)},t.on=function(e,t){this.eventDispatcher.on(e,t)},e}();const ee=function(e){var t=this;if(void 0===e.action)t.instance=new Z(e,{l10n:t.parent.parent.l10n,currentIndex:t.parent.index}),t.parent.parent.isEditor()||t.instance.on("navigate",(function(e){var i=e.data;t.parent.parent.jumpToSlide(i)}));else{var i;i=t.parent.parent.isEditor()?H5P.jQuery.extend(!0,{},e.action,t.parent.parent.elementsOverride):H5P.jQuery.extend(!0,e.action,t.parent.parent.elementsOverride);var n=t.parent.parent.elementInstances[t.parent.index]?t.parent.parent.elementInstances[t.parent.index].length:0;t.parent.parent.previousState&&t.parent.parent.previousState.answers&&t.parent.parent.previousState.answers[t.parent.index]&&t.parent.parent.previousState.answers[t.parent.index][n]&&(i.userDatas={state:t.parent.parent.previousState.answers[t.parent.index][n]}),i.params=i.params||{},t.instance=H5P.newRunnable(i,t.parent.parent.contentId,void 0,!0,{parent:t.parent.parent}),void 0!==t.instance.preventResize&&(t.instance.preventResize=!0)}void 0===t.parent.parent.elementInstances[t.parent.index]?t.parent.parent.elementInstances[t.parent.index]=[t.instance]:t.parent.parent.elementInstances[t.parent.index].push(t.instance),void 0!==t.instance.showCPComments||t.instance.isTask||void 0===t.instance.isTask&&void 0!==t.instance.showSolutions?(t.instance.coursePresentationIndexOnSlide=t.parent.parent.elementInstances[t.parent.index].length-1,void 0===t.parent.parent.slidesWithSolutions[t.parent.index]&&(t.parent.parent.slidesWithSolutions[t.parent.index]=[]),t.parent.parent.slidesWithSolutions[t.parent.index].push(t.instance)):e.solution&&(void 0===t.parent.parent.showCommentsAfterSolution[t.parent.index]&&(t.parent.parent.showCommentsAfterSolution[t.parent.index]=[]),t.parent.parent.showCommentsAfterSolution[t.parent.index].push(t.instance)),void 0!==t.instance.exportAnswers&&t.instance.exportAnswers&&(t.parent.parent.hasAnswerElements=!0),t.parent.parent.isTask||t.parent.parent.hideSummarySlide||(t.instance.isTask||void 0===t.instance.isTask&&void 0!==t.instance.showSolutions)&&(t.parent.parent.isTask=!0)};function te(e){var i,n=this;t().call(n,ee,e.elements),n.getElement=function(){return i||(i=H5P.jQuery(te.createHTML(e))),i},n.setCurrent=function(){this.parent.$current=i.addClass("h5p-current")},n.appendElements=function(){for(var t=0;t<n.children.length;t++)n.parent.attachElement(e.elements[t],n.children[t].instance,i,n.index);n.parent.elementsAttached[n.index]=!0,n.parent.trigger("domChanged",{$target:i,library:"CoursePresentation",key:"newSlide"},{bubbles:!0,external:!0})}}te.createHTML=function(e){return'<div role="document" class="h5p-slide"'+(void 0!==e.background?' style="background:'+e.background+'"':"")+"></div>"};const ie=te;const ne=function(e,t){var i=new H5P.ConfirmationDialog(e).appendTo(document.body);return i.getElement().classList.add("h5p-cp-confirmation-dialog"),i.show(),i};function se(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==i)return;var n,s,r=[],o=!0,a=!1;try{for(i=i.call(e);!(o=(n=i.next()).done)&&(r.push(n.value),!t||r.length!==t);o=!0);}catch(e){a=!0,s=e}finally{try{o||null==i.return||i.return()}finally{if(a)throw s}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return re(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return re(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function oe(e){return oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},oe(e)}var ae=function(e,i,s){var r=this;this.presentation=e.presentation,this.slides=this.presentation.slides,this.contentId=i,this.elementInstances=[],this.elementsAttached=[],this.slidesWithSolutions=[],this.showCommentsAfterSolution=[],this.hasAnswerElements=!1,this.ignoreResize=!1,this.isTask=!1,this.standalone=!0,this.isReportingEnabled=!1,s.cpEditor&&(this.editor=s.cpEditor),s&&(this.previousState=s.previousState,this.standalone=s.standalone,this.isReportingEnabled=s.isReportingEnabled||s.isScoringEnabled),this.currentSlideIndex=this.previousState&&this.previousState.progress?this.previousState.progress:0,this.presentation.keywordListEnabled=void 0===e.presentation.keywordListEnabled||e.presentation.keywordListEnabled,this.l10n=n.extend({slide:"Slide",score:"Score",yourScore:"Your score",maxScore:"Max score",total:"Total",totalScore:"Total Score",showSolutions:"Show solutions",summary:"summary",retry:"Retry",exportAnswers:"Export text",close:"Close",hideKeywords:"Hide sidebar navigation menu",showKeywords:"Show sidebar navigation menu",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen",prevSlide:"Previous slide",nextSlide:"Next slide",currentSlide:"Current slide",lastSlide:"Last slide",solutionModeTitle:"Exit solution mode",solutionModeText:"Solution Mode",summaryMultipleTaskText:"Multiple tasks",scoreMessage:"You achieved:",shareFacebook:"Share on Facebook",shareTwitter:"Share on Twitter",shareGoogle:"Share on Google+",goToSlide:"Go to slide :num",solutionsButtonTitle:"Show comments",printTitle:"Print",printIngress:"How would you like to print this presentation?",printAllSlides:"Print all slides",printCurrentSlide:"Print current slide",noTitle:"No title",accessibilitySlideNavigationExplanation:"Use left and right arrow to change slide in that direction whenever canvas is selected.",containsNotCompleted:"@slideName contains not completed interaction",containsCompleted:"@slideName contains completed interaction",slideCount:"Slide @index of @total",accessibilityCanvasLabel:"Presentation canvas. Use left and right arrow to move between slides.",containsOnlyCorrect:"@slideName only has correct answers",containsIncorrectAnswers:"@slideName has incorrect answers",shareResult:"Share Result",accessibilityTotalScore:"You got @score of @maxScore points in total",accessibilityEnteredFullscreen:"Entered fullscreen",accessibilityExitedFullscreen:"Exited fullscreen",confirmDialogHeader:"Submit your answers",confirmDialogText:"This will submit your results, do you want to continue?",confirmDialogConfirmText:"Submit and see results"},void 0!==e.l10n?e.l10n:{}),e.override&&(this.activeSurface=!!e.override.activeSurface,this.hideSummarySlide=!!e.override.hideSummarySlide,this.enablePrintButton=!!e.override.enablePrintButton,this.showSummarySlideSolutionButton=void 0===e.override.summarySlideSolutionButton||e.override.summarySlideSolutionButton,this.showSummarySlideRetryButton=void 0===e.override.summarySlideRetryButton||e.override.summarySlideRetryButton,e.override.social&&(this.enableTwitterShare=!!e.override.social.showTwitterShare,this.enableFacebookShare=!!e.override.social.showFacebookShare,this.enableGoogleShare=!!e.override.social.showGoogleShare,this.twitterShareStatement=e.override.social.twitterShare.statement,this.twitterShareHashtags=e.override.social.twitterShare.hashtags,this.twitterShareUrl=e.override.social.twitterShare.url,this.facebookShareUrl=e.override.social.facebookShare.url,this.facebookShareQuote=e.override.social.facebookShare.quote,this.googleShareUrl=e.override.social.googleShareUrl)),this.keywordMenu=new J({l10n:this.l10n,currentIndex:void 0!==this.previousState?this.previousState.progress:0}),this.setElementsOverride(e.override),t().call(this,ie,e.presentation.slides),this.on("resize",this.resize,this),this.on("printing",(function(e){r.ignoreResize=!e.data.finished,e.data.finished?r.resize():e.data.allSlides&&r.attachAllElements()}))};(ae.prototype=Object.create(t().prototype)).constructor=ae,ae.prototype.getCurrentState=function(){var e=this,t=this.previousState?this.previousState:{};t.progress=this.getCurrentSlideIndex(),t.answers||(t.answers=[]),t.answered=this.elementInstances.map((function(t,i){return e.slideHasAnsweredTask(i)}));for(var i=0;i<this.elementInstances.length;i++)if(this.elementInstances[i])for(var n=0;n<this.elementInstances[i].length;n++){var s=this.elementInstances[i][n];(s.getCurrentState instanceof Function||"function"==typeof s.getCurrentState)&&(t.answers[i]||(t.answers[i]=[]),t.answers[i][n]=s.getCurrentState())}return t},ae.prototype.slideHasAnsweredTask=function(e){return(this.slidesWithSolutions[e]||[]).filter((function(e){return a(e.getAnswerGiven)})).some((function(e){return e.getAnswerGiven()}))},ae.prototype.attach=function(e){var t=this,i=this;void 0!==this.isRoot&&this.isRoot()&&this.setActivityStarted();var s='<div class="h5p-keymap-explanation hidden-but-read">'+this.l10n.accessibilitySlideNavigationExplanation+'</div><div class="h5p-fullscreen-announcer hidden-but-read" aria-live="polite"></div><div class="h5p-wrapper" tabindex="0" aria-label="'+this.l10n.accessibilityCanvasLabel+'">  <div class="h5p-current-slide-announcer hidden-but-read" aria-live="polite"></div>  <div tabindex="-1"></div>  <div class="h5p-box-wrapper">    <div class="h5p-presentation-wrapper">      <div class="h5p-keywords-wrapper"></div>     <div class="h5p-slides-wrapper" aria-live="polite"></div>    </div>  </div>  <nav class="h5p-cp-navigation">    <ol class="h5p-progressbar list-unstyled"></ol>  </nav>  <div class="h5p-footer"></div></div>';e.attr("role","application").addClass("h5p-course-presentation").html(s),this.$container=e,this.$slideAnnouncer=e.find(".h5p-current-slide-announcer"),this.$fullscreenAnnouncer=e.find(".h5p-fullscreen-announcer"),this.$slideTop=this.$slideAnnouncer.next(),this.$wrapper=e.children(".h5p-wrapper").focus((function(){i.initKeyEvents()})).blur((function(){void 0!==i.keydown&&(H5P.jQuery("body").unbind("keydown",i.keydown),delete i.keydown)})).click((function(e){var t=H5P.jQuery(e.target),n=i.belongsToTagName(e.target,["input","textarea","a","button"],e.currentTarget),s=-1!==e.target.tabIndex,r=t.closest(".h5p-popup-container"),o=0!==r.length;if(!n&&!s&&!i.editor)if(o){var a=t.closest("[tabindex]");1===a.closest(".h5p-popup-container").length?a.focus():r.find(".h5p-close-popup").focus()}else i.$wrapper.focus();i.presentation.keywordListEnabled&&!i.presentation.keywordListAlwaysShow&&i.presentation.keywordListAutoHide&&!t.is("textarea, .h5p-icon-pencil, span")&&i.hideKeywords()})),this.on("exitFullScreen",(function(){t.$footer.removeClass("footer-full-screen"),t.$fullScreenButton.attr("title",t.l10n.fullscreen),t.$fullscreenAnnouncer.html(t.l10n.accessibilityExitedFullscreen)})),this.on("enterFullScreen",(function(){t.$fullscreenAnnouncer.html(t.l10n.accessibilityEnteredFullscreen)}));var r=parseInt(this.$wrapper.css("width"));this.width=0!==r?r:640;var o=parseInt(this.$wrapper.css("height"));this.height=0!==o?o:400,this.ratio=16/9,this.fontSize=16,this.$boxWrapper=this.$wrapper.children(".h5p-box-wrapper");var a,l=this.$boxWrapper.children(".h5p-presentation-wrapper");if(this.$slidesWrapper=l.children(".h5p-slides-wrapper"),this.$keywordsWrapper=l.children(".h5p-keywords-wrapper"),this.$progressbar=this.$wrapper.find(".h5p-progressbar"),this.$footer=this.$wrapper.children(".h5p-footer"),this.initKeywords=void 0===this.presentation.keywordListEnabled||!0===this.presentation.keywordListEnabled||void 0!==this.editor,this.activeSurface&&void 0===this.editor&&(this.initKeywords=!1,this.$boxWrapper.css("height","100%")),this.isSolutionMode=!1,this.createSlides(),this.elementsAttached[this.currentSlideIndex]=!0,this.showSummarySlide=!1,this.hideSummarySlide?this.showSummarySlide=!this.hideSummarySlide:this.slidesWithSolutions.forEach((function(e){i.showSummarySlide=e.length})),void 0===this.editor&&(this.showSummarySlide||this.hasAnswerElements)){var d={elements:[],keywords:[]};this.slides.push(d),(a=H5P.jQuery(ie.createHTML(d)).appendTo(this.$slidesWrapper)).addClass("h5p-summary-slide"),this.isCurrentSlide(this.slides.length-1)&&(this.$current=a)}var c=this.getKeywordMenuConfig();c.length>0||this.isEditor()?(this.keywordMenu.init(c),this.keywordMenu.on("select",(function(e){return t.keywordClick(e.data.index)})),this.keywordMenu.on("close",(function(){return t.hideKeywords()})),this.keywordMenu.on("select",(function(){t.$currentKeyword=t.$keywords.children(".h5p-current")})),this.$keywords=n(this.keywordMenu.getElement()).appendTo(this.$keywordsWrapper),this.$currentKeyword=this.$keywords.children(".h5p-current"),this.setKeywordsOpacity(void 0===this.presentation.keywordListOpacity?90:this.presentation.keywordListOpacity),this.presentation.keywordListAlwaysShow&&this.showKeywords()):(this.$keywordsWrapper.remove(),this.initKeywords=!1),void 0===this.editor&&this.activeSurface?(this.$progressbar.add(this.$footer).remove(),H5P.fullscreenSupported&&(this.$fullScreenButton=H5P.jQuery("<div/>",{class:"h5p-toggle-full-screen",title:this.l10n.fullscreen,role:"button",tabindex:0,appendTo:this.$wrapper}),f(this.$fullScreenButton,(function(){return i.toggleFullScreen()})))):(this.initTouchEvents(),this.navigationLine=new G(this),this.previousState&&this.previousState.progress||this.setSlideNumberAnnouncer(0,!1),this.summarySlideObject=new g(this,a)),new q(this),this.previousState&&this.previousState.progress&&this.jumpToSlide(this.previousState.progress,!1,null,!1,!0)},ae.prototype.belongsToTagName=function(e,t,i){if(!e)return!1;i=i||document.body,"string"==typeof t&&(t=[t]),t=t.map((function(e){return e.toLowerCase()}));var n=e.tagName.toLowerCase();return-1!==t.indexOf(n)||i!==e&&this.belongsToTagName(e.parentNode,t,i)},ae.prototype.updateKeywordMenuFromSlides=function(){this.keywordMenu.removeAllMenuItemElements();var e=this.getKeywordMenuConfig();return n(this.keywordMenu.init(e))},ae.prototype.getKeywordMenuConfig=function(){var e=this;return this.slides.map((function(t,i){return{title:e.createSlideTitle(t),subtitle:"".concat(e.l10n.slide," ").concat(i+1),index:i}})).filter((function(e){return null!==e.title}))},ae.prototype.createSlideTitle=function(e){var t=this.isEditor()?this.l10n.noTitle:null;return this.hasKeywords(e)?e.keywords[0].main:t},ae.prototype.isEditor=function(){return void 0!==this.editor},ae.prototype.hasKeywords=function(e){return void 0!==e.keywords&&e.keywords.length>0},ae.prototype.createSlides=function(){for(var e=this,t=0;t<e.children.length;t++){var i=t===e.currentSlideIndex;e.children[t].getElement().appendTo(e.$slidesWrapper),i&&e.children[t].setCurrent(),(e.isEditor()||0===t||1===t||i)&&e.children[t].appendElements()}},ae.prototype.hasScoreData=function(e){return"undefined"!==oe(e)&&"function"==typeof e.getScore&&"function"==typeof e.getMaxScore},ae.prototype.getScore=function(){var e=this;return o(e.slidesWithSolutions).reduce((function(t,i){return t+(e.hasScoreData(i)?i.getScore():0)}),0)},ae.prototype.getMaxScore=function(){var e=this;return o(e.slidesWithSolutions).reduce((function(t,i){return t+(e.hasScoreData(i)?i.getMaxScore():0)}),0)},ae.prototype.setProgressBarFeedback=function(e){var t=this;void 0!==e&&e?e.forEach((function(e){var i=t.progressbarParts[e.slide-1].find(".h5p-progressbar-part-has-task");if(i.hasClass("h5p-answered")){var n=e.score>=e.maxScore;i.addClass(n?"h5p-is-correct":"h5p-is-wrong"),t.navigationLine.updateSlideTitle(e.slide-1)}})):this.progressbarParts.forEach((function(e){e.find(".h5p-progressbar-part-has-task").removeClass("h5p-is-correct").removeClass("h5p-is-wrong")}))},ae.prototype.toggleKeywords=function(){this[this.$keywordsWrapper.hasClass("h5p-open")?"hideKeywords":"showKeywords"]()},ae.prototype.hideKeywords=function(){this.$keywordsWrapper.hasClass("h5p-open")&&(void 0!==this.$keywordsButton&&(this.$keywordsButton.attr("title",this.l10n.showKeywords),this.$keywordsButton.attr("aria-label",this.l10n.showKeywords),this.$keywordsButton.attr("aria-expanded","false"),this.$keywordsButton.focus()),this.$keywordsWrapper.removeClass("h5p-open"))},ae.prototype.showKeywords=function(){this.$keywordsWrapper.hasClass("h5p-open")||(void 0!==this.$keywordsButton&&(this.$keywordsButton.attr("title",this.l10n.hideKeywords),this.$keywordsButton.attr("aria-label",this.l10n.hideKeywords),this.$keywordsButton.attr("aria-expanded","true")),this.$keywordsWrapper.addClass("h5p-open"),this.presentation.keywordListAlwaysShow||this.$keywordsWrapper.find('li[tabindex="0"]').focus())},ae.prototype.setKeywordsOpacity=function(e){var t=se(this.$keywordsWrapper.css("background-color").split(/\(|\)|,/g),3),i=t[0],n=t[1],s=t[2];this.$keywordsWrapper.css("background-color","rgba(".concat(i,", ").concat(n,", ").concat(s,", ").concat(e/100,")"))},ae.prototype.fitCT=function(){void 0===this.editor&&this.$current.find(".h5p-ct").each((function(){for(var e=100,t=H5P.jQuery(this),i=t.parent().height();t.outerHeight()>i&&(e--,t.css({fontSize:e+"%",lineHeight:e+65+"%"}),!(e<0)););}))},ae.prototype.resize=function(){var e=this.$container.hasClass("h5p-fullscreen")||this.$container.hasClass("h5p-semi-fullscreen");if(!this.ignoreResize){this.$wrapper.css("width","auto");var t=this.$container.width(),i={};if(e){var n=this.$container.height();t/n>this.ratio&&(t=n*this.ratio,i.width=t+"px")}var s=t/this.width;i.height=t/this.ratio+"px",i.fontSize=this.fontSize*s+"px",void 0!==this.editor&&this.editor.setContainerEm(this.fontSize*s*.75),this.$wrapper.css(i),this.swipeThreshold=100*s;var r=this.elementInstances[this.$current.index()];if(void 0!==r)for(var o=this.slides[this.$current.index()].elements,a=0;a<r.length;a++){var l=r[a];void 0!==l.preventResize&&!1!==l.preventResize||void 0===l.$||o[a].displayAsButton||H5P.trigger(l,"resize")}this.fitCT()}},ae.prototype.toggleFullScreen=function(){H5P.isFullscreen||this.$container.hasClass("h5p-fullscreen")||this.$container.hasClass("h5p-semi-fullscreen")?void 0!==H5P.exitFullScreen&&void 0!==H5P.fullScreenBrowserPrefix?H5P.exitFullScreen():void 0===H5P.fullScreenBrowserPrefix?H5P.jQuery(".h5p-disable-fullscreen").click():""===H5P.fullScreenBrowserPrefix?window.top.document.exitFullScreen():"ms"===H5P.fullScreenBrowserPrefix?window.top.document.msExitFullscreen():window.top.document[H5P.fullScreenBrowserPrefix+"CancelFullScreen"]():(this.$footer.addClass("footer-full-screen"),this.$fullScreenButton.attr("title",this.l10n.exitFullscreen),H5P.fullScreen(this.$container,this),void 0===H5P.fullScreenBrowserPrefix&&H5P.jQuery(".h5p-disable-fullscreen").hide())},ae.prototype.focus=function(){this.$wrapper.focus()},ae.prototype.keywordClick=function(e){this.shouldHideKeywordsAfterSelect()&&this.hideKeywords(),this.jumpToSlide(e,!0)},ae.prototype.shouldHideKeywordsAfterSelect=function(){return this.presentation.keywordListEnabled&&!this.presentation.keywordListAlwaysShow&&this.presentation.keywordListAutoHide&&void 0===this.editor},ae.prototype.setElementsOverride=function(e){this.elementsOverride={params:{}},e&&(this.elementsOverride.params.behaviour={},e.showSolutionButton&&(this.elementsOverride.params.behaviour.enableSolutionsButton="on"===e.showSolutionButton),e.retryButton&&(this.elementsOverride.params.behaviour.enableRetry="on"===e.retryButton))},ae.prototype.attachElements=function(e,t){if(void 0===this.elementsAttached[t]){var i=this.slides[t],n=this.elementInstances[t];if(void 0!==i.elements)for(var s=0;s<i.elements.length;s++)this.attachElement(i.elements[s],n[s],e,t);this.trigger("domChanged",{$target:e,library:"CoursePresentation",key:"newSlide"},{bubbles:!0,external:!0}),this.elementsAttached[t]=!0}},ae.prototype.attachElement=function(e,t,i,n){var s=void 0!==e.displayAsButton&&e.displayAsButton,r=void 0!==e.buttonSize?"h5p-element-button-"+e.buttonSize:"",o="h5p-element"+(s?" h5p-element-button-wrapper":"")+(r.length?" "+r:""),a=H5P.jQuery("<div>",{class:o}).css({left:e.x+"%",top:e.y+"%",width:e.width+"%",height:e.height+"%"}).appendTo(i),l=void 0===e.backgroundOpacity||0===e.backgroundOpacity;if(a.toggleClass("h5p-transparent",l),s){this.createInteractionButton(e,t).appendTo(a)}else{var d=e.action&&e.action.library?this.getLibraryTypePmz(e.action.library):"other",c=H5P.jQuery("<div>",{class:"h5p-element-outer ".concat(d,"-outer-element")}).css({background:"rgba(255,255,255,"+(void 0===e.backgroundOpacity?0:e.backgroundOpacity/100)+")"}).appendTo(a),h=H5P.jQuery("<div>",{class:"h5p-element-inner"}).appendTo(c);if(t.on("set-size",(function(e){for(var t in e.data)a.get(0).style[t]=e.data[t]})),t.attach(h),void 0!==e.action&&"H5P.InteractiveVideo"===e.action.library.substr(0,20)){var p=function(){t.$container.addClass("h5p-fullscreen"),t.controls.$fullscreen&&t.controls.$fullscreen.remove(),t.hasFullScreen=!0,t.controls.$play.hasClass("h5p-pause")?t.$controls.addClass("h5p-autohide"):t.enableAutoHide()};void 0!==t.controls?p():t.on("controls",p)}0==n&&this.slidesWithSolutions.indexOf(n)<0&&h.attr("tabindex","0"),this.setOverflowTabIndex()}return void 0!==this.editor?this.editor.processElement(e,a,n,t):(e.solution&&this.addElementSolutionButton(e,t,a),this.hasAnswerElements=this.hasAnswerElements||void 0!==t.exportAnswers),a},ae.prototype.disableTabIndexes=function(){var e=this.$container.find(".h5p-popup-container");this.$tabbables=this.$container.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter((function(){var t=n(this),i=n.contains(e.get(0),t.get(0));if(t.data("tabindex"))return!0;if(!i){var s=t.attr("tabindex");return t.data("tabindex",s),t.attr("tabindex","-1"),!0}return!1}))},ae.prototype.restoreTabIndexes=function(){this.$tabbables&&this.$tabbables.each((function(){var e=n(this),t=e.data("tabindex");e.hasClass("ui-slider-handle")?(e.attr("tabindex",0),e.removeData("tabindex")):void 0!==t?(e.attr("tabindex",t),e.removeData("tabindex")):e.removeAttr("tabindex")}))},ae.prototype.createInteractionButton=function(e,t){var i=this,s=e.action.metadata?e.action.metadata.title:"";""===s&&(s=e.action.params&&e.action.params.contentName||e.action.library.split(" ")[0].split(".")[1]);var r=this.getLibraryTypePmz(e.action.library),o=n("<div>",{role:"button",tabindex:0,"aria-label":s,"aria-popup":!0,"aria-expanded":!1,class:"h5p-element-button h5p-element-button-".concat(e.buttonSize," ").concat(r,"-button")}),a=n('<div class="h5p-button-element"></div>');t.attach(a);var l="h5p-advancedtext"===r?{x:e.x,y:e.y}:null;return f(o,(function(){var e;o.attr("aria-expanded","true"),i.showInteractionPopup(t,o,a,r,(e=o,function(){return e.attr("aria-expanded","false")}),l),i.disableTabIndexes()})),void 0!==e.action&&"H5P.InteractiveVideo"===e.action.library.substr(0,20)&&t.on("controls",(function(){t.controls.$fullscreen&&t.controls.$fullscreen.remove()})),o},ae.prototype.showInteractionPopup=function(e,t,i,n,s){var r=this,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,l=function(){e.trigger("resize")};this.isEditor()||(this.on("exitFullScreen",l),this.showPopup(i,t,o,(function(){i.detach(),r.off("exitFullScreen",l),s()}),n),H5P.trigger(e,"resize"),"h5p-image"===n&&this.resizePopupImage(i),setTimeout((function(){var e=i.find(":input").add(i.find("[tabindex]"));e.length?e[0].focus():(i.attr("tabindex",0),i.focus())}),200),a(e.setActivityStarted)&&a(e.getScore)&&e.setActivityStarted())},ae.prototype.getLibraryTypePmz=function(e){return(t=e.split(" ")[0],t.replace(/[\W]/g,"-")).toLowerCase();var t},ae.prototype.resizePopupImage=function(e){var t=Number(e.css("fontSize").replace("px","")),i=e.find("img"),n=function(i,n){if(!(n/t<18.5)){var s=i/n;n=18.5*t,e.css({width:n*s,height:n})}};i.height()?n(i.width(),i.height()):i.one("load",(function(){n(this.width,this.height)}))},ae.prototype.addElementSolutionButton=function(e,t,i){var s=this;t.showCPComments=function(){if(0===i.children(".h5p-element-solution").length&&(o=e.solution,v.html(o).text().trim()).length>0){var t=n("<div/>",{role:"button",tabindex:0,title:s.l10n.solutionsButtonTitle,"aria-popup":!0,"aria-expanded":!1,class:"h5p-element-solution"}).append('<span class="joubel-icon-comment-normal"><span class="h5p-icon-shadow"></span><span class="h5p-icon-speech-bubble"></span><span class="h5p-icon-question"></span></span>').appendTo(i),r={x:e.x,y:e.y};e.displayAsButton||(r.x+=e.width-4,r.y+=e.height-12),f(t,(function(){return s.showPopup(e.solution,t,r)}))}var o},void 0!==e.alwaysDisplayComments&&e.alwaysDisplayComments&&t.showCPComments()},ae.prototype.showPopup=function(e,t){var i,s=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3?arguments[3]:void 0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"h5p-popup-comment-field",l=this,d=function(e){i?i=!1:(void 0!==o&&setTimeout((function(){o(),l.restoreTabIndexes()}),100),e.preventDefault(),c.addClass("h5p-animate"),c.find(".h5p-popup-container").addClass("h5p-animate"),setTimeout((function(){c.remove()}),100),t.focus())},c=n('<div class="h5p-popup-overlay '+a+'"><div class="h5p-popup-container" role="dialog"><div class="h5p-cp-dialog-titlebar"><div class="h5p-dialog-title"></div><div role="button" tabindex="0" class="h5p-close-popup" title="'+this.l10n.close+'"></div></div><div class="h5p-popup-wrapper" role="document"></div></div></div>'),h=c.find(".h5p-popup-wrapper");e instanceof H5P.jQuery?h.append(e):h.html(e);var p=c.find(".h5p-popup-container"),m=function(e,t,i){if(i){t.css({visibility:"hidden"}),e.prependTo(s.$wrapper);var n=t.height(),r=t.width(),o=e.height(),a=r*(100/e.width()),l=n*(100/o);if(a>50&&l>50)e.detach();else{a>l&&l<45&&(a=Math.sqrt(a*l),t.css({width:a+"%"}));a>90?a=90:a<22&&(a=22);var d=100-a-5,c=i.x;i.x>d?c=d:i.x<5&&(c=5);var h=100-(l=t.height()*(100/o))-10,p=i.y;i.y>h?p=h:i.y<10&&(p=10),e.detach(),t.css({left:c+"%",top:p+"%"})}}};return m(c,p,r),c.addClass("h5p-animate"),p.css({visibility:""}).addClass("h5p-animate"),c.prependTo(this.$wrapper).focus().removeClass("h5p-animate").click(d).find(".h5p-popup-container").removeClass("h5p-animate").click((function(){i=!0})).keydown((function(e){e.which===u&&d(e)})).end(),f(c.find(".h5p-close-popup"),(function(e){return d(e)})),c},ae.prototype.checkForSolutions=function(e){return void 0!==e.showSolutions||void 0!==e.showCPComments},ae.prototype.initKeyEvents=function(){if(void 0===this.keydown&&!this.activeSurface){var e=this,t=!1;this.keydown=function(i){t||((37!==i.keyCode&&33!==i.keyCode||!e.previousSlide(void 0,!1))&&(39!==i.keyCode&&34!==i.keyCode||!e.nextSlide(void 0,!1))||(i.preventDefault(),t=!0),t&&setTimeout((function(){t=!1}),300))},H5P.jQuery("body").keydown(this.keydown)}},ae.prototype.initTouchEvents=function(){var e,t,i,n,s,r,o=this,a=!1,l=!1,d=function(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}},c=d("");this.$slidesWrapper.bind("touchstart",(function(d){l=!1,i=e=d.originalEvent.touches[0].pageX,t=d.originalEvent.touches[0].pageY;var c=o.$slidesWrapper.width();n=0===o.currentSlideIndex?0:-c,s=o.currentSlideIndex+1>=o.slides.length?0:c,r=null,a=!0})).bind("touchmove",(function(c){var h=c.originalEvent.touches;a&&(o.$current.prev().addClass("h5p-touch-move"),o.$current.next().addClass("h5p-touch-move"),a=!1),i=h[0].pageX;var p=e-i;null===r&&(r=Math.abs(t-c.originalEvent.touches[0].pageY)>Math.abs(p)),1!==h.length||r||(c.preventDefault(),l||(p<0?o.$current.prev().css(d("translateX("+(n-p)+"px")):o.$current.next().css(d("translateX("+(s-p)+"px)")),o.$current.css(d("translateX("+-p+"px)"))))})).bind("touchend",(function(){if(!r){var t=e-i;if(t>o.swipeThreshold&&o.nextSlide(void 0,!1)||t<-o.swipeThreshold&&o.previousSlide(void 0,!1))return}o.$slidesWrapper.children().css(c).removeClass("h5p-touch-move")}))},ae.prototype.updateTouchPopup=function(e,t,i,n){if(arguments.length<=0)void 0!==this.touchPopup&&this.touchPopup.remove();else{var s="",r=.15;if(void 0!==this.$keywords&&void 0!==this.$keywords.children(":eq("+t+")").find("span").html())s+=this.$keywords.children(":eq("+t+")").find("span").html();else{var o=t+1;s+=this.l10n.slide+" "+o}void 0===this.editor&&t>=this.slides.length-1&&(s=this.l10n.showSolutions),void 0===this.touchPopup?this.touchPopup=H5P.jQuery("<div/>",{class:"h5p-touch-popup"}).insertAfter(e):this.touchPopup.insertAfter(e),n-e.parent().height()*r<0?n=0:n-=e.parent().height()*r,this.touchPopup.css({"max-width":e.width()-i,left:i,top:n}),this.touchPopup.html(s)}},ae.prototype.previousSlide=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this.$current.prev();return!!i.length&&(t?this.processJumpToSlide(i.index(),e,!1):this.jumpToSlide(i.index(),e,null,!1))},ae.prototype.nextSlide=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this.$current.next();return!!i.length&&(t?this.processJumpToSlide(i.index(),e,!1):this.jumpToSlide(i.index(),e,null,!1))},ae.prototype.isCurrentSlide=function(e){return this.currentSlideIndex===e},ae.prototype.getCurrentSlideIndex=function(){return this.currentSlideIndex},ae.prototype.attachAllElements=function(){for(var e=this.$slidesWrapper.children(),t=0;t<this.slides.length;t++)this.attachElements(e.eq(t),t);void 0!==this.summarySlideObject&&this.summarySlideObject.updateSummarySlide(this.slides.length-1,!0)},ae.prototype.processJumpToSlide=function(e,t,i){var n=this;if(void 0===this.editor&&this.contentId){var s=this.createXAPIEventTemplate("progressed");s.data.statement.object.definition.extensions["http://id.tincanapi.com/extension/ending-point"]=e+1,this.trigger(s)}if(!this.$current.hasClass("h5p-animate")){var r=this.$current.addClass("h5p-animate"),o=n.$slidesWrapper.children(),a=o.filter(":lt("+e+")");this.$current=o.eq(e).addClass("h5p-animate");var l=this.currentSlideIndex;this.currentSlideIndex=e,this.attachElements(this.$current,e);var d=this.$current.next();return d.length&&this.attachElements(d,e+1),this.setOverflowTabIndex(),setTimeout((function(){r.removeClass("h5p-current"),r.find(".h5p-element-inner").attr("tabindex","-1"),o.css({"-webkit-transform":"","-moz-transform":"","-ms-transform":"",transform:""}).removeClass("h5p-touch-move").removeClass("h5p-previous"),a.addClass("h5p-previous"),n.$current.addClass("h5p-current"),void 0===n.slidesWithSolutions[n.getCurrentSlideIndex()]&&n.$current.find(".h5p-element-inner").attr("tabindex","0"),n.trigger("changedSlide",n.$current.index())}),1),setTimeout((function(){if(n.$slidesWrapper.children().removeClass("h5p-animate"),void 0===n.editor){var e=n.elementInstances[n.currentSlideIndex],t=n.slides[n.currentSlideIndex].elements;if(void 0!==e)for(var i=0;i<e.length;i++)t[i].displayAsButton||"function"!=typeof e[i].setActivityStarted||"function"!=typeof e[i].getScore||e[i].setActivityStarted()}}),250),void 0!==this.$keywords&&(this.keywordMenu.setCurrentSlideIndex(e),this.$currentKeyword=this.$keywords.find(".h5p-current"),t||this.keywordMenu.scrollToKeywords(e)),n.presentation.keywordListEnabled&&n.presentation.keywordListAlwaysShow&&n.showKeywords(),n.navigationLine&&(n.navigationLine.updateProgressBar(e,l,this.isSolutionMode),n.navigationLine.updateFooter(e),this.setSlideNumberAnnouncer(e,i)),n.summarySlideObject&&n.summarySlideObject.updateSummarySlide(e,!0),void 0!==this.editor&&void 0!==this.editor.dnb&&(this.editor.dnb.setContainer(this.$current),this.editor.dnb.blurAll()),this.trigger("resize"),this.fitCT(),!0}},ae.prototype.jumpToSlide=function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(this.standalone&&this.showSummarySlide&&e===this.slides.length-1&&!this.isSolutionMode&&this.isReportingEnabled&&!r){if(this.currentSlideIndex===this.slides.length-1)return!1;var o=ne({headerText:this.l10n.confirmDialogHeader,dialogText:this.l10n.confirmDialogText,confirmText:this.l10n.confirmDialogConfirmationText});o.on("canceled",(function(){return!1})),o.on("confirmed",(function(){t.processJumpToSlide(e,i,s),n&&n()}))}else this.processJumpToSlide(e,i,s),n&&n()},ae.prototype.setOverflowTabIndex=function(){void 0!==this.$current&&this.$current.find(".h5p-element-inner").each((function(){var e,t=n(this);this.classList.contains("h5p-table")&&(e=t.find(".h5p-table").outerHeight());var i=t.closest(".h5p-element-outer").innerHeight();void 0!==e&&null!==i&&e>i&&t.attr("tabindex",0)}))},ae.prototype.setSlideNumberAnnouncer=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i="";if(!this.navigationLine)return i;var n=this.slides[e],s=n.keywords&&n.keywords.length>0;s&&!this.navigationLine.isSummarySlide(e)&&(i+=this.l10n.slide+" "+(e+1)+": "),i+=this.navigationLine.createSlideTitle(e),this.$slideAnnouncer.html(i),t&&this.$slideTop.focus()},ae.prototype.resetTask=function(){this.summarySlideObject.toggleSolutionMode(!1);for(var e=0;e<this.slidesWithSolutions.length;e++)if(void 0!==this.slidesWithSolutions[e])for(var t=0;t<this.slidesWithSolutions[e].length;t++){var i=this.slidesWithSolutions[e][t];i.resetTask&&i.resetTask()}this.navigationLine.updateProgressBar(0),this.jumpToSlide(0,!1),this.$container.find(".h5p-popup-overlay").remove()},ae.prototype.showSolutions=function(){for(var e=!1,t=[],i=!1,n=0;n<this.slidesWithSolutions.length;n++){if(void 0!==this.slidesWithSolutions[n]){this.elementsAttached[n]||this.attachElements(this.$slidesWrapper.children(":eq("+n+")"),n),e||(this.jumpToSlide(n,!1),e=!0);for(var s=0,r=0,o=[],a=0;a<this.slidesWithSolutions[n].length;a++){var l=this.slidesWithSolutions[n][a];void 0!==l.addSolutionButton&&l.addSolutionButton(),l.showSolutions&&l.showSolutions(),l.showCPComments&&l.showCPComments(),void 0!==l.getMaxScore&&(r+=l.getMaxScore(),s+=l.getScore(),i=!0,o.push(l.coursePresentationIndexOnSlide))}t.push({indexes:o,slide:n+1,score:s,maxScore:r})}if(this.showCommentsAfterSolution[n])for(a=0;a<this.showCommentsAfterSolution[n].length;a++)"function"==typeof this.showCommentsAfterSolution[n][a].showCPComments&&this.showCommentsAfterSolution[n][a].showCPComments()}if(i)return t},ae.prototype.getSlideScores=function(e){for(var t=!0===e,i=[],n=!1,s=0;s<this.slidesWithSolutions.length;s++)if(void 0!==this.slidesWithSolutions[s]){this.elementsAttached[s]||this.attachElements(this.$slidesWrapper.children(":eq("+s+")"),s),t||(this.jumpToSlide(s,!1),t=!0);for(var r=0,o=0,a=[],l=0;l<this.slidesWithSolutions[s].length;l++){var d=this.slidesWithSolutions[s][l];void 0!==d.getMaxScore&&(o+=d.getMaxScore(),r+=d.getScore(),n=!0,a.push(d.coursePresentationIndexOnSlide))}i.push({indexes:a,slide:s+1,score:r,maxScore:o})}if(n)return i},ae.prototype.getCopyrights=function(){var e,t=new H5P.ContentCopyrights;if(this.presentation&&this.presentation.globalBackgroundSelector&&this.presentation.globalBackgroundSelector.imageGlobalBackground){var i=this.presentation.globalBackgroundSelector.imageGlobalBackground,n=new H5P.MediaCopyright(i.copyright);n.setThumbnail(new H5P.Thumbnail(H5P.getPath(i.path,this.contentId),i.width,i.height)),t.addMedia(n)}for(var s=0;s<this.slides.length;s++){var r=new H5P.ContentCopyrights;if(r.setLabel(this.l10n.slide+" "+(s+1)),this.slides[s]&&this.slides[s].slideBackgroundSelector&&this.slides[s].slideBackgroundSelector.imageSlideBackground){var o=this.slides[s].slideBackgroundSelector.imageSlideBackground,a=new H5P.MediaCopyright(o.copyright);a.setThumbnail(new H5P.Thumbnail(H5P.getPath(o.path,this.contentId),o.width,o.height)),r.addMedia(a)}if(void 0!==this.elementInstances[s])for(var l=0;l<this.elementInstances[s].length;l++){var d=this.elementInstances[s][l];if(this.slides[s].elements[l].action){var c=this.slides[s].elements[l].action.params,h=this.slides[s].elements[l].action.metadata;e=void 0,void 0!==d.getCopyrights&&(e=d.getCopyrights()),void 0===e&&(e=new H5P.ContentCopyrights,H5P.findCopyrights(e,c,this.contentId,{metadata:h,machineName:d.libraryInfo.machineName}));var p=l+1;void 0!==c.contentName?p+=": "+c.contentName:void 0!==d.getTitle?p+=": "+d.getTitle():c.l10n&&c.l10n.name&&(p+=": "+c.l10n.name),e.setLabel(p),r.addContent(e)}}t.addContent(r)}return t},ae.prototype.getXAPIData=function(){var e=this.createXAPIEventTemplate("answered"),t=e.getVerifiedStatementValue(["object","definition"]);H5P.jQuery.extend(t,{interactionType:"compound",type:"http://adlnet.gov/expapi/activities/cmi.interaction"});var i=this.getScore(),n=this.getMaxScore();e.setScoredResult(i,n,this,!0,i===n);var s=o(this.slidesWithSolutions).map((function(e){if(e&&e.getXAPIData)return e.getXAPIData()})).filter((function(e){return!!e}));return{statement:e.data.statement,children:s}},ae.prototype.getContext=function(){return{type:"slide",value:this.currentSlideIndex+1}};const le=ae;H5P=H5P||{},H5P.CoursePresentation=le})()})();;
