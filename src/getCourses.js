import { sanityClient } from "sanity:client";

// Define an asynchronous function to get courses
async function getCourses() {
  try {
    // Fetch all courses from Sanity that are not drafts
    // The 'provider' and 'teacher' fields are arrays of references, so we use 'provider[]->' and 'teacher[]->' to dereference each reference and get the actual data
    const courses = await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]{
      ...,
      "provider": provider[]->,
      "teacher": teacher[]->
    }`);

    // Map over the courses
    // For each course, we spread the existing course data and then check if 'provider' and 'teacher' exist
    // If 'provider' or 'teacher' exist, we map over them and return the provider or teacher data
    // If 'provider' or 'teacher' don't exist, we return an empty array
    return courses.map(course => ({
      ...course,
      provider: course.provider ? course.provider.map(provider => provider) : [],
      teacher: course.teacher ? course.teacher.map(teacher => teacher) : [],
    }));
  } catch (error) {
    // If an error occurs, log it to the console and throw an error
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;