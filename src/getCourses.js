import { sanityClient } from "sanity:client";

async function getCourses() {
  try {
    // Fetch all courses from Sanity and return them directly
    return await sanityClient.fetch(`*[_type == "course" && !(_id in path("drafts.**"))]`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch courses");
  }
}

export default getCourses;