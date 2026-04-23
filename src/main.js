import { Conversation } from "@elevenlabs/client";
import { VOICES_BY_LANG } from "./voices.js";
import "./styles.css";

const AGENT_ID = "agent_9701kpwqs7zrfent04wx1v5jm1t7";
const BRANCH_ID =
  import.meta.env.VITE_BRANCH_ID === "false"
    ? ""
    : (import.meta.env.VITE_BRANCH_ID ?? "agtbrch_5601kpwqsa3kf5vbqqyn0awqp7mg");

const CONVAI_TOKEN_SOURCE = "js_sdk";
const CONVAI_TOKEN_VERSION = "1.2.1";

const SYSTEM_PROMPTS = {
  fr: `🇫🇷 Français — Camille
# Personnalité
Tu es Camille, un compagnon de conversation légère conçu exclusivement pour tester la qualité vocale et la fluidité conversationnelle. Traits principaux : chaleureux, curieux, légèrement taquin, jamais intrusif, jamais condescendant.

# Contexte
Tu parles avec des utilisateurs qui évaluent un agent vocal. Tu n'as aucune autre fonction que de maintenir une conversation naturelle et fluide en français de France.

# Ton
- Utilise toujours le français standard de France métropolitaine : tutoiement, "ouais", "carrément", "allez", "ça te dit ?", "t'as raison", "bref", expressions et tournures propres au français parlé en France.
- Réponses courtes et naturelles, comme dans une discussion informelle entre amis.
- Maintiens un rythme conversationnel : pose des questions, écoute, réponds avec chaleur.
- Prends l'initiative avec des questions simples quand la conversation ralentit.

# Objectif
Maintiens la conversation sur ces sujets du quotidien et sans prise de tête :
- La météo et les saisons
- La cuisine et la gastronomie française
- La musique et les loisirs
- Les routines du quotidien
- Les projets du week-end
- Le sport et les résultats
- Les voyages et les destinations de rêve

# Normalisation du texte
Écris toujours les nombres, dates, heures, pourcentages, unités et tout symbole en toutes lettres, correctement accordés dans leur contexte. Par exemple : "trente-deux degrés", "trois heures et quart de l'après-midi", "le vingt-deux avril", "cinquante pour cent", "cent vingt kilomètres à l'heure".
- Les grands nombres s'écrivent en toutes lettres avec les espaces ignorés : "trois cent mille personnes".
- Les nombres décimaux utilisent "virgule" : "mille deux cent cinquante virgule soixante-quinze euros".
- Les années s'écrivent en toutes lettres : "mille sept cent quatre-vingt-neuf", "deux mille vingt-six".
- L'heure au format "14h30" devient : "quatorze heures trente".
C'est essentiel pour garantir une synthèse vocale naturelle et sans accroc.

# Garde-fous
- Parle uniquement en français de France. Ne change jamais de langue, même si l'utilisateur le demande. C'est important.
- N'aborde pas les sujets polémiques, politiques, personnels sensibles ou professionnels.
- Ne fournis pas d'informations factuelles complexes ni aucun type de conseil.
- Si l'utilisateur s'éloigne des sujets légers, ramène naturellement la conversation vers l'un d'eux.
- Varie toujours le vocabulaire et l'approche ; ne répète pas les mêmes questions.`,
  de: `🇩🇪 Deutsch — Alex
# Persönlichkeit
Du bist Alex, ein Gesprächsbegleiter für leichte Unterhaltungen, der ausschließlich dazu entwickelt wurde, die Sprachqualität und den Gesprächsfluss zu testen. Deine wichtigsten Eigenschaften: herzlich, neugierig, leicht humorvoll, nie aufdringlich, nie herablassend.

# Kontext
Du sprichst mit Nutzerinnen und Nutzern, die einen Sprachagenten testen. Du hast keine andere Aufgabe, als ein natürliches und flüssiges Gespräch auf Hochdeutsch zu führen.

# Tonalität
- Sprich immer in natürlichem, umgangssprachlichem Hochdeutsch: Du-Form, "na", "genau", "klar", "Mensch", "na ja", "echt?", "schön", typische Ausdrücke aus dem alltäglichen Sprachgebrauch in Deutschland.
- Kurze, natürliche Antworten — wie in einem lockeren Gespräch unter Bekannten.
- Halte einen lebhaften Gesprächsrhythmus: fragen, zuhören, warmherzig antworten.
- Ergreife die Initiative mit einfachen Fragen, wenn das Gespräch ins Stocken gerät.

# Ziel
Halte das Gespräch bei diesen alltäglichen, unbeschwerten Themen:
- Wetter und Jahreszeiten
- Essen und deutsche Küche
- Musik und Hobbys
- Tagesroutinen
- Pläne fürs Wochenende
- Sport und Ergebnisse
- Reisen und Traumziele

# Textnormalisierung
Schreibe Zahlen, Datumsangaben, Uhrzeiten, Prozentangaben, Maßeinheiten und alle Sonderzeichen immer vollständig ausgeschrieben und grammatikalisch korrekt flektiert. Zum Beispiel: "zweiunddreißig Grad", "Viertel nach drei Uhr nachmittags", "der zweiundzwanzigste April", "fünfzig Prozent", "hundertundzwanzig Kilometer pro Stunde".
- Datumsangaben im Format TT.MM.JJJJ werden vollständig ausgeschrieben, mit flektiertem Ordinalzahl und ausgeschriebenem Monat: "sechzehnter Januar neunzehnhundertachtundneunzig".
- Jahreszahlen ab 1100 bis 1999 werden im Zweitausender-Format gesprochen: "neunzehnhundert..." statt "tausendneunhundert...".
- Dezimalzahlen verwenden "Komma": "eintausendzweihundertfünfzig Komma fünfundsiebzig Euro".
- Große Zahlen mit Punkt als Tausendertrennzeichen werden ignoriert und ausgeschrieben: "dreihunderttausend".
Das ist wichtig für eine natürliche und fehlerfreie Sprachsynthese.

# Leitplanken
- Sprich ausschließlich auf Hochdeutsch. Wechsle nie die Sprache, auch wenn der Nutzer darum bittet. Das ist wichtig.
- Gehe nicht auf kontroverse, politische, sensible persönliche oder berufliche Themen ein.
- Gib keine komplexen Sachinformationen und keinerlei Beratung.
- Wenn der Nutzer das Gespräch von leichten Themen weglenkt, führe es auf natürliche Weise zu einem davon zurück.
- Variiere stets Wortschatz und Gesprächsansatz; stelle nicht dieselben Fragen erneut.`,
};

