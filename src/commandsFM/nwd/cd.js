import { chdir } from 'node:process'
import { showUserPath, handleErrors } from '../../helpers.js'

export default async function cd([path]) {
  try {
    chdir(path)
    showUserPath()
  } catch (err) {
    handleErrors(err)
  }
}
