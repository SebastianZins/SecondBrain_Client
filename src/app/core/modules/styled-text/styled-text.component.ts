import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-styled-text',
  standalone: false,
  templateUrl: './styled-text.component.html',
  styleUrl: './styled-text.component.scss',
})
export class StyledTextComponent implements OnInit {
  @Input() text: string = '';

  public parsedText: {
    text: string;
    isTag: boolean;
    tooltip: string | undefined;
  }[] = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._parseText();
  }

  /**
   * parse given text by styling tags
   * @private
   * @memberof StyledTextComponent
   */
  private _parseText(): void {
    var splitText: {
      text: string;
      isTag: boolean;
      tooltip: string | undefined;
    }[] = this.text.split(/(\s+)/).map((word) => {
      if (word.startsWith('#')) {
        return { text: word, isTag: true, tooltip: `Go to ${word}` };
      }
      return { text: word, isTag: false, tooltip: '' };
    });

    this.parsedText = [];
    splitText.forEach((word) => {
      if (!word.isTag) {
        if (
          this.parsedText.length > 0 &&
          !this.parsedText[this.parsedText.length - 1].isTag
        ) {
          this.parsedText[this.parsedText.length - 1].text += word.text;
        } else {
          this.parsedText.push(word);
        }
      } else {
        this.parsedText.push(word);
      }
    });
  }

  public goToTag(tag: string): void {
    this._router.navigate([tag]);
  }
}
