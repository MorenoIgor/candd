var fs = require('fs');

let chapter_count = 0
let pages_array = []

const data = fs.readFileSync(__dirname+'/Cavernas AND Dragões.md', 'utf8');

   // Define the regex for Markdown headers
   const headerRegex = /^(#{1})\s+(.*)/gm;

   // Use match() to find all occurrences
   const chapters = data.match(headerRegex);

   let chapter_text
   let page_text

   chapter_count = chapters.length

    for (let c=0;c<chapters.length;c++) {

        if (c<chapters.length-1) {
            chapter_text = chapters[c] + extractString(data,chapters[c],chapters[c+1])
        } else {
            chapter_text = chapters[c] + data.split(chapters[c])[1]
        }

        chapter_text = insertImages(chapter_text)

        fs.writeFileSync(__dirname+`/public/text-markdown/${c}.md`, chapter_text);

        let pages = chapter_text.match(/^(##{1})\s+(.*)/gm)

        if (c==0) {
            pages_array[c] = 0
            continue
        }

        pages_array[c] = pages.length

        page_text = chapter_text.split(pages[0])[0]

        fs.writeFileSync(__dirname+`/public/text-markdown/${c}-0.md`, page_text);

        for (let p=0;p<pages.length;p++) {

            if (p<pages.length-1) {
                page_text = pages[p] + extractString(chapter_text,pages[p],pages[p+1])
            } else {
                page_text = pages[p] + chapter_text.split(pages[p])[1]
            }

            //page_text = insertImages(page_text)

            fs.writeFileSync(__dirname+`/public/text-markdown/${c}-${p+1}.md`, page_text);

        }


    }

    let chapter_index = {
        chapter_count: chapter_count,
        pages_array: pages_array
    }

    fs.writeFileSync(__dirname+`/public/chapter_index.json`, JSON.stringify(chapter_index));

function insertImages(text) {

    let matches = text.match(/€([^€]*)€/g)
    let repl

    if (matches==null) return text

    for (let i of matches) {

        let base = i.replaceAll('€','')
        let arguments = base.split(',')

        arguments[1] = arguments[1].replaceAll(" ","%20")

        repl = `![${arguments[2]}](/art/${arguments[0]}/${arguments[1]}.png "${arguments[2]}")`
        
        text = text.replaceAll(i,repl)

    }

    return text

}

//https://gist.github.com/GuillaumeJasmin/9119436
function extractString(s,prefix, suffix) {
    var i = s.indexOf(prefix);
    if (i >= 0) {
        s = s.substring(i + prefix.length);
    }
    else {
        return '';
    }
    if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
            s = s.substring(0, i);
        }
        else {
            return '';
        }
    }
    return s;
};