import { Component, OnInit } from '@angular/core';
import * as gifshot from 'gifshot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public base64Gif: string;
  running = false;
  baseUrl = 'fchat/assets';

  ngOnInit() {

  }



  createGif(arr: Array<any>) {
    console.log('arr', arr);
    gifshot.createGIF(
      {
        images: arr,
        interval: .1,
        gifHeight: 280,
        gifWidth: 500

      }, (obj) => {
        if (obj.error) {
          console.log('error', obj.error);
          return;
        }

        this.base64Gif = obj.image;
        console.log(obj);
      });
  }

  onTextchanges(newString: string) {
    this.running = true;
    this.base64Gif = null;
    console.log('printing', newString);
    this.runApp(newString);
  }

  runApp(input: string) {
    const arr = this.wordsToImageArray(input);
    this.createGif(arr);

  }

  // Input a string, output an array of letters
  wordsToImageArray(input: string) {
    const chars = input.split('');
    console.log(chars);
    const returnArray = [];
    chars.forEach(char => {
      returnArray.push( `${this.baseUrl}/base-frames/step-1.jpg`);
      returnArray.push(this.lettersToPath2(char));
      returnArray.push(this.lettersToPath(char));
    });
    console.log(returnArray);
    return [...returnArray];
  }



  lettersToPath(letter: string) {
    console.log('converting', letter);
    if (letter === ' ') {
      return `${this.baseUrl}/step-3-letters/space.jpg`;
    }

    if (letter === '!') {
      return `${this.baseUrl}/step-3-letters/exclamation.jpg`;
    }

    return `${this.baseUrl}/step-3-letters/${letter}.jpg`;
  }
  lettersToPath2(letter: string) {

    if (letter === ' ') {
      return `${this.baseUrl}/step-2-letters/space.jpg`;
    }

    if (letter === '!') {
      return `${this.baseUrl}/step-2-letters/exclamation.jpg`;
    }

    return `${this.baseUrl}/step-2-letters/${letter}.jpg`;
  }


}
