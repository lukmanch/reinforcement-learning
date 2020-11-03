const AllTexts = {
  "en": {

    letsMove: {
      title: "Beweg mich!",
      text:`Ich bin ein Roboter, der sich durch ein Labyrinth navigiert. Ich kann mich auf dem Boden, allerdings nicht durch Wände bewegen.<br>
      <br>
      Ich kenne immer meine Position. Mein sogenannter 'Zustand' wird durch zwei Koordinaten angegeben. Aus jedem Zustand, kann ich verschiedene Richtungen einschlagen: das sind die sogenannten 'Aktionen', sie werden durch gelbe Pfeile markiert.<br>
      <br>
      Kannst du mich steuern?`
    },
    findPower: {
      title: "Finde die Ladestation!",
      text:`Als Roboter brauche ich Strom, um mich fortzubewegen. Wieviel Strom ich momentan besitze, wird angezeigt. Sobald ich keinen Strom mehr habe, schickt man mich wieder zur Startposition und ich erhalte wieder einen vollen Akku. <br>
      <br>
      Aus meiner Perspektive kann ich nicht das gesamte Labyrinth überblicken. Ich kenne nur meine Position und die Aktionen, die ich ausführen kann. Das ist, als würde ich mich im Dunkeln mit eingeschränkter Sicht bewegen! <br>
      <br>
      Ich muss die versteckte Ladestation finden. Kannst du mir helfen?`
    },
    getRewarded: {
      title: "Zeit belohnt zu werden!",
      text:`Welcher Weg zur Ladestation ist der kürzeste? Wie kann ich ihn finden? Als Roboter erhalte ich positiven oder negativen Feedback für jede Aktion, wenn ich mich von einer Position (Zustand) in einen nächsten bewege (Folgezustand). Dieser Feedback, die sogenannte Belohnung (engl. "Reinforcement"), ist eine positive Zahl für "gut" oder eine negative Zahl für "schlecht". <br>
      <br>
      Beobachte die Zahlen, während ich mich bewege! Wie hoch ist die Belohnung, wenn ich zur Ladestation komme?`
    },
    accumulatedReward: {
      title:'Langfristige Belohnungen!',
      text:`Es geht weniger darum, einzelne hochwertige Belohnungen zu erhalten, sondern so viele von ihnen wie möglich! Also sollte ich, während ich mich fortbewege, nach den langfristigen positiven und negativen Belohnungen Ausschau halten. Dazu kann ich alle Belohnungen vom Anfang bis zum Ende des Weges zusammenrechnen. An ein Ende komme ich entweder, wenn mein Akku verbraucht ist oder ich die Ladestation finde. Die Summe aller Belohnungen heißt "Return". Sie zeigt an, wie gut der Weg langfristig gesehen ist.<br>
      <br>
      Kannst du mir helfen den Weg zur Ladestation mit dem höchsten Return zu finden?<br>
      <br>
      Beachte, dass Aktionen der näheren Zukunft eine höhere Belohnung geben als Aktionen der ferneren Zukunft. Aus diesem Grund verwende ich den sogenannten Discount-Faktor, wenn ich die Belohnungen zusammenrechne. Je höher er ist, desto mehr beachte ich Belohnungen in der ferneren Zukunft. Ist er allerdings niedriger, schenke ich meine Aufmerksamkeit den näheren Belohnungen.<br>
      <br>
      Stelle den Discount-Faktor ein und sieh dir an, wie der Return sich verändert!`
    },
    mapStates: {
      title:'Lass dir gute Zustände auf der Karte zeigen! Und sei "greedy"!',
      text: `Stell dir vor, dass ich alle Returns für jeden Zustand kenne, das die Zahl aller Belohnungen, die ich von dem Zustand aus bekomme. Was denkst du, ist der bestmögliche Schritt von einem Zustand, wenn man nur auf die Returns schaut? Ja, ich bewege mich einfach zum Zustand mit dem höchsten Return. Diese Returns für jeden Zustand heißen V-Werte. Unsere Karte markiert sie farblich: je mehr rot, desto höher der Wert!<br>
      <br>
      Die Returns oder Werte hängen vom jeweiligen Weg ab: Also dem Weg, den ich eingeschlagen habe, um die Belohnungen zu summieren. Dieser Weg ist die sogenannte Policy. Sie sagt mir, welche Aktion ich im jeweiligen Zustand nehme. Wenn ich immer die Aktion mit dem höchsten Return nehme, nenne ich sie eine "greedy policy". Sie sucht nach der höchsten Belohnung!<br>
      <br>
      Stelle die greedy policy ein, um den derzeit besten Weg zu sehen!`
    },
    learn: {
      title: 'Jetzt lerne!',
      text: `Anstatt die Belohnungen zum Return zu summieren und die Werte W vorzuberechnen, kann ich W schätzen, indem ich mich Schritt für Schritt bewege und beobachte. Das Konzept dahinter ist einfach und mächtig: für jeden Schritt nehme ich die derzeitige Belohnung und addiere den geschätzten Return der Folgezustände hinzu. Ich kann dieses Update für jeden Zustand machen mithilfe der bereits geschätzten Returns (während ich mich bewege update ich also jeden Zustand).<br>
      <br>
      Du kannst dir vorstellen, dass am Anfang die Schätzung nicht so gut ist, also muss ich die Umgebung erkunden: verschiedene Aktionen ausprobieren, die erhaltenen Belohnungen beobachten und meine V-Werte häufig erneuern. Das Erkunden ist also sehr wichtig, dabei probiere ich (zufällige) Aktionen in vielen Zuständen aus. Um die Schätzung von V in den bereits gelernten Wegen zu verbessern und schneller zu lernen, macht es Sinn, die "greedy policy" zu verwenden und V zu aktualisieren. Das Gleichgewicht zwischen "zufällig" und "greedy" nennt man “Erkundung vs. Ausbeutung”, oder: "exploration vs. exploitation" auf Englisch. Du kannst mithilfe des Erkundungsreglers einstellen, wieviel ich bei jedem Lernschritt erkunden soll.<br>
      <br>
      Drückst du auf den Knopf "1 Episode", lerne ich einen Durchgang durch das Labyrinth. Siehst du, wie sich die W-Werte verändern? Lerne noch mehr! Beweg dich herum! Lern mehr und beobachte, wie sich die greedy policy verändert...`
    },
    qLearning: {
      title: 'Q-Learning und der Level-Editor',
      text: `Für mich war es praktischer, die sogenannten Q-Werte statt der V-Werte zu aktualisieren. Die Q-Werte zeigen eine zu erwartende langfristige Belohnung, wenn ich in einem Zustand bin und eine gewisse Aktion wähle. Sie ist also nicht nur vom Zustand abhängig, sondern auch von der Aktion. Der Vorteil ist, dass ich einfacher entscheiden kann, welche Aktion die beste ist (diejenige mit dem höchsten Q) und ich kann so theoretisch auch in nicht-deterministischen Umgebungen lernen. Das heißt, dass meine Bewegungen eine gewisse Wahrscheinlichkeit in sich tragen. Ich würde etwa von einem gewissen Zustand nicht dieselbe Aktion nehmen, um in denselben Folgezustand zu landen.<br>
      <br>
      Es wurde (mathematisch) bewiesen, dass Q-Learning zur optimalen Strategie (die am besten die Belohnungen maximiert) für jedes Problem führt - zumindest bei bestimmten Bedingungen und einer seeehr langen Lernzeit. Das ist fantastisch! Eine Methode, um alle Probleme zu lösen, für jedes beliebige Labyrinth! Oder für andere Spiele (mit Zuständen, Aktionen und Belohnungen).<br>
      <br>
      Versuch mal das Labyrinth mit dem Level-Editor zu verändern. Du kannst deine eigenen Wände bauen und auch "gefährliche Felder" einrichten, wie hier z.B. die Fallgrube.`
    },
    playground: {
      title: 'Spiel mit mir',
      text:  `Ich bin ein Roboter, der mit einem mächtigen Q-Learning-Algorithmus ausgestattet ist. Mit dieser Methode kann ich lernen, indem ich ganz einfach herumlaufe, Belohnungen beobachte und die Strategie verändere, sodass ich langfristig so viele Belohnungen wie möglich bekomme. In diesem Fall führt es mich zum schnellsten Weg zur Ladestation!<br>
      <br>
      Beweg dich mit mir, versuch dich an verschiedenen Durchgängen und beobachte, wie ich meine V-Werte kartiere, um mich durch das Labyrinth zu navigieren (alle Optionen auf der rechten Seite). Im Tutorial findest du mehr Details zu all den Optionen und der Lernmethode. Du kannst es öffnen, indem du auf die kleinen Punkte unten klickst.<br>
      <br>
      In der KI-Forschung nennt man diese Weise zu lernen "Belohnendes Lernen" oder "Reinforcement Learning" auf Englisch. Sie ist eine fundamentale Methode des Machinellen Lernen.`
    },

    intro: "Reinforcement learning (RL) ist ein Gebiet des Maschinellen lernen, das sich damit befasst, wie Software-Agenten zu bestimmten Aktionen in einer Umgebung kommen, um eine kumulative Belohnung zu maximieren. Belohnendes Lernen ist eine der drei grundlegenden Paradigmen des Maschinellen Lernens, gemeinsam mit Überwachtem Lernen ("Supervised Learning") und Unüberwachtem Lernen ("Unsupervised Learning")(Wikipedia) Dieses Exponat zeigt, wie ein Roboter lernt, sich durch ein Labyrinth zu einer Ladestation zu navigieren bevor dessen Akku ausläuft. Am Anfang weiß der Rbboter noch nichts, doch lernt er durch jede neue Aktion (Bewegung) und jeden Zustand (erreichte Position). Langsam beginnt er, ein Verständnis für das Labyrinth zu entwickeln, das es ihm ermöglicht, die Ladestation zu erreichen, bevor ihm die Energie ausgeht. Schließlich sollte er lernen, Umwege zu vermeiden und die Ladestation in der optimalen Anzahl von Schritten zu erreichen.",
    stateAction: "Dieser Roboter steht in einem Raum. Er kann über den Boden, aber nicht durch die Wände gehen. Er weiß immer, wo er ist und in welche Richtungen er sich bewegen kann, weiß aber nichts anderes über den Raum.",
    goal: "Der Roboter weiß nur, wo er selbst sich befindet und in welche Richtungen er sich bewegen kann. Kannst du ihm helfen, die Ladestation zu finden?",
    bestway: "Manchmal ist es möglich, das Ziel auf mehrere Arten zu erreichen. Wenn du nur begrenzte Energie hättest, wie würdest du versuchen, das Ziel hier zu erreichen?",
    localIntro: "Aber da ist ein Problem! Der Roboter kann nicht das ganze Labyrinth sehen. Er weiß nur, wo er selbst ist und in welche Richtung er sich bewegen kann. Kannst du ihm helfen, unter diesen Bedingungen die Ladestation erreichen? Verwende die Pfeiltasten, um den Roboter zu bewegen",

    goalReached: 'Der Roboter hat die Ladestation erreicht',
    outOfBattery: "Der Akku des Roboters ist ausgelaufen",

    ok: 'Ok',

    training: {
      training: 'Training',
      oneEpisode: '1 Episode',
      twentyEpisodes: '20 Episoden',
      unlearn: 'Verlernen',
      evaluate: 'Auswerten'
    },
    evaluation: {
      oneStep: 'Mach einen Schritt',
      greedyStep: 'Mach einen "greedy" Schritt',
    },
    info: {
      state: 'Zustand',
      actions: 'Aktionen',
      reinforcement: 'Belohnung',
      accumulated: 'Return',
    },
    controls: {
      discountFactor: 'Discount-Faktor',
      learningRate: 'Lernrate',
      exploration: 'Erkundung',
      learning: 'Lerne von Aktionen',
      showQvalue: 'Wie gut ist jede Position? (Werte)',
      showGreedy: 'Wohin soll ich gehen? ("Greedy Policy")',
      fog: 'Roboterperspektive'
    }
  },
  "de": {}
}

export var Texts = AllTexts["en"];
function setLanguage(languageCode) {
  Texts = AllTexts[languageCode];
}
