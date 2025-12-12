import isWebp from "./modules/webp.js";
import TabBuilder from "./modules/tab.js";
import CourseBuilder from "./modules/course.js";
import { courses } from "./constants/mock.js";

isWebp();

const tabBuilder = new TabBuilder(".course-nav__list", (tabName) => {
	courseBuilder.filterByTag(tabName);
	searchInput.value = "";
});
tabBuilder.init(courses);
tabBuilder.render();

const courseBuilder = new CourseBuilder(courses, ".course-content__list");
courseBuilder.render();

const searchInput = document.querySelector(".course-nav__search-input");
searchInput.addEventListener("input", (e) => {
	courseBuilder.search(e.target.value);
});
