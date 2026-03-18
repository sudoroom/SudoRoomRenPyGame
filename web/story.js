/* SudoRoom: A Love Story - Story Data (converted from script.rpy) */
var STORY = {

  // ═══════════════════════════════════════════════════════
  // label start (script.rpy lines 61-113)
  // ═══════════════════════════════════════════════════════
  start: [
    { type: 'setVar', name: 'hackertype',      value: 'generic' },
    { type: 'setVar', name: 'has_dreams',       value: true },
    { type: 'setVar', name: 'first_time',       value: true },
    { type: 'setVar', name: 'tour_first_time',  value: true },

    { type: 'scene', bg: 'artmurmur cars' },
    { type: 'playMusic', src: 'web/audio/crowd-drums.mp3' },

    { type: 'narration', text: 'Another Oakland Art Murmur, with booming bass cars, sticky fingered tacos, and beers sipped in paper bags' },
    { type: 'narration', text: "It's gorgeous out." },

    { type: 'scene', bg: 'artmurmur gallery' },

    { type: 'narration', text: "You wander down the street passing by all the strutting peacocks, sexy ladies in their lovely mating dance. It's so hustling and bustling during the art mrumur!" },
    { type: 'narration', text: 'Still... something seems to be missing... some kind of purpose?' },

    { type: 'scene', bg: 'artmurmur sign' },

    { type: 'dialogue', character: 'm', text: 'SudoRoom? An afterparty? I wonder what that is.' },
    { type: 'dialogue', character: 'm', text: 'What a weird little sign. Is this some kind of secret society?' },

    { type: 'show', sprite: 'sudocat faceright normal', position: 'left' },
    { type: 'dialogue', character: 's', text: 'Hey! Hey! Hey!' },

    { type: 'show', sprite: 'sudocat faceright normal tiltback', position: 'left' },
    { type: 'dialogue', character: 's', text: "So you're interested in SudoRoom?" },

    { type: 'show', sprite: 'sudocat faceright normal tiltforward', position: 'left' },
    { type: 'dialogue', character: 'm', text: 'Sudo... What is that?' },

    { type: 'show', sprite: 'sudocat faceright normal', position: 'left' },
    { type: 'dialogue', character: 's', text: "SudoRoom! The sign. It's a hackerspace." },

    { type: 'menu', choices: [
      { text: "What's a hackerspace?", jump: 'starthackerspace' },
      { text: "Hackers... aren't those people that break into things?", jump: 'startbadhackers' },
    ]},
  ],

  // ═══════════════════════════════════════════════════════
  // label startbadhackers (script.rpy lines 115-156)
  // ═══════════════════════════════════════════════════════
  startbadhackers: [
    { type: 'scene', bg: 'artmurmur sign' },
    { type: 'show', sprite: 'sudocat faceleft eyesclosed tiltleft', position: 'left' },
    { type: 'dialogue', character: 's', text: '...' },

    { type: 'show', sprite: 'sudocat faceright normal tiltforward', position: 'left' },
    { type: 'dialogue', character: 's', text: "Many people have very bad impressions of hackers. It's actually very complicated." },

    { type: 'menu', choices: [
      { text: 'I see all these bad reports about hackers on the news', jump: 'startbadhackers_news' },
      { text: "Aren't those supernerds?", jump: 'startbadhackers_nerds' },
    ]},
  ],

  startbadhackers_news: [
    { type: 'dialogue', character: 's', text: "And you believe everything that's on the news?" },
    { type: 'menu', choices: [
      { text: 'Yes', jump: 'startbadhackers_news_yes' },
      { text: 'No',  jump: 'startbadhackers_news_no' },
    ]},
  ],

  startbadhackers_news_yes: [
    { type: 'dialogue', character: 's', text: 'Then you have a lot to learn!' },
    { type: 'dialogue', character: 'm', text: 'I was just kidding!' },
    { type: 'jump', target: 'startbadhackers_hats' },
  ],

  startbadhackers_news_no: [
    { type: 'dialogue', character: 's', text: "Good. That means you're not clueless." },
    { type: 'jump', target: 'startbadhackers_hats' },
  ],

  startbadhackers_nerds: [
    { type: 'dialogue', character: 's', text: "Why everyone's a nerd in their own special way. Maybe you have an inner nerd just dying to get out." },
    { type: 'jump', target: 'startbadhackers_hats' },
  ],

  startbadhackers_hats: [
    { type: 'show', sprite: 'sudocat faceleft eyesclosed tiltright', position: 'left' },
    { type: 'dialogue', character: 's', text: 'Hackers can be either for the forces of good... white hat hackers or bad... black hat hackers. Or sometimes they just like to prank for fun.' },
    { type: 'dialogue', character: 's', text: 'A lot of what you hear on media about hackers is unnecessary and comes from media glorification.' },

    { type: 'menu', choices: [
      { text: "What's a white hat hacker? A black hat hacker?", jump: 'startbadhackers_whitehat' },
      { text: 'Why does the media exaggerate?',                 jump: 'startbadhackers_media' },
    ]},
  ],

  startbadhackers_whitehat: [
    { type: 'setVar', name: 'first_question', value: 'hackertype' },
    { type: 'dialogue', character: 's', text: 'White hat hackers are ethical hackers. They use their powers to make the world a better place, rather than to steal things from people.' },
    { type: 'dialogue', character: 'm', text: 'And black hat hackers do the opposite?' },
    { type: 'dialogue', character: 's', text: "Sometimes there's gray too.. say a hacker discovers a big security flaw in a bank. They break into the system, but not to steal anything. They just want to show the flaw." },
    // Fall through to starthackerspace
    { type: 'jump', target: 'starthackerspace' },
  ],

  startbadhackers_media: [
    { type: 'setVar', name: 'first_question', value: 'media' },
    { type: 'dialogue', character: 's', text: "They exaggerate for all the same reasons anyone does. Complex topics are tough to boil down for the general public, and you get more ratings when you're sensational." },
    // Conditional: if first_question == "media", show extra dialogue
    { type: 'dialogue', character: 's', text: 'Then there are so many differences between hackers. There are black hat and white hats...' },
    { type: 'dialogue', character: 's', text: 'White hat hackers are ethical hackers. They use their powers to make the world a better place, rather than to steal things from people.' },
    { type: 'dialogue', character: 'm', text: 'And black hat hackers do the opposite?' },
    { type: 'dialogue', character: 's', text: "Sometimes there's gray too.. say a hacker discovers a big security flaw in a bank. They break into the system, but not to steal anything. They just want to show the flaw." },
    // Fall through to starthackerspace
    { type: 'jump', target: 'starthackerspace' },
  ],

  // ═══════════════════════════════════════════════════════
  // label starthackerspace (script.rpy lines 157-209)
  // ═══════════════════════════════════════════════════════
  starthackerspace: [
    { type: 'scene', bg: 'artmurmur sign' },
    { type: 'show', sprite: 'sudocat faceleft eyesclosed tiltleft', position: 'left' },
    { type: 'dialogue', character: 'm', text: 'And just what is a hackerspace, anyway?' },

    { type: 'show', sprite: 'sudocat faceright normal tiltforward', position: 'left' },
    { type: 'show', sprite: 'sudocat faceright normal', position: 'left' },
    { type: 'dialogue', character: 's', text: 'Hackerspaces are community-oriented physical places where people can meet and work on their projects' },
    { type: 'dialogue', character: 's', text: 'The term hackerspace is confusing, because it can mean many things to many people.' },
    { type: 'dialogue', character: 's', text: 'The term hackerspace actually flexible and open-ended. It can be an artist\'s studio, it can be a sewing lab, it can be a biochemistry room, it can be ane ducational center...' },

    { type: 'dialogue', character: 'm', text: "So can someone who doesn't code be a hacker?" },
    { type: 'dialogue', character: 's', text: 'I believe so. Some people say that a hacker is an expert or enthusiast of any kind. You could be an astronomy hacker or an embroidery hacker.' },

    { type: 'show', sprite: 'sudocat faceright normal tiltback', position: 'left' },

    { type: 'menu', choices: [
      { text: "Dreams? I don't have any dreams.",            jump: 'starthackerspace_nodreams' },
      { text: 'How can SudoRoom help me build my dreams?',   jump: 'starthackerspace_dreams' },
    ]},
  ],

  starthackerspace_dreams: [
    { type: 'setVar', name: 'has_dreams', value: true },
    { type: 'dialogue', character: 's', text: 'SudoRoom gives you a place to connect with other people and make your dreams real.' },
    { type: 'show', sprite: 'sudocat faceright normal', position: 'left' },
    { type: 'dialogue', character: 's', text: "There's also the equipment you need to build what you want. People share tools at SudoRoom..." },
    { type: 'show', sprite: 'sudocat faceright normal tiltback', position: 'left' },
    { type: 'dialogue', character: 's', text: 'And not only tools, they share their ideas and passions.' },
    { type: 'show', sprite: 'sudocat faceright normal', position: 'left' },
    { type: 'jump', target: 'starthackerspace_after_dreams' },
  ],

  starthackerspace_nodreams: [
    { type: 'setVar', name: 'has_dreams', value: false },
    { type: 'dialogue', character: 's', text: "If you don't have a dream, maybe you will find what you want there!" },
    { type: 'dialogue', character: 's', text: "You can even find out what you want playing with the different making tools. It's such a relief instead of actually having to buy stuff all for yourself." },
    { type: 'dialogue', character: 'm', text: "But I'm not creative." },
    { type: 'dialogue', character: 's', text: "Don't be silly. Everyone's creative. The act of living is one of creativity." },
    { type: 'jump', target: 'starthackerspace_after_dreams' },
  ],

  starthackerspace_after_dreams: [
    { type: 'dialogue', character: 's', text: "There are so many different, interesting groups of people at SudoRoom. You'd be amazed at how your ideas can grow and change once you're there!" },
    { type: 'dialogue', character: 's', text: "We have political groups like the Community Democracy Project, which helps concerned citizens better track what tax money is being spent on. It'sl ike a pun krock approach to democracy." },
    { type: 'dialogue', character: 's', text: "There's a SudoMesh network, which is working to decentralize wifi and provide free internet connections, homegrown to everyday folks in Oakland." },
    { type: 'dialogue', character: 's', text: "And even beyond SudoRoom... we're intimately connected to various worker's collectives and spaces throughout the Bay Area and beyond. We're thinking about unique ways to  d" },
    { type: 'dialogue', character: 's', text: "I think it's the perfect place for you. Why don't you go around the corner? It's right on 22nd between Telegraph and Broadway. Boxy Box is there waiting for you." },

    { type: 'scene', bg: 'artmurmur crowd' },

    { type: 'narration', text: 'What a crazy furry cat! SudoRoom... hackerspaces...' },

    { type: 'conditional',
      condition: 'has_dreams',
      then: [
        { type: 'narration', text: 'Why would anyone care about my dreams?' },
      ],
      else: [
        { type: 'narration', text: 'And why would this cat think I have any dreams anyway?' },
      ],
    },

    { type: 'stopMusic' },
    { type: 'jump', target: 'sudoorganscene' },
  ],

  // ═══════════════════════════════════════════════════════
  // label sudoorganscene (script.rpy lines 211-231)
  // ═══════════════════════════════════════════════════════
  sudoorganscene: [
    { type: 'scene', bg: 'outdoors piano' },
    { type: 'playMusic', src: 'web/audio/organ-loop.mp3' },

    { type: 'narration', text: 'A curious character playing the organ, and more mysterious SudoRoom signs...and then:' },

    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },
    { type: 'dialogue', character: 'b', text: "Why hello! I'm Boxy Box and this is Samz here playing the organ." },

    { type: 'show', sprite: 'boxybox faceleft lookdown', position: 'right' },
    { type: 'dialogue', character: 'm', text: 'I was sent here by SudoCat. He was dancing on the street with a sign at the Art Murmur' },

    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },
    { type: 'dialogue', character: 'b', text: "So I've heard." },

    { type: 'show', sprite: 'boxybox faceleft lookdown', position: 'right' },
    { type: 'dialogue', character: 'm', text: "What do I do next? I mean is SudoRoom open to people who aren't members or something? I am a total outsider." },

    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },
    { type: 'dialogue', character: 'b', text: "Why yes. We are open to everyone, even nonmembers.  And our membership is free and open to everyone as well. We seek to be inclusive. We have dues, but they're on a sliding scale" },

    { type: 'dialogue', character: 'm', text: "Very weird. I'm not used to this." },
    { type: 'dialogue', character: 'b', text: "Let's go upstairs." },

    { type: 'stopMusic' },
    { type: 'jump', target: 'sudoroommainroom' },
  ],

  // ═══════════════════════════════════════════════════════
  // label sudoroommainroom (script.rpy lines 233-251)
  // ═══════════════════════════════════════════════════════
  sudoroommainroom: [
    { type: 'scene', bg: 'sudoroom frontdoor' },
    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'left' },

    { type: 'conditional',
      condition: 'first_time',
      then: [
        { type: 'dialogue', character: 'b', text: 'Welcome to the SudoRoom! Let me give you a tour.' },
        { type: 'setVar', name: 'first_time', value: false },
        { type: 'jump', target: 'tour' },
      ],
      else: [
        { type: 'dialogue', character: 'b', text: 'What would you like to do?' },
        { type: 'menu', choices: [
          { text: 'Take a tour of SudoRoom again', jump: 'tour' },
          { text: 'Learn how to use different parts of SudoRoom', jump: 'tutorial' },
          { text: "It's time to party!", jump: 'party' },
        ]},
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════
  // label tour (script.rpy lines 253-283)
  // ═══════════════════════════════════════════════════════
  tour: [
    { type: 'scene', bg: 'sudoroom frontdoor' },
    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },

    { type: 'scene', bg: 'mainroom workshop' },
    { type: 'show', sprite: 'boxybox faceright lookdown', position: 'right' },

    { type: 'conditional',
      condition: 'tour_first_time',
      then: [
        { type: 'dialogue', character: 's', text: "That's the SudoRoom itself. It was founded by a group of idealistic folks on a shoestring budget off the skin of their teeth" },
        { type: 'setVar', name: 'tour_first_time', value: false },
        { type: 'dialogue', character: 'b', text: 'Turning around, you see our big common room. We share this main room with various other groups such as the Public School.' },
        { type: 'dialogue', character: 'b', text: 'You can see Maxximus teaching a 3D printing class right now' },
        { type: 'dialogue', character: 'peeps', text: 'Hey! Welcome to SudoRoom!' },
        { type: 'dialogue', character: 'm', text: 'Hi!' },
        { type: 'dialogue', character: 'b', text: "We have lectures here, talks, movie showings and even dance performances. I think there are even raves here sometimes." },
        { type: 'dialogue', character: 'b', text: "Our weekly meetings are held here. You can attend any which one, they're Wednesdays." },
        { type: 'dialogue', character: 'peeps', text: "Come by after the art murmur. We're having a big monster bash to celebrate and raise funds to save the space." },
        { type: 'dialogue', character: 'b', text: 'In just a few hours this room is going to be completely transformed!' },
      ],
      else: [
        { type: 'dialogue', character: 'b', text: "Let's take a whirl around this place again." },
        { type: 'dialogue', character: 'b', text: 'As you see this is the main room. Meetings, films, you name it.' },
      ],
    },

    { type: 'scene', bg: 'sudoroom 3dprinter' },
    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },

    { type: 'dialogue', character: 'b', text: 'Welcome to the SudoRoom itself! In this room are contained the wonders of life.' },
    { type: 'dialogue', character: 'b', text: 'You have 3D printers, electronics tools, a woodshop, a recording studio, a biohacking lab... and more!' },
    { type: 'dialogue', character: 'b', text: 'And of course there are the books.. we have so, so many interesting books.' },

    { type: 'jump', target: 'sudoroommainroom' },
  ],

  // ═══════════════════════════════════════════════════════
  // label tutorial (script.rpy lines 285-301)
  // ═══════════════════════════════════════════════════════
  tutorial: [
    { type: 'scene', bg: 'sudoroom 3dprinter' },
    { type: 'show', sprite: 'boxybox faceleft normal headup', position: 'right' },

    { type: 'dialogue', character: 'b', text: 'What would you like to learn?' },

    { type: 'menu', choices: [
      { text: '3D Printing? What is that?',                                                         jump: 'tutorial_3DPrinter' },
      { text: "So I can get involved in the community and social movements too? It's not just tech?", jump: 'tutorial_activism' },
      { text: "Biohacking? What's that?",                                                           jump: 'tutorial_biohacking' },
      { text: 'I love bicycles. Anything I can do to rig my bike?',                                  jump: 'tutorial_bikes' },
    ]},
  ],

  // ═══════════════════════════════════════════════════════
  // Tutorial sub-labels (stubs - script.rpy lines 303-329)
  // ═══════════════════════════════════════════════════════
  tutorial_3DPrinter: [
    { type: 'menu', choices: [
      { text: 'I want to learn more stuff about the SudoRoom!', jump: 'tutorial' },
    ]},
  ],

  tutorial_activism: [
    { type: 'menu', choices: [
      { text: 'I want to learn more stuff about the SudoRoom!', jump: 'tutorial' },
    ]},
  ],

  tutorial_biohacking: [
    { type: 'menu', choices: [
      { text: 'I want to learn more stuff about the SudoRoom!', jump: 'tutorial' },
    ]},
  ],

  tutorial_bikes: [
    { type: 'menu', choices: [
      { text: 'I want to learn more stuff about the SudoRoom!', jump: 'tutorial' },
    ]},
  ],

  // ═══════════════════════════════════════════════════════
  // label party (script.rpy lines 331-337)
  // ═══════════════════════════════════════════════════════
  party: [
    { type: 'menu', choices: [
      { text: 'I want to learn more stuff about the SudoRoom!', jump: 'tutorial' },
    ]},
  ],

  // ═══════════════════════════════════════════════════════
  // label end (script.rpy lines 338-345)
  // ═══════════════════════════════════════════════════════
  end: [
    { type: 'dialogue', character: 'm', text: 'And so begins an adventure...' },
    { type: 'dialogue', character: 's', text: 'And a love affair!' },
    { type: 'dialogue', character: 'b', text: "Let's change the world!" },
    { type: 'endGame' },
  ],
};
