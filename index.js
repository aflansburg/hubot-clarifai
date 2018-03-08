// Commands:
//   hubot what is this [URL] - Identify the contents of an image
//

const Clarifai = require('clarifai')

module.exports = (robot) => {

  const apiKey = 'cabc8e642db646578b364b471de67232'
  if (!apiKey) {
    robot.logger.error('No API key provided for hubot-clarifai... disabling...')
    return
  }

  const app = new Clarifai.App({ apiKey })

  return robot.respond(/what is (?:this |)(.*)/i, (msg) => {
    const { match: [, query] } = msg
    app.models.predict(Clarifai.GENERAL_MODEL, query).then(
      (response) => {
        const outputs = response.outputs.map((output) => {
          return output.data.concepts.map(concept => concept.name).join(', ')
        })
        msg.send(`I'm seeing ${outputs}.`)
      },
      (err) => {
        robot.logger.info(`Failed to fetch request #{request} - statusText: ${err.statusText}`)
        msg.send('wat')
      }
    )
  })
}
