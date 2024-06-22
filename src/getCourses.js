import { sanityClient } from "sanity:client";

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
    }
  };

  if (type === "timeRequired") {
    return `${value} hours`;
  } else {
    return maps[type][value];
  }
}

// Define an asynchronous function to get courses
async function getCourses() {
  try {
    const courses = await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]{
      ...,
      "collection": collection[]->,
      "provider": provider[]->,
      "teacher": teacher[]->
    }`);

    return courses.map(course => ({
      ...course,
      provider: course.provider ? course.provider.map(provider => provider) : [],
      teacher: course.teacher ? course.teacher.map(teacher => teacher) : [],
      // Apply transformations
      level: course.level ? mapDescription('level', course.level) : undefined,
      targetAudience: course.targetAudience ? mapDescription('audience', course.targetAudience) : undefined,
      timeRequired: course.timeRequired ? mapDescription("timeRequired", course.timeRequired) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;