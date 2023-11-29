const { JSDOM } = require('jsdom');
const puppeteer = require('puppeteer');

// Function to compare two DOMs and generate descriptive sentences
function compareDOMs(beforeHTML, afterHTML) {
  const beforeDOM = new JSDOM(beforeHTML);
  const afterDOM = new JSDOM(afterHTML);

  const addedElements = [];
  const removedElements = [];

  afterDOM.window.document.querySelectorAll('*').forEach(afterNode => {
    let found = false;
    beforeDOM.window.document.querySelectorAll('*').forEach(beforeNode => {
      if (afterNode.isEqualNode(beforeNode)) {
        found = true;
      }
    });
    if (!found) {
      addedElements.push(afterNode);
    }
  });

  beforeDOM.window.document.querySelectorAll('*').forEach(beforeNode => {
    let found = false;
    afterDOM.window.document.querySelectorAll('*').forEach(afterNode => {
      if (beforeNode.isEqualNode(afterNode)) {
        found = true;
      }
    });
    if (!found) {
      removedElements.push(beforeNode);
    }
  });

  const changes = {
    added: addedElements,
    removed: removedElements,
  };

  return changes;
}

function generateDescriptions(changes) {
    const descriptions = [];
  
    if (changes.added.length > 0) {
      descriptions.push(`Added elements:`);
      changes.added.forEach(element => {
        descriptions.push(`- ${getDescription(element, 'added')}`);
      });
    }
  
    if (changes.removed.length > 0) {
      descriptions.push(`Removed elements:`);
      changes.removed.forEach(element => {
        descriptions.push(`- ${getDescription(element, 'removed')}`);
      });
    }
  
    return descriptions;
  }
  
  function getDescription(element, changeType) {
    if (changeType === 'added') {
      if (element.classList.contains('sidebar')) {
        return `Sidebar is present in the second DOM.`;
      } else if (element.id === 'close-button') {
        return `Close button is available in the second DOM.`;
      } else {
        return `${element.tagName} is present in the second DOM.`;
      }
    } else if (changeType === 'removed') {
      if (element.classList.contains('sidebar')) {
        return `Sidebar is not present in the second DOM anymore.`;
      } else if (element.id === 'close-button') {
        return `Close button is not available in the second DOM anymore.`;
      } else {
        return `${element.tagName} is not present in the second DOM anymore.`;
      }
    }
  }
  

function getDescription(element, changeType) {
  if (changeType === 'added') {
    return `${element.tagName} is present in the second DOM.`;
  } else if (changeType === 'removed') {
    return `${element.tagName} is not present in the second DOM anymore.`;
  }
}

// Function to compare Amazon homepage before and after clicking the hamburger menu
async function compareAmazonHomePage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.amazon.com/');
  await page.waitForSelector('#nav-hamburger-menu');

  const beforeHTML = await page.content();

  await page.click('#nav-hamburger-menu');

  await page.waitForTimeout(2000);
  
  // Capture HTML after clicking the hamburger menu
  const afterHTML = await page.content();

  const changes = compareDOMs(beforeHTML, afterHTML);

  const descriptions = generateDescriptions(changes);
  
  console.log(descriptions.join('\n')); // Display the descriptions
  await browser.close();
}

// Run the comparison
compareAmazonHomePage();
