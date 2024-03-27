// ==UserScript==
// @name            Weblate Replace
// @author          ranhai613
// @description     This is a script that replaces certain parts of deepl translation in Weblate.
// @include         /^https?://weblate.hyperq.be/translate/.*$/
// @version         1.1
// ==/UserScript==

(() => {
	var used = false;
    var textarea = document.getElementsByClassName('translation-editor')[0];
  	var copybtn;
  	var parent = document.getElementById('machinery-translations');
  	var observer = new MutationObserver((mutations) => {
    		mutations.forEach((mutation) => {
        		var copybtns = document.getElementsByClassName('js-copy-machinery');
          		copybtn = copybtns[copybtns.length - 1];
      			copybtn.addEventListener('click', () => {
					textarea.addEventListener('input', Replace);
        		});
    		});
		});
  	var config = {
   			childList: true
		};
  	observer.observe(parent, config);
	function Replace(){
		if(used) return;
		textarea.value = Convert(textarea.value);
		used = true;
	}
    function Convert(text){
        var textarry = text.split(/["+「+」+]/);
        for(var i = 0; i < textarry.length; i++){
            if(i % 2 == 1){
                textarry[i] = `「${textarry[i]}」`;
            }
        }
        var newtext = textarry.join('');
        newtext = newtext.replace(/\.\.\.\.\.\./g, '……');
        newtext = newtext.replace(/\.\.\./g, '……');
        newtext = newtext.replace(/!/g, '！');
        newtext = newtext.replace(/\?/g, '？');
      	newtext = newtext.replace(/よそ者/g, 'よぉそ者');
      	newtext = newtext.replace(/多元宇宙/g, 'マルチバース');
        return newtext;
    }
})();