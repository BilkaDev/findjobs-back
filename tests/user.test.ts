import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types/user-entity";

const defaultObj = {
    name: "Mateo Woj",
    email: "example@example.com",
    password: "123456",
};


test('UserRecord.getUser record returns data from database for one entry', async () => {

    const user = await UserRecord.getUser('123456789012345678901234567890123456');

    expect(user).toBeDefined();
    expect(user.id).toBe('123456789012345678901234567890123456');
    expect(user.name).toBe('andrzej bialy');
    expect(user.email).toBe('andrzej@bialy.com');
    expect((user as UserEntity).password).not.toBeDefined();


});

test('UserRecord.getOne return null from database for unexisting entry', async () => {
    const user = await UserRecord.getUser('***');
    expect(user).toBeNull();
});
test('UserRecord.singup returns new UUID', async () => {
    const user = new UserRecord(defaultObj);
    await user.singup();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
});

test('UserRecord.singup inserts data to database', async () => {
    const user = new UserRecord(defaultObj);
    await user.singup();
    const foundUser = await UserRecord.getUser(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(user.id);
});

test('UserRecord.login returns id,email,name and password not defined', async () => {
    const user = new UserRecord({
        email: "example@example.com",
        password: "123456",
        name: "login"
    });

    const login = await user.login();
    expect(login.id).toBeDefined();
    expect(login.email).toBe("example@example.com");
    expect(login.name).toBeDefined();
});

test('UserRecord.login validate email', async () => {
    const user = new UserRecord({
        email: "esfsfe@examsdfsafple.com",
        password: "123456",
        name: "login"
    });

    await expect(async () => await user.login()).rejects.toThrow("Invalid credentials, could not login");
});
test('UserRecord.login validate password', async () => {
    const user = new UserRecord({
        email: "esfsfe@examsdfsafple.com",
        password: "asdfgasdf",
        name: "login"
    });

    await expect(async () => await user.login()).rejects.toThrow("Invalid credentials, could not login");
});



