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

//   function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

//     return result;
// }

//const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//console.log(result);

const submissionDueDateCheck = (submissionDate, dueDate) => {
  return new Date(submissionDate) <= new Date(dueDate);
};

const getAvgByScores = (LearnerSubmissions, AssignmentGroup) => {

  let testResult = [];
  const finalResult = [];

  LearnerSubmissions.forEach(element => {
    const existingItem = testResult.find(resultItem => resultItem.id === element.learner_id);

    // Find the corresponding assignment
    // connects AssignmentGroup.assignments.id === LearnerSubmissions,learner_id

    const assignments = AssignmentGroup.assignments.find(data => data.id === element.assignment_id);

    const overDue = !submissionDueDateCheck(element.submission.submitted_at, assignments.due_at);

    //console.log(assignments.due_at);
    let scoretoCalculate = element.submission.score;
    //console.log(scoretoCalculate);

    if (overDue) {
      scoretoCalculate -= 15;
    }

    if (existingItem) {
      //console.log(existingItem);
      existingItem.score += scoretoCalculate;
      existingItem.totalScore += assignments.points_possible;
      //console.log(existingItem.score);
    } else {
      testResult.push({ id: element.learner_id, score: element.submission.score, totalScore: assignments.points_possible });
    }
  });

  //Use the data that use pushed into the testResult and use it to calculate the average 
  testResult.map(element => {
    const avgScore = (element.score / element.totalScore);
    finalResult.push({ id: element.id, avg: avgScore });
  });

  return finalResult;
}

const getAvg = getAvgByScores(LearnerSubmissions, AssignmentGroup);
console.log(getAvg);




