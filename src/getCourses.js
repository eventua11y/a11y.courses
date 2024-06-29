import { sanityClient } from "sanity:client";
import { transformCourse } from './transformCourse.js';

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
      ...transformCourse(course),
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export default getCourses;