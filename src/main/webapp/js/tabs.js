function showTab(tabId) {
    // Hide all contents
    var contents = document.querySelectorAll('.content');
    for(var i=0; i<contents.length; i++) {
        contents[i].style.display = 'none';
    }

    // Show the selected tab wrapper
    var selectedTab = document.getElementById(tabId);
    if(selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Tab 3 Handling
    if(tabId === 'tab3' && typeof window.initTab3 === 'function') {
        window.initTab3();
    }

    // Tab 4 Handling (Load JSP + Execute Script)
    if(tabId === 'tab4') {
        if (!selectedTab.classList.contains('tab4-loaded')) {

            fetch('jsp/tab4.jsp')
                .then(function(response) { return response.text(); })
                .then(function(html) {
                    selectedTab.innerHTML = html;
                    selectedTab.classList.add('tab4-loaded');

                    var scripts = selectedTab.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        var newScript = document.createElement("script");
                        newScript.text = scripts[i].text;
                        document.body.appendChild(newScript); // Append to body to Execute
                    }
                })
                .catch(function(err) {
                    console.error(err);
                    selectedTab.innerHTML = "Error loading Tab 4";
                });
        }
    }
}