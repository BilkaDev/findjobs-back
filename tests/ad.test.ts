import {pool} from "../utils/db";
import {AdRecord} from "../records/ad.record";


const defaultObj = {
    creatorId: "123456789012345678901234567890123456",
    lat: 123456789,
    lon: 123456789,
    name: "Company name123",
    image: "http://image.com",
    title: "Title ads",
    address: "Katowice, mariacka 10",
    salaryMin: 1000,
    salaryMax: 10000,
    technology: "JS,React",
    email: "example@example.com",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum is simply dummy text of the printing and typesetting industry"
}

afterAll(async () => {
    await pool.execute('DELETE FROM `ads` WHERE `name` LIKE "Company name123"')
    await pool.end()
})

test('AdRecord record returns data from database for one entry', async () => {

    const ad = await AdRecord.getOne('123456789012345678901234567890123451');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('123456789012345678901234567890123451');
    expect(ad.name).toBe('phantom js');
    expect(ad.lat).toBe(11.222222);
    expect(ad.lon).toBe(12.1231312);
    expect(ad.creatorId).toBe('123456789012345678901234567890123456');
    expect(ad.image).toBe('https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_960_720.png');
    expect(ad.title).toBe('search junior');
    expect(ad.address).toBe('katowice, mariacka 10');
    expect(ad.salaryMin).toBe(11.0);
    expect(ad.salaryMax).toBe(100.0);
    expect(ad.technology).toBe('js,react');
    expect(ad.email).toBe('company@recrut.com');
    expect(ad.description).toBe('we are  search junior dev');


})

test('AdRecord return null from database for unexisting entry', async () => {
    const ad = await AdRecord.getOne('***');
    expect(ad).toBeNull();
})

