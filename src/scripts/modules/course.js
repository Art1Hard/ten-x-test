class CourseBuilder {
	constructor(courses, containerSelector) {
		this.allCourses = courses;
		this.filteredCourses = courses;
		this.renderedCourses = courses;
		this.container = document.querySelector(containerSelector);
	}

	render() {
		if (!this.container) return;

		if (this.renderedCourses.length <= 0) {
			this.container.innerHTML = "Courses not found.";
			return;
		}

		this.container.innerHTML = this.renderedCourses
			.map(
				(course) =>
					`
				<li class="course-content__item">
					<a class="course-content__link" href="#">
						<div class="course-content__img">
							<img src="${course.image}" alt="${course.alt}" />
						</div>

						<div class="course-content__info">
							<small class="course-content__tag" style="background-color: ${course.tag.color}">${course.tag.name}</small>
							<h2 class="course-content__title">
								${course.title}
							</h2>

							<p class="course-content__footer">
								<span class="course-content__price">$${course.price}</span> |
								<span class="course-content__author">by ${course.author}</span>
							</p>
						</div>
					</a>
				</li>`
			)
			.join("");
	}

	filterByTag(tagName) {
		if (tagName === "All") {
			this.filteredCourses = this.allCourses;
			this.renderedCourses = this.allCourses;
			this.render();
			return;
		}

		this.filteredCourses = this.allCourses.filter(
			(course) => course.tag.name === tagName
		);
		this.renderedCourses = this.filteredCourses;
		this.render();
	}

	search(text) {
		this.renderedCourses = this.filteredCourses.filter((course) =>
			course.title.toLowerCase().includes(text.toLowerCase())
		);
		this.render();
	}
}

export default CourseBuilder;
