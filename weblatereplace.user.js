// ==UserScript==
// @name            Weblate Replace
// @author          ranhai613
// @description     This is a script that replaces certain parts of deepl translation in Weblate.
// @include         /^https?://weblate.hyperq.be/translate/.*$/
// @version         1.2
// ==/UserScript==

(() => {
    var pattdict = {
        '......': '……',
        '...': '……',
        '!': '！',
        '?': '？',
        'よそ者': 'よぉそ者',
        '多元宇宙': 'マルチバース',
        'ナメクジ': 'スラッグ',
    }


    var onclick = false
    var textarea = document.getElementsByClassName('translation-editor')[0];
    textarea.addEventListener('input', () => {
        if (!onclick) return;
        textarea.value = Convert(textarea.value);
        onclick = false;
    });
    var parent = document.getElementById('machinery-translations');
    var observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            var copybtns = document.getElementsByClassName('js-copy-machinery');
            var copybtn = copybtns[copybtns.length - 1];
            copybtn.addEventListener('click', () => {
                onclick = true;
            });
        });
    });
    var config = {
        childList: true
    };
    observer.observe(parent, config);


    function Convert(text) {
        var textarry = text.split(/["「」]+/);
        for (var i = 0; i < textarry.length; i++) {
            if (i % 2 == 1) textarry[i] = `「${textarry[i]}」`;
        }
        var newtext = textarry.join('');
        for (var key in pattdict) {
            newtext = newtext.replaceAll(key, pattdict[key]);
        }
        return newtext;
    }
})();
