/**
 * ElevenLabs voice_id values per session language. VL = voice from the library; custom = custom voice.
 */
function idHint(id) {
  return id.length > 14 ? `${id.slice(0, 14)}…` : id;
}

function voiceLabel(index, id, kind) {
  const n = String(index + 1).padStart(2, "0");
  return `Voice ${n} · ${idHint(id)} · ${kind}`;
}

function toVoices(entries) {
  return entries.map((e, i) => ({
    id: e.id,
    label: voiceLabel(i, e.id, e.kind),
  }));
}

const VOICES_DE = toVoices([
  { id: "ZswvODxwIaNVszyBPqBF", kind: "VL" },
  { id: "ExwcbOgTQzSbH9isPUf8", kind: "custom" },
]);

const VOICES_FR = toVoices([
  { id: "O31r762Gb3WFygrEOGh0", kind: "VL" },
  { id: "cMSXaOTeRpVYIZJCtHGJ", kind: "custom" },
]);

export const VOICES_BY_LANG = {
  de: VOICES_DE,
  fr: VOICES_FR,
};
