import { sanityClient } from "sanity:client";

async function getCourses() {
  try {
    // Fetch all courses from Sanity and return them directly
    return await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]`);
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;