import { sanityClient } from "sanity:client";

// Define an asynchronous function to get courses
async function getCourses() {
  try {
    // Fetch all courses from Sanity that are not drafts
    // The 'provider' field is an array of references, so we use 'provider[]->' to dereference each reference and get the actual data
    const courses = await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]{
      ...,
      "provider": provider[]-> 
    }`);

    // Map over the courses
    // For each course, we spread the existing course data and then check if 'provider' exists
    // If 'provider' exists, we map over it and return the provider data
    // If 'provider' doesn't exist, we return an empty array
    return courses.map(course => ({
      ...course,
      provider: course.provider ? course.provider.map(provider => provider) : [],
    }));
  } catch (error) {
    // If an error occurs, log it to the console and throw an error
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;