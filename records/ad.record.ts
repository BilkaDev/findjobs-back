import {v4 as uuid} from "uuid";
import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type AdRecordResults = [AdRecord[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    address: string;
    creatorId: string;
    description: string;
    email: string;
    image: string;
    lat: number;
    lon: number;
    name: string;
    salaryMax: number;
    salaryMin: number;
    technology: string;
    title: string;

    constructor(obj: NewAdEntity) {
        this.VALIDATION(obj);

        this.address = obj.address;
        this.creatorId = obj.creatorId;
        this.description = obj.description;
        this.email = obj.email;
        this.image = obj.image;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.name = obj.name;
        this.salaryMax = obj.salaryMax;
        this.salaryMin = obj.salaryMin;
        this.technology = obj.technology;
        this.title = obj.title;
        this.id = obj.id;


    }

    private VALIDATION = (obj: NewAdEntity) => {
        if (obj.salaryMax > 9999999 || obj.salaryMin < 0 || obj.salaryMax < 0 || obj.salaryMin > 9999999) {
            throw new ValidationError('the price cannot be less than 0 or more than 9999999');
        }
        if (!obj.creatorId || obj.creatorId.length !== 36) {
            throw new ValidationError('creator id cannot be blank');
        }
        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError("Company name cannot be blank or exceed 30 characters");
        }
        if (!obj.address || obj.address.length > 100) {
            throw new ValidationError("Address cannot be blank or exceed 100 characters");
        }
        if (!obj.title || obj.title.length > 50 || obj.title.length < 3) {
            throw new ValidationError("Ad title cannot be blank or exceed 50 characters");
        }
        if (!obj.email || obj.email.length > 100) {
            throw new ValidationError("E-mail cannot be blank or exceed 100 characters");
        }
        if (!obj.technology || obj.technology.length > 100) {
            throw new ValidationError("Technology cannot be blank or exceed 100 characters");
        }
        if (!obj.description || obj.description.length > 1000) {
            throw new ValidationError("Description cannot be blank or exceed 1000 characters");
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('The ad cannot be located.');
        }
    };

    static async getOne(adId: string): Promise<AdRecord> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id", {
            id: adId,
        }) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async getUserAds(userId: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `creatorId` = :userId", {
            userId,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                address,
                creatorId,
                email,
                image,
                lat,
                lon,
                name,
                salaryMax,
                salaryMin,
                technology,
                title,
                id,
            } = result;
            return {
                address,
                creatorId,
                email,
                image,
                lat,
                lon,
                name,
                salaryMax,
                salaryMin,
                technology,
                title,
                id,
            };
        });
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search OR `technology` LIKE :search OR `title` LIKE :search OR `address` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                address,
                creatorId,
                email,
                image,
                lat,
                lon,
                name,
                salaryMax,
                salaryMin,
                technology,
                title,
                id,
            } = result;
            return {
                address,
                creatorId,
                email,
                image,
                lat,
                lon,
                name,
                salaryMax,
                salaryMin,
                technology,
                title,
                id,
            };
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that  is already inserted');
        }

        await pool.execute("INSERT INTO `findjobs`.`ads`(`id`, `description`, `email`, `technology`, `address`, `title`, `image`, `name`, `creatorId`, `salaryMin`, `salaryMax`, `lat`, `lon`) VALUES (:id,:description,:email,:technology,:address,:title,:image,:name,:creatorId,:salaryMin,:salaryMax,:lat,:lon)", this);
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `findjobs`.`ads` SET `description` = :description,`email`=:email,`technology`= :technology,`address`=:address,`title`=:title,`name`=:name,`salaryMin`=:salaryMin,`salaryMax`=:salaryMax,`lat`=:lat,`lon`=:lon WHERE  `id`=:id", this);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `findjobs`.`ads` where `id` = :id", {
            id: this.id,
        });
    }


}