const promptly = require('promptly');
const { generate } = require('omni-pass-core')

const args = require('yargs')
.alias('h', 'help')
.alias('v', 'version')
.option('username', {
  alias: 'u',
  type: 'string',
  desc: 'Your Master Username'
})
.option('site', {
  alias: 's',
  type: 'string',
  desc: 'The site you are generating for'
})
.option('name', {
  alias: 'name',
  default: 'password',
  type: 'string',
  desc: 'What you are generating e.g. password, username, etc'
})
.option('counter', {
  alias: 'c',
  type: 'number',
  default: 1,
  desc: 'For ease of regeneration of new passes'
})
.option('length', {
  alias: 'l',
  type: 'number',
  default: 16,
  desc: 'The length of the generated string'
})
.argv;

(async () => {
  if (!args.username) {
    args.username = await promptly.prompt('master username: ')
  }
  args.password = await promptly.prompt('master password: ', { silent: true })
  if (!args.site) {
    args.site = await promptly.prompt('Site: ')
  }

  console.log()
  console.log(await generate(args.username, args.password, {
    name: args.site,
    counter: args.counter,
    context: args.name,
    length: args.length,
  }))
})()

