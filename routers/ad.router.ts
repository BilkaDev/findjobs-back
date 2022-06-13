import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import {HtmlError} from "../utils/errors";

export const adRouter = Router();

adRouter.get('/', async (req, res) => {
    const ads = await AdRecord.findAll('');
    res.json({
        ads,
    });
})
    .get('/:adId', async (req, res) => {
        const {adId} = req.params;
        const ad = await AdRecord.getOne(adId);
        if (ad === null) {
            throw new HtmlError('Could not find a ad for the provided id.', 404);
        }

        res.json({
            ad,
        });
    })

    .get('/search/:name', async (req, res) => {
        const {name} = req.params;
        const ad = await AdRecord.findAll(name);
        res.json({
            ad,
        });
    })

    .get('/user/:uId', async (req, res) => {
        const {uId} = req.params;
        const ads = await AdRecord.getUserAds(uId);
        res.json({
            ads,
        });
    })
    .post('/', async (req, res) => {
        const newAd = new AdRecord(req.body);
        await newAd.insert();

        res.status(201)
            .json({
                newAd,
            });
    })
    .patch('/:aId', async (req, res) => {
        const {aId} = req.params;
        const body = req.body;
        const ad = await AdRecord.getOne(aId);
        if (ad.id !== body.id) {
            throw new HtmlError('id must be provided.', 400);
        }
        if (ad === null) {
            throw new HtmlError('Could not find a ad for the provided id.', 404);
        }
        const updateAd = new AdRecord({...body});
        await updateAd.update();
        res.status(200).json({
            updateAd
        });

    })
    .delete('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);

        if (!ad) {
            throw new HtmlError('No such ad.', 404);
        }

        await ad.delete();
        res.end();
    });

