import { ImageDetail } from './image.model';

export class Project {
    name: string;
    description: string;
    category: string;
    images: ImageDetail[];

    constructor(name: string, description: string, category: string, images: ImageDetail[]) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.images = images;
    }

}

