/**
 * ElevenLabs voice_id values per session language. Labels are short id hints; rename in the UI if you map names in your library.
 */
const VOICE_IDS_DE = [
  "6mzbNhS53bPsK3B6J8SO",
  "2FXRntcubymGvX9yNpHh",
  "GwjY6fDnb4AAdn2JRL3G",
  "WaymGChJdTpifCOzgTEU",
  "SE6lAbQFKNhsae9oGZ1H",
  "vOzXcfuwBioMzvtNVFVa",
];

const VOICE_IDS_FR = [
  "bK8XhNA3h5zeyF3ZZYnv",
  "1pCvFIzZ1LrBvLWXwUU7",
  "PMWnMWefBtB7JOO5Mqnu",
  "IUQLqSV87WCJltkmKT08",
  "SE6lAbQFKNhsae9oGZ1H",
  "vOzXcfuwBioMzvtNVFVa",
];

function shortLabel(id, index) {
  const n = String(index + 1).padStart(2, "0");
  const hint = id.length > 14 ? `${id.slice(0, 14)}…` : id;
  return `Voice ${n} · ${hint}`;
}

function toOptions(ids) {
  return ids.map((id, i) => ({ id, label: shortLabel(id, i) }));
}

export const VOICES_BY_LANG = {
  de: toOptions(VOICE_IDS_DE),
  fr: toOptions(VOICE_IDS_FR),
};
