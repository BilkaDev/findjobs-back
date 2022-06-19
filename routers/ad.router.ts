import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import {HttpError, ValidationError} from "../utils/errors";
import checkAuth from "../utils/check-auth";
import {AuthReq} from "../types";
import {fileUpload} from "../utils/file-upload";
import path from "path";
import {rm} from "fs/promises";


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
            throw new HttpError('Could not find a ad for the provided id.', 404);
        }

        res.json({
            ad,
        });
    })

    .get('/search/:name', async (req, res) => {
        const {name} = req.params;
        const ads = await AdRecord.findAll(name);
        res.json({
            ads,
        });
    })

    .get('/user/:uId', async (req, res) => {
        const {uId} = req.params;
        const ads = await AdRecord.getUserAds(uId);
        res.json({
            ads,
        });
    })
    .use(checkAuth)
    .post('/', fileUpload.single('image'), async (req: AuthReq, res) => {
        const newAd = new AdRecord(
            {
                ...req.body,
                lat: parseFloat(req.body.lat),
                lon: parseFloat(req.body.lon),
                salaryMin: parseFloat(req.body.salaryMin),
                salaryMax: parseFloat(req.body.salaryMax),
                image: req.file.path,
            });
        await newAd.insert();

        if (newAd.creatorId !== req.userData.user.userId) {
            throw new ValidationError('You are not allowed to Added this ad.');
        }

        res.status(201)
            .json({
                newAd,
            });
    })
    .patch('/:aId', async (req: AuthReq, res) => {
        const {aId} = req.params;
        const body = req.body;
        const ad = await AdRecord.getOne(aId);
        if (ad === null) {
            throw new HttpError('Could not find a ad for the provided id.', 404);
        }
        if (ad.creatorId !== req.userData.user.userId) {
            throw new ValidationError('You are not allowed to edit this ad.');
        }
        if (ad.id !== body.id) {
            throw new HttpError('id must be provided.', 400);
        }
        const updateAd = new AdRecord({...body});
        await updateAd.update();
        res.status(200).json({
            updateAd
        });

    })
    .delete('/:id', async (req: AuthReq, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        if (!ad) {
            throw new HttpError('No found ad.', 404);
        }
        if (ad.creatorId !== req.userData.user.userId) {
            throw new ValidationError('You are not allowed to delete this ad.');
        }
        const pathImage = path.join(__dirname, '..', ad.image);
        await ad.delete();
        await rm(pathImage);
        res.status(200).json({message: "Delete ad successfully"});
    });

