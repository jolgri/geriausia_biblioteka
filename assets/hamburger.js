
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-active');
});

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('sidebar-active');
    }
});

// Duplicate event listeners for sidebar menu items
const menuItems = [
    ['addBookOption', 'addBookOptionSidebar'],
    ['showBooksList', 'showBooksListSidebar'],
    ['addCategoryOption', 'addCategoryOptionSidebar'],
    ['showCategoryList', 'showCategoryListSidebar'],
    ['addReaderOption', 'addReaderOptionSidebar'],
    ['showReadersList', 'showReadersListSidebar']
];

menuItems.forEach(([navId, sidebarId]) => {
    const navItem = document.getElementById(navId);
    const sidebarItem = document.getElementById(sidebarId);
    
    // Assuming your app.js has click handlers, mirror them
    if (navItem && sidebarItem) {
        sidebarItem.addEventListener('click', () => {
            navItem.click(); // Trigger the nav item's click event
            sidebar.classList.remove('sidebar-active'); // Close sidebar
        });
    }
});
