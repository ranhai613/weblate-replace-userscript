// ==UserScript==
// @name            Weblate Replace
// @author          ranhai613
// @description     This is a script that replaces certain parts of deepl translation in Weblate.
// @include         /^https?://weblate.hyperq.be/translate/.*$/
// @version         1.0
// ==/UserScript==

(() => {
    var textarea = document.getElementsByClassName('translation-editor')[0];
    textarea.addEventListener('input', Replace);
    var used = false;
    function Replace(){
        if(used){
            return;
        }
        document.getElementsByClassName('translation-editor')[0].value = Convert(textarea.value);
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
        return newtext;
    }
})();