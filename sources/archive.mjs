const getUrls = () => {
  const urls = []

  const fs = require('fs')
  const text = fs.readFileSync('./raw-note-list.html').toString('utf-8')
  const lines = text.split('\n')
  for (var i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const noteIdRe = /"\/note\/\d+"/
    const result = noteIdRe.exec(line)
    if (result !== null) {
      const noteId = result[0].split('/')[2].split('"')[0]
      const url = `https://douban.com/note/${noteId}`
      while (true) {
        i += 1
        const line = lines[i]
        const titleRe = /<h3 class="title">.+<\/h3>/
        const result = titleRe.exec(line)
        if(result!==null){
          const title = result[0].split('>')[1].split('<')[0]
          urls.push([url, title])
          break
        }
      }
    }
  }
  return urls
}


const urls = getUrls()
$`echo "${urls.map((url) => (url[0]))}" > urls.txt`


// const getCommand = (url, fileName) => `docker run singlefilez "${url}" > ${fileName}`
// const cmds = []
// urls.map((url) => {
//   cmds.push(getCommand(url[0], `${url[1]}.html`))
// })
// 
// $.quote = (s) => s
// 
// for(let i = 0; i < cmds.length; i += 1){
//   await $`${cmds[i]}`
//   await $`sleep 5`
// }
