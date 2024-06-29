// Maps a given type and value to a descriptive string using predefined mappings.
function mapDescription(type, value) {
  const maps = {
    level: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert"
    },
    audience: {
      developers: "Developers",
      designers: "Designers",
      managers: "Managers",
      broad: "Broad"
    },
    cost: {
      free: "Free",
      paid: "Paid"
    }
  };

  if (type === "timeRequired") {
    return `${value} hours`;
  } else {
    return maps[type][value];
  }
};

function transformCourse(course) {
  // Step 1 & 2: Create a new object with all properties from the course object
  let transformedCourse = { ...course };

  // Step 3: Transform specific properties and update them in the transformedCourse object
  if (course.level) {
    transformedCourse.level = mapDescription('level', course.level);
  }
  if (course.targetAudience) {
    transformedCourse.targetAudience = mapDescription('audience', course.targetAudience);
  }
  if (course.timeRequired) {
    transformedCourse.timeRequired = mapDescription("timeRequired", course.timeRequired);
  }
  if (course.cost) {
    transformedCourse.cost = mapDescription("cost", course.cost);
  }

  // Step 4: Return the transformedCourse object, which now includes any unchanged properties
  return transformedCourse;
}

export { transformCourse };