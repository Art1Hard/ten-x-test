class TabBuilder {
	$activeClass = "course-nav__item--active";
	$tabs = [];

	constructor(containerSelector, onChange) {
		this.container = document.querySelector(containerSelector);
		this.onChange = onChange;
	}

	init(courses) {
		this.$tabs = this.buildTabs(courses);
	}

	render() {
		if (!this.container) return;

		this.container.innerHTML = this.$tabs
			.map(
				(tab, index) => `
      <li class="course-nav__item ${
				index === 0 ? this.$activeClass : ""
			}" data-name="${tab.name}">
        <a href="#" class="course-nav__link">
          ${tab.name}
          <small class="course-nav__count">${tab.count}</small>
        </a>
      </li>
    `
			)
			.join("");

		this.addClickHandlers();
	}

	addClickHandlers() {
		const items = this.container.querySelectorAll(".course-nav__item");
		items.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				items.forEach((l) => l.classList.remove(this.$activeClass));
				item.classList.add(this.$activeClass);

				this.onChange(item.dataset.name);
			});
		});
	}

	buildTabs = (courses) => {
		const result = [];

		result.push({
			name: "All",
			count: courses.length,
		});

		courses.forEach((course) => {
			const existing = result.find((tab) => tab.name === course.tag.name);

			if (existing) {
				existing.count++;
			} else {
				result.push({
					name: course.tag.name,
					count: 1,
				});
			}
		});

		return result;
	};
}

export default TabBuilder;
