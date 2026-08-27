// Web Audio API based Cosmic ॐ (Om) Ambient Drone Frequency Synthesizer
// Synthesizes the fundamental frequency of the cosmic octave (136.1 Hz - OM frequency)
// with harmonic overtones at 272.2 Hz, 408.3 Hz, and warm 432 Hz healing vibration.

class OmDroneSynthesizer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private masterVolume: number = 0.15;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop(); // Clear any existing

    const now = this.ctx.currentTime;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(this.masterVolume, now + 2); // Soft gentle fade-in

    // Frequencies: 136.1 Hz (Cis / Earth Year OM frequency), 68.05 Hz (Sub-bass), 272.2 Hz (1st Octave), 432 Hz (Natural harmonic)
    const frequencies = [
      { freq: 136.1, type: 'sine' as OscillatorType, gain: 0.5 },
      { freq: 68.05, type: 'sine' as OscillatorType, gain: 0.35 },
      { freq: 272.2, type: 'triangle' as OscillatorType, gain: 0.15 },
      { freq: 408.3, type: 'sine' as OscillatorType, gain: 0.08 },
      { freq: 432.0, type: 'sine' as OscillatorType, gain: 0.06 },
    ];

    // Low pass filter to create a warm, celestial temple resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    this.oscillators = frequencies.map((item) => {
      if (!this.ctx) throw new Error('AudioContext missing');
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = item.type;
      osc.frequency.setValueAtTime(item.freq, now);

      // Subtle frequency vibrato / pulsation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now); // 0.12 Hz slow cosmic breathing
      lfoGain.gain.setValueAtTime(0.4, now);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(item.gain, now);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.isRunning = true;
  }

  public stop() {
    if (!this.ctx || !this.gainNode) {
      this.isRunning = false;
      return;
    }

    const now = this.ctx.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0.001, now + 1.2); // Smooth fade-out

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
      this.isRunning = false;
    }, 1250);
  }

  public setVolume(val: number) {
    this.masterVolume = val;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const omDrone = new OmDroneSynthesizer();
