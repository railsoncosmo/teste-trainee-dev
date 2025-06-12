import { Injectable } from '@angular/core';
import { Filter } from 'bad-words';

@Injectable({
  providedIn: 'root'
})

export class CensorshipService {
  private filter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g });

  constructor() {
    this.filter.addWords('idiota', 'estupido', 'burro', 'imbecil', 'otario');
  }

  clean(text: string): string {
    return this.filter.clean(text);
  }

  hasProfanity(text: string): boolean {
    return this.filter.isProfane(text);
  }

  addCustomWords(words: string[]) {
    this.filter.addWords(...words);
  }

  removeWords(words: string[]) {
    this.filter.removeWords(...words);
  }
}