describe("multiSort", function() {
  
  function check_build_order(first_value, second_value, third_value) {
    // Filter out the table cells that aren't currently displayed.
    var visible_tds_row0 = element(by.repeater('build in buildgroup.pagination.filteredBuilds').row(0)).all(by.tagName('td')).filter(function(elem) { return elem.isDisplayed(); });
    var visible_tds_row1 = element(by.repeater('build in buildgroup.pagination.filteredBuilds').row(1)).all(by.tagName('td')).filter(function(elem) { return elem.isDisplayed(); });
    var visible_tds_row2 = element(by.repeater('build in buildgroup.pagination.filteredBuilds').row(2)).all(by.tagName('td')).filter(function(elem) { return elem.isDisplayed(); });

    expect(visible_tds_row0.get(0).getText()).toBe(first_value);
    expect(visible_tds_row1.get(0).getText()).toBe(second_value);
    expect(visible_tds_row2.get(0).getText()).toBe(third_value);
  }

  it("sort by label column", function() {
    browser.get('index.php?date=20110722&project=Trilinos');

    // Clear default sorting by clicking on the Site header.
    var site_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(0);
    site_header.click();

    // Check that the builds are in the expected order
    check_build_order('test.kitware', 'hut12.kitware', 'hut11.kitware');

    // Click on the Labels header.
    var label_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(11);
    expect(label_header.getText()).toBe('Labels');
    label_header.click();
    expect(label_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Check that the builds are in the expected order
    check_build_order('hut11.kitware', 'hut12.kitware', 'test.kitware');

    // Then hold down shift and click on Test Fail header.
    var testfail_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(8);
    expect(testfail_header.getText()).toBe('Fail');
    browser.actions().mouseMove(testfail_header).keyDown(protractor.Key.SHIFT).click().perform();
    expect(testfail_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Labels should still be sorted
    expect(label_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Check that the builds are in the (same) expected order
    check_build_order('hut11.kitware', 'hut12.kitware', 'test.kitware');

    // Now try clicking on Labels again to reverse order
    label_header.click();
    expect(label_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-up");

    // Test Fail should still be sorted
    expect(testfail_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Check that the builds are in the expected order
    check_build_order('test.kitware', 'hut12.kitware', 'hut11.kitware');

    // Click on Test Fail without the SHIFT key
    browser.actions().mouseMove(testfail_header).keyUp(protractor.Key.SHIFT).click().perform();
    expect(testfail_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-up");

    // Labels should not be sorted
    expect(label_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-none");

    // Check that the builds are in the expected order
    check_build_order('hut11.kitware', 'hut12.kitware', 'test.kitware');

  });

  it("sort by time columns", function() {
    browser.get('index.php?date=20110722&project=Trilinos');

    // Display advanced settings
    element(by.id('settings')).click();

    var link = element(by.id('label_advancedview'));
    link.click();

    // Clear default sorting by clicking on the Site header.
    var site_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(0);
    site_header.click();

    // Click on the Build Time header.
    var buildtime_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(9);
    expect(buildtime_header.getText()).toBe('Time');
    buildtime_header.click();
    expect(buildtime_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Check that the builds are in the expected order
    check_build_order('hut11.kitware', 'test.kitware', 'hut12.kitware');

    // Click on the Build Time header again to reverse order.
    buildtime_header.click();
    expect(buildtime_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-up");

    // Check that the builds are in the expected order
    check_build_order('test.kitware', 'hut12.kitware', 'hut11.kitware');

    // Then hold down shift and click on Configure Time header.
    var configuretime_header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(6);
    expect(configuretime_header.getText()).toBe('Time');
    browser.actions().mouseMove(configuretime_header).keyDown(protractor.Key.SHIFT).click().perform();
    expect(configuretime_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // build time should still be sorted
    expect(buildtime_header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-up");

    // Check that the builds are in the expected order
    check_build_order('hut12.kitware', 'test.kitware', 'hut11.kitware');
  });

});
