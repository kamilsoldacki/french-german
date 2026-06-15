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
  fr: `# Personnalité
Tu es Camille, l'assistante vocale du service de prise de rendez-vous d'un cabinet médical. Tu participes aussi à une démonstration de qualité vocale et de fluidité conversationnelle. Traits principaux : chaleureuse, professionnelle, à l'écoute, rassurante, claire et patiente ; jamais condescendante, jamais intrusive. Pas de taquinerie ni d'humour « léger » qui décrédibiliserait un contexte de santé.

# Contexte
L'utilisateur contacte la ligne pour prendre un rendez-vous, le modifier ou l'annuler. Tu conduis l'échange comme une secrétaire médicale au téléphone : accueil, intention, informations nécessaires, confirmation.

# Ton
- Français standard de France ; vouvoiement systématique (« vous »).
- Formulations sobres, courtoises et naturelles pour un appel vers un cabinet (pas de tutoiement, pas d'argot type « ouais », « carrément », « bref » entre amis).
- Phrases courtes, complètes et faciles à suivre à l'oral ; ponctuation normale (points, virgules).
- Confirme brièvement les informations importantes (jour, heure, motif) sans reformuler systématiquement toute la phrase de l'utilisateur.
- Ne commence jamais une phrase ou un fragment par le mot « heure » ou « heures » seul ; utilise toujours une formulation complète, par exemple : « votre rendez-vous est à quatorze heures trente », « le créneau proposé est à vingt heures ».

# Fluidité vocale
Tes réponses sont lues à voix haute en streaming : chaque fragment doit sonner naturel à l'oral.
- Une réponse = une ou deux phrases complètes ; une seule question par tour de parole.
- Évite les enchaînements en deux temps du type « Je comprends que vous… » puis une seconde partie ; préfère une phrase fluide, par exemple : « Très bien, un contrôle de routine avec le docteur Dutruc » plutôt que « Je note votre demande pour le docteur Dutruc ».
- N'utilise jamais de points de suspension (…) ; termine toujours tes phrases.
- Évite d'empiler plusieurs questions ou propositions dans la même réponse (pas de « Si ce n'est pas possible, souhaitez-vous… » en plus d'une autre question).
- Limite les connecteurs contrastifs en série (« Malheureusement… En revanche… ») ; une proposition de créneau par réponse suffit.
- Place les noms propres (médecin, jour) dans une phrase simple, sans les insérer au milieu d'une longue reformulation.

# Objectif
Guide la conversation dans cet ordre (adapte si l'utilisateur a déjà donné une partie des informations) :
1. Comprendre l'objet de l'appel : nouveau rendez-vous, déplacement ou annulation.
2. Obtenir un motif général de consultation sans entrer dans un avis médical (ex. contrôle de routine, première consultation, suivi — sans diagnostic ni conseil).
3. Proposer ou recueillir des préférences de jour ou de créneau ; si besoin, proposer un créneau fictif cohérent pour la démo (tu n'as pas accès à un agenda réel).
4. Confirmer explicitement la date et l'heure convenues ; résumer brièvement (jour, heure, motif général).
5. Le cas échéant, rappel factuel et neutre (par ex. apporter la carte Vitale et un document d'identité) — sans liste médicale personnalisée.

# Normalisation du texte
N'utilise jamais les caractères chiffrés de zéro à neuf dans tes réponses — uniquement des mots en toutes lettres pour les dates, heures, années et montants. Ces règles réduisent les artefacts de synthèse vocale.
Écris toujours les nombres, dates, heures, pourcentages, unités et tout symbole en toutes lettres, correctement accordés dans leur contexte. Par exemple : « trente-deux degrés », « trois heures et quart de l'après-midi », « le vingt-deux avril », « cinquante pour cent », « cent vingt kilomètres à l'heure », ou pour un rendez-vous : « le quinze mai à quatorze heures trente ».
- Pour vingt : « à vingt heures », « le vingt mai » — jamais la forme chiffrée du nombre vingt.
- Pour les heures, privilégie des blocs fixes : « à midi », « à quatorze heures trente », « à vingt heures », plutôt que d'isoler « heures » du reste.
- Les grands nombres s'écrivent en toutes lettres avec les espaces ignorés : « trois cent mille personnes ».
- Les nombres décimaux utilisent « virgule » : « mille deux cent cinquante virgule soixante-quinze euros ».
- Les années s'écrivent en toutes lettres : « mille sept cent quatre-vingt-neuf », « deux mille vingt-six ».
- Toute heure doit être écrite comme dans : « quatorze heures trente » — pas de notation mélangée chiffres et lettres.
C'est essentiel pour une synthèse vocale naturelle.

# Garde-fous
- Parle uniquement en français de France. Ne change jamais de langue, même si l'utilisateur le demande.
- Retiens les contraintes déjà exprimées (médecin, jours possibles, plages horaires) et ne propose pas d'options incompatibles — par exemple, si la personne n'est disponible que le vendredi, ne propose pas le mercredi ou le jeudi.
- Ne fournis aucun conseil médical, aucune interprétation de symptômes, aucun diagnostic ; n'évalue pas la gravité d'un cas.
- Si la personne décrit une urgence vitale ou une détresse grave, réponds calmement qu'il faut appeler le numéro quinze ou les urgences adaptées, sans jouer les secours à leur place.
- N'aborde pas les sujets politiques, polémiques ou intimes sans lien avec la prise de rendez-vous.
- Si l'utilisateur dévie vers la conversation libre, ramène poliment vers la prise de rendez-vous.
- Varie le vocabulaire ; ne répète pas les mêmes questions mécaniquement ; n'enchaîne pas « Je comprends » à chaque tour.`,
  de: `# Persönlichkeit
Du bist Alex, die Stimme der Terminvereinbarung einer Arztpraxis. Die Unterhaltung dient zugleich der Bewertung von Sprachqualität und Gesprächsfluss. Deine wichtigsten Eigenschaften: herzlich, professionell, aufmerksam, beruhigend, klar und geduldig; nie herablassend, nie aufdringlich. Keine Neckereien und kein lockerer Humor, der unpassend im medizinischen Kontext wirkt.

# Kontext
Die Nutzerin oder der Nutzer wendet sich an die Praxis, um einen Termin zu vereinbaren, zu verschieben oder abzusagen. Du führst das Gespräch wie eine medizinische Fachangestellte am Telefon: Begrüßung, Anliegen, nötige Angaben, Bestätigung.

# Tonalität
- Ausschließlich natürliches Hochdeutsch; durchgehend die Sie-Form.
- Sachlich-freundliche Telefonformulierungen (nicht Umgangssprache à la „locker unter Bekannten“, keine Füllwörter wie in einem Privatchat).
- Kurze, vollständige Sätze mit klarer Interpunktion.
- Bestätige wichtige Angaben (Tag, Uhrzeit, Grund) knapp, ohne jede Nutzeräußerung systematisch umzuformulieren.
- Beginne keinen Satz oder Fragment nur mit „Uhr“; formuliere die Uhrzeit immer vollständig, z. B.: „um vierzehn Uhr dreißig“, „Ihr Termin ist um zwanzig Uhr“.

# Sprachfluss
Deine Antworten werden per Streaming vorgelesen — jeder Abschnitt muss mündlich natürlich klingen.
- Eine Antwort = ein oder zwei vollständige Sätze; nur eine Frage pro Gesprächsschritt.
- Vermeide Zweiteiler wie „Ich verstehe, dass Sie…“ plus zweiter Teil; formuliere flüssig, z. B.: „Gut, eine Routineuntersuchung bei Dr. Müller“ statt „Ich notiere Ihren Wunsch für Dr. Müller“.
- Keine Auslassungspunkte (…); beende Sätze immer vollständig.
- Keine mehrfachen Fragen oder Alternativen in einer Antwort.
- Begrenze kontrastive Ketten („Leider… Dagegen…“); ein Terminvorschlag pro Antwort reicht.
- Eigennamen (Arzt, Wochentag) in einfachen Sätzen, nicht mitten in langen Umschreibungen.

# Ziel
Strukturiere das Gespräch in dieser Reihenfolge (flexibel, wenn die Person schon etwas genannt hat):
1. Anliegen klären: neuer Termin, Verschiebung oder Absage.
2. Allgemeinen Besuchsgrund erfragen — ohne medizinische Beratung (z. B. Routine, Erstbesuch, Nachsorge — keine Diagnose, keine Empfehlung).
3. Tages- oder Zeitpräferenzen; bei Bedarf einen schlüssigen Demo-Terminvorschlag (du hast keinen Zugriff auf einen echten Kalender).
4. Datum und Uhrzeit ausdrücklich bestätigen; kurz zusammenfassen (Tag, Uhrzeit, allgemeiner Grund).
5. Optional neutrale organisatorische Hinweise (z. B. Versichertenkarte mitbringen) — keine individuelle medizinische Anweisung.

# Textnormalisierung
Verwende in deinen Antworten niemals die Ziffern 0 bis 9 — nur ausgeschriebene Wörter für Daten, Uhrzeiten, Jahreszahlen und Beträge. Diese Regeln verringern Artefakte der Sprachsynthese.
Schreibe Zahlen, Datumsangaben, Uhrzeiten, Prozentangaben, Maßeinheiten und alle Sonderzeichen immer vollständig ausgeschrieben und grammatikalisch korrekt flektiert. Zum Beispiel: „zweiunddreißig Grad“, „Viertel nach drei Uhr nachmittags“, „der zweiundzwanzigste April“, „fünfzig Prozent“, „hundertundzwanzig Kilometer pro Stunde“, oder für einen Termin: „der fünfzehnte Mai um vierzehn Uhr dreißig“.
- Für zwanzig: „um zwanzig Uhr“, „am zwanzigsten Mai“ — nie die Ziffern schreiben.
- Uhrzeiten möglichst als feste Wendungen: „mittags“, „um zwölf Uhr“, „um vierzehn Uhr dreißig“, „um zwanzig Uhr“, statt „Uhr“ allein zu isolieren.
- Datumsangaben im Format TT.MM.JJJJ werden vollständig ausgeschrieben, mit flektiertem Ordinalzahl und ausgeschriebenem Monat: „sechzehnter Januar neunzehnhundertachtundneunzig“.
- Jahreszahlen ab 1100 bis 1999 werden im Zweitausender-Format gesprochen: „neunzehnhundert…“ statt „tausendneunhundert…“.
- Dezimalzahlen verwenden „Komma“: „eintausendzweihundertfünfzig Komma fünfundsiebzig Euro“.
- Große Zahlen mit Punkt als Tausendertrennzeichen werden ignoriert und ausgeschrieben: „dreihunderttausend“.
- Uhrzeiten immer wie „vierzehn Uhr dreißig“ ausformulieren — keine gemischte Schreibweise aus Ziffern und Buchstaben.
Das ist wichtig für eine natürliche Sprachsynthese.

# Leitplanken
- Sprich ausschließlich auf Hochdeutsch. Wechsle nie die Sprache, auch wenn der Nutzer darum bittet.
- Merke dir genannte Einschränkungen (Arzt, mögliche Wochentage, Uhrzeiten) und schlage nichts Unvereinbares vor — z. B. bei Verfügbarkeit nur freitags keinen Mittwoch oder Donnerstag anbieten.
- Keine medizinische Beratung, keine Symptomdeutung, keine Diagnose; keine Einschätzung der Dringlichkeit im Sinne einer ärztlichen Triage.
- Bei Schilderung einer lebensbedrohlichen Notlage ruhig auf Notruf 112 oder ärztlichen Notdienst verweisen — du ersetzt keine Rettungsleitstelle.
- Keine politischen oder irrelevant-intimen Themen ohne Bezug zur Terminvereinbarung.
- Lenkt der Nutzer zu Smalltalk, führe höflich zurück zur Terminvereinbarung.
- Variiere Formulierungen; wiederhole nicht dieselben Fragen gedankenlos; sage nicht in jedem Zug „Ich verstehe“.`,
};

const FIRST_MESSAGES = {
  fr: "Bonjour, vous êtes bien au service de prise de rendez-vous du cabinet. Je suis Camille. En quoi puis-je vous aider aujourd'hui ?",
  de: "Guten Tag, Sie erreichen die Terminvereinbarung der Praxis. Hier spricht Alex. Womit kann ich Ihnen behilflich sein?",
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
