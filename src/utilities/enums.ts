export enum QuestionTypes {
  Simple = 1,
  MultipleChoice,
  MultipleCorrect,
  TrueFalse,
}

export const QuestionTypeLabels = {
  1: "Simple",
  2: "Multiple Choice",
  3: "Multiple Correct Answers",
  4: "True or False",
};

export enum EventStatuses {
  Draft = 1,
  Published,
  Completed,
}

export enum LocationTypes {
  PlusCode = 1,
  Coordinates,
  MapsLink,
  Address,
}

export enum Tags {
  Literature = "0cc875a9-7338-495a-94b1-5aa28bf2bbd9",
  Film = "eae15870-b4b2-440f-b36e-78ef517e8bbe",
  Sports = "604abd8b-11e0-419a-ab91-ab8abf430244",
  Music = "607b3a19-04e8-4e35-b2c5-07cedd919695",
  Science = "c948e09c-2606-4eb3-9461-8334b3f71135",
  Geography = "213467cd-10a0-4d9b-9f50-26374dd62963",
  Nature = "bb1d66ce-c7cf-43d4-a672-0d1006264ba0",
  Gaming = "f14334ea-7e8f-4dd6-b3ba-e4970f4c16bc",
  Easy = "454df36f-34a0-4e75-ad28-e614873fae93",
  Difficult = "ce3bab2f-fec9-4b43-9fc1-53fcd0041f21",
  Television = "9a46261d-db91-4c2e-8f65-3aefff8aeef1",
  History = "786f4936-8378-4bcd-a18f-8a78b9637dfb",
  Local = "ccb5a554-8f9d-4aa8-ad11-8bc69f19ce5f",
}
