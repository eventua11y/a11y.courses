import { sanityClient } from "sanity:client";

async function getCourses() {
  try {
    // Fetch all courses from Sanity and return them directly
    const courses = await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]{
  ...,
  "provider": provider[]-> 
}`);

    // Check if provider exists before trying to map over it
    return courses.map(course => ({
      ...course,
      provider: course.provider ? course.provider.map(provider => provider) : [],
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;