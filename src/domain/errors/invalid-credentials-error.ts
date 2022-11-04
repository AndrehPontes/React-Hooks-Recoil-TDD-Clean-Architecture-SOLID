export class InvalidCredentialError extends Error {
  constructor () {
    super('Credenciais invalidas')
    this.name = 'InvalidCredentialError'
  }
}
