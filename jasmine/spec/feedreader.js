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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test suite for tests related to every individual feed */
        describe('Each RSS Feed', function() {

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should has defined URL', function() {
           //for each feed
           allFeeds.forEach(function(feed) {
             //check that URL exists and not empty
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should has defined Name', function() {
           //for each feed
           allFeeds.forEach(function(feed) {
             //check that URL exists and not empty
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
       });
     });

      /* A test suite for tests related to the menu */
     describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should be hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should change visibility when menu icon is clicked', function() {
            // Get menu icon element
            const menuIcon = $('.menu-icon-link');

            // Click menu icon
            menuIcon.trigger('click');
            // Check if menu is visible
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Click menu icon again
            menuIcon.trigger('click');
            // Check if menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    /* A test suite for tests related to Initial Entries */
      describe('Initial Entries', function() {

        /* loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should create at least one entry', function(done) {
          expect($('.feed .entry').length).not.toBe(0);
          done();
        });
      });

    /* A test suite for tests related to New Feed Selection */
    describe('New Feed Selection', function() {
      // variables to hold initial feed and new feed
      let initialFeed;
      let newFeed;

      /* loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done) {

        // load the first feed
        loadFeed(0, function() {

          // Set initial feed after first feed load succees
          initialFeed = $('.feed').html();

          // Load the second feed
          loadFeed(1, function() {

            // Set the new feed after second feed load succees
            newFeed = $('.feed').html();
            done();
          });
        });
      });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('should actually change content', function(done) {

           // Check if the new feed is different than the initial one
           expect(newFeed).not.toBe(initialFeed);

           /* Check if the new content is correctly set to the new feed
            * by checking that the header title is correctly set to the new feed name
            */
           expect($('.header-title').text()).toBe(allFeeds[1].name);
           done();
         });
       });
     }());
