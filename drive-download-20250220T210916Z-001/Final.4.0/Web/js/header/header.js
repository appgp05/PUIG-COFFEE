function scrollToSection(sectionId, offset) {
    var section = document.getElementById(sectionId);
    console.log(section, sectionId)
    if (section) {
        var offsetTop = section.offsetTop + offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}