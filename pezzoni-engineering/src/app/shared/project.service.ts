import { Injectable } from "@angular/core";
import { Project } from './project.model';
import { DataStorageService } from './data-storage.service';

@Injectable ({providedIn: 'root'})

export class ProjectService {

    private categories: string[] = ['education', 'healthcare', 'civic', 'industrial']; 

    private projects: Project[] = [];

    private initializedStatus = false;

    // private projects: Project[] = 
    // [
    //     // EDUCATION   ****************************************************************************************
    //     new Project(
    //         'Oakdale Junior High School Gymnasium, Oakdale, CA',
    //         'Pezzoni Enginering provided electrical engineering services for a new Junior High School Gymnasium in Oakdale, CA.',
    //         'education', 
    //         [
    //             new ImageDetail('Oakdale JH Gym', '../../assets/images/education/oakdale-jh.jpg', 'Oakdale JH Gymnasium')
    //         ]),
    //     new Project(
    //         'Modesto Junior College - East Campus Site Lighting, Modesto, CA',
    //         'Our team provided electrical engineering services for the upgrade and augmentation of the site lighting at an existing Junior College campus in Modesto, CA.',
    //         'education', 
    //         [
    //             new ImageDetail('Modesto JC', '../../assets/images/education/mjc.jpg', 'Modesto JC')
    //         ]),
    //     new Project(
    //         'Liberty Ranch High School, Galt, CA',
    //         'The project consisted of electrical engineering services for a new High School in Galt, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Rogge Road Middle School, Salinas, CA',
    //         'Our team provided electrical engineering services for a new Middle School in Salinas, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Modesto High School Modernization, Modesto, CA',
    //         'The project involved a complete modernization of an existing High School in Modesto, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'JFK Special Education, Modesto, CA',
    //         'The JFK Special Education project consisted of the complete modernization of an existing Special Education School in Modesto, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Estrellita High School, Galt, CA',
    //         'Our team provided electrical engineering services for a new High School in Galt, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Flamson Middle School, Flamson, CA',
    //         'Pezzoni Engineering provided electrical engineering services for the addition of a new two story classroom building, including classrooms, offices, a library and a performance auditorium.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Sylvan Union School District Corporation Yard, Modesto, CA',
    //         'The design included a school district corporation yard, including bus service station maintenance facilities in Modesto, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Sylvan Union School District Central Kitchen, Modesto, CA',
    //         'Coordination and design for a school district central kitchen in Modesto, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Somerset Middle School, Modesto, CA',
    //         'The project consisted of the addition of a new classroom building, including classrooms, offices and a multi-purpose room in Modesto, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'University of the Pacific - Gymnasium, Stockton, CA',
    //         'The project included electrical engineering services for a new University Gymnasium in Stockton, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'University of the Pacific - McCaffrey Center, Stockton, CA',
    //         'Our team provided electrical engineering services for a new University student center in Stockton, CA.',
    //         'education', 
    //         [
    //             // no images
    //         ]),
    //         new Project(
    //             'Santa Rita Middle School, Santa Rita, CA',
    //             'Pezzoni Engineering performed electrical engineering services for a new Middle School in Santa Rita, CA.',
    //             'education', 
    //             [
    //                 // no images
    //             ]),
    //         new Project(
    //             'Oakdale High School - Football Stadium, Oakdale, CA',
    //             'Our team provided electrical engineering services for a new Junior High School Gymnasium in Oakdale, CA.',
    //             'education', 
    //             [
    //                 // no images
    //             ]),

