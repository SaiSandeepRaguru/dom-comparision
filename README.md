# dom-comparision
DomDiff challenge - comparing two HTML DOMs


The code uses Puppeteer and JSDOM to compare two versions of a webpage and generate descriptive sentences about the differences.

The `compareDOMs` function takes the HTML of two versions of the webpage and compares them to find added and removed elements. It uses JSDOM to parse the HTML and then compares the elements in the two DOMs to identify the changes.

The `generateDescriptions` function takes the changes found by `compareDOMs` and creates descriptive sentences for the added and removed elements. It uses the `getDescription` function to generate the specific descriptions for each element based on its attributes.

The `compareAmazonHomePage` function uses Puppeteer to launch a browser, navigate to Amazon's homepage, capture the HTML before and after clicking the hamburger menu, compares the DOMs, generates descriptive sentences, and then logs the descriptions.

Overall, this code automates the process of comparing two versions of a webpage and describing the differences in a structured way.
