import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Login from './login'

type SutTypes = {
    sut: RenderResult,
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />) 
    return {
        sut,
        authenticationSpy
    }
}

describe('Login Component', () => {
    test('Should start width initial state', () => {
        const validationError =  faker.random.words()
        const { sut } =  makeSut({validationError})
        const errorWarp =  sut.getByTestId('error-warp')
        expect (errorWarp.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect (submitButton.disabled).toBe(true)
        const emailStatus = sut.getByTestId('email-status')
        expect (emailStatus.title).toBe(validationError)
        expect (emailStatus.textContent).toBe(" 🔴 ")
        const passwordStatus =  sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe(" 🔴 ")
    })

    
    test('Should show email error if Validation fails', () => {
        const validationError =  faker.random.words()
        const { sut } =  makeSut({validationError})
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe(" 🔴 ")
    })

    test('Should show password error if Validation fails', () => {
        const validationError =  faker.random.words()
        const { sut } =  makeSut({validationError})
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.email()} })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe(" 🔴 ")
    })

    test('Should show valid email if Validation succeeds', () => {
        const { sut} = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email()} })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('Tudo certo!')
        expect(emailStatus.textContent).toBe(" 🟢 ")
    })

    test('Should show valid password if Validation succeeds', () => {
        const { sut } = makeSut() 
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.email()} })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Tudo certo!')
        expect(passwordStatus.textContent).toBe(" 🟢 ")
    })

    test('Should show valid password if Validation succeeds', () => {
        const { sut} = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password()} })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Tudo certo!')
        expect(passwordStatus.textContent).toBe(" 🟢 ")
    })

    test('Should enable submit button if form is valid', () => {
        const { sut} = makeSut()
        const emaildInput = sut.getByTestId('password')
        fireEvent.input(emaildInput, { target: { value: faker.internet.email()} })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password()} })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect (submitButton.disabled).toBe(false)
    })

    test('Should show spinner on submit', () => {
        const { sut} = makeSut()
        const emaildInput = sut.getByTestId('email')
        fireEvent.input(emaildInput, { target: { value: faker.internet.email()} })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password()} })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        const spinner =  sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('Should call Authentication width correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const emaildInput = sut.getByTestId('email')
        const email= faker.internet.email()
        fireEvent.input(emaildInput, { target: { value: email } })
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()
        fireEvent.input(passwordInput, { target: { value: password } })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

})