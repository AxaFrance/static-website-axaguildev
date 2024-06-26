const fs = require("fs-extra")
const args = process.argv
const GITHUB_TOKEN = args[2]

try {
  const dir = "./tmp"
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const execSync = require("child_process").execSync
  let child = execSync(
    `git clone https://toto:${GITHUB_TOKEN}@github.com/AxaGuilDEv/axafrance.github.io ./tmp/axafrance.github.io/`
  )
  console.log("error", child.error)
  console.log("stdout ", child.stdout)
  console.log("stderr ", child.stderr)

  fs.copySync(`./public`, `./tmp/axafrance.github.io/`)

  child = execSync(
    `cd ./tmp/axafrance.github.io/ && git add . && git commit -m "static Website axafrance publish" && git push`
  )
  console.log("error", child.error)
  console.log("stdout ", child.stdout)
  console.log("stderr ", child.stderr)

  console.log("success!")
} catch (err) {
  console.error(err)
}
