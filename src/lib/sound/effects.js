// Every effect is synthesized here, so there are no sound files to license or download.
// Each takes (audio context, output node, start time). Levels are deliberately low because
// these sit under the music. Tune by ear.

const SILENCE = 0.0001;

// Gain has to ramp from just above zero, because an exponential ramp can't start at zero.
const envelope = (ctx, output, at, peak, attack, decay) => {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(SILENCE, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + attack);
  gain.gain.exponentialRampToValueAtTime(SILENCE, at + attack + decay);
  gain.connect(output);
  return gain;
};

const tone = (ctx, type, frequency, at, duration, target) => {
  const oscillator = ctx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, at);
  oscillator.connect(target);
  oscillator.start(at);
  oscillator.stop(at + duration);
  return oscillator;
};

export const tick = (ctx, output, at) => {
  tone(ctx, "triangle", 1900, at, 0.04, envelope(ctx, output, at, 0.05, 0.002, 0.03));
};

// A soft low thud for moving between sections. A falling sine wave gives it weight.
export const jump = (ctx, output, at) => {
  const oscillator = tone(ctx, "sine", 130, at, 0.22, envelope(ctx, output, at, 0.24, 0.004, 0.2));
  oscillator.frequency.exponentialRampToValueAtTime(48, at + 0.16);
};

export const effects = { tick, jump };
