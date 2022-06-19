import {UserRecord} from "../records/user.record";


const defaultObj = {
    name: "Mateo Woj",
    email: "example@example.com",
    password: "123456",

}

test('Can build AdRecord', () => {
    const ad = new UserRecord(defaultObj)

    expect(ad.name).toBe('Mateo Woj')
    expect(ad.password).toBe('123456')
    expect(ad.email).toBe('example@example.com')
})


test('validate invalid name', () => {

    expect(() => new UserRecord({
        ...defaultObj,
        name: undefined,
    })).toThrow("Name cannot be blank or exceed 30 characters");
    expect(() => new UserRecord({
        ...defaultObj,
        name: '1234567890123456789012345678901aaaaaaaaaaaaaa',
    })).toThrow("Name cannot be blank or exceed 30 characters")

})

test('validate invalid email', () => {

    expect(() => new UserRecord({
        ...defaultObj,
        email: undefined,
    })).toThrow("Email cannot be blank or exceed 100 characters")
    expect(() => new UserRecord({
        ...defaultObj,
        email: '1234567890123456789012345678901aaaaaaaaaaaaaa1234567890123456789012345678901aaaaaaaaaaaaaa1234567890123456789012345678901aaaaaaaaaaaaaa1234567890123456789012345678901aaaaaaaaaaaaaa1234567890123456789012345678901aaaaaaaaaaaaaa',
    })).toThrow("Email cannot be blank or exceed 100 characters")

})

test('validate invalid password', () => {

    expect(() => new UserRecord({
        ...defaultObj,
        password: undefined,
    })).toThrow("invalid password")
    expect(() => new UserRecord({
        ...defaultObj,
        password: '1234567890123456789012345678901aaaaaaaaaaaaaa',
    })).toThrow("invalid password")

})