// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];


// =================================================================================================================================================================//


const submissionDueDateCheck = (submissionDate, dueDate) => {
  return new Date(submissionDate) <= new Date(dueDate);
};

// =================================================================================================================================================================//


const getAvgByScores = (learnerData, assignmentData) => {

  let testResult = [];
  const finalResult = [];

  //forEach Loop
  learnerData.forEach(element => {

    const existingItem = testResult.find(resultItem => resultItem.id === element.learner_id);

    // Find the corresponding assignment
    // connects AssignmentGroup.assignments.id === LearnerSubmissions,learner_id
    const assignments = assignmentData.assignments.find(data => data.id === element.assignment_id);

    let overDue = !submissionDueDateCheck(element.submission.submitted_at, assignments.due_at);

    let scoretoCalculate = element.submission.score;

    // Check submission status
    if (overDue) {
      scoretoCalculate -= scoretoCalculate * 0.10;
    }

    if (existingItem) {
      existingItem.score += scoretoCalculate;
      existingItem.totalScore += assignments.points_possible;
    } else {
      testResult.push({ id: element.learner_id, score: element.submission.score, totalScore: assignments.points_possible });
    }
  });

  //Loop through the testResult to calculate average
  for (let i = 0; i < testResult.length; i++) {
    let avgScore = (testResult[i].score / testResult[i].totalScore) * 100;
    finalResult.push({ id: testResult[i].id, avg: avgScore });
  }

  return finalResult;
};


// =================================================================================================================================================================//


const calculateIndividualScore = (learnerData, assignmentData) => {

  let individualResult = [];
  const duedItems = {};

  const currentDate = new Date();

  // This for loop iterates over the assignments inside the assignment data object.
  // Stores the value of each assignment object then stores it's date in dueDate.
  // Then the due date is compared with the current date
  // If less than current the value is stored duedItems object along with the assignment ID as key.
  for (let i = 0; i < assignmentData.assignments.length; i++) {
    const assignment = assignmentData.assignments[i];
    const dueDate = new Date(assignment.due_at);

    if (dueDate <= currentDate) {
      duedItems[assignment.id] = assignment.points_possible;
    }
  }

  // Loop through each submission
  for (let i = 0; i < learnerData.length; i++) {
    const submission = learnerData[i];
    const pointsPossible = duedItems[submission.assignment_id];

    // Use of continue, this is a safety net when the value of possible points is undefined or 0.
    // Continue skips over those conditions.
    if (!pointsPossible) continue;

    const existingID = individualResult.find(resultItem => resultItem.id === submission.learner_id);

    const assignment = assignmentData.assignments.find(a => a.id === submission.assignment_id);

    const dueDate = assignment.due_at;

    // Check submission status
    let overDue = !submissionDueDateCheck(submission.submission.submitted_at, dueDate);
    let scoretoCalculate = submission.submission.score;

    // Apply late penalty if the submission is late
    if (overDue) {
      scoretoCalculate -= scoretoCalculate * 0.10;
    }

    if (existingID) {
      existingID[submission.assignment_id] = (scoretoCalculate / pointsPossible) * 100;

    } else {
      let newEntry = { id: submission.learner_id, [submission.assignment_id]: (scoretoCalculate / pointsPossible) * 100 };
      individualResult.push(newEntry); // Push new learner result
    }
  }

  return individualResult;
};


//=================================================================================================================================================================//


function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

  try {
    if (CourseInfo.id !== 451) {
      throw new Error("Enter the valid course.")
    }

    const getAvg = getAvgByScores(LearnerSubmissions, AssignmentGroup);

    const individualScore = calculateIndividualScore(LearnerSubmissions, AssignmentGroup);

    const finalData = individualScore.map(obj1 => {
      const obj2 = getAvg.find(obj2 => obj2.id === obj1.id);
      return { ...obj1, ...obj2 };
    });
    
    return finalData;

  } catch (error) {

    console.log("An error occured", error.message);

  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);