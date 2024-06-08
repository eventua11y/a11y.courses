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

  return maps[type][value] || value;
}

// Define an asynchronous function to get courses
async function getCourses() {
  try {
    const courses = await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]{
      ...,
      "provider": provider[]->,
      "teacher": teacher[]->
    }`);

    return courses.map(course => ({
      ...course,
      provider: course.provider ? course.provider.map(provider => provider) : [],
      teacher: course.teacher ? course.teacher.map(teacher => teacher) : [],
      // Apply transformations
      level: mapDescription('level', course.level),
      targetAudience: mapDescription('audience', course.targetAudience),
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;