    //     // HEALTHCARE   ****************************************************************************************
    //     new Project(
    //         'Mission Hope Cancer Treatment Center, Santa Maria, CA',
    //         'Pezzoni Enginering provided electrical engineering services for a three-story Advanced Cancer Treatment Center. Specialty electrical systems to serve new state-of-the-art diagnostic and treatment systems, including MRI, CT, Cyber Knife, Linear Accelerator and other technologies.',
    //         'healthcare', 
    //         [
    //             new ImageDetail('Mission Hope 1', '../../assets/images/healthcare/mission-hope1.jpg', 'Mission Hope - Front'),
    //             new ImageDetail('Mission Hope 2', '../../assets/images/healthcare/mission-hope2.jpg', 'Mission Hope Lab')
    //         ]),
    //     new Project(
    //         'Kaiser Fresno Site Light Improvement, Fresno, CA',
    //         'The project consisted of the replacement and supplementation of existing lighting system for a medical center parking lot.',
    //         'healthcare', 
    //         [
    //             new ImageDetail('KF Before 1', '../../assets/images/healthcare/kaiser-fresno-before1.jpg', 'Site Lighting Improvement - Before Image 1'),
    //             new ImageDetail('KF Before 2', '../../assets/images/healthcare/kaiser-fresno-before2.jpg', 'Site Lighting Improvement - Before Image 2'),
    //             new ImageDetail('KF After 1', '../../assets/images/healthcare/kaiser-fresno-after1.jpg', 'Site Lighting Improvement - After Image 1'),
    //             new ImageDetail('KF After 2', '../../assets/images/healthcare/kaiser-fresno-after2.jpg', 'Site Lighting Improvement - After Image 2')
    //         ]),
    //     new Project(
    //         'Ruffin Road Cancer Treatment Center, San Diego, CA',
    //         'Our team provided electrical engineering services for the installation of a Gamma Knife, as well as the surrounding support areas and doctors\' offices.',
    //         'healthcare', 
    //         [
    //             new ImageDetail('Ruffin Road Image 1', '../../assets/images/healthcare/ruffin-road1.jpg', 'Ruffin Road Image 1'),
    //             new ImageDetail('Ruffin Road Image 2', '../../assets/images/healthcare/ruffin-road2.jpg', 'Ruffin Road Image 2'),
    //             new ImageDetail('Ruffin Road Image 3', '../../assets/images/healthcare/ruffin-road3.jpg', 'Ruffin Road Image 3'),
    //             new ImageDetail('Ruffin Road Image 4', '../../assets/images/healthcare/ruffin-road4.jpg', 'Ruffin Road Image 4')
    //         ]),
    //     new Project(
    //         'San Ramon Regional Medical Center - Emergency Department & Lab Expansion, San Ramon, CA',
    //         'The Emergency Department and Lab Expansion project included the expansion of the Emergency Department and the remodeling of the existing lab suite.',
    //         'healthcare', 
    //         [
    //             new ImageDetail('San Ramon RMC - ED & Lab', '../../assets/images/healthcare/san-ramon.jpg', 'San Ramon RMC - ED & Lab')
    //         ]),
    //     new Project(
    //         'Kaiser Permanente San Francisco Medical Center - Automatic Transfer Switch Replacement, San Francisco, CA',
    //         'The work consisted of phased replacement of nine Automatic Transfer Switches within the Kaiser Permanente San Francisco Medical Center.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Encinitas Cancer Treatment Center, Encinitas, CA',
    //         'Our team provided electrical engineering services for the installation of two linear accelerators and a Gamma Knife, as well as the surrounding support areas and doctors\' offices.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Kaiser Permanente San Jose Medical Center - ADA Barrier Remediations, San Jose, CA',
    //         'Coordination and design for the upgrade of a variety of existing buildings on campus to current ADA requirements.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Kaiser Permanente Santa Clara Medical Center - ADA Barrier Remediations, Santa Clara, CA',
    //         'Our team provided electrical engineering services for the upgrade of a variety of existing buildings on campus to current ADA requirements.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Kaiser Permanente Martinez Campus - ADA Barrier Remediations, Martinez, CA',
    //         'Pezzoni Engineering performed electrical engineering services for the upgrade of a variety of existing buildings on campus to current ADA requirements.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Kaiser Permanente Pleasanton Campus - ADA Barrier Remediations, Pleasanton, CA',
    //         'Our team provided electrical engineering services for the upgrade of a variety of existing buildings on campus to current ADA requirements.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Sonora Regional Medical Center - Imaging Center, Sonora, CA',
    //         'The project consisted of a stand-alone imaging center, including four pieces of imaging equipment, as well as the surrounding support areas and doctors\' offices.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'Pasadena Cancer Treatment Center, Pasadena, CA',
    //         'The Pasadena Canter Treatment Center project included the installation of two linear accelerators and a Gamma Knife, as well as the surrounding support areas and doctors\' offices.',
    //         'healthcare', 
    //         [
    //             // no images
    //         ]),

