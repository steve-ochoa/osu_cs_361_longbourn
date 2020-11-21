export const Urls = {
  Local: "http://localhost:6997/",
  GitHub: "https://api.github.com/",
};

export const Years = [
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];

export const YearOptions = [];
Years.forEach((element) => {
  YearOptions.push({ label: element, value: element });
});

export const Semesters = ["Fall", "Winter", "Spring", "Summer"];

export const Grades = ["A", "B", "C", "D", "F"];

export const SemesterOptions = [
  { label: "Fall", value: "Fall" },
  { label: "Winter", value: "Winter" },
  { label: "Spring", value: "Spring" },
  { label: "Summer", value: "Summer" },
];

export const GradeOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
];