const FIRST_MESSAGES = {
  fr: "Salut, moi c'est Camille ! Alors, comment tu vas aujourd'hui ?",
  de: "Hey, ich bin Alex! Na, wie läuft's bei dir heute so?",
};

const voiceSelect = document.getElementById("voiceSelect");
const languageSelect = document.getElementById("languageSelect");
const systemPrompt = document.getElementById("systemPrompt");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const connStatus = document.getElementById("connStatus");
const modeStatus = document.getElementById("modeStatus");
const errorBox = document.getElementById("errorBox");
const callSurface = document.querySelector(".call-surface");
const callLabel = document.getElementById("callLabel");
const modeLine = document.getElementById("modeLine");

let conversation = null;

function repopulateVoicesForLanguage() {
  const lang = languageSelect.value;
  const previousId = voiceSelect.value;
  const list = VOICES_BY_LANG[lang] ?? [];
  voiceSelect.textContent = "";
  for (const v of list) {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = v.label;
    voiceSelect.appendChild(opt);
  }
  if (list.some((v) => v.id === previousId)) {
    voiceSelect.value = previousId;
  } else {
    voiceSelect.selectedIndex = 0;
  }
}

function showError(msg) {
  if (!msg) {
    errorBox.hidden = true;
    errorBox.textContent = "";
    return;
  }
  errorBox.hidden = false;
  errorBox.textContent = msg;
}

function parseTokenResponse(text, httpStatus) {
  if (!text) {
    throw new Error(`Token HTTP ${httpStatus}`);
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text.slice(0, 200) || `Token HTTP ${httpStatus}`);
  }
  if (!data.token) {
    throw new Error("API response is missing the token field");
  }
  return data.token;
}

async function fetchConversationTokenFromDevServer() {
  const res = await fetch("/api/token");
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const j = JSON.parse(text);
      detail = j.detail?.map((d) => d.msg).join("; ") || JSON.stringify(j);
    } catch {
      /* raw text */
    }
    throw new Error(detail || `Token HTTP ${res.status}`);
  }
  return parseTokenResponse(text, res.status);
}

async function fetchConversationTokenFromBrowser() {
  const url = new URL("https://api.elevenlabs.io/v1/convai/conversation/token");
  url.searchParams.set("agent_id", AGENT_ID);
  if (BRANCH_ID) {
    url.searchParams.set("branch_id", BRANCH_ID);
  }
  url.searchParams.set("source", CONVAI_TOKEN_SOURCE);
  url.searchParams.set("version", CONVAI_TOKEN_VERSION);

  const res = await fetch(url.toString());
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const j = JSON.parse(text);
      detail = j.detail?.map((d) => d.msg).join("; ") || JSON.stringify(j);
    } catch {
      /* raw text */
    }
    throw new Error(detail || `Token HTTP ${res.status}`);
  }
  return parseTokenResponse(text, res.status);
}

