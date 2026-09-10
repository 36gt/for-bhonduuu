import numpy as np

SR = 44100
BPM = 66
BEAT = 60 / BPM


def piano_note(freq, start, dur, vel=0.7):
    n_start = int(start * SR)
    n_dur = int(dur * SR)
    t = np.arange(n_dur) / SR
    env = np.exp(-t * 3.2)
    tone = (
        np.sin(2 * np.pi * freq * t)
        + 0.5 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * 10)
        + 0.25 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-t * 16)
    )
    attack = np.minimum(t / 0.008, 1.0)
    return n_start, (tone * env * attack * vel)


def pad_note(freq, start, dur, vel=0.12):
    n_start = int(start * SR)
    n_dur = int(dur * SR)
    t = np.arange(n_dur) / SR
    att = np.minimum(t / 1.2, 1.0)
    rel = np.minimum((dur - t) / 1.0, 1.0)
    env = att * np.clip(rel, 0, 1)
    tone = np.sin(2 * np.pi * freq * t) + 0.6 * np.sin(2 * np.pi * freq * 2.01 * t)
    return n_start, (tone * env * vel)


def note_freq(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


TOTAL = 72  # seconds of audio (~ a 12s chord loop * 6)


def seq():
    # soft sad progression: F(Am-ish) -> Am -> C -> G, arpeggiated
    chords = [
        [53, 60, 64, 69],  # F
        [57, 60, 64, 67],  # Am
        [48, 55, 60, 64],  # C
        [55, 59, 62, 67],  # G
    ]
    melody = [
        (81, 0.00), (77, 0.375), (74, 0.75), (72, 1.375), (69, 1.75),
        (72, 2.375), (74, 2.75), (72, 3.375), (69, 3.75),
        (76, 4.375), (74, 4.75), (72, 5.375), (69, 5.75), (72, 6.375),
        (69, 6.75), (74, 7.375), (72, 8.0),
    ]
    k = 0
    while k < TOTAL:
        for ch in chords:
            root, m3, fifth, maj = ch
            # bass + pad
            b_start = k
            b_notes = [note_freq(root), note_freq(root - 12)]
            for f in b_notes:
                yield ('piano', f, b_start, 3.2, 0.8)
            for f in [note_freq(x) for x in (root, m3, fifth, maj)]:
                yield ('pad', f, b_start, 3.5)
            # arpeggio
            for i, mid in enumerate(ch + ch):
                t = b_start + i * 0.375
                yield ('piano', note_freq(mid), t, 0.35, 0.35)
            k += 3.5
        # sprinkle a melody phrase each loop start
        for mid, off in melody:
            yield ('piano', note_freq(mid), k + off, 0.5, 0.42)


mix = np.zeros(int((TOTAL + 2) * SR))
for typ, *args in seq():
    if typ == 'piano':
        f, start, dur, vel = args
        n, s = piano_note(f, start, dur, vel)
        end = min(len(mix), n + len(s))
        if n < len(mix):
            mix[n:end] += s[: end - n]
    else:
        f, start, dur = args
        n, s = pad_note(f, start, dur, 0.12)
        end = min(len(mix), n + len(s))
        if n < len(mix):
            mix[n:end] += s[: end - n]

mix = np.tanh(mix * 1.2)
peaks = np.random.normal(0, 0.06, len(mix))
mix = mix * 0.9 + peaks * 0.05

import wave
mix16 = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
with wave.open(r'static\music\sad-romance.wav', 'wb') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(mix16.tobytes())

print('WAV written:', len(mix16) / SR, 'seconds')