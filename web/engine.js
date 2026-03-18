/* SudoRoom: A Love Story - Web Visual Novel Engine */
(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  const state = {
    variables: {},
    currentLabel: 'start',
    commandIndex: 0,
    waitingForClick: false,
    waitingForMenu: false,
    musicEl: null,
    resumeCallback: null, // called on click instead of advance() when set
  };

  // ── DOM refs ───────────────────────────────────────────
  const bgFront     = document.getElementById('bg-front');
  const bgBack      = document.getElementById('bg-back');
  const charLayer   = document.getElementById('char-layer');
  const dialogueBox = document.getElementById('dialogue-box');
  const charName    = document.getElementById('char-name');
  const dialogueText= document.getElementById('dialogue-text');
  const menuOverlay = document.getElementById('menu-overlay');
  const startOverlay= document.getElementById('start-overlay');
  const gameEl      = document.getElementById('game');

  // ── Character definitions ──────────────────────────────
  const CHARACTERS = {
    m:     { name: 'Me',              color: '#c8ffc8' },
    s:     { name: 'SudoCat',         color: '#c8ffc8' },
    g:     { name: 'Greene',          color: '#cccccc' },
    b:     { name: 'Boxy Box',        color: '#e5eeee' },
    peeps: { name: 'SudoRoom People', color: '#c8ffc8' },
  };

  // ── Image map (Ren'Py image names → file paths) ───────
  const IMAGES = {
    // SudoCat
    'sudocat faceleft normal':                 'game/images/characters/sudocat/sudocat-normal.png',
    'sudocat faceleft normal tiltright':        'game/images/characters/sudocat/sudocat-normal-tiltright.png',
    'sudocat faceleft normal tiltleft':         'game/images/characters/sudocat/sudocat-normal-tiltleft.png',
    'sudocat faceleft eyesclosed normal':       'game/images/characters/sudocat/sudocat-eyesclosed-normal.png',
    'sudocat faceleft eyesclosed tiltleft':     'game/images/characters/sudocat/sudocat-eyesclosed-normal-tiltleft.png',
    'sudocat faceleft eyesclosed tiltright':    'game/images/characters/sudocat/sudocat-eyesclosed-normal-tiltright.png',
    'sudocat faceright normal':                'game/images/characters/sudocat/sudocat-rightfacing-normal.png',
    'sudocat faceright normal tiltback':        'game/images/characters/sudocat/sudocat-rightfacing-normal-tiltback.png',
    'sudocat faceright normal tiltforward':     'game/images/characters/sudocat/sudocat-rightfacing-normal-tiltforward.png',
    'sudocat faceright eyesclosed normal':      'game/images/characters/sudocat/sudocat-rightfacing-eyesclosed.png',
    'sudocat faceright eyesclosed tiltdown':    'game/images/characters/sudocat/sudocat-rightfacing-eyesclosed-tiltdown.png',
    // BoxyBox
    'boxybox faceright normal headup':         'game/images/characters/boxybox/boxybox-normal-right-headup.png',
    'boxybox faceright normal':                'game/images/characters/boxybox/boxybox-normal-right.png',
    'boxybox faceright lookdown':              'game/images/characters/boxybox/boxybox-lookdown-right.png',
    'boxybox faceleft normal headup':          'game/images/characters/boxybox/boxybox-normal-left-headup.png',
    'boxybox faceleft normal':                 'game/images/characters/boxybox/boxybox-normal-left.png',
    'boxybox faceleft lookdown':               'game/images/characters/boxybox/boxybox-lookdown-left.png',
    // Greene
    'greene faceright anxious':                'game/images/characters/greene/doggy-anxious.png',
    'greene faceright excited':                'game/images/characters/greene/doggy-excited.png',
    'greene faceright smile':                  'game/images/characters/greene/doggy-smile.png',
  };

  const BACKGROUNDS = {
    'artmurmur cars':    'game/images/backgrounds/artmurmur/cars.png',
    'artmurmur crowd':   'game/images/backgrounds/artmurmur/crowd.png',
    'artmurmur gallery': 'game/images/backgrounds/artmurmur/gallery.png',
    'artmurmur sign':    'game/images/backgrounds/artmurmur/sign.png',
    'outdoors piano':    'game/images/backgrounds/outdoors/piano.png',
    'sudoroom 3dprinter':'game/images/backgrounds/sudoroom/3dprinterroom.jpg',
    'sudoroom dark':     'game/images/backgrounds/sudoroom/darksudoroom.jpg',
    'sudoroom frontdoor':'game/images/backgrounds/sudoroom/frontdoor.jpg',
    'mainroom meeting':  'game/images/backgrounds/mainroom/meeting.jpg',
    'mainroom workshop': 'game/images/backgrounds/mainroom/workshop3dprinting.png',
  };

  // ── Helpers ────────────────────────────────────────────

  function resolveImage(name) {
    return IMAGES[name] || name;
  }

  function resolveBg(name) {
    return BACKGROUNDS[name] || name;
  }

  // Get the character tag (first word) from a sprite name
  function charTag(spriteName) {
    return spriteName.split(' ')[0];
  }

  // ── Command handlers ──────────────────────────────────

  function showDialogue(charId, text) {
    if (charId) {
      const ch = CHARACTERS[charId];
      charName.textContent = ch ? ch.name : charId;
      charName.style.color = ch ? ch.color : '#ffffff';
      charName.style.display = 'block';
    } else {
      charName.style.display = 'none';
    }
    dialogueText.textContent = text;
    dialogueBox.classList.add('visible');
    menuOverlay.classList.remove('visible');
    state.waitingForClick = true;
  }

  function changeScene(bgName) {
    const src = resolveBg(bgName);
    // Dissolve: swap layers
    bgBack.src = bgFront.src || '';
    bgBack.style.opacity = '1';
    bgFront.style.opacity = '0';
    bgFront.src = src;
    // After image loads, fade in front
    bgFront.onload = function () {
      bgFront.style.opacity = '1';
      bgBack.style.opacity = '0';
    };
    // Clear all characters on scene change
    charLayer.innerHTML = '';
  }

  function showSprite(spriteName, position) {
    const src = resolveImage(spriteName);
    const tag = charTag(spriteName);
    const pos = position || 'left';

    // Find existing sprite for this character
    let el = charLayer.querySelector('[data-char="' + tag + '"]');
    if (el) {
      // Update sprite image
      el.src = src;
      el.className = 'char-sprite pos-' + pos;
    } else {
      // Create new sprite
      el = document.createElement('img');
      el.className = 'char-sprite pos-' + pos;
      el.dataset.char = tag;
      el.src = src;
      el.alt = tag;
      charLayer.appendChild(el);
    }
  }

  function hideSprite(spriteName) {
    const tag = charTag(spriteName);
    const el = charLayer.querySelector('[data-char="' + tag + '"]');
    if (el) el.remove();
  }

  function showMenu(choices) {
    dialogueBox.classList.remove('visible');
    menuOverlay.innerHTML = '';
    menuOverlay.classList.add('visible');
    state.waitingForMenu = true;

    choices.forEach(function (choice) {
      const btn = document.createElement('button');
      btn.className = 'menu-choice';
      btn.textContent = choice.text;
      btn.addEventListener('click', function () {
        state.waitingForMenu = false;
        menuOverlay.classList.remove('visible');
        if (choice.commands) {
          runInlineCommands(choice.commands, function () {
            if (choice.jump) jumpTo(choice.jump);
          });
        } else if (choice.jump) {
          jumpTo(choice.jump);
        }
      });
      menuOverlay.appendChild(btn);
    });
  }

  function runInlineCommands(commands, done) {
    // Execute inline commands, then call done() to continue
    let i = 0;
    function next() {
      if (i >= commands.length) {
        if (done) done();
        return;
      }
      const cmd = commands[i++];
      executeCommand(cmd, next);
    }
    next();
  }

  function jumpTo(label) {
    if (!window.STORY[label]) {
      console.warn('Label not found: ' + label);
      return;
    }
    state.currentLabel = label;
    state.commandIndex = 0;
    advance();
  }

  function playMusic(src) {
    if (state.musicEl) {
      state.musicEl.pause();
      state.musicEl = null;
    }
    state.musicEl = new Audio(src);
    state.musicEl.loop = true;
    state.musicEl.volume = 0.5;
    state.musicEl.play().catch(function () {});
  }

  function stopMusic() {
    if (state.musicEl) {
      state.musicEl.pause();
      state.musicEl = null;
    }
  }

  // ── Evaluate a condition string against state variables ─
  function evalCondition(cond) {
    // Simple evaluator for conditions like "first_time", "!has_dreams", "first_question == 'media'"
    try {
      var vars = state.variables;
      // Build a function with variable bindings
      var keys = Object.keys(vars);
      var vals = keys.map(function (k) { return vars[k]; });
      var fn = new Function(keys.join(','), 'return (' + cond + ');');
      return fn.apply(null, vals);
    } catch (e) {
      console.warn('Condition eval failed:', cond, e);
      return false;
    }
  }

  // ── Command executor ──────────────────────────────────
  function executeCommand(cmd, callback) {
    switch (cmd.type) {
      case 'narration':
        showDialogue(null, cmd.text);
        state.resumeCallback = callback;
        return;

      case 'dialogue':
        showDialogue(cmd.character, cmd.text);
        state.resumeCallback = callback;
        return;

      case 'scene':
        changeScene(cmd.bg);
        callback();
        return;

      case 'show':
        showSprite(cmd.sprite, cmd.position);
        callback();
        return;

      case 'hide':
        hideSprite(cmd.sprite);
        callback();
        return;

      case 'menu':
        showMenu(cmd.choices);
        return; // menu handles its own continuation via choice clicks

      case 'jump':
        jumpTo(cmd.target);
        return; // jumpTo calls advance

      case 'setVar':
        state.variables[cmd.name] = cmd.value;
        callback();
        return;

      case 'conditional':
        if (evalCondition(cmd.condition)) {
          runInlineCommands(cmd.then || [], callback);
        } else if (cmd.else) {
          runInlineCommands(cmd.else, callback);
        } else {
          callback();
        }
        return;

      case 'playMusic':
        playMusic(cmd.src);
        callback();
        return;

      case 'stopMusic':
        stopMusic();
        callback();
        return;

      case 'endGame':
        dialogueBox.classList.remove('visible');
        showDialogue(null, 'The End. Thank you for playing!');
        state.waitingForClick = false; // Don't advance further
        return;

      default:
        console.warn('Unknown command type:', cmd.type);
        callback();
        return;
    }
  }

  // ── Main advance loop ─────────────────────────────────
  function advance() {
    var label = window.STORY[state.currentLabel];
    if (!label || state.commandIndex >= label.length) {
      // End of label - try to fall through to next?
      return;
    }

    var cmd = label[state.commandIndex];
    state.commandIndex++;
    state.waitingForClick = false;
    state.waitingForMenu = false;

    executeCommand(cmd, advance);
  }

  // ── Click handler ─────────────────────────────────────
  gameEl.addEventListener('click', function (e) {
    // Don't advance if clicking menu buttons
    if (e.target.classList.contains('menu-choice')) return;
    if (state.waitingForMenu) return;

    if (state.waitingForClick) {
      state.waitingForClick = false;
      var cb = state.resumeCallback || advance;
      state.resumeCallback = null;
      cb();
    }
  });

  // ── Start ─────────────────────────────────────────────
  startOverlay.addEventListener('click', function () {
    startOverlay.classList.add('hidden');
    jumpTo('start');
  });

  // Export for story.js access
  window.VNEngine = { state: state, jumpTo: jumpTo };
})();
