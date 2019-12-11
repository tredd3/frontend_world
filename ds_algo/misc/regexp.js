new RegExp(/ab+c/, 'i'); // literal notation - if ur regex doesn't change on every compilation
new RegExp('ab+c', 'i'); // constructor - regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input

var names = 'Orange Carrot ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ';
var pattern = /\s*;\s*/;
var nameList = names.split(pattern);
//output ['Orange Carrot','Fred Barney','Helen Rigby','Bill Abel','Chris Hand']

//with and without braces
var str = 'Orange Carrot'
var pattern = /(\w+)\s+(\w+)/;
str.match(pattern)
//output: ['Orange Carrot','Orange','Carrot']

var pattern = /\w+\s+\w+/;
str.match(pattern)
//output: ['Orange Carrot']

var re = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/;
//Within non-capturing parentheses (?: , the regular expression looks for three numeric 
//characters \d{3} OR | a left parenthesis \( followed by three digits \d{3}, followed by 
//a close parenthesis \), (end non-capturing parenthesis )), followed by one dash, forward slash, 
//or decimal point and when found, remember the character ([-\/\.]), followed by three digits
// \d{3}, followed by the remembered match of a dash, forward slash, or decimal point \1, 
//followed by four digits \d{4}.

//possible matches
// 919.909.1657
// 919/909/1657
// 919-909-1657
// (919)/909/1657
// (919).909.1657
// (919)-909-1657

//If you are executing a match simply to find true or false
//use pattern.test() return boolean OR
//use str.search(pattern) return index | -1 if not found
var str = 'Orange Carrot'
var pattern = /(\w+)\s+(\w+)/;

function countWords(sText) {

    for (var rWord = /\w+/g, nCount = 0; rWord.test(sText); nCount++);

    return nCount;

}

console.log(countWords("What a beautiful day!")); // 4

var paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
var regex = /(quick)\s(brown)/g;
var found = paragraph.match(regex);

console.log(found);//Array ["quick brown"]
console.log(regex.exec(paragraph))//Array ["quick brown", "quick", "brown"] it contains parenthesized substring matches,
//if g flag is used we can use exec() in a loop
var myRe = /ab*/g;
var str = 'abbcdefabh';
var myArray;
while ((myArray = myRe.exec(str)) !== null) {
    var msg = 'Found ' + myArray[0] + '. ';
    msg += 'Next match starts at ' + myRe.lastIndex;
    console.log(msg);
}

//instead of exec in a loop we can use matchAll
const matches = str.matchAll(regexp); // matches is a iterator
let array = [...str.matchAll(regexp)]; //we can use spread operator
for (const match of matches) { //we can use for of loop
    console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
}
for (const match of string.matchAll(regex)) {
    console.log(`${match[0]} at ${match.index} with '${match.input}'`);
    console.log(`→ owner: ${match.groups.owner}`);
    console.log(`→ repo: ${match.groups.repo}`);
}

//capturing groups ES18
var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
var result = re.exec('2019-09-21')
//result: ["2019-09-21", "2019", "09", "21", index: 0, input: "2019-09-21", groups: {…}]
//result.groups : {day: "21", month: "09", year: "2019"}

//https://mathiasbynens.be/notes/es-regexp-proposals

var pattern = /(?<fruit>apple|orange)=\k<fruit>/u;
pattern.test('apple=apple')//true
pattern.test('apple=orange')//false

var patt = /(?<firstname>[A-Za-z]+) (?<lastname>[A-Za-z]+$)/u
'tarak reddy'.replace(patt, '$<lastname>, $<firstname>')

//backward lookup
'#winning'.match(/#.*/)[0]; //'#winning' #is included
'#winning'.match(/(?<=#).*/)[0]; //'winning' #is just for verification

