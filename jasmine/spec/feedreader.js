/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); // test if allFeeds were defined
            expect(allFeeds.length).not.toBe(0); // test if allFeeds were not empty
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URLs defined and that the URLs are not empty', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined(); // test if allFeeds urls were defined
                expect(allFeeds[feed].url.length).not.toBe(0); // test if allFeeds urls were not empty string
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and that the names are not empty', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined(); // test if allFeeds names were defined
                expect(allFeeds[feed].name.length).not.toBe(0); // test if allFeeds urls were not empty string
            }
        });
    });


    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        let body = document.getElementsByTagName("body")[0]; // read body element
        let menuicon = document.querySelectorAll('.menu-icon-link')[0]; // read menu-icon-link element

        it('is hidden by default', function() {
            expect(body.className).toBeDefined(); // test if body classname was defined
            expect(body.className).toBe("menu-hidden"); // test classname menu-hidden is present
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('display toggled when clicked', function() {
            menuicon.click(); // simulate clicking the menu icon
            expect(body.className).toBe("") // test if classname was empty string
            menuicon.click(); // simulate clicking the menu icon again
            expect(body.className).toBe("menu-hidden") // test classname menu-hidden is present
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() { // simulate loadFeed function
                done(); // flag done when finished
            });
        });

        it("at least a single .entry element within the .feed container", function(done) {
            const feed = document.querySelectorAll('.feed')[0]; // read the loaded feed
            const entries = feed.querySelectorAll('.entry')[0]; // read the entries from feed
            expect(entries.lenght).not.toBe(0);  // test if entries were not empty
            done();
        });
    }); 
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    
        let previousFeed; // define previous feed
        let newFeed; // define new feed

        beforeEach(function(done) {
            loadFeed(0, function() { // simulate loadFeed function for the first feed
                previousFeed = document.querySelectorAll('.feed')[0].innerHTML; // read the content of the first feed
                loadFeed(1, function() { // simulate loadFeed function for the next feed
                    newFeed = document.querySelectorAll('.feed')[0].innerHTML; // read the content of the next feed
                    done(); // flag done when finished
                });
            });
        });

        it("when a new feed is loaded that the content actually changes", function(done) {
            expect(newFeed).not.toBe(previousFeed); // compare the content of first feed and the next feed should be different
            done();
        });

    });
});
