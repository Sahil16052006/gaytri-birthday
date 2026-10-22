// Procedural Ambient Music Player using Web Audio API
// Bulletproof, zero external MP3 dependency, works offline & in any browser.

class GentleMelodyPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private step: number = 0;

  // Gentle acoustic pentatonic scale notes (frequencies in Hz)
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  private notes = [
    261.63, 293.66, 329.63, 392.00, 440.00,
    523.25, 587.33, 659.25, 783.99
  ];

  // A soothing, cyclical 16-step lullaby pattern
  private melodyPattern = [
    { note: 2, dur: 1.2, delay: 0 },    // E4
    { note: 4, dur: 1.0, delay: 0.6 },  // A4
    { note: 5, dur: 1.5, delay: 1.2 },  // C5
    { note: 3, dur: 1.0, delay: 1.8 },  // G4
    { note: 6, dur: 1.4, delay: 2.4 },  // D5
    { note: 4, dur: 1.0, delay: 3.0 },  // A4
    { note: 5, dur: 1.6, delay: 3.6 },  // C5
    { note: 2, dur: 1.2, delay: 4.4 },  // E4
    { note: 1, dur: 1.0, delay: 5.0 },  // D4
    { note: 3, dur: 1.4, delay: 5.6 },  // G4
    { note: 7, dur: 1.8, delay: 6.2 },  // E5
    { note: 5, dur: 1.2, delay: 7.0 },  // C5
    { note: 4, dur: 1.5, delay: 7.6 },  // A4
    { note: 3, dur: 1.2, delay: 8.2 },  // G4
    { note: 1, dur: 1.4, delay: 8.8 },  // D4
    { note: 0, dur: 2.0, delay: 9.6 },  // C4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Soft chime oscillator
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle warm acoustic tone (sine blended with triangle)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(600, time + duration);

    // Soft attack, gentle decay (bell/kalimba/chime envelope)
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.22, time + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  private tick() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const item = this.melodyPattern[this.step];
    const freq = this.notes[item.note % this.notes.length];

    this.playTone(freq, item.dur, now);

    // Occasionally add a soft lower fifth/octave drone for warm harmony
    if (this.step % 4 === 0) {
      const bassFreq = freq / 2;
      this.playTone(bassFreq, 2.5, now);
    }

    this.step = (this.step + 1) % this.melodyPattern.length;

    // Schedule next note
    this.timerId = window.setTimeout(() => {
      this.tick();
    }, 700);
  }

  public play() {
    this.initContext();
    this.isPlaying = true;
    this.tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const melodyPlayer = new GentleMelodyPlayer();
