import {Component} from '@angular/core';

interface PianoBoard {
  ladders: PianoLadder[];
}

interface PianoLadder {
  num: string;
  keys: PianoKey[];
}

interface PianoKey {
  name: string;
  type: 'WHITE' | 'BLACK'
}

interface Song {
  name: string;
  keys: SongKey[];
}

interface SongKey {
  num: string;
  key: string;
  hand?: 'LEFT' | 'RIGHT';
}

interface SongBoardKey { // can be multiple keys
  cellnum: number;
  name: string;
}

interface SongToBoard {
  song: Song;
  keys: SongBoardKey[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pianoLadderCount = 6;

  riverFlowsInYou2: Song = {
    name: 'River Flows in You',
    keys: this.createSongFromConfiguration('4', [
      'A',
      'Ab',
      'A',
      'Ab',
      'A',
      'E',
      'A',
      'D',
      '-1 A',
      '+1 Db',
        'A',
        'Ab',
        'A',
      '-1 A',
        '+1 A',
        'Ab',
      '-1 A',
        '+1 E',
        'A',

    ])
  };

  riverFlowsInYou: Song = {
    name: 'River Flows in You',
    keys: [
      ...this.createKeysInNum('4', [
        'A',
        'Ab',
        'A',
        'Ab',
        'A',
        'E',
        'A',
        'D',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'Db',
      ]),

      // repeat

      ...this.createKeysInNum('4', [
        'A',
        'Ab',
        'A',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'A',
        'Ab',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'E',
        'A',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'D',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'Db',
        'D',
        'E',
        'Db',
        'B',
      ]),
      ...this.createKeysInNum('3', [
        'A',
        'Ab',
        'A',
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'B',
        'Db',
        'Db',
        'D',
        'E',
        'D',
        'Db',
        'B',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'Db',
        'A',
        'Ab',
        'A',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'Ab',
        'A',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'E',
        'A',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'D',
      ]),
      ...this.createKeysInNum('3', [
        'A',
      ]),
      ...this.createKeysInNum('4', [
        'Db',
        'D',
        'E',
      ]),
      ...this.createKeysInNum('5', [
        'Db',
      ]),
      ...this.createKeysInNum('4', [
        'Bb',
        'A',
        'Ab',
        'A',
      ]),
    ]
  }

  riverOnBoard: SongToBoard;

  pianoLadder: PianoKey[] = [
    this.createKey('C'),
    this.createKey('Db'),
    this.createKey('D'),
    this.createKey('Eb'),
    this.createKey('E'),
    this.createKey('F'),
    this.createKey('F#'),
    this.createKey('G'),
    this.createKey('Ab'),
    this.createKey('A'),
    this.createKey('Bb'),
    this.createKey('B')
  ];

  pianoBoard: PianoBoard = {
    ladders: []
  };

  pianoKeysCount = 1;

  constructor() {
    for (let i = 1; i <= this.pianoLadderCount; i++) {
      this.pianoBoard.ladders.push({
        num: '' + i,
        keys: [...this.pianoLadder]
      });
    }

    this.pianoKeysCount = this.pianoLadderCount * this.pianoLadder.length;

    this.riverOnBoard = this.mapSongToBoard(this.pianoBoard, this.riverFlowsInYou);
  }

  mapSongToBoard(board: PianoBoard, song: Song) {
    const keys: SongBoardKey[] = [];
    song.keys.forEach(songKey => {
      keys.push(this.songKeyToBoardPosition(board, songKey));
    });
    return {
      song: song,
      keys: keys
    }
  }

  songKeyToBoardPosition(board: PianoBoard, songKey: SongKey): SongBoardKey {
    const ladderIndex = this.pianoLadder.findIndex(ladderKey => {
      return ladderKey.name === songKey.key;
    })
    return {
      cellnum: ladderIndex + 1 + ((this.pianoLadder.length) * (parseInt(songKey.num) - 1)),
      name: songKey.key
    }
  }

  createKey(name: string): PianoKey {
    return {
      name: name,
      type: name.length === 1 ? 'WHITE' : 'BLACK'
    }
  }

  createSongKey(num: string, key: string) {
    return {
      num: num,
      key: key,
    };
  }

  createKeysInNum(num: string, keys: string []): SongKey[] {
    const arr: SongKey[] = [];
    keys.forEach(k => {
      arr.push(this.createSongKey(num, k));
    })
    return arr;
  }

  createSongFromConfiguration(baseNum: string, keys: string[]): SongKey[] {
    const arr: SongKey[] = [];
    keys.forEach(k => {
      const parts = k.split(/\s+/);
      if (parts.length > 1) {
        baseNum = '' + (parseInt(baseNum) + parseInt(parts[0]));
        k = parts[1];

        console.log(parts, baseNum, k)
      }
      arr.push(this.createSongKey(baseNum, k));
    })
    return arr;

  }

  loopHelper(count: number) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(i);
    }
    return arr;
  }

  protected readonly parseInt = parseInt;
}
