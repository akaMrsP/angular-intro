import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/project.model';
import { ImageDetail } from 'src/app/shared/image.model';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  @Input() index: number;

  ngOnInit(): void {

    /* 
     * To make sure the project list displays properly for projects with images and without,
     *  set the image-container class only on those projects that contain images.
     */

    let imgList = document.getElementsByTagName('img');
    for (let index = 0; index < imgList.length; index++) {
      const element = imgList[index];
      element.parentElement.classList.add('image-container');
    }
  }

}
