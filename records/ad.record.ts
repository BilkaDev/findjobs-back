import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

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



    }
    private VALIDATION = (obj: NewAdEntity) => {
        if (obj.salaryMax > 9999999 || obj.salaryMin < 0 || obj.salaryMax < 0 || obj.salaryMin > 9999999){
            throw new ValidationError('the price cannot be less than 0 or more than 9999999')
        }
        if (!obj.creatorId || obj.creatorId.length !== 36){
            console.log(obj.creatorId)
            throw new ValidationError('creator id cannot be blank')
        }
        if (!obj.name || obj.name.length > 30){
            throw new ValidationError("Company name cannot be blank or exceed 30 characters")
        }
        if (!obj.address || obj.address.length > 100){
            throw new ValidationError("Address cannot be blank or exceed 100 characters")
        }
        if (!obj.title || obj.title.length > 50){
            throw new ValidationError("Ad title cannot be blank or exceed 50 characters")
        }
        if (!obj.email || obj.email.length > 100){
            throw new ValidationError("Company name cannot be blank or exceed 100 characters")
        }
        if (!obj.technology || obj.technology.length > 100){
            throw new ValidationError("Technology cannot be blank or exceed 100 characters")
        }
        if (!obj.email || obj.email.length > 100){
            throw new ValidationError("Company name cannot be blank or exceed 100 characters")
        }
        if (!obj.description || obj.description.length > 1000){
            throw new ValidationError("Description cannot be blank or exceed 1000 characters")
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('The ad cannot be located.');
        }
    }

}