function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	// Tabs

	const tabs = document.querySelectorAll(tabsSelector),
	tabsContent = document.querySelectorAll(tabsContentSelector),
	tabsParent = document.querySelector(tabsParentSelector);

	function hideTabsContent() {
		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	hideTabsContent();

	function showTabsContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add(activeClass);
	}

	showTabsContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target === item) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});
}

export default tabs;