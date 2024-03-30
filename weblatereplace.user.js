// ==UserScript==
// @name            Weblate Replace
// @author          ranhai613
// @description     This is a script that replaces certain parts of deepl translation in Weblate.
// @include         /^https?://weblate\.hyperq\.be/translate/.*$/
// @version         2.0
// ==/UserScript==

(() => {
    let pattdict = {
        '......': '……',
        '...': '……',
        '!': '！',
        '?': '？',
        'よそ者': 'よぉそ者',
        '多元宇宙': 'マルチバース',
        'ナメクジ': 'スラッグ',
    }


    let firstpers = {
        'わ': {
            'kanji': '私',
            'hira': 'わたし',
            'plural': '私たち',
        },
        'ぼ': {
            'kanji': '僕',
            'hira': 'ぼく',
            'plural': '僕たち',
        },
        'お': {
            'kanji': '俺',
            'hira': 'おれ',
            'plural': '俺たち',
        },
        'う': {
            'kanji': 'ウチ',
            'hira': 'ウチ',
            'plural': 'ウチら',
        },
    }

    let secondpers = {
        'あ': {
            'kanji': 'あなた',
            'hira': '貴方',
            'plural': 'あなた達',
        },
        'き': {
            'kanji': '君',
            'hira': 'きみ',
            'plural': '君たち',
        },
        'お': {
            'kanji': 'お前',
            'hira': 'おまえ',
            'plural': 'お前たち',
        },
        'ん': {
            'kanji': 'あんた',
            'hira': 'あんた',
            'plural': 'あんたら',
        },
    }

    let personarry = [firstpers, secondpers];

    let onclick = false
    let textarea = document.getElementsByClassName('translation-editor')[0];
    textarea.addEventListener('input', () => {
        textarea.value = PersonReplace(textarea.value);
        if (!onclick) return;
        textarea.value = Convert(textarea.value);
        onclick = false;
    });
    let parent = document.getElementById('machinery-translations');
    let observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            let copybtns = parent.getElementsByClassName('js-copy-machinery');
            let copybtn = copybtns[copybtns.length - 1];
            copybtn.addEventListener('click', () => {
                onclick = true;
            });
        });
    });
    let config = {
        childList: true
    }
    observer.observe(parent, config);


    function Convert(text) {
        let textarry = text.split(/["「」]+/);
        for (let i = 0; i < textarry.length; i++) {
            if (i % 2 == 1) textarry[i] = `「${textarry[i]}」`;
        }
        let newtext = textarry.join('');
        for (let key in pattdict) {
            newtext = newtext.replaceAll(key, pattdict[key]);
        }
        return newtext;
    }


    let searchtxt = '(';
    personarry.forEach((dict) => {
        searchtxt += '[';
        for (key in dict) {
            searchtxt += key;
        }
        searchtxt += ']';
    });
    searchtxt += '「)';
    function PersonReplace(text) {
        let textarry = text.split(new RegExp(searchtxt));
        if (textarry.length < 2) return text;
        let newtext = textarry[0];
        for (let i = 1; i < textarry.length; i++) {
            if (i % 2 == 1) {
                let targetarry = textarry[i + 1].split('」');
                personarry.forEach((dict, j) => {
                    for (let key in dict) {
                        if (textarry[i][j] == key) {
                            let patttxt = '';
                            for (let target in dict) {
                                if (target == key) continue;
                                patttxt += `|(${dict[target]['kanji']})|(${dict[target]['hira']})`;
                            }
                            patttxt = patttxt.substring(1);
                            let pluraltxt = `(${patttxt})(達|(たち)|ら)`;
                            targetarry[0] = targetarry[0].replaceAll(new RegExp(pluraltxt, 'g'), dict[key]['plural']);
                            targetarry[0] = targetarry[0].replaceAll(new RegExp(patttxt, 'g'), dict[key]['kanji']);
                        }
                    }
                });
                newtext += '「' + targetarry.join('」');
            }
        }
        return newtext;
    }
})();