    //     // CIVIC   ****************************************************************************************        
    //     new Project(
    //         'Bernal Community Park, Pleasanton, CA',
    //         'This project was an expansion to the existing sport complex which consists of a new pavilion area, three soccer fields and large woodland area. The project had new electrical distribution to support the expansion as well as Musco sport lighting and LED area/parking lighting throughout.',
    //         'civic', 
    //         [
    //             new ImageDetail('Bernal Park Image 1', '../../assets/images/civic/bernal-park1.jpg', 'Bernal Park Image 1'),
    //             new ImageDetail('Bernal Park Image 2', '../../assets/images/civic/bernal-park2.jpg', 'Bernal Park Image 2'),
    //             new ImageDetail('Bernal Park Image 3', '../../assets/images/civic/bernal-park3.jpg', 'Bernal Park Image 3'),
    //             new ImageDetail('Bernal Park Image 4', '../../assets/images/civic/bernal-park4.jpg', 'Bernal Park Image 4')
    //         ]),
    //     new Project(
    //         'McHenry Mansion, Modesto, CA',
    //         'Our team provided electrical engineering services to upgrade the façade lighting for a historic building in downtown Modesto, CA.',
    //         'civic', 
    //         [
    //             new ImageDetail('McHenry Mansion', '../../assets/images/civic/mchenry-mansion.jpg', 'McHenry Mansion')
    //         ]),
    //     new Project(
    //         'City of Modesto - Parks and Recreation, Modesto, CA',
    //         'The project consisted of a variety of improvements to several public parks and public use areas in Modesto, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'City of Modesto - Waste Water Treatment, Modesto, CA',
    //         'Pezzoni Engineering provided electrical engineering services for a variety of lift stations and support buildings imperative to the treatment of waste water in Modesto, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'City of Ripon - Downtown Improvements, Ripon, CA',
    //         'Our team provided electrical engineering services for the downtown improvements including street light and a public address system in Ripon, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'City of Los Banos - Downtown Improvements, Los Banos, CA',
    //         'Downtown improvements included street light and a public address system in Los Banos, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'City of Modesto - Water Utility, Modesto, CA',
    //         'Our team provided electrical engineering services for a variety of well sites and pump stations for the distribution of drinkable water in Modesto, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'USDA Forest Service - Mendocino National Forest Ranger Station, Upper Lake, CA',
    //         'The project consisted of a new ranger\'s station in Upper Lake, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),
    //     new Project(
    //         'City of Patterson - Patterson Sports Complex, Patterson, CA',
    //         'Our team provided electrical engineering services for a new public sports complex in Patterson, CA.',
    //         'civic', 
    //         [
    //             // no images
    //         ]),
        
    //     // INDUSTRIAL   ****************************************************************************************         
    //     new Project(
    //         'Galletto Ristorante, Modesto, CA',
    //         'Our team provided electrical engineering services for a high end restaurant in downtown Modesto, CA.',
    //         'industrial', 
    //         [
    //             new ImageDetail('Galletto Image 1', '../../assets/images/industrial/galletto1.jpg', 'Galletto Image 1'),
    //             new ImageDetail('Galletto Image 2', '../../assets/images/industrial/galletto2.jpg', 'Galletto Image 2'),
    //             new ImageDetail('Galletto Image 3', '../../assets/images/industrial/galletto3.jpg', 'Galletto Image 3')
    //         ]),            
    //     new Project(
    //         'Constantino Winery, Napa, CA',
    //         'The project included electrical engineering services for a complete winery and tasting room in Napa, CA.',
    //         'industrial', 
    //         [                
    //             new ImageDetail('Constantino', '../../assets/images/industrial/constantino.jpg', 'Constantino')
    //         ]),
    //     new Project(
    //         'Juice Processing Plant, Saudi Arabia',
    //         'Pezzoni Engineering provided electrical engineering services for a complete Juice Processing plant in Saudi Arabia.',
    //         'industrial', 
    //         [
    //             new ImageDetail('Juice Plant Image 1', '../../assets/images/industrial/juice-plant1.jpg', 'Juice Plant Image 1'),
    //             new ImageDetail('Juice Plant Image 2', '../../assets/images/industrial/juice-plant2.jpg', 'Juice Plant Image 2')
    //         ]),                
    //     new Project(
    //         'Village West Shopping Center, Modesto, CA',
    //         'The Village West Shopping Center project consisted of site lighting, parking areas and walkways for a shopping center in Modesto, CA.',
    //         'industrial', 
    //         [
    //             new ImageDetail('Village West Image 1', '../../assets/images/industrial/village-west1.jpg', 'Village West Image 1'),
    //             new ImageDetail('Village West Image 2', '../../assets/images/industrial/village-west2.jpg', 'Village West Image 2')
    //         ]),            
    //     new Project(
    //         'Soloman Wine Company, Clarksburg, CA',
    //         'Our team provided electrical engineering services for a winery and its associated tasting room.',
    //         'industrial', 
    //         [               
    //             new ImageDetail('Soloman Wine', '../../assets/images/industrial/soloman-wine.jpg', 'Soloman Wine')
    //         ]),
    //     new Project(
    //         'Spare Time Sports Club, Oakley, CA',
    //         'Designed a complete sports club complex including site lighting for parking and tennis courts.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Regent Hotel and Condos, Stockton, CA',
    //         'The project consisted of a complete high rise hotel and condo structure in downtown Stockton, CA.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'El Rosal Mexican Restaurant, Turlock, CA',
    //         'Pezzoni Engineering performed electrical engineering services for a Mexican-style chain restaurant.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Yosemite Farm Credit, Los Banos, CA',
    //         'Our team provided electrical engineering services for a banking institution.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Danville Congregational Church, Danville, CA',
    //         'The design for the Danville Congregational Church included a Sanctuary, ministry dorm and office building.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Sequoia Gate Residential Community, Oakdale, CA',
    //         'The Sequoia Gate Residential Community project involved a complete 18-building complex of town houses, including 17 multifamily residential buildings, a pool house and the surrounding site lighting and bike path lighting.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Bank of the West, Stockton, CA',
    //         'The project included new façade and site lighting for a financial institution in downtown Stockton, CA.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'O\'Brien\'s Veterinary Hospital, Modesto, CA',
    //         'Our team provided electrical engineering services for an energy efficient complete veterinary complex in Modesto, CA.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),
            
    //     new Project(
    //         'Kobe Precision, Hayward, CA',
    //         'The Kobe Precision project consisted of a wet process station at a manufacturing plant in Hayward, CA.',
    //         'industrial', 
    //         [
    //             // no images
    //         ]),            
    //     new Project(
    //         'Pillar Point Oceanside Complex, Half Moon Bay, CA',
    //         'Pezzoni Engineering provided electrical engineering services for a complete high rise hotel and condo structure, including shell space for retails shops in Half Moon Bay, CA.',
    //         'industrial', 
    //         [
    //             // no images
    //         ])
    // ];

    getProjects(requestedCategory: string) {    

        let selectedProjects = [];

        // No category - grab them all - else grab just projects in that category
        if (requestedCategory === '') {
            selectedProjects = this.projects;
        }
        else {
            selectedProjects = this.projects
                .filter(function(obj) {
                    return obj.category === requestedCategory;
                })
                .map(function(obj) {
                    return obj;
                });
        }

        return selectedProjects;
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
        this.initializedStatus = true;
    }

    isInitialized() {
        return this.initializedStatus;
    }
}