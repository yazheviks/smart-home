import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sliderMinX = 0;
  sliderMaxX = 240;

  coldGradient = {start: '#5564C2', end: '#3A2E8D'};
  hotGradient = {start:'#F0AE4B', end: '#9B4D1B'};

  dragging = false;
  initialMouseX = 0;
  sliderX = 0;
  initialSliderX = 0;
  gradientStart = this.coldGradient.start;
  gradientEnd = this.coldGradient.end;

  round (num: number) {
    return Math.round(num)
  }

  startDrag (e: any) {
    this.dragging = true
    this.initialMouseX = e.pageX
    this.initialSliderX = this.sliderX
  }

  stopDrag () {
    this.dragging = false
  }

  mouseMoving (e: any) {
    if(this.dragging) {
      const dragAmount = e.pageX - this.initialMouseX
      const targetX = this.initialSliderX + dragAmount

      this.sliderX = Math.max(Math.min(targetX, this.sliderMaxX), this.sliderMinX)
    }
  }

  tempElementStyle (tempNumber: any) {
    const nearDistance = 3
    const liftDistance = 12

    // lifts up the element when the current temperature is near it
    const diff = Math.abs(this.currentTemperature - tempNumber)
    const distY = (diff/nearDistance) - 1

    // constrain the distance so that the element doesn't go to the bottom
    const elementY = Math.min(distY*liftDistance, 0)
    return {transform: `translate3d(0, ${elementY}px, 0)`};
  }

  get currentTemperature () {
    const tempRangeStart = 5
    const tempRange = 35
    return (this.sliderX / this.sliderMaxX * tempRange ) + tempRangeStart
  }

  sliderStyle () {
    return {transform: `translate3d(${this.sliderX}px,0,0)`};
  }

  bgStyle () {
    return {fill: `linear-gradient(0.25turn, ${this.gradientStart}, ${this.gradientEnd}`};
  }
}
