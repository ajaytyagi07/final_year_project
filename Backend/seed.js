const { PrismaClient, QuestionType, Question_subject } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  
  const questions = [
    // MCQ Questions
    // Physics
    {
      question_text: "What is the unit of force in the International System of Units (SI)?",
      question_type: QuestionType.MCQ,
      subject: Question_subject.physics,
      options: JSON.stringify(["Newton", "Joule", "Watt", "Pascal"]),
      correct_answer: "Newton"
    },
    {
      "question_text": "The speed of light is faster than the speed of sound.",
      "question_type": QuestionType.TF,
      "subject": Question_subject.physics,
      "options": JSON.stringify(["true", "false"]),
      "correct_answer": "true"
    },

    // Chemistry
    {
      question_text: "What is the chemical symbol for Sodium?",
      question_type: QuestionType.MCQ,
      subject: Question_subject.chemistry,
      options: JSON.stringify(["Na", "N", "So", "S"]),
      correct_answer: "Na"
    },
    {
      "question_text": "Water is a compound made up of two hydrogen atoms and one oxygen atom.",
      "question_type": QuestionType.TF,
      "subject": Question_subject.chemistry,
      "options": JSON.stringify(["true", "false"]),
      "correct_answer": "true"
    },
    

    // Biology
    {
      question_text: "What is the powerhouse of the cell?",
      question_type: QuestionType.MCQ,
      subject: Question_subject.biology,
      options: JSON.stringify(["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"]),
      correct_answer: "Mitochondria"
    },
    {
      "question_text": "All cells in an organism have the same DNA.",
      "question_type": QuestionType.TF,
      "subject": Question_subject.biology,
      "options": JSON.stringify(["true", "false"]),
      "correct_answer": "false"
    },    

    // GK
    {
      question_text: "Who is known as the Father of Computers?",
      question_type: QuestionType.MCQ,
      subject: Question_subject.GK,
      options: JSON.stringify(["Charles Babbage", "Alan Turing", "Ada Lovelace", "Bill Gates"]),
      correct_answer: "Charles Babbage"
    },
    {
      "question_text": "The capital of Australia is Sydney.",
      "question_type": QuestionType.TF,
      "subject": Question_subject.GK,
      "options": JSON.stringify(["true", "false"]),
      "correct_answer": "false"
    },
    

    // Fill-in-the-Blank Questions
    // Physics
    {
      question_text: "The acceleration due to gravity on Earth is approximately ______ m/s^2.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: Question_subject.physics,
      correct_answer: "9.8"
    },

    // Chemistry
    {
      question_text: "The atomic number of Carbon is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: Question_subject.chemistry,
      correct_answer: "6"
    },
    

    // Biology
    {
      question_text: "The basic unit of life is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: Question_subject.biology,
      correct_answer: "cell"
    },

    // GK
    {
      question_text: "The largest ocean on Earth is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: Question_subject.GK,
      correct_answer: "Pacific Ocean"
    },
    

    // Descriptive Questions
    // Physics
    {
      question_text: "Explain the concept of Newton's Laws of Motion and provide real-life examples for each law.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: Question_subject.physics,
      correct_answer: JSON.stringify(["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Inertia", "Action and Reaction", "Force and Acceleration"])
    },

    // Chemistry
    {
      question_text: "Explain the concept of chemical equilibrium and provide an example of a reversible reaction.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: Question_subject.chemistry,
      correct_answer: JSON.stringify(["Dynamic Equilibrium", "Le Chatelier's Principle", "Reversible Reactions", "Equilibrium Constant", "Example: Haber Process", "Example: Dissolution of Salt"])
    },
    

    // Biology
    {
      question_text: "Explain the process of photosynthesis and its importance to life on Earth.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: Question_subject.biology,
      correct_answer: JSON.stringify(["Photosynthesis", "Chlorophyll", "Light Reactions", "Calvin Cycle", "Carbon Dioxide and Water", "Production of Oxygen and Glucose"])
    },
    

    // GK
    
    {
      question_text: "Explain the significance of the United Nations in maintaining global peace and security.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: Question_subject.GK,
      correct_answer: JSON.stringify(["Peacekeeping Missions", "International Cooperation", "Conflict Resolution", "Human Rights", "Sustainable Development Goals", "Diplomatic Relations"])
    }
  ];

  try {
    // Insert the questions into the database
    await prisma.question.createMany({
      data: questions,
    });
    console.log('Data has been inserted successfully');
  } catch (error) {
    console.error('Error inserting data: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed();
