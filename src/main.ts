import * as core from '@actions/core'
import * as fs from 'fs/promises'

async function run(): Promise<void> {
  try {
    const envFile = core.getInput('env-file')
    const exampleEnvFile = core.getInput('example-env-file')

    // compare env file with example env file if the env file contains all the variables from the example env file
    // then the env file is valid and the action will pass. if the env file is missing any variables from the example
    // env file then the action will fail and the user will be notified of the missing variables in the env file. If
    // the env file contains variables that are not in the example env file then the action will pass and the user
    // will be notified of the extra variables in the env file.

    // read the env file
    const envFileContents = await fs.readFile(envFile, 'utf8')

    // read the example env file
    const exampleEnvFileContents = await fs.readFile(exampleEnvFile, 'utf8')

    // split the env file contents into an array of lines
    const envFileLines = envFileContents.split('\n')

    // split the example env file contents into an array of lines
    const exampleEnvFileLines = exampleEnvFileContents.split('\n')

    // create an array of variables from the env file
    const envFileVariables = envFileLines.map((line: string) => {
      const [variable] = line.split('=')
      return variable
    })

    // create an array of variables from the example env file
    const exampleEnvFileVariables = exampleEnvFileLines.map((line: string) => {
      const [variable] = line.split('=')
      return variable
    })

    // create an array of missing variables by comparing the example env file variables to the env file variables
    const missingVariables = exampleEnvFileVariables.filter(
      (variable: string) => !envFileVariables.includes(variable)
    )

    // create an array of extra variables by comparing the env file variables to the example env file variables
    const extraVariables = envFileVariables.filter(
      (variable: string) => !exampleEnvFileVariables.includes(variable)
    )

    // if there are missing variables then the action will fail and the user will be notified of the missing variables
    if (missingVariables.length > 0) {
      core.setFailed(
        'The env file is missing variables. Please add the missing variables to the env file.'
      )

      // log the missing variables
      core.info('The following variables are missing from the env file:')
      for (const variable of missingVariables) {
        core.info(`- ${variable}`)
      }

      // log the extra variables
      core.info('The following variables are extra in the env file:')
      for (const variable of extraVariables) {
        core.info(`- ${variable}`)
      }
    } else {
      // if there are no missing variables then the action will pass and the user will be notified of the extra variables
      core.info('The env file is valid.')

      // log the extra variables
      core.info('The following variables are extra in the env file:')
      for (const variable of extraVariables) {
        core.info(`- ${variable}`)
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
