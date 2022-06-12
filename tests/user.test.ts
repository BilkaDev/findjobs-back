import {AdRecord} from "../records/ad.record";


test('UserRecord.singup return null from database for unexisting entry', async () => {
    const ad = await AdRecord.getOne('***');
    expect(ad).toBeNull();
});