import { Tags, QuestionTypes } from "@/utilities/enums";

import { companyId } from "./";

export const rawQuestions = [
  {
    companyId,
    text: "In Doctor Who what does T.A.R.D.I.S. stand for?",
    answers: { create: [{ text: "Time And Relative Dimensions In Space" }] },
    tags: { create: [Tags.Television] },
    documents: {
      create: [{ location: "tardis.jpeg", title: "The TARDIS - Doctor Who" }],
    },
  },
  {
    companyId,
    text: "Which musical interval was banned in the 13th Century",
    type: QuestionTypes.MultipleCorrect,
    answers: {
      create: [
        { text: "None", points: 5, sort: 1 },
        { text: "Tritone", points: 1, sort: 2 },
      ],
    },
  },
  {
    companyId,
    text: "In The Lord of The Rings, what was Gollum's original name",
    answers: { create: [{ text: "Smeagol" }] },
    tags: { create: [Tags.Literature, Tags.Film] },
    documents: {
      create: [{ location: "gollum.jpeg", title: "Image of Gollum" }],
    },
  },
  {
    companyId,
    text: "What was the model number of the Red Dress Cylon in the Battlestar Galactica remake?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "Seven of Nine", points: 0, sort: 1 },
        { text: "Number Six", points: 1, sort: 2 },
        { text: "Number Five", points: 0, sort: 3 },
        { text: "Patient Zero", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Television] },
    documents: {
      create: [{ location: "cylon-6.jpg", title: "Tricia Helfer image" }],
    },
  },
  {
    companyId,
    text: "In the Fallout Universe what year did the bombs drop?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "1945", points: 0, sort: 1 },
        { text: "2025", points: 0, sort: 2 },
        { text: "2044", points: 0, sort: 3 },
        { text: "2077", points: 1, sort: 4 },
      ],
    },
    tags: { create: [Tags.Gaming] },
    documents: {
      create: [{ location: "fallout.jpg", title: "Fallout logo hero image" }],
    },
  },
  {
    companyId,
    text: "What year did the Suez Canal open?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "1860", points: 0, sort: 1 },
        { text: "1869", points: 1, sort: 2 },
        { text: "1906", points: 0, sort: 3 },
        { text: "1987", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What is the capital of Thailand?",
    answers: { create: [{ text: "Bangkok" }] },
    tags: { create: [Tags.Geography, Tags.Easy] },
    documents: { create: [{ location: "bangkok.jpeg", title: "Bangkok" }] },
  },
  {
    companyId,
    text: "What is the most abundant metal in the human body?",
    answers: { create: [{ text: "Calcium" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "One point for every actor who played a Doctor Who - canonical BBC TV series only",
    type: 3,
    answers: {
      create: [
        { text: "William Hartnell", sort: 1 },
        { text: "Patrick Troughton", sort: 2 },
        { text: "Jon Pertwee", sort: 3 },
        { text: "Tom Baker", sort: 4 },
        { text: "Peter Davison", sort: 5 },
        { text: "Colin Baker", sort: 6 },
        { text: "Sylvester McCoy", sort: 7 },
        { text: "Paul McGann", sort: 8 },
        { text: "Christopher Eccleston", sort: 9 },
        { text: "David Tennant", sort: 10 },
        { text: "Matt Smith", sort: 11 },
        { text: "Peter Capaldi", sort: 12 },
        { text: "Jodie Whittaker", sort: 13 },
        { text: "Ncuti Gatwa", sort: 14 },
      ],
    },
    tags: { create: [Tags.Television] },
    documents: {
      create: [
        {
          location: "doctor-whos.jpg",
          title: "Image of multiple Doctor Who Actors",
        },
      ],
    },
  },
  {
    companyId,
    text: "Coffee chain Starbucks takes its name from a character in which classic novel?",
    answers: { create: [{ text: "Moby Dick" }] },
    tags: { create: [Tags.Literature] },
  },
  {
    companyId,
    text: "In the recent (including and since 4) Fallout games, what does each letter of S.P.E.C.I.A.L. stand for?",
    type: QuestionTypes.MultipleCorrect,
    answers: {
      create: [
        { text: "Strength", sort: 1 },
        { text: "Perception", sort: 2 },
        { text: "Endurance", sort: 3 },
        { text: "Charisma", sort: 4 },
        { text: "Intelligence", sort: 5 },
        { text: "Agility", sort: 6 },
        { text: "Luck", sort: 7 },
      ],
    },
    tags: { create: [Tags.Gaming] },
    documents: { create: [{ location: "vault-boy.png", title: "Vault boy" }] },
  },
  {
    companyId,
    text: 'Also known as the "Demon Barber of Fleet Street" this English musical character\'s victims were then baked into pies.',
    answers: { create: [{ text: "Sweeney Todd" }] },
    tags: { create: [Tags.Literature] },
  },
  {
    companyId,
    text: "A cicerone is an expert on what topic?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "Mushrooms", points: 0, sort: 1 },
        { text: "Beer", points: 1, sort: 2 },
        { text: "Food", points: 0, sort: 3 },
        { text: "Women", points: 0, sort: 4 },
      ],
    },
  },
  {
    companyId,
    text: "An orrery is a model (often mechanical) of what?",
    answers: { create: [{ text: "The Solar System" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "Named for a Beatles song, she was the first discovered fossil of Australopithecus afarensis",
    answers: { create: [{ text: "Lucy" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "In the year did the Chernobyl Disaster occur?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "1979", points: 0, sort: 1 },
        { text: "1986", points: 1, sort: 2 },
        { text: "1989", points: 0, sort: 3 },
        { text: "1992", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What is the capital of Brazil?",
    type: QuestionTypes.MultipleChoice,
    answers: {
      create: [
        { text: "Brasilia", points: 1, sort: 1 },
        { text: "São Paulo", points: 0, sort: 2 },
        { text: "Rio de Janeiro", points: 0, sort: 3 },
        { text: "Buenos Aires", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Geography] },
    documents: {
      create: [
        {
          location: "brazil-christ.webp",
          title: "Brazil - Christ the Redeemer",
        },
      ],
    },
  },
  {
    companyId,
    text: "This classic Brazilian statue is known as Christ the...?",
    type: QuestionTypes.MultipleChoice,
    answers: { create: [{ text: "Redeemer" }] },
    tags: { create: [Tags.Geography] },
    documents: {
      create: [
        {
          location: "brazil-christ.webp",
          title: "Brazil - Christ the Redeemer",
        },
      ],
    },
  },
  {
    companyId,
    text: "Who was the first woman to win a Nobel Prize?",
    answers: { create: [{ text: "Marie Curie" }] },
    tags: { create: [Tags.Science, Tags.History] },
  },
  {
    companyId,
    text: "Who wrote the Sherlock Holmes novels?",
    answers: { create: [{ text: "Sir Arthur Conan Doyle" }] },
    tags: { create: [Tags.Literature] },
    documents: {
      create: [
        { location: "sherlock-holmes.jpeg", title: "Image of platypus" },
      ],
    },
  },
  {
    companyId,
    text: "Who was the first president of the United States of America?",
    answers: { create: [{ text: "George Washington" }] },
    tags: { create: [Tags.History, Tags.Easy] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleCorrect,
    text: "Name one of the two mammals that lays eggs.",
    answers: { create: [{ text: "Echidna" }, { text: "Platypus" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "What planet lies closest to the sun?",
    answers: { create: [{ text: "Mercury" }] },
    tags: { create: [Tags.Science, Tags.Easy] },
  },
  {
    companyId,
    text: "The Lord of the Rings was written by JRR Tolkien. But what does JRR stand for?",
    answers: { create: [{ text: "John Ronald Reuel" }] },
    tags: { create: [Tags.Literature, Tags.Difficult] },
  },
  {
    companyId,
    type: QuestionTypes.TrueFalse,
    text: "True or False: The platypus is venomous.",
    answers: { create: [{ text: "True" }] },
    tags: { create: [Tags.Nature] },
    documents: {
      create: [{ location: "platypus.jpg", title: "Image of platypus" }],
    },
  },
  {
    companyId,
    text: "A point for each name of the four replicants Blade Runner’s Deckard was originally sent to “retire”?",
    answers: {
      create: [
        { text: "Priss" },
        { text: "Leon" },
        { text: "Roy Batty" },
        { text: "Zhora" },
      ],
    },
    tags: { create: [Tags.Film] },
  },
  {
    companyId,
    text: "Which STD is commonly referred to as The Clap?",
    answers: { create: [{ text: "Gonorrhea" }] },
    tags: { create: [Tags.Science, Tags.Nature] },
  },
  {
    companyId,
    text: "What’s the name of the possessed doll that starts killing in the Child’s Play series?",
    answers: { create: [{ text: "Chucky" }] },
    tags: { create: [Tags.Film] },
    documents: {
      create: [{ location: "chucky.png", title: "Chucky from Childs Play" }],
    },
  },
  {
    companyId,
    text: "What metal is the most electrically conductive?",
    answers: { create: [{ text: "Silver" }] },
    tags: { create: [Tags.Science, Tags.Difficult] },
  },
  {
    companyId,
    text: "What is the longest a person can theoretically serve as US president?",
    answers: { create: [{ text: "10 Years" }] },
    tags: { create: [Tags.History, Tags.Difficult] },
  },
  {
    companyId,
    text: "How many universities are in the famed Ivy League?",
    answers: { create: [{ text: "8" }] },
    documents: {
      create: [{ location: "harvard.webp", title: "Harvard campus" }],
    },
  },
  {
    companyId,
    type: QuestionTypes.MultipleCorrect,
    text: "One point for each university you can name in the Ivy League",
    answers: {
      create: [
        { text: "Yale" },
        { text: "Dartmouth" },
        { text: "Cornell" },
        { text: "Brown" },
        { text: "Harvard" },
        { text: "Columbia" },
        { text: "Princeton" },
        { text: "Pennsylvania" },
      ],
    },
    tags: { create: [Tags.Difficult] },
    documents: {
      create: [{ location: "harvard.webp", title: "Harvard campus" }],
    },
  },
  {
    companyId,
    text: "Which is the only planet named for a Greek instead of Roman God?",
    answers: { create: [{ text: "Uranus" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "What is the largest moon in the solar system?",
    answers: { create: [{ text: "Ganymede" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "The planets Uranus, Saturn, Jupiter and Neptune are known as __ giants?",
    answers: { create: [{ text: "Gas" }] },
    tags: { create: [Tags.Science, Tags.Easy] },
  },
  {
    companyId,
    text: "Rounded to the nearest whole number, what percentage of the solar system’s mass is the sun?",
    answers: { create: [{ text: "100%" }] },
    tags: { create: [Tags.Science] },
    documents: { create: [{ location: "the-sun.jpeg", title: "Our sun" }] },
  },
  {
    companyId,
    text: "What were the first names of the Wright Brothers?",
    answers: { create: [{ text: "Orville and Wilbur" }] },
    tags: { create: [Tags.History, Tags.Science] },
    documents: {
      create: [
        {
          location: "wright-brothers.jpeg",
          title: "Orville and Wilbur Wright",
        },
      ],
    },
  },
  {
    companyId,
    text: "What is the best selling album of all time?",
    answers: { create: [{ text: "Thriller by Michael Jackson " }] },
    tags: { create: [] },
  },
  {
    companyId,
    text: "What sub-subatomic particle are protons and neutrons made out of?",
    answers: { create: [{ text: "Quarks" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "Which of the following is not a valid type of quark?",
    answers: {
      create: [
        { text: "Strange", points: 0, sort: 1 },
        { text: "Charm", points: 0, sort: 2 },
        { text: "Up", points: 0, sort: 3 },
        { text: "Clean", points: 1, sort: 4 },
        { text: "Bottom", points: 0, sort: 5 },
      ],
    },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "What do the letters in WD-40 stand for?",
    answers: { create: [{ text: "Water Displacement" }] },
    tags: { create: [Tags.Science] },
    documents: { create: [{ location: "wd-40.jpeg", title: "WD-40 can" }] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "What does AR in the AR-15 stand for?",
    answers: {
      create: [
        { text: "Assault Rifle", points: 0, sort: 1 },
        { text: "Automatic Rifle", points: 0, sort: 2 },
        { text: "Armalite", points: 1, sort: 3 },
        { text: "Armed Range", points: 0, sort: 4 },
      ],
    },
  },
  {
    companyId,
    type: QuestionTypes.MultipleCorrect,
    text: "The offspring of a donkey and a horse is a what?",
    answers: { create: [{ text: "Mule" }, { text: "Hinney" }] },
    tags: { create: [Tags.Science] },
    documents: {
      create: [
        { location: "donkey.webp", title: "Donkey" },
        { location: "horse.jpeg", title: "Horse" },
      ],
    },
  },
  {
    companyId,
    text: "The Olympics are held every how many years?",
    answers: { create: [{ text: "4" }] },
    tags: { create: [Tags.Sports] },
  },
  {
    companyId,
    text: 'Which sport is known as "the beautiful game"?',
    answers: { create: [{ text: "Soccer" }] },
    tags: { create: [Tags.Sports] },
  },
  {
    companyId,
    text: "What was the first city to host the Olympics twice?",
    answers: { create: [{ text: "Paris" }] },
    tags: { create: [Tags.Sports, Tags.History] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Thalassaphobia is the irrational fear of what?",
    answers: {
      create: [
        { text: "The Dark", points: 0, sort: 1 },
        { text: "Clowns", points: 0, sort: 2 },
        { text: "The Ocean", points: 1, sort: 3 },
        { text: "The Number 13", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Nature] },
  },
  {
    companyId,
    text: "In the Harry Potter Universe, Hogwarts is in what country?",
    answers: { create: [{ text: "Scotland" }] },
    tags: { create: [Tags.Film, Tags.Literature] },
    documents: {
      create: [
        {
          location: "hogwarts.jpeg",
          title: "Hogwarts School of Witches and Wizardry",
        },
      ],
    },
  },
  {
    companyId,
    text: "Samuel Langhorne Clemens was better known as which famous author?",
    answers: { create: [{ text: "Mark Twain" }] },
    tags: { create: [Tags.Literature] },
  },
  {
    companyId,
    text: "The space telescope launched in 2022 was named for which astronomer?",
    answers: { create: [{ text: "James Webb" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Which of the following is a real science?",
    answers: {
      create: [
        { text: "Kinesthetics", points: 1, sort: 1 },
        { text: "Zetetics", points: 0, sort: 2 },
        { text: "Diatetics", points: 0, sort: 3 },
        { text: "Calisthenics", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "Which country has the only successful program to land a probe on Venus?",
    answers: { create: [{ text: "Russia" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "An infection by the variola virus is known as what disease?",
    answers: { create: [{ text: "Smallpox" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "What is the name of the disease caused by lyssavirus",
    answers: { create: [{ text: "Rabies" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "Who was Time Man of the Year in 1938?",
    answers: { create: [{ text: "Adolf Hitler" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "Who secretly funded the 1954 movie Animal Farm?",
    answers: { create: [{ text: "The CIA" }] },
    tags: { create: [Tags.Film] },
  },
  {
    companyId,
    text: "The Imitation Game featured Benedict Cumberbatch playing which famous British mathematician and codebreaker?",
    answers: { create: [{ text: "Alan Turing" }] },
    tags: { create: [Tags.Science, Tags.History, Tags.Film] },
  },
  {
    companyId,
    text: "Medieval Italian poet Dante Alegieri is best known for what famous narrative poem?",
    answers: { create: [{ text: "The Divine Comedy" }] },
    tags: { create: [Tags.History, Tags.Literature] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Psychopomps are spirits that assist a person at the time of ….",
    answers: {
      create: [
        { text: "Marriage", points: 0, sort: 1 },
        { text: "War", points: 0, sort: 2 },
        { text: "Death", points: 1, sort: 3 },
        { text: "Birth", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Difficult] },
  },
  {
    companyId,
    text: "Stable points of orbit balanced between the gravity of multiple bodies are known as what points?",
    answers: { create: [{ text: "Lagrange" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "What sport is played with a shuttlecock?",
    answers: { create: [{ text: "Badminton" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "The Australian classic Wake in Fright is mostly set in which fictional country town?",
    answers: { create: [{ text: "Bundayabba" }] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "This popular New Zealand comic is known as Footrot What?",
    answers: {
      create: [
        { text: "Flats", points: 1, sort: 1 },
        { text: "Hills", points: 0, sort: 2 },
        { text: "Farm", points: 0, sort: 3 },
        { text: "and Friends", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Literature] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "What is the dot over a lowercase i or j called?",
    answers: {
      create: [
        { text: "Jot", points: 0, sort: 1 },
        { text: "Pot", points: 0, sort: 2 },
        { text: "Tittle", points: 1, sort: 3 },
        { text: "Arc", points: 0, sort: 4 },
        { text: "Tang", points: 0, sort: 5 },
      ],
    },
  },
  {
    companyId,
    text: "What is the name of the double dots above the German ä, ö, ü",
    answers: { create: [{ text: "Umlaut" }] },
    tags: { create: [Tags.Easy] },
  },
  {
    companyId,
    text: "Who is Asterix’ big friend?",
    answers: { create: [{ text: "Oblix" }] },
    tags: { create: [Tags.Easy, Tags.Literature] },
  },
  {
    companyId,
    text: "What is a male diva called?",
    answers: { create: [{ text: "Divo" }] },
    tags: { create: [Tags.Difficult] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "The spire on the Empire State Building was originally designed for what purpose?",
    answers: {
      create: [
        { text: "To protect against lightning", points: 0, sort: 1 },
        { text: "to transmit radio signals", points: 0, sort: 2 },
        { text: "to make the building taller", points: 0, sort: 3 },
        { text: "to dock airships", points: 1, sort: 4 },
      ],
    },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "What country was the band AC/DC formed in?",
    answers: {
      create: [
        { text: "Australia", points: 1, sort: 1 },
        { text: "Scotland", points: 0, sort: 2 },
        { text: "Canada", points: 0, sort: 3 },
        { text: "USA", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Music] },
  },
  {
    companyId,
    text: "The Statue of Liberty is in which city?",
    answers: { create: [{ text: "New York" }] },
    tags: { create: [Tags.Geography] },
  },
  {
    companyId,
    text: "What year did Siam become Thailand?",
    answers: { create: [{ text: "1939" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What is the second largest state in the USA?",
    answers: { create: [{ text: "Minnesota" }] },
    tags: { create: [Tags.Geography] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "How many skeletons are stored in the Paris Catacombs?",
    answers: {
      create: [
        { text: "Nine hundred", points: 0, sort: 1 },
        { text: "12 thousand", points: 0, sort: 2 },
        { text: "500,000", points: 0, sort: 3 },
        { text: "Six Million", points: 1, sort: 4 },
      ],
    },
  },
  {
    companyId,
    text: "What is the second largest state in the USA?",
    answers: { create: [{ text: "Minnesota" }] },
    tags: { create: [Tags.Geography] },
  },
  {
    companyId,
    text: "On high end brandy or cognacs what does the phrase VSOP stand for?",
    answers: { create: [{ text: "Very Superior Old Pale" }] },
    tags: { create: [Tags.Difficult] },
  },
  {
    companyId,
    text: "What country is home to the Chernobyl power plant?",
    answers: { create: [{ text: "Ukraine" }] },
    tags: { create: [Tags.History, Tags.Geography] },
  },
  {
    companyId,
    text: "Which planet has the most moons?",
    answers: { create: [{ text: "Saturn" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "In the Lord of the Rings, the wizard Gandalf is not a human but one of the last of which race?",
    answers: {
      create: [
        { text: "Maiar", points: 1, sort: 1 },
        { text: "Eldar", points: 0, sort: 2 },
        { text: "Balrog", points: 0, sort: 3 },
        { text: "Ainur", points: 0, sort: 4 },
      ],
    },
  },
  {
    companyId,
    text: "Which planet has the most moons?",
    answers: { create: [{ text: "Saturn" }] },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "Who was the first woman to win a Nobel prize?",
    answers: { create: [{ text: "Marie Curie" }] },
    tags: { create: [Tags.Science, Tags.History] },
  },
  {
    companyId,
    text: "Who was the first person to win two Nobel prizes?",
    answers: { create: [{ text: "Marie Curie" }] },
    tags: { create: [Tags.Science, Tags.History] },
  },
  {
    companyId,
    text: "The goal of 9-ball is to pot the 9. What colour is it?",
    answers: { create: [{ text: "Yellow" }] },
    tags: { create: [Tags.Sports] },
  },
  {
    companyId,
    text: "How many balls in a standard game of billiards (excluding the cue ball)?",
    answers: { create: [{ text: "15" }] },
    tags: { create: [Tags.Sports] },
  },
  {
    companyId,
    text: "How many pockets on a standard pool table?",
    answers: { create: [{ text: "6" }] },
    tags: { create: [Tags.Sports, Tags.Easy] },
  },
  {
    companyId,
    text: "Where did 80s DC supervillain Snowflame get his power?",
    answers: { create: [{ text: "Cocaine" }] },
    tags: { create: [Tags.Literature, Tags.Difficult] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Which of the following is actually a dinosaur?",
    answers: {
      create: [
        { text: "Dimetrodon", points: 0, sort: 1 },
        { text: "Yutyrannus", points: 1, sort: 2 },
        { text: "Plesiosaur", points: 0, sort: 3 },
        { text: "Pteranodon", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Which of the following is actually a dinosaur?",
    answers: {
      create: [
        { text: "Dimetrodon", points: 0, sort: 1 },
        { text: "Plesiosaur", points: 0, sort: 2 },
        { text: "Cassowary", points: 1, sort: 3 },
        { text: "Mastodon", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "How many tentacles does a squid have?",
    answers: { create: [{ text: "2" }] },
    tags: { create: [Tags.Science, Tags.Nature] },
  },
  {
    companyId,
    text: "Who wrote the novel To Kill a Mockingbird?",
    answers: { create: [{ text: "Harper Lee" }] },
    tags: { create: [Tags.Literature] },
  },
  {
    companyId,
    text: "How many children does Elon Musk have with singer Grimes?",
    answers: { create: [{ text: "2" }] },
  },
  {
    companyId,
    text: "The nuclear bombs dropped on Hiroshima and Nagasaki were named Little Boy and…?",
    answers: { create: [{ text: "Fat Man" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What was the name of the plane that dropped a nuclear bomb on Hiroshima?",
    answers: { create: [{ text: "Enola Gay" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What is fast food chain Burger King called in Australia?",
    answers: { create: [{ text: "Hungry Jacks" }] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "In what year was the original iPhone released?",
    answers: {
      create: [
        { text: "2005", points: 0, sort: 1 },
        { text: "2007", points: 1, sort: 2 },
        { text: "2009", points: 0, sort: 3 },
        { text: "2010", points: 0, sort: 4 },
        { text: "2012", points: 0, sort: 4 },
      ],
    },
    tags: { create: [Tags.Science] },
  },
  {
    companyId,
    text: "How many days did the government of Elizabeth Truss run?",
    answers: { create: [{ text: "44" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What year was the Great Fire of London?",
    answers: { create: [{ text: "1666" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What year did the Titanic sink?",
    answers: { create: [{ text: "1912" }] },
    tags: { create: [Tags.History] },
  },
  {
    companyId,
    text: "What year and month did the Titanic sink?",
    answers: { create: [{ text: "April 1912" }] },
    tags: { create: [Tags.History, Tags.Difficult] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleCorrect,
    text: "A point for each Hogwarts House you can name",
    answers: {
      create: [
        { text: "Hufflepuff", sort: 1 },
        { text: "Griffindor", sort: 2 },
        { text: "Slytherin", sort: 3 },
        { text: "Ravenclaw", sort: 4 },
      ],
    },
    tags: { create: [Tags.Literature, Tags.Film, Tags.Easy] },
  },
  {
    companyId,
    type: QuestionTypes.MultipleChoice,
    text: "Which of the following is not a real dinosaur",
    answers: {
      create: [
        { text: "Bambiraptor", points: 0, sort: 1 },
        { text: "Technosaurus", points: 0, sort: 2 },
        { text: "Erectopus", points: 0, sort: 3 },
        { text: "Irritator", points: 0, sort: 4 },
        { text: "Pantydraco", points: 0, sort: 5 },
        { text: "Kittiosaur", points: 1, sort: 6 },
      ],
    },
    tags: { create: [Tags.Science, Tags.Nature] },
  },
  {
    companyId,
    text: "What was the name of the team of mostly female assassins in Kill Bill?",
    answers: { create: [{ text: "Deadly Assassin Viper Squad" }] },
    tags: { create: [Tags.Film] },
  },
];