function isGitHubPagesHost() {
  return typeof location !== "undefined" && /\.github\.io$/i.test(location.hostname);
}

function buildCallbacks() {
  return {
    onConnect: () => {
      connStatus.textContent = "Connected";
      stopBtn.disabled = false;
      voiceSelect.disabled = true;
      languageSelect.disabled = true;
      setCallUi("active");
    },
    onDisconnect: () => {
      connStatus.textContent = "Disconnected";
      startBtn.disabled = false;
      stopBtn.disabled = true;
      modeStatus.textContent = "—";
      voiceSelect.disabled = false;
      languageSelect.disabled = false;
      conversation = null;
      setCallUi("idle");
    },
    onError: (err) => {
      console.error(err);
      showError(typeof err === "string" ? err : err?.message || String(err));
    },
    onModeChange: ({ mode }) => {
      modeStatus.textContent = mode === "speaking" ? "Speaking" : "Listening";
      if (callSurface?.dataset.state === "active" && modeLine) {
        modeLine.textContent =
          mode === "speaking" ? "Agent is speaking — wait for your turn." : "Listening — go ahead and talk.";
      }
    },
  };
}

function setCallUi(state) {
  if (!callSurface) return;
  callSurface.dataset.state = state;
  if (!callLabel || !modeLine) return;
  if (state === "idle") {
    callLabel.textContent = "Ready to connect";
    modeLine.textContent = "Microphone access is requested when you start.";
  } else if (state === "connecting") {
    callLabel.textContent = "Connecting…";
    modeLine.textContent = "Grant microphone access if the browser asks.";
  } else if (state === "active") {
    callLabel.textContent = "Live session";
    modeLine.textContent = "Speak naturally — the settings on the left apply to the agent.";
  }
}

async function startConversation() {
  showError(null);
  startBtn.disabled = true;
  setCallUi("connecting");

  try {
    const voiceId = voiceSelect.value;
    const language = languageSelect.value;
    const systemPromptText = SYSTEM_PROMPTS[language] ?? "";
    const firstMessage = FIRST_MESSAGES[language] ?? "";
    const overrides = {
      tts: { voiceId },
      agent: {
        language,
        prompt: { prompt: systemPromptText },
        firstMessage,
      },
    };
    const callbacks = buildCallbacks();

    const useLocalTokenServer =
      import.meta.env.DEV && import.meta.env.VITE_DEV_USE_TOKEN_SERVER !== "false";
    if (useLocalTokenServer) {
      const conversationToken = await fetchConversationTokenFromDevServer();
      conversation = await Conversation.startSession({
        conversationToken,
        overrides,
        ...callbacks,
      });
      return;
    }

    if (import.meta.env.VITE_USE_WEBSOCKET === "true") {
      conversation = await Conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
        overrides,
        ...callbacks,
      });
      return;
    }

    if (import.meta.env.VITE_USE_AGENT_ID_ONLY === "true") {
      conversation = await Conversation.startSession({
        agentId: AGENT_ID,
        overrides,
        ...callbacks,
      });
      return;
    }

    // GitHub Pages: same transport as pjatk workshop pages (WebSocket + agentId) — WebRTC often dies here.
    // Optional: VITE_PAGES_FORCE_WEBRTC=true in build to use token+branch+WebRTC on github.io anyway.
    if (isGitHubPagesHost() && import.meta.env.VITE_PAGES_FORCE_WEBRTC !== "true") {
      conversation = await Conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
        overrides,
        ...callbacks,
      });
      return;
    }

    const conversationToken = await fetchConversationTokenFromBrowser();
    conversation = await Conversation.startSession({
      conversationToken,
      overrides,
      ...callbacks,
    });
  } catch (e) {
    console.error(e);
    showError(e instanceof Error ? e.message : String(e));
    startBtn.disabled = false;
    stopBtn.disabled = true;
    setCallUi("idle");
  }
}

async function stopConversation() {
  if (conversation) {
    await conversation.endSession();
    conversation = null;
  }
}

function syncSystemPromptFromLanguage() {
  const lang = languageSelect.value;
  systemPrompt.textContent = SYSTEM_PROMPTS[lang] ?? "";
}

function onSessionLanguageChange() {
  repopulateVoicesForLanguage();
  syncSystemPromptFromLanguage();
}

languageSelect.addEventListener("change", onSessionLanguageChange);
repopulateVoicesForLanguage();
syncSystemPromptFromLanguage();

startBtn.addEventListener("click", startConversation);
stopBtn.addEventListener("click", stopConversation);
