/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Hydration failed')) {
    return false
  }
})

describe('Validação de Login', () => {
  it('limita email a 50 caracteres', () => {
    cy.visit('http://localhost:9002/login')
    const longText = 'a'.repeat(55)
    cy.get('input[name="email"]').type(longText)
    cy.get('input[name="email"]').invoke('val').should('have.length', 50)
  })

  it('limita senha a 50 caracteres', () => {
    cy.visit('http://localhost:9002/login')
    const longText = 'b'.repeat(60)
    cy.get('input[name="password"]').type(longText)
    cy.get('input[name="password"]').invoke('val').should('have.length', 50)
  })

  it('exibe erro quando email é vazio', () => {
    cy.visit('http://localhost:9002/login')
    cy.get('button[type="submit"]').click()
    cy.contains('E-mail inválido.').should('be.visible')
  })

  it('exibe erro quando senha é vazia', () => {
    cy.visit('http://localhost:9002/login')
    cy.get('input[name="email"]').type('teste@example.com')
    cy.get('button[type="submit"]').click()
    cy.contains('Senha deve ter no mínimo 6 caracteres.').should('be.visible')
  })

  it('realiza login com dados válidos', () => {
    cy.visit('http://localhost:9002/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/login')
  })
})

describe('Validação de Cadastro de Usuário', () => {
  it('limita nome a 50 caracteres', () => {
    cy.visit('http://localhost:9002/register/user')
    const longName = 'n'.repeat(60)
    cy.get('input[name="name"]').type(longName)
    cy.get('input[name="name"]').invoke('val').should('have.length', 50)
  })

  it('exibe erro para nome curto', () => {
    cy.visit('http://localhost:9002/register/user')
    cy.get('input[name="name"]').type('ab')
    cy.get('button[type="submit"]').click()
    cy.contains('Nome deve ter no mínimo 3 caracteres.').should('be.visible')
  })

  it('valida email e limite', () => {
    cy.visit('http://localhost:9002/register/user')
    const longEmail = `${'e'.repeat(45)}@test.com`
    cy.get('input[name="email"]').type(longEmail)
    cy.get('input[name="email"]').invoke('val').should('have.length', 50)
  })

  it('valida senha mínima e máxima', () => {
    cy.visit('http://localhost:9002/register/user')
    const longPass = 'p'.repeat(55)
    cy.get('input[name="password"]').type(longPass)
    cy.get('input[name="password"]').invoke('val').should('have.length', 50)
  })

  it('exibe erro para senha curta', () => {
    cy.visit('http://localhost:9002/register/user')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('Senha deve ter no mínimo 6 caracteres.').should('be.visible')
  })
})

describe('Validação de Cadastro de Advogado', () => {
  it('limita nome a 50 caracteres', () => {
    cy.visit('http://localhost:9002/register/lawyer')
    cy.get('input[name="name"]').type('a'.repeat(55))
    cy.get('input[name="name"]').invoke('val').should('have.length', 50)
  })

  it('valida email e tamanho', () => {
    cy.visit('http://localhost:9002/register/lawyer')
    const longEmail = `${'l'.repeat(45)}@law.com`
    cy.get('input[name="email"]').type(longEmail)
    cy.get('input[name="email"]').invoke('val').should('have.length', 50)
  })

  it('limita senha a 50 caracteres', () => {
    cy.visit('http://localhost:9002/register/lawyer')
    cy.get('input[name="password"]').type('s'.repeat(80))
    cy.get('input[name="password"]').invoke('val').should('have.length', 50)
  })

  it('valida tamanho da OAB', () => {
    cy.visit('http://localhost:9002/register/lawyer')
    cy.get('input[name="oab"]').type('1')
    cy.get('button[type="submit"]').click()
    cy.contains('Número da OAB inválido.').should('be.visible')
  })

  it('exibe erro para senha curta', () => {
    cy.visit('http://localhost:9002/register/lawyer')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('Senha deve ter no mínimo 6 caracteres.').should('be.visible')
  })
})

describe('Formulário de Submissão de Caso', () => {
  it('valida tamanho mínimo e máximo do título', () => {
    cy.visit('http://localhost:9002/new-cause')
    cy.get('input[name="title"]').type('abc')
    cy.get('button[type="submit"]').click()
    cy.contains('Título deve ter no mínimo 5 caracteres.').should('be.visible')
    const longTitle = 't'.repeat(120)
    cy.get('input[name="title"]').clear().type(longTitle)
    cy.get('input[name="title"]').invoke('val').should('have.length', 100)
  })

  it('valida descrição mínima e máxima', () => {
    cy.visit('http://localhost:9002/new-cause')
    cy.get('textarea[name="description"]').type('curta')
    cy.get('button[type="submit"]').click()
    cy.contains('Descrição deve ter no mínimo 20 caracteres.').should('be.visible')
    const longDesc = 'd'.repeat(2100)
    cy.get('textarea[name="description"]').clear().type(longDesc)
    cy.get('textarea[name="description"]').invoke('val').should('have.length', 2000)
  })
})

describe('Outras Validações', () => {
  it('campo de busca limita 50 caracteres', () => {
    cy.visit('http://localhost:9002/dashboard')
    cy.get('input[aria-label="Buscar casos"]').type('x'.repeat(70))
    cy.get('input[aria-label="Buscar casos"]').invoke('val').should('have.length', 50)
  })

  it('sidebar input aceita no máximo 50 caracteres', () => {
    cy.visit('http://localhost:9002/dashboard')
    cy.get('input.sidebar-input').type('y'.repeat(60))
    cy.get('input.sidebar-input').invoke('val').should('have.length', 50)
  })

  it('mensagem da proposta valida tamanho', () => {
    cy.visit('http://localhost:9002/cases/1')
    cy.get('textarea[name="message"]').type('msg')
    cy.get('button[type="submit"]').click()
    cy.contains('Mensagem deve ter no mínimo 10 caracteres.').should('be.visible')
    cy.get('textarea[name="message"]').clear().type('m'.repeat(1200))
    cy.get('textarea[name="message"]').invoke('val').should('have.length', 1000)
  })
})
