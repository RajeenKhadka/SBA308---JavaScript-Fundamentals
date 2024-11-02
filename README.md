# SBA308-JavaScript-Fundamentals


Psuedocode:

The way I broke down my code was. I wanted 4 functions:
-submissionDueDateCheck: This function checks if the submission date is less than or equal to the due date. Returns a boolean.
-getAvgByScores: This function returns the total average while grouping the same learners
-calculateIndividualScore: This function returns scores for individual scores grouped using assignment_id in learner submission and id in assignments inside AssignmentGroup while grouping the same learners.
-getLearnerData: This function brings everything together. Using map(). The final result is selected from the results of both getAvgScores and calculateIndividualScores. 