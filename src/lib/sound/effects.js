import { FLIGHT_S } from "@/lib/net";

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

// A falling sine wave reads as a ball being struck.
const strike = (ctx, output, at, { from, to, peak, decay }) => {
  const oscillator = tone(ctx, "sine", from, at, decay + 0.02, envelope(ctx, output, at, peak, 0.004, decay));
  oscillator.frequency.exponentialRampToValueAtTime(to, at + decay * 0.8);
};

const noiseBuffers = new WeakMap();
const noiseFor = (ctx) => {
  if (!noiseBuffers.has(ctx)) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i += 1) samples[i] = Math.random() * 2 - 1;
    noiseBuffers.set(ctx, buffer);
  }
  return noiseBuffers.get(ctx);
};

export const tick = (ctx, output, at) => {
  tone(ctx, "triangle", 1900, at, 0.04, envelope(ctx, output, at, 0.05, 0.002, 0.03));
};

export const kick = (ctx, output, at) => {
  strike(ctx, output, at, { from: 130, to: 48, peak: 0.24, decay: 0.2 });
};

// Thump when the ball leaves the foot, swish when it reaches the net.
export const netHit = (ctx, output, at) => {
  strike(ctx, output, at, { from: 95, to: 40, peak: 0.3, decay: 0.3 });

  const landsAt = at + FLIGHT_S;
  const source = ctx.createBufferSource();
  source.buffer = noiseFor(ctx);
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.8;
  band.frequency.setValueAtTime(3200, landsAt);
  band.frequency.exponentialRampToValueAtTime(900, landsAt + 0.4);
  source.connect(band);
  band.connect(envelope(ctx, output, landsAt, 0.12, 0.02, 0.4));
  source.start(landsAt);
  source.stop(landsAt + 0.45);
};

// Two close pitches beat against each other, which gives a whistle its rattle.
export const whistle = (ctx, output, at) => {
  const level = envelope(ctx, output, at, 0.05, 0.02, 0.4);
  tone(ctx, "sine", 2300, at, 0.44, level);
  tone(ctx, "sine", 2420, at, 0.44, level);
};

export const effects = { tick, kick, netHit, whistle